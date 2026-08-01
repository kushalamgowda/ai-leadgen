# AI LeadGen Platform

AI-powered lead generation platform that extracts business information from websites, enriches data using Gemini AI, calculates lead scores, and provides analytics dashboards.

## Features

- Website scraping using Playwright
- AI-powered lead enrichment with Gemini AI
- Lead scoring system
- Analytics dashboard
- FastAPI REST backend
- React frontend
- SQLite database integration
- Vercel + Render deployment

## Tech Stack

Frontend:
- React
- Axios
- Tailwind CSS

Backend:
- FastAPI
- SQLAlchemy
- Playwright
- Gemini AI

Database:
- SQLite

Deployment:
- Vercel
- Render

---

## Architecture

React Frontend
↓
FastAPI Backend
↓
Playwright Web Scraping
↓
Gemini AI Enrichment
↓
SQLite Database

---

## Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Generate Lead

![Generate Lead](screenshots/generate-lead.png)

### Lead Results

![Lead Results](screenshots/lead-results.png)

### Analytics

![Analytics](screenshots/analytics.png)

---

## Installation

### Clone Repository

```bash
git clone https://github.com/kushalamgowda/ai-leadgen.git
cd ai-leadgen
```

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Deployment

Frontend:
Vercel

Backend:
Render

---

## Author

Kushala Manjunath Gowda
