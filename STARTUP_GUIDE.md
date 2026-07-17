# Guide de Démarrage - SportSee

## Structure du Projet

```
Dashboard de sport avec React et React Router/
├── app/                  # Backend (Express.js)
│   ├── index.js          # Point d'entrée du backend (port 8000)
│   ├── routes.js         # Routes API
│   └── ...
├── sportsee-frontend/    # Frontend (React)
│   ├── src/              # Code source React
│   ├── package.json      # Dépendances frontend
│   └── ...
├── start-dev.bat         # Script Windows (2 fenêtres)
├── start-dev-concurrently.bat  # Script Windows (1 fenêtre)
└── package.json          # Dépendances backend
```

## Prérequis

- [Node.js](https://nodejs.org/) (v16+) installé
- npm ou yarn
- Windows (pour les fichiers .bat) ou adaptateur pour autres OS

## Installation

### 1. Installer les dépendances

```bash
# Dans le dossier racine (backend)
npm install

# Dans le dossier frontend
cd sportsee-frontend
npm install
cd ..
```

## Démarrage

### Option 1: Deux fenêtres séparées (recommandé)

Double-cliquez sur **`start-dev.bat`**
- Une fenêtre pour le backend (port 8000)
- Une fenêtre pour le frontend (port 3000)

### Option 2: Une seule fenêtre (nécessite concurrently)

```bash
# Installer concurrently globalement
npm install -g concurrently

# Puis double-cliquez sur start-dev-concurrently.bat
```

Ou depuis le terminal :
```bash
# Dans le dossier racine
concurrently "node app/index.js" "cd sportsee-frontend && npm start"
```

### Option 3: Manuellement

**Backend:**
```bash
node app/index.js
# ou pour le mode développement (avec restart auto)
npm run dev
```

**Frontend (dans un autre terminal):**
```bash
cd sportsee-frontend
npm start
```

## Accès

- **Backend API**: http://localhost:8000
- **Frontend**: http://localhost:3000

## Points d'API Backend

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/login | Connexion utilisateur |
| GET | /api/user-info | Infos utilisateur |
| GET | /api/user-activity | Activités utilisateur |

## Configuration Frontend

Le frontend est configuré pour se connecter à `http://localhost:8000` par défaut.

## Résolution des problèmes

### Le frontend ne se connecte pas au backend ?

Vérifiez que le backend est bien lancé sur le port 8000 et que le CORS est activé.

### Port déjà utilisé ?

Si le port 3000 ou 8000 est déjà utilisé, modifiez-le dans :
- Backend: `app/index.js` (variable `port`)
- Frontend: `sportsee-frontend/package.json` (script start) ou créez un fichier `.env` avec `PORT=3001`

### Erreur de dépendances manquantes ?

Exécutez `npm install` dans chaque dossier (racine et sportsee-frontend).

## Scripts NPM Disponibles

### Backend (dossier racine)

```bash
npm run dev      # Démarre avec nodemon (restart auto)
npm start        # Démarre le serveur
```

### Frontend (dossier sportsee-frontend)

```bash
npm start         # Démarre l'app en développement
npm run build     # Crée une build de production
npm test          # Exécute les tests
```
