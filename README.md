# 🗾 Nijouzu - Japanese Learning Web App

A full-stack Japanese learning application.

## Tech Stack So Far

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: FastAPI

## Project Structure So Far

```
nijouzu/
├── frontend/          # Next.js application
├── backend/           # FastAPI application
```

## Development Setup

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/BobbyJgithub/nijouzu.git
   cd nijouzu
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   cp frontend/.env.local.example frontend/.env.local
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Learning Features (Planned)

- [ ] Hiragana/Katakana character learning
- [ ] Vocabulary management with spaced repetition
- [ ] Kanji recognition and learning
- [ ] Grammar lessons and exercises
- [ ] Progress tracking and analytics

## Testing

```bash
# Run all tests
npm run test

# Frontend tests only
npm run test:frontend

# Backend tests only  
npm run test:backend
```

## Deployment

Coming Soon