# PRD - Portfolio Leopold Mols

## Problem Statement
Portfolio professionnel complet pour Leopold Mols (Project Manager, Technical Manager, CTO, Developer). Site vitrine montrant projets termines/en cours, projets academiques identifies, CV PDF, formulaire de contact, dark mode.

## Architecture
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Framer Motion + React Router
- **Backend**: FastAPI + Motor (async MongoDB) + Pydantic
- **Database**: MongoDB (collection contact_requests)
- **Data Source**: JSON file (/backend/data/projects.json)

## User Personas
1. **Recruteur/Client**: Cherche un profil technique senior, veut voir competences + projets
2. **Collaborateur potentiel**: Veut evaluer capacites techniques et management
3. **Leopold Mols**: Veut maintenir facilement son portfolio (ajouter projets, modifier infos)

## Core Requirements
- [x] Hero avec nom, roles animes, CTAs
- [x] 8 projets demo (3 pro termines, 2 en cours, 3 academiques)
- [x] Filtres projets (statut, type, academique/professionnel)
- [x] Badges visuels (Termine, En cours, Academique)
- [x] Pages detail projet avec sections (contexte, objectifs, archi, management)
- [x] About avec competences techniques, management, processus
- [x] CV PDF viewer + telechargement
- [x] Formulaire contact MongoDB + honeypot + rate limiting
- [x] Dark/Light mode (preferences systeme + toggle + localStorage)
- [x] Responsive mobile/tablette/desktop
- [x] Donnees modifiables sans toucher au code (projects.json + site.ts)
- [x] README complet

## What's Been Implemented (2026-03-03)
- Full React SPA with 6 pages (Home, Projects, ProjectDetail, About, CV, Contact)
- FastAPI backend with modular routes/schemas
- MongoDB contact storage with Pydantic validation
- Anti-spam: honeypot + rate limiting (5 req/min/IP)
- Dark/Light mode with system preference detection
- Project filters (status, type, academic/professional)
- CV PDF placeholder with viewer iframe
- Comprehensive README with all instructions

## Testing Results
- Backend: 100% (7/7 endpoints)
- Frontend: 95% (19/20 tests, 1 Playwright automation issue - not actual bug)

## Prioritized Backlog
### P0 (Done)
- All core features implemented and tested

### P1 (Next)
- Add real project images/screenshots
- Replace CV placeholder with actual CV
- Replace placeholder links (GitHub, GitLab, LinkedIn)
- Add meta tags per page for SEO
- Add 404 page

### P2 (Future)
- Playwright smoke tests
- Blog/articles section
- Project image gallery on detail pages
- i18n (FR/EN)
- Analytics integration
- Contact form email notifications (SMTP)
- Sitemap generation
