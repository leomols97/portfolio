# Leopold Mols — Portfolio Professionnel

Portfolio web professionnel construit avec **React + TypeScript + Tailwind CSS** (frontend) et **FastAPI + MongoDB** (backend).

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | React 18, TypeScript, Tailwind CSS, Framer Motion, React Router |
| Backend | FastAPI, Pydantic, Motor (async MongoDB) |
| Base de donnees | MongoDB |
| Icons | Lucide React |
| Typographie | Bricolage Grotesque, Outfit, JetBrains Mono |

## Architecture

```
/app/
  backend/
    server.py            # Point d'entree FastAPI + middleware
    routes/
      projects.py        # GET /api/projects, GET /api/projects/:id
      contact.py         # POST /api/contact
    schemas/
      contact.py         # Validation Pydantic
    data/
      projects.json      # Donnees projets (source unique)
    .env                 # Variables d'environnement
  frontend/
    public/
      cv.pdf             # CV PDF (placeholder a remplacer)
    src/
      config/site.ts     # Configuration du site (nom, liens, competences)
      context/           # ThemeContext (dark/light mode)
      types/             # Types TypeScript
      components/
        ui/              # StatusBadge, Tag
        layout/          # Navbar, Footer
        features/        # Hero, ProjectCard, FilterBar, ContactForm
      pages/             # Home, Projects, ProjectDetail, About, CV, Contact
```

**Choix architectural** : Separation frontend/backend (SPA + REST API). Le frontend est une Single Page Application React avec routing cote client. Le backend FastAPI sert les donnees projets depuis un fichier JSON et stocke les messages de contact dans MongoDB. Cette architecture permet :
- Modification des projets sans toucher au code (editer `projects.json`)
- Stockage persistant des contacts
- SMTP optionnel configurable

## Prerequis

- Node.js >= 18
- Python >= 3.9
- MongoDB >= 5.0
- yarn

## Installation

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Editer .env avec vos valeurs
```

### Frontend

```bash
cd frontend
yarn install
cp .env.example .env
# Editer .env avec l'URL du backend
```

## Developpement

### Backend
```bash
cd backend
uvicorn server:app --reload --port 8001
```

### Frontend
```bash
cd frontend
yarn start
```

Le site sera disponible sur http://localhost:3000

## Build production

```bash
cd frontend
yarn build
```

Le dossier `build/` contient les fichiers statiques prets a deployer.

## Deploiement

### Option 1 : Vercel (frontend) + service Python (backend)

1. Deployer le frontend sur Vercel :
   ```bash
   cd frontend
   vercel
   ```
2. Deployer le backend sur un serveur avec Docker ou directement avec uvicorn

### Option 2 : Self-hosted (Node + Python)

1. Build le frontend : `cd frontend && yarn build`
2. Servir les fichiers statiques via Nginx
3. Lancer le backend : `uvicorn server:app --host 0.0.0.0 --port 8001`
4. Configurer Nginx pour proxifier `/api` vers le backend

## Configuration SMTP (optionnel)

Le formulaire de contact fonctionne sans SMTP — les messages sont stockes dans MongoDB.
Pour activer l'envoi d'emails, renseignez les variables SMTP dans `backend/.env` :

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASSWORD=votre_mot_de_passe_app
SMTP_FROM=votre@email.com
SMTP_TO=destination@email.com
```

## Comment ajouter un projet

1. Ouvrir `/backend/data/projects.json`
2. Ajouter un nouvel objet au tableau avec les champs suivants :

```json
{
  "id": "mon-nouveau-projet",
  "title": "Mon Nouveau Projet",
  "shortDescription": "Description courte (1-2 lignes)",
  "longDescription": "Description detaillee du projet...",
  "context": "Contexte du projet...",
  "objectives": ["Objectif 1", "Objectif 2"],
  "architecture": "Description de l'architecture...",
  "responsibilities": ["Responsabilite 1", "Responsabilite 2"],
  "stack": ["React", "Python", "Docker"],
  "status": "completed",
  "type": "fullstack",
  "isAcademic": false,
  "date": "2025-01",
  "learnings": "Ce que j'ai appris...",
  "links": { "github": "", "demo": "" },
  "image": ""
}
```

3. Redemarrer le backend (ou recharger la page si hot reload)

### Champs importants :
- **status** : `"completed"` ou `"in_progress"`
- **type** : `"frontend"`, `"backend"`, `"fullstack"`, `"devops"`, `"infra"`
- **isAcademic** : `true` pour un projet academique, `false` pour professionnel

## Comment ajouter un projet academique

Meme procedure que ci-dessus, mais avec `"isAcademic": true`. Le badge "Academique" apparaitra automatiquement sur la carte et la page detail du projet.

## Comment ajouter une section Management

Ajoutez le champ `management` a votre objet projet :

```json
"management": {
  "teamSize": 5,
  "methodology": "Scrum",
  "duration": "6 mois",
  "highlights": ["Point fort 1", "Point fort 2"]
}
```

## Comment remplacer le CV

1. Placez votre fichier PDF dans `/frontend/public/cv.pdf`
2. Le viewer et le bouton de telechargement utiliseront automatiquement le nouveau fichier

## Comment modifier l'identite et les liens

Editez `/frontend/src/config/site.ts` — toutes les informations personnelles sont centralisees dans ce fichier :
- Nom, titre, description
- Email, localisation
- Liens GitHub, GitLab, LinkedIn
- Competences techniques et management
- Bio

## API Documentation

Le backend FastAPI genere automatiquement la documentation OpenAPI :
- Swagger UI : `/docs`
- ReDoc : `/redoc`

### Endpoints

| Methode | Route | Description |
|---------|-------|-------------|
| GET | /api/health | Verification de sante |
| GET | /api/projects | Liste de tous les projets |
| GET | /api/projects/:id | Detail d'un projet |
| POST | /api/contact | Envoi d'un message de contact |

## Fonctionnalites

- Dark/Light mode avec detection des preferences systeme
- Filtres projets par statut, type, et categorie (academique/professionnel)
- Badges visuels distincts (Termine, En cours, Academique)
- Formulaire de contact avec validation + anti-spam (honeypot + rate limiting)
- CV PDF integre avec viewer et telechargement
- Responsive : mobile (360px), tablette (768px), desktop (1024px, 1440px)
- Animations subtiles (Framer Motion)
- Accessibilite : navigation clavier, aria-labels, contrastes corrects
