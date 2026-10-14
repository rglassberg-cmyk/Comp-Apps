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
 * Dancers dropdown: the Dances tab's Dancers column is a multi-select chip dropdown
 * (groups plus Roster display names). It is NOT rebuilt by this script: Google's public
 * Sheets API (used by Apps Script, UrlFetchApp and the Sheets advanced service alike)
 * silently drops `allowMultipleSelections` and `customUiMode`, so any script rebuild
 * turns multi-select off. Names typed into a Dancers cell still reach the site as long
 * as they're on the Roster; the dropdown list itself is refreshed outside this script
 * (the Google Sheets connector honors both settings).
 */

const GROUPS = ['Petite', 'Mini', 'Junior', 'Teen', 'Senior'];

// An installable onEdit trigger from an earlier version still points here. It used to
// rebuild the Dancers dropdown; it now does nothing (see the note above).
function onRosterEdit(e) {}

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
