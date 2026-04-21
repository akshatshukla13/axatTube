# 🎬 AXATube Local Development Setup

A complete local development environment for the AXATube project - Full-stack YouTube-like application with React frontend and Node.js backend.

---

## 📋 What's Been Set Up

✅ **Local Environment Files Created:**
- `Backend/.env` - Configured for local MongoDB (port 5000)
- `Backend/.env.local` - Local defaults
- `Backend/.env.prod` - Production reference
- `Frontend/.env` - Configured for local backend API
- `Frontend/.env.local` - Local defaults

✅ **Startup Scripts Created:**
- `start-local.bat` - Windows: Click to start everything
- `start-local.sh` - Mac/Linux: Run both servers
- `migrate.bat` - Windows: Switch between local/prod
- `migrate.sh` - Mac/Linux: Switch between local/prod

✅ **Documentation Created:**
- `QUICK_START.md` - 5-minute setup guide
- `SETUP_LOCAL.md` - Detailed setup & troubleshooting
- `verify-setup.js` - Automated setup checker
- `.gitignore.local` - What NOT to commit

---

## 🚀 Quick Start (Choose One)

### Option 1: Super Quick (Windows) ⚡
```cmd
# 1. Make sure MongoDB is running (see below)
# 2. Double-click this file from the root directory:
start-local.bat

# 3. Open browser to:
# Frontend: http://localhost:5173
# Backend: http://localhost:5000/api/v1
```

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd Backend
npm install
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 📦 Prerequisites (One-time Setup)

### 1. Node.js & npm
- Download: https://nodejs.org
- Verify: `node --version` and `npm --version`

### 2. MongoDB (Choose One)

**Option A: MongoDB Community (Recommended)**
- Download: https://www.mongodb.com/try/download/community
- Follow installer instructions
- Verify: `mongosh` command should work in terminal

**Option B: Docker (If you have Docker)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
docker start mongodb  # To restart later
```

**Option C: Verify Connection**
```bash
mongosh mongodb://localhost:27017
# Should connect successfully
```

---

## ⚙️ Configuration Details

### Backend Configuration (`.env`)
```
PORT=5000                                    # API server port
MONGODB_URI=mongodb://localhost:27017/aktube # Local database
DB_NAME=aktube_local                        # Database name
CORS_ORIGIN=http://localhost:5173          # Frontend URL
CLOUDINARY_*                                # Image upload service
ACCESS_TOKEN_*                              # JWT configuration
NODE_ENV=development                        # Development mode
```

### Frontend Configuration (`.env`)
```
VITE_BACKEND_URL=http://localhost:5000/api/v1
NODE_ENV=development
```

---

## 🔄 Switching Environments

### To Production:
```bash
migrate.bat prod    # Windows
./migrate.sh prod   # Mac/Linux
```

### Back to Local:
```bash
migrate.bat local   # Windows
./migrate.sh local  # Mac/Linux
```

---

## ✅ Verify Your Setup

Run the automated checker:
```bash
node verify-setup.js
```

This checks:
- ✓ Directory structure
- ✓ Configuration files
- ✓ Dependencies installed
- ✓ Node.js and npm
- ✓ MongoDB connection

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| **QUICK_START.md** | 5-minute quick setup (Recommended first read) |
| **SETUP_LOCAL.md** | Detailed setup guide with troubleshooting |
| **This file** | Overview and navigation |

---

## 🆘 Troubleshooting

### MongoDB Won't Start
```bash
# Windows Service
net start MongoDB

# Docker
docker start mongodb

# Manual check
mongosh mongodb://localhost:27017
```

### Port Already in Use
- Backend: Edit `Backend/.env` and change `PORT` to 5001
- Frontend: Vite auto-increments (5174, 5175, etc.)

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### More Help
See **SETUP_LOCAL.md** for detailed troubleshooting

---

## 🎯 Development Workflow

1. **Start servers:**
   - Windows: Run `start-local.bat`
   - Mac/Linux: Run `./start-local.sh`

2. **Edit code:**
   - Backend changes reload automatically (nodemon)
   - Frontend changes reload automatically (Vite HMR)

3. **View changes:**
   - Frontend: http://localhost:5173
   - API: http://localhost:5000/api/v1

4. **Debug:**
   - Browser DevTools (Frontend)
   - Backend console logs
   - VS Code debugger

---

## 📁 Project Structure

```
axatTube/
├── Backend/                 # Express.js API
│   ├── .env                # ⚠️  Local config (DO NOT commit)
│   ├── .env.local          # ✓ Safe to commit
│   ├── .env.prod           # Reference only
│   ├── src/
│   │   ├── index.js       # Entry point
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API endpoints
│   │   ├── middlewares/   # Auth, uploads
│   │   └── utils/         # Helpers
│   └── package.json
│
├── Frontend/                # React + Vite
│   ├── .env                # ⚠️  Local config (DO NOT commit)
│   ├── .env.local          # ✓ Safe to commit
│   ├── src/
│   │   ├── App.jsx        # Main app
│   │   ├── main.jsx       # Entry point
│   │   ├── components/    # React components
│   │   ├── app/           # Redux store
│   │   └── utils/         # Helpers
│   └── package.json
│
├── start-local.bat         # 🟢 Windows: Start everything
├── start-local.sh          # 🟢 Mac/Linux: Start everything
├── migrate.bat             # Switch environments (Windows)
├── migrate.sh              # Switch environments (Mac/Linux)
├── verify-setup.js         # Check setup status
├── QUICK_START.md          # Quick guide (READ THIS FIRST)
└── SETUP_LOCAL.md          # Detailed guide
```

---

## 🔐 Security Checklist

- [ ] Added `.env` to `.gitignore` (DO NOT commit)
- [ ] `.env.local` can be committed (contains only defaults)
- [ ] Never commit `.env.prod` with real credentials
- [ ] Use environment variables for all secrets
- [ ] Production credentials on platform (Vercel, server, etc.)

---

## 📚 Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB
- Mongoose ODM
- JWT Authentication
- Cloudinary (Image uploads)

**Frontend:**
- React 18
- Vite (Build tool)
- Redux Toolkit (State management)
- Tailwind CSS (Styling)
- React Router (Navigation)
- Axios (HTTP client)

---

## 🚀 Next Steps

1. **Read:** `QUICK_START.md` (5 minutes)
2. **Setup:** Install MongoDB (if not done)
3. **Run:** Double-click `start-local.bat` or run startup scripts
4. **Develop:** Edit code in `Backend/src` and `Frontend/src`
5. **Commit:** Remember to exclude `.env` files

---

## 💡 Tips & Tricks

- Use VS Code's integrated terminal (Ctrl+~)
- Split terminal for Backend and Frontend
- Keyboard shortcut: Ctrl+Shift+D opens debug panel
- Check browser DevTools for frontend issues
- Check backend console for API issues

---

## 📞 Support

If you encounter issues:

1. **Check .gitignore** - Make sure .env is ignored
2. **Read error messages** - They're usually helpful
3. **See SETUP_LOCAL.md** - Has troubleshooting section
4. **Run verify-setup.js** - Check system readiness
5. **Check MongoDB** - Most common issue

---

## 📝 File Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Created/Ready |
| 🟢 | Click to run |
| ⚠️ | Be careful (secrets) |
| ✓ | Safe to commit |
| ❌ | Do NOT commit |

---

**Last Updated:** April 2026

**Status:** ✅ Ready for local development

Start with: `QUICK_START.md` → Run: `start-local.bat` → Develop: Edit code → Enjoy! 🎉
