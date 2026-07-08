# Coaching sportif backend

API NestJS pour gérer les utilisateurs, sessions et paiements d’un coaching sportif.

## Prérequis

- Node.js 20+
- npm

## Installation

```bash
npm install --legacy-peer-deps
```

## Seed admin

```bash
npm run seed
```

Compte créé par défaut :
- email : admin@local
- mot de passe : Admin123!

## Démarrage

```bash
npm run start:dev
```

L’API démarre sur http://localhost:3001.

## Authentification

Toutes les routes protégées attendent un header `Authorization: Bearer <token>`.

### 1) Login

Endpoint : `POST /auth/login`

Corps JSON :

```json
{
  "email": "admin@local",
  "password": "Admin123!"
}
```

Exemple Postman / Insomnia :
- Méthode : POST
- URL : http://localhost:3001/auth/login
- Headers : `Content-Type: application/json`
- Body : raw JSON

Réponse attendue :

```json
{
  "access_token": "<jwt>",
  "user": {
    "id": "...",
    "name": "Admin",
    "email": "admin@local",
    "role": "admin"
  }
}
```

### 2) Utilisateurs

Endpoint : `GET /users`

Exemple Postman / Insomnia :
- Méthode : GET
- URL : http://localhost:3001/users
- Headers :
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

### 3) Sessions

Endpoint : `POST /sessions`

Corps JSON :

```json
{
  "title": "Séance de test",
  "description": "Session créée depuis l’API",
  "date": "2026-07-05T10:00:00.000Z",
  "durationMinutes": 60
}
```

Exemple Postman / Insomnia :
- Méthode : POST
- URL : http://localhost:3001/sessions
- Headers :
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- Body : raw JSON

### 4) Payments

Endpoint : `POST /payments`

Corps JSON :

```json
{
  "amount": 150.5,
  "currency": "EUR",
  "userEmail": "admin@local"
}
```

Exemple Postman / Insomnia :
- Méthode : POST
- URL : http://localhost:3001/payments
- Headers :
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- Body : raw JSON

## Frontend

Le frontend React (dossier `coaching-sportif-frontend`) consomme ces endpoints :

- `POST /auth/login` pour l’authentification
- `GET /users` et `POST /users` pour les utilisateurs
- `GET /sessions` et `POST /sessions` pour les séances
- `GET /payments` et `POST /payments` pour les paiements
- `GET /weather/:city` pour la météo

Configuration du frontend :

```env
REACT_APP_API_URL=http://localhost:3001
```

Lancement du frontend :

```bash
cd ../coaching-sportif-frontend
npm install
npm run dev
```

## Endpoints principaux

- `POST /auth/login` - Authentification
- `GET /users` - Liste des utilisateurs (auth requise)
- `POST /users` - Créer un utilisateur (auth requise)
- `POST /sessions` - Créer une session (auth requise)
- `GET /sessions` - Liste des sessions (auth requise)
- `POST /payments` - Créer un paiement (auth requise)
- `GET /payments` - Liste des paiements (auth requise)
- `GET /weather/:city` - Météo actuelle (pas d'auth requise)

## Weather API (OpenWeather)

Récupère la météo actuelle pour une ville donnée.

### Configuration

1. Créez un compte sur [OpenWeather](https://openweathermap.org)
2. Obtenez une API key gratuite
3. Ajoutez-la dans votre `.env` :

```bash
cp .env.example .env
# Éditez .env et remplacez votre_clé_api_openweather par votre vraie clé
```

### Endpoint

`GET http://localhost:3001/weather/{city}`

Exemples :
- `GET /weather/Paris`
- `GET /weather/London`
- `GET /weather/Dakar`

Exemple de réponse JSON (format OpenWeather) :

```json
{
  "name": "Paris",
  "main": { "temp": 25.3, "humidity": 60 },
  "weather": [{ "description": "clear sky" }],
  "wind": { "speed": 3.5 }
}
```

Réponse formatée par l'API :

```json
{
  "city": "Paris",
  "temperature": 22.5,
  "description": "ciel dégagé",
  "humidity": 65,
  "windSpeed": 3.2,
  "source": "OpenWeather"
}
```

## Notes

- Les routes `sessions` et `payments` sont protégées et nécessitent un administrateur pour la création.
- La base de données utilisée par défaut est SQLite, stockée dans le dossier `data/`.

## 📌 Endpoints disponibles

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| /auth/login | POST | Authentification avec email + mot de passe, retourne JWT |
| /users | GET | Liste des utilisateurs |
| /users | POST | Création d’un utilisateur |
| /sessions | GET | Liste des séances |
| /sessions | POST | Création d’une séance |
| /payments | GET | Liste des paiements |
| /payments | POST | Création d’un paiement |
| /weather/:city | GET | Météo en temps réel pour une ville donnée |

Exemple JSON météo :

```json
{
  "name": "Paris",
  "main": { "temp": 25.3, "humidity": 60 },
  "weather": [{ "description": "clear sky" }],
  "wind": { "speed": 3.5 }
}
```

## Bonus

### Dockerisation du backend

Un `Dockerfile` minimal est disponible à la racine du backend :

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start:dev"]
```

Un `.dockerignore` exclut `node_modules`, `dist` et `.env`.

Vérification :

```bash
docker build -t coaching-backend .
docker run -p 3001:3001 coaching-backend
```

Avec `docker-compose.yml` :

```bash
docker compose up
```

### ⚙️ CI/CD avec GitHub Actions

Un workflow est configuré dans `.github/workflows/ci.yml` :
- S’exécute automatiquement sur chaque push ou pull request vers `main`.
- Installe les dépendances (`npm install`).
- Lance la compilation (`npm run build`).
- Exécute les tests (`npm run test`).

👉 Résultat attendu :
Chaque commit est validé par un pipeline automatisé (build + test).

---

### 📖 Documentation interactive avec Swagger

Swagger est intégré dans `main.ts` :
- Accessible via `http://localhost:3001/api/docs`
- Génère automatiquement la documentation des endpoints.
- Supporte l’authentification Bearer JWT.
- Les DTO sont annotés avec `@ApiProperty` pour afficher les exemples.

👉 Résultat attendu :
Une documentation interactive et professionnelle des endpoints, utilisable par l’examinateur pour tester l’API directement.

### ✅ Corrections et Validation

- **Frontend ↔ Backend** : 
  - Les appels API pointent vers `http://localhost:3001` via `REACT_APP_API_URL`.
  - Les options du formulaire envoient désormais `USER` / `COACH` (labels visibles : "Sportif" / "Coach").

- **CORS** :
  - Activé dans `main.ts` avec `origin: http://localhost:3000` et `credentials: true`.

- **Validation DTO** :
  - `@IsEmail()` assoupli avec `require_tld: false` pour accepter `admin@local`.
  - `@MinLength(6)` appliqué au mot de passe (exemple : `GETbest`).

- **Tests Swagger** :
  - `POST /auth/login` avec `admin@local` / `GETbest` → renvoie un JWT valide.
  - `POST /users` avec rôle `USER` ou `COACH` → inscription réussie (HTTP 201).

👉 Résultat attendu :
- Le backend est **robuste, testé et documenté**.
- Les erreurs initiales ("Failed to fetch", rôle invalide) sont corrigées.
- L’examinateur peut vérifier directement via Swagger que tout fonctionne.

## Liens GitHub

- Backend : https://github.com/fredbello12-devs/coaching-sportif-backend.git
- Frontend : https://github.com/fredbello12-devs/coaching-sportif-frontend.git
