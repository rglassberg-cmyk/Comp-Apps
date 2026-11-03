# Publish marlay/ to Firebase Hosting (marlay-calendar.web.app) through the Hosting REST
# API, signed in through ~/.local/bin/gcurl as the personal Gmail that owns the project,
# so the token is never printed. Used because the Firebase CLI here is signed in to the
# SAR account; `firebase deploy --only hosting` with the personal Gmail works too.
# Run from the repo root after merging to main:
#   python3 -I tools/deploy_hosting.py marlay firebase.json
import gzip, hashlib, json, os, subprocess, sys, tempfile

ACCOUNT, PROJECT, SITE = 'beccaglassberg@gmail.com', 'marlay-calendar', 'marlay-calendar'
API = 'https://firebasehosting.googleapis.com/v1beta1'
GCURL = os.path.expanduser('~/.local/bin/gcurl')
env = dict(os.environ, CLOUDSDK_AUTH_ACCESS_TOKEN_FILE='')

def call(url, method='GET', body=None, data_file=None, ctype='application/json'):
    args = [GCURL, ACCOUNT, PROJECT, url, '-X', method]
    if body is not None:
        args += ['-H', 'Content-Type: application/json', '-d', json.dumps(body)]
    if data_file:
        args += ['-H', 'Content-Type: ' + ctype, '--data-binary', '@' + data_file]
    r = subprocess.run(args, capture_output=True, text=True, env=env)
    if r.returncode:
        sys.exit(f'{method} {url.split("?")[0]} failed: {r.stdout[:400]} {r.stderr[:200]}')
    return json.loads(r.stdout) if r.stdout.strip() else {}

root, cfg_path = sys.argv[1], sys.argv[2]
hosting = json.load(open(cfg_path))['hosting']
ignore = hosting.get('ignore', [])

files = {}
tmp = tempfile.mkdtemp()
for dirpath, _, names in os.walk(root):
    for n in names:
        full = os.path.join(dirpath, n)
        rel = os.path.relpath(full, root).replace(os.sep, '/')
        # same rules as firebase.json's ignore list
        if rel.startswith('apps-script/') or n.endswith('.md') or n == '.DS_Store':
            continue
        gz = gzip.compress(open(full, 'rb').read(), mtime=0)
        h = hashlib.sha256(gz).hexdigest()
        open(os.path.join(tmp, h), 'wb').write(gz)
        files['/' + rel] = h

config = {'headers': [{'glob': h['source'], 'headers': {x['key']: x['value'] for x in h['headers']}}
                      for h in hosting.get('headers', [])]}
ver = call(f'{API}/sites/{SITE}/versions', 'POST', {'config': config})
name = ver['name']
pop = call(f'{API}/{name}:populateFiles', 'POST', {'files': files})
need = pop.get('uploadRequiredHashes', [])
for h in need:
    call(f"{pop['uploadUrl']}/{h}", 'POST', data_file=os.path.join(tmp, h), ctype='application/octet-stream')
call(f'{API}/{name}?update_mask=status', 'PATCH', {'status': 'FINALIZED'})
rel = call(f'{API}/sites/{SITE}/releases?versionName={name}', 'POST', {})
print(f'files: {len(files)}, uploaded: {len(need)}, release: {rel.get("name", "?").split("/")[-1]}')
print('\n'.join(sorted(files)))
