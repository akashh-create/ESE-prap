# AI-Based Employee Performance Analytics & Recommendation System

Full-stack MERN application for HR/Admin users to manage employees, track skills and performance, view analytics, and generate AI-powered promotion/training recommendations using an OpenRouter/OpenAI-compatible API.

## Features

- JWT signup/login authentication
- Password hashing with bcrypt
- Protected employee and AI routes
- Employee registration, update, delete, list, search, and filtering
- MongoDB schema validation and duplicate email handling
- AI recommendations for promotion readiness, employee ranking, training suggestions, and feedback
- Responsive React dashboard with chart-based analytics

## Project Structure

```text
backend/
  index.js
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
frontend/
  src/
    components/
    services/
docs/
  PROJECT_REPORT.md
  API_TEST_CASES.md
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
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret
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
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
POST /api/employees
GET /api/employees
GET /api/employees/search?department=Development
PUT /api/employees/:id
DELETE /api/employees/:id
POST /api/ai/recommend
```

Protected routes require:

```http
Authorization: Bearer JWT_TOKEN
```

## Render Backend Settings

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Add these environment variables in Render:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=replace_with_a_long_random_secret
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-5.2
```

Do not set `PORT` on Render. Render injects it automatically.

## Frontend Deployment

Deploy `frontend/` on Render Static Site, Vercel, or Netlify.

```text
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

Set:

```env
VITE_API_URL=https://your-backend-service.onrender.com/api
```

## GitHub

Repository: https://github.com/akashh-create/ESE-prap
