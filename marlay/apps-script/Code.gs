/**
 * Marlay dances feed for "Tate Academy - Dances Info 2026-2027".
 *
 * Lives in the sheet (Extensions → Apps Script) and is deployed as a web app:
 *   Execute as: Me    Who has access: Anyone
 * The site fetches the /exec URL and gets JSON back. The sheet itself stays private.
 *
 * This copy is kept in the Comp-Apps repo for history. After editing it in the sheet,
 * redeploy (Deploy → Manage deployments → edit → Version: New version → Deploy), or
 * the /exec URL keeps serving the old code — then copy the new version back here.
 *
 * Privacy: the /exec URL is public, so this returns display names only. The Roster's
 * "Full name" column is never read, and any name in a Dancers cell that isn't on the
 * Roster is dropped (counted in `unmatchedCount`) rather than passed through, in case
 * someone types a full name by mistake.
 *
 * Dancers dropdown: Google only allows multiple selections on a fixed-list dropdown,
 * not one that reads from a range, so refreshDancerDropdown() rebuilds that list from
 * the Roster. Run setup() once from the editor; after that it re-runs on every Roster
 * edit. The "Marlay" menu in the sheet can also run it by hand. This needs the Google
 * Sheets API advanced service added in the editor (Services + → Google Sheets API).
 */

const GROUPS = ['Petite', 'Mini', 'Junior', 'Teen', 'Senior'];

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Marlay')
    .addItem('Refresh dancer dropdown', 'refreshDancerDropdown')
    .addToUi();
}

// Run once from the Apps Script editor (Run → setup) to turn on the automatic refresh.
function setup() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'onRosterEdit')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onRosterEdit').forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
  refreshDancerDropdown();
}

function onRosterEdit(e) {
  if (e && e.range.getSheet().getName() === 'Roster') refreshDancerDropdown();
}

// SpreadsheetApp's validation builder has no multiple-selections option, so this goes
// through the Sheets API advanced service (editor: Services + → Google Sheets API).
function refreshDancerDropdown() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const options = GROUPS.map(g => g + ' group')
    .concat(readRoster(ss.getSheetByName('Roster')).map(d => d.name));
  const dances = ss.getSheetByName('Dances');
  const col = dances.getRange(1, 1, 1, dances.getLastColumn()).getValues()[0]
    .map(h => String(h).trim()).indexOf('Dancers');
  if (col < 0) throw new Error('No "Dancers" column on the Dances tab');
  const request = {
    setDataValidation: {
      range: { sheetId: dances.getSheetId(), startRowIndex: 1, startColumnIndex: col, endColumnIndex: col + 1 },
      rule: {
        condition: {
          type: 'ONE_OF_LIST',
          allowMultipleSelections: true,
          values: options.map(v => ({ userEnteredValue: v }))
        },
        strict: false,
        showCustomUi: true,
        customUiMode: 'CHIP',
        inputMessage: 'Pick a whole group (e.g. Senior group) or individual dancers. The list updates from the Roster tab.'
      }
    }
  };
  Sheets.Spreadsheets.batchUpdate({ requests: [request] }, ss.getId());
}

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const roster = readRoster(ss.getSheetByName('Roster'));
  const dances = readDances(ss.getSheetByName('Dances'), roster);
  const body = {
    updated: new Date().toISOString(),
    roster: roster.map(d => ({ name: d.name, group: d.group })),
    dances: dances
  };
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

// Rows → objects keyed by header text, so columns can be reordered in the sheet.
function readRows(sheet) {
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values.shift().map(h => h.trim());
  return values
    .filter(row => row.some(cell => cell.trim() !== ''))
    .map(row => Object.fromEntries(headers.map((h, i) => [h, (row[i] || '').trim()])));
}

function readRoster(sheet) {
  return readRows(sheet)
    .filter(r => r['Display name'])
    .map(r => ({ name: r['Display name'], group: r['Group'] }));
}

function readDances(sheet, roster) {
  const known = new Map(roster.map(d => [d.name.toLowerCase(), d.name]));
  return readRows(sheet)
    .filter(r => r['Dance Name'])
    .map(r => {
      const groups = [];
      const dancers = [];
      let unmatchedCount = 0;
      const add = name => { if (!dancers.includes(name)) dancers.push(name); };
      (r['Dancers'] || '').split(',').map(s => s.trim()).filter(Boolean).forEach(token => {
        const group = GROUPS.find(g => token.toLowerCase() === (g + ' group').toLowerCase());
        if (group) {
          groups.push(group);
          roster.filter(d => d.group === group).forEach(d => add(d.name));
        } else if (known.has(token.toLowerCase())) {
          add(known.get(token.toLowerCase()));
        } else {
          unmatchedCount++;
        }
      });
      return {
        name: r['Dance Name'],
        ageGroup: r['Age Group'],
        genre: r['Genre and Group Size'],
        groups: groups,
        dancers: dancers,
        unmatchedCount: unmatchedCount,
        musicLink: r['Music Link'],
        costumeNotes: r['Costume Notes'],
        makeupNotes: r['Makeup Notes'],
        rehearsalVideoLink: r['Rehearsal Video Link'],
        otherNotes: r['Other Notes']
      };
    });
}
