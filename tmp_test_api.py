import json, urllib.request
base='http://127.0.0.1:3000'

req = urllib.request.Request(f'{base}/auth/login', data=json.dumps({'email':'admin@local','password':'Admin123!'}).encode(), headers={'Content-Type':'application/json'}, method='POST')
with urllib.request.urlopen(req) as r:
    login = json.load(r)
print('LOGIN', json.dumps(login, indent=2))

token = login['access_token']
headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

req = urllib.request.Request(f'{base}/users', headers={'Authorization': f'Bearer {token}'}, method='GET')
with urllib.request.urlopen(req) as r:
    users = json.load(r)
print('USERS', json.dumps(users, indent=2))

payload = json.dumps({'title':'Séance de test','description':'Session créée depuis l’API','date':'2026-07-05T10:00:00.000Z','durationMinutes':60}).encode()
req = urllib.request.Request(f'{base}/sessions', data=payload, headers=headers, method='POST')
with urllib.request.urlopen(req) as r:
    session = json.load(r)
print('SESSION', json.dumps(session, indent=2))

payload = json.dumps({'amount':150.5,'currency':'EUR','userEmail':'admin@local'}).encode()
req = urllib.request.Request(f'{base}/payments', data=payload, headers=headers, method='POST')
with urllib.request.urlopen(req) as r:
    payment = json.load(r)
print('PAYMENT', json.dumps(payment, indent=2))
