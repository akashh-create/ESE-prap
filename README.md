# Candidate Shortlisting System

A split full-stack project with an Express/MongoDB backend and React frontend. It supports candidate management, basic skill matching, OpenRouter-powered AI ranking, match score charts, candidate search, AI interview questions, and saved shortlists.

## Project Structure

```text
backend/
  src/
    controllers/
    models/
    routes/
    services/
frontend/
  src/
    components/
    services/
```

## Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Set these values in `backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/candidate_shortlisting
FRONTEND_URL=http://localhost:5173
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-5.2
```

## Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Set this in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

## API Endpoints

```http
POST /api/candidates
GET /api/candidates
POST /api/match
POST /api/ai/shortlist
POST /api/shortlists
GET /api/shortlists
```

## Deployment Notes

- Deploy `backend/` to Render, Railway, Fly.io, or any Node host.
- Deploy `frontend/` to Vercel, Netlify, or any static host.
- Use MongoDB Atlas for production `MONGODB_URI`.
- Set `FRONTEND_URL` on the backend to the deployed frontend URL.
- Set `VITE_API_URL` on the frontend to the deployed backend `/api` URL.

### Render Backend Settings

Use these settings when deploying the backend service on Render:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Add these environment variables in Render:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=https://your-frontend-domain.com
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-5.2
```

Do not set `PORT` on Render. Render injects it automatically.

# ESE-prap
