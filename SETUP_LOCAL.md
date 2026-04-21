# Local Development Setup Guide

This document explains how to run the AXATube project in full local mode.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local installation or MongoDB Community Server)
- **npm** or **yarn**

---

## Installation Steps

### 1. Install MongoDB Locally

**Option A: Windows Installation**
```bash
# Download MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# Install it and ensure MongoDB service is running
```

**Option B: Using Docker (Recommended)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option C: Verify MongoDB is running**
```bash
# Test connection on default port
mongosh mongodb://localhost:27017
```

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Use local environment variables
# Copy .env.local to .env for local development
cp .env.local .env

# OR manually create/update .env with content from .env.local
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Use local environment variables
cp .env.local .env
```

---

## Running the Application

### Option 1: Run Both Servers Simultaneously (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd Backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend Server:**
```bash
cd Frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

### Option 2: Run Sequentially

```bash
# Start Backend first
cd Backend
npm run dev

# In another terminal, start Frontend
cd Frontend
npm run dev
```

---

## Important Configuration Files

### Backend (.env)
- **PORT**: Local backend port (default: 5000)
- **MONGODB_URI**: Local MongoDB connection string
- **DB_NAME**: Local database name
- **CORS_ORIGIN**: Frontend URL for CORS policy
- **NODE_ENV**: Set to `development`

### Frontend (.env.local)
- **VITE_API_BASE_URL**: Backend API base URL (http://localhost:5000/api/v1)

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running on your system
```bash
# Windows: Check MongoDB service status
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Docker: docker start mongodb
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Change PORT in Backend/.env to an available port (e.g., 5001)

### Frontend Can't Connect to Backend
**Solution**: Verify VITE_API_BASE_URL in Frontend/.env matches Backend's actual URL and port

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Environment Variable Migration

### From Production to Local

| Setting | Production | Local |
|---------|-----------|-------|
| MongoDB URI | Cloud Atlas | localhost:27017 |
| Database | AKTUBE | aktube_local |
| Port | 4500 | 5000 |
| CORS Origin | vercel.app | localhost:5173 |
| Frontend URL | Deployed | localhost:5173 |
| NODE_ENV | production | development |

---

## Default Access Points

Once everything is running:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/v1
- **MongoDB Local**: mongodb://localhost:27017

---

## Database Seeding (Optional)

If you need test data:
```bash
# This will create collections with sample data
# Add seed script in Backend/src/seed.js if needed
node src/seed.js
```

---

## Switching Back to Production

To switch back to production after local testing:

```bash
# Backend
cp .env.prod .env  # or use your production .env file

# Frontend
# Update .env with production API URL
```

---

## Quick Start Script

Save as `start-local.sh` (Mac/Linux) or `start-local.bat` (Windows):

### For Mac/Linux (start-local.sh):
```bash
#!/bin/bash
echo "Starting AXATube Local Development..."
echo "Make sure MongoDB is running!"
sleep 2

# Start Backend
cd Backend
npm run dev &
BACKEND_PID=$!

# Start Frontend
cd ../Frontend
npm run dev &
FRONTEND_PID=$!

echo "Backend running on http://localhost:5000"
echo "Frontend running on http://localhost:5173"
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt
wait
```

### For Windows (start-local.bat):
```batch
@echo off
echo Starting AXATube Local Development...
echo Make sure MongoDB is running!
timeout /t 2

start cmd /k "cd Backend && npm run dev"
start cmd /k "cd Frontend && npm run dev"

echo Backend running on http://localhost:5000
echo Frontend running on http://localhost:5173
pause
```

---

## Notes

- Keep `.env` files out of version control (add to .gitignore)
- `.env.local` files are safe to commit as they contain local defaults
- Production credentials in `.env.prod` should NEVER be committed
- Use nodemon for auto-reload on backend changes (included in dependencies)
- Vite provides hot module replacement (HMR) for frontend changes

---

## Support

If you encounter issues:
1. Check MongoDB is running
2. Verify all ports are available
3. Clear node_modules and reinstall dependencies
4. Check console for detailed error messages
5. Review CORS configuration if API calls fail
