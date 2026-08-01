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

<img width="1906" height="1028" alt="leadgen-dashboard png" src="https://github.com/user-attachments/assets/a95cb191-c7bb-4e2e-9814-cdf5a9a23ae4" />



### Generate Lead

<img width="1221" height="876" alt="Screenshot 2026-07-31 214957" src="https://github.com/user-attachments/assets/4d238dc8-a8ab-4529-aaee-03b52f3a84ff" />


### Analytics


<img width="1913" height="1023" alt="leadgen-analytics png" src="https://github.com/user-attachments/assets/9cbbd714-cc47-428e-b490-28006eca6020" />



### Lead Results

<img width="1917" height="1020" alt="leadgen-ai-email png" src="https://github.com/user-attachments/assets/74e0bdb0-b14c-46e6-ac52-c7db55e4600c" />


### Lead email

<img width="1918" height="1031" alt="leadgen-edit png" src="https://github.com/user-attachments/assets/b530ee4a-c243-4f17-b918-b9a784664ca7" />

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

https://ai-leadgen-seven.vercel.app/

Backend:
Render

https://ai-leadgen-gpb5.onrender.com
---

Health Check:

https://ai-leadgen-gpb5.onrender.com/health

---
## Author

Kushala Manjunath Gowda
