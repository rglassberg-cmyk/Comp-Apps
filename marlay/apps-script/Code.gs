/**
 * Marlay dances feed for "Tate Academy - Dances Info 2026-2027".
 *
 * Lives in the sheet (Extensions → Apps Script) and is deployed as a web app:
 *   Execute as: Me    Who has access: Anyone
 * The site fetches the /exec URL and gets JSON back. The sheet itself stays private.
 *
 * This copy is kept in the Comp-Apps repo. It's pushed to the sheet with clasp (script ID
 * 1dTozdydHMoyiHjYDggbvFe6aVFKT3AAZ2iBCLdOFTLR8xOi6fqgMBw5J), with __FIREBASE_WEB_KEY__
 * swapped for STUDIO.auth.firebase.apiKey from data/config.js on the way. The /exec URL
 * keeps serving the old code until a new version is deployed to the existing deployment
 * (clasp deploy -i <deployment ID>, or Deploy → Manage deployments → New version).
 *
 * Privacy: the /exec URL is public, so this returns display names only (and, with
 * LOGIN_REQUIRED on, nothing at all without a signed-in, listed parent). The Roster's
 * "Full name" column is only used to match photo file names and is never sent, and any
 * name in a Dancers cell that isn't on the Roster is dropped (counted in `unmatchedCount`)
 * rather than passed through, in case someone types a full name by mistake.
 *
 * Meet the Dancers: blurbs (Roster "Blurb" column) and photos (the "Tate app photos" Drive
 * folder, PHOTO_FOLDER_ID) go only to signed-in, listed families. A photo matches a dancer
 * when its file name is their Roster full name ("Ava Khan.jpg"); a file with "group" in its
 * name is a group photo for the groups it names ("Petite:Mini Group.jpg"). Photos are sent
 * as small data URLs in a separate request ({token, want: 'photos'}) so the main feed stays
 * fast.
 *
 * Dancers dropdown: the Dances tab's Dancers column is a multi-select chip dropdown
 * (Roster display names; "X group" options were dropped because a group pulls in dancers
 * who join later). It is NOT rebuilt by this script: Google's public
 * Sheets API (used by Apps Script, UrlFetchApp and the Sheets advanced service alike)
 * silently drops `allowMultipleSelections` and `customUiMode`, so any script rebuild
 * turns multi-select off. Names typed into a Dancers cell still reach the site as long
 * as they're on the Roster; the dropdown list itself is refreshed outside this script
 * (the Google Sheets connector honors both settings).
 */

const GROUPS = ['Petite', 'Mini', 'Junior', 'Teen', 'Advanced'];
const PHOTO_FOLDER_ID = '1V2TC9lKnnObgrwzgHbibXImePbYuw1-h';

// An installable onEdit trigger from an earlier version still points here. It used to
// rebuild the Dancers dropdown; it now does nothing (see the note above).
function onRosterEdit(e) {}

// Parent login. The site signs people in with Firebase (Google or an emailed link) and
// POSTs the resulting ID token here; doPost checks it with Firebase and looks the email up
// in the "Parents" tab (Email, Dancers, Role: Parent, Dancer or Staff). LOGIN_REQUIRED has
// been on since 2026-10-21, so a plain GET returns nothing. Turning it off (push and deploy
// a new version) reopens the feed; set STUDIO.auth.required in the site config to match.
const LOGIN_REQUIRED = true;
// The site's Firebase web key (also in the site's public config.js). It's restricted to the
// sign-in APIs and to the site's referrers, so the lookup below sends the site as Referer.
const FIREBASE_WEB_KEY = '__FIREBASE_WEB_KEY__';
const SITE_ORIGIN = 'https://rglassberg-cmyk.github.io/';

function doGet() {
  if (LOGIN_REQUIRED) return json({ authorized: false, reason: 'signin' });
  return json(feed());
}

function doPost(e) {
  let token = '', want = '';
  try { const req = JSON.parse(e.postData.contents); token = req.token || ''; want = req.want || ''; } catch (err) {}
  const email = verifiedEmail(token);
  if (!email) return json({ authorized: false, reason: 'signin' });
  const entry = readParents(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Parents'))
    .find(p => p.email === email);
  if (!entry) return json({ authorized: false, reason: 'not-listed', email: email });
  if (want === 'photos') return json(Object.assign({ authorized: true }, photos()));
  const body = feed();
  const blurbs = new Map(readRoster(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Roster'))
    .map(d => [d.name, d.blurb]));
  body.roster.forEach(d => { d.blurb = blurbs.get(d.name) || ''; });
  body.authorized = true;
  body.email = email;
  body.role = entry.role;
  body.myDancers = entry.dancers.filter(n => body.roster.some(r => r.name === n));
  return json(body);
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

function feed() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const roster = readRoster(ss.getSheetByName('Roster'));
  const dances = readDances(ss.getSheetByName('Dances'), roster);
  return {
    updated: new Date().toISOString(),
    roster: roster.map(d => ({ name: d.name, group: d.group })),
    dances: dances
  };
}

// Firebase ID token → its verified email (lowercase), or null. Results are cached for the
// token's remaining life (ID tokens last an hour) so a page load costs one lookup at most.
function verifiedEmail(token) {
  if (!token || token.length > 4096) return null;
  const cache = CacheService.getScriptCache();
  const key = 'tok:' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, token));
  const hit = cache.get(key);
  if (hit) return hit;
  const res = UrlFetchApp.fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + FIREBASE_WEB_KEY, {
    method: 'post',
    contentType: 'application/json',
    headers: { Referer: SITE_ORIGIN },
    payload: JSON.stringify({ idToken: token }),
    muteHttpExceptions: true
  });
  if (res.getResponseCode() !== 200) return null;
  const user = (JSON.parse(res.getContentText()).users || [])[0];
  if (!user || !user.email || !user.emailVerified) return null;
  const email = user.email.trim().toLowerCase();
  cache.put(key, email, 3000); // 50 minutes, inside the token's 1-hour life
  return email;
}

// One-time setup, run by hand from the Apps Script editor (Run → createParentForm).
// Makes the "Meet the Dancers" parent form and sends its answers to a "Parent Form" tab in
// this sheet. doGet never reads that tab: it holds full names and parent emails.
// Running it again just logs the existing form's links instead of making a second form.
function createParentForm() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('PARENT_FORM_ID');
  if (existingId) {
    const existing = FormApp.openById(existingId);
    Logger.log('Already made. Share: ' + existing.getPublishedUrl() + '  Edit: ' + existing.getEditUrl());
    return;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const form = FormApp.create('Tate Academy: Meet the Dancers');
  form.setDescription(
    'Help us all get to know each other! Your answers go on the Dancers page of the Tate ' +
    'Academy app, which will sit behind a parent login. Only your dancer\'s first name ' +
    '(plus a last initial if two dancers share a name) shows on the page.\n\n' +
    'Two dancers in the family? Please fill this out once for each.');
  try { form.setRequireLogin(false); } catch (e) {} // Workspace forms default to sign-in only
  form.setAllowResponseEdits(true);

  form.addTextItem().setTitle('Dancer\'s first and last name').setRequired(true)
    .setHelpText('Only the first name (and last initial if needed) shows on the site.');
  form.addTextItem().setTitle('Your name').setRequired(true);
  form.addTextItem().setTitle('Your email').setRequired(true)
    .setHelpText('We\'ll use this to set up your login for the app. A Google or Gmail address ' +
      'is easiest, but any email works.')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  form.addTextItem().setTitle('Second parent or guardian email (optional)')
    .setHelpText('Add one if another parent should be able to log in too.')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  form.addParagraphTextItem().setTitle('Tell us about your dancer!').setRequired(true)
    .setHelpText('A few sentences: how long they\'ve been dancing, a favorite style or dance, ' +
      'something they love outside the studio, a competition-day ritual... whatever feels like them.');
  const solo = form.addMultipleChoiceItem().setTitle('Is your dancer doing a solo this season?').setRequired(true);

  const genres = ['Jazz', 'Lyrical', 'Contemporary', 'Hip Hop', 'Tap', 'Ballet', 'Musical Theater', 'Acro'];
  const addSolo = label => {
    form.addMultipleChoiceItem().setTitle(label + ' genre').setChoiceValues(genres).showOtherOption(true).setRequired(true);
    form.addTextItem().setTitle(label + ' song name and artist').setRequired(true);
  };

  const onePage = form.addPageBreakItem().setTitle('Solo details');
  addSolo('Solo');
  const twoPage = form.addPageBreakItem().setTitle('Solo details');
  addSolo('Solo 1');
  addSolo('Solo 2');
  // A page break's setGoToPage steers the page *before* it, so this makes the one-solo page submit.
  twoPage.setGoToPage(FormApp.PageNavigationType.SUBMIT);

  solo.setChoices([
    solo.createChoice('No solo this season', FormApp.PageNavigationType.SUBMIT),
    solo.createChoice('Yes, one solo', onePage),
    solo.createChoice('Yes, two solos', twoPage),
    solo.createChoice('Not sure yet', FormApp.PageNavigationType.SUBMIT)
  ]);

  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  const tab = ss.getSheets().find(s => (s.getFormUrl() || '').indexOf(form.getId()) !== -1);
  if (tab) tab.setName('Parent Form');

  props.setProperty('PARENT_FORM_ID', form.getId());
  Logger.log('Share: ' + form.getPublishedUrl() + '  Edit: ' + form.getEditUrl());
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
    .map(r => ({ name: r['Display name'], group: r['Group'], fullName: r['Full name'], blurb: r['Blurb'] }));
}

// Photo file name or Roster full name → a comparable key ("Ava khan.jpg" → "ava khan").
function nameKey(s) {
  return String(s || '').replace(/\.[a-z0-9]+$/i, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

// Every image in the photo folder and its subfolders.
function photoFiles() {
  const out = [];
  const walk = folder => {
    const files = folder.getFiles();
    while (files.hasNext()) {
      const f = files.next();
      if (/^image\//.test(f.getMimeType())) out.push(f);
    }
    const subs = folder.getFolders();
    while (subs.hasNext()) walk(subs.next());
  };
  walk(DriveApp.getFolderById(PHOTO_FOLDER_ID));
  return out;
}

// Dancer photos keyed by display name, plus group photos, as small JPEG data URLs.
// Each resized image is cached (by file ID, last change and size) for six hours.
function photos() {
  const roster = readRoster(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Roster'));
  const byKey = new Map(roster.map(d => [nameKey(d.fullName), d.name]));
  const wanted = [];
  photoFiles().forEach(f => {
    const key = nameKey(f.getName());
    if (/\bgroup\b/.test(key)) {
      const words = { Advanced: 'advanced|adv|seniors?' }; // Tabitha's list says ADV
      const groups = GROUPS.filter(g =>
        new RegExp('\\b(' + (words[g] || g.toLowerCase() + 's?') + ')\\b').test(key));
      if (groups.length) wanted.push({ file: f, size: 1000, groups: groups });
    } else if (byKey.has(key)) {
      wanted.push({ file: f, size: 480, dancer: byKey.get(key) });
    }
  });

  const cache = CacheService.getScriptCache();
  const cacheKey = w => 'ph:' + w.file.getId() + ':' + w.file.getLastUpdated().getTime() + ':' + w.size;
  const hits = cache.getAll(wanted.map(cacheKey));
  const misses = wanted.filter(w => !hits[cacheKey(w)]);
  const token = ScriptApp.getOAuthToken();
  const responses = UrlFetchApp.fetchAll(misses.map(w => ({
    url: 'https://drive.google.com/thumbnail?sz=w' + w.size + '&id=' + w.file.getId(),
    headers: { Authorization: 'Bearer ' + token },
    muteHttpExceptions: true
  })));
  misses.forEach((w, i) => {
    const res = responses[i];
    const ok = res.getResponseCode() === 200 && /^image\//.test(res.getHeaders()['Content-Type'] || '');
    const blob = ok ? res.getBlob() : w.file.getThumbnail();
    if (!blob) return;
    const url = 'data:' + (blob.getContentType() || 'image/jpeg') + ';base64,' + Utilities.base64Encode(blob.getBytes());
    hits[cacheKey(w)] = url;
    if (url.length < 95000) cache.put(cacheKey(w), url, 21600);
  });

  const dancers = {};
  const groupPhotos = [];
  wanted.forEach(w => {
    const url = hits[cacheKey(w)];
    if (!url) return;
    if (w.dancer) dancers[w.dancer] = url;
    else groupPhotos.push({ groups: w.groups, photo: url });
  });
  return { photos: dancers, groupPhotos: groupPhotos };
}

// Parents tab: one row per email. Dancers is a comma-separated list of Roster display
// names (siblings get several); Role is Parent or Staff.
function readParents(sheet) {
  if (!sheet) return [];
  return readRows(sheet)
    .filter(r => r['Email'])
    .map(r => ({
      email: r['Email'].toLowerCase(),
      dancers: (r['Dancers'] || '').split(',').map(s => s.trim()).filter(Boolean),
      role: r['Role'] || 'Parent'
    }));
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
        songArtist: r['Song Artist'],
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
