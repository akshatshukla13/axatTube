# 📄 Quick Reference Card

## 🚀 GET STARTED IN 30 SECONDS

```bash
# 1. Make sure MongoDB is running
mongosh

# 2. Run this file from root directory:
start-local.bat (Windows)
./start-local.sh (Mac/Linux)

# 3. Open browser:
http://localhost:5173
```

---

## 📁 All Files Created

```
✅ Backend/.env                    Local config (active, DO NOT commit)
✅ Backend/.env.local             Local defaults (safe to commit)
✅ Backend/.env.prod              Prod reference (never commit)
✅ Frontend/.env                   Local config (active, DO NOT commit)
✅ Frontend/.env.local            Local defaults (safe to commit)
✅ start-local.bat                 Windows: Start both servers
✅ start-local.sh                  Mac/Linux: Start both servers
✅ migrate.bat                     Windows: Switch local/prod
✅ migrate.sh                      Mac/Linux: Switch local/prod
✅ verify-setup.js                 Check if setup is complete
✅ .gitignore.local                What to commit/not commit
📄 SETUP_COMPLETE.md              What was created (this summary)
📄 LOCAL_SETUP_INDEX.md            Overview & navigation
📄 QUICK_START.md                  5-minute quick guide
📄 SETUP_LOCAL.md                  Detailed setup guide
📄 QUICK_REFERENCE.md              This file
```

---

## ⚙️ Current Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| Backend Port | 5000 | localhost:5000 |
| Frontend Port | 5173 | Vite auto-assigned |
| Database | MongoDB local | localhost:27017 |
| DB Name | aktube_local | Local database |
| API URL (Frontend) | http://localhost:5000/api/v1 | Backend endpoint |
| CORS Origin (Backend) | http://localhost:5173 | Frontend URL |
| Auto-reload | Yes | nodemon + Vite HMR |
| Mode | development | Full dev features |

---

## 📖 Which File to Read?

| Question | Read This |
|----------|-----------|
| What was created? | SETUP_COMPLETE.md |
| How do I start? | QUICK_START.md |
| How do I debug? | SETUP_LOCAL.md |
| Need navigation? | LOCAL_SETUP_INDEX.md |
| Quick reference? | This file |

---

## 🔧 Common Commands

```bash
# Start everything
start-local.bat             # Windows
./start-local.sh            # Mac/Linux

# Start individually
cd Backend && npm run dev
cd Frontend && npm run dev

# Switch environments
migrate.bat local           # Windows → local
migrate.bat prod            # Windows → production
./migrate.sh local          # Mac/Linux → local
./migrate.sh prod           # Mac/Linux → production

# Check setup
node verify-setup.js

# Install dependencies
npm install                 # Run in Backend/ and Frontend/

# Test MongoDB
mongosh mongodb://localhost:27017
```

---

## 🐛 Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| MongoDB won't connect | `mongosh` or `docker start mongodb` |
| Port 5000 in use | Change PORT in Backend/.env |
| Port 5173 in use | Vite auto-increments or kill process |
| Dependencies missing | `npm install` in Backend/ and Frontend/ |
| Changes not reloading | Kill servers & restart |
| API calls failing | Check CORS_ORIGIN in Backend/.env |

---

## 📍 Access Points

```
Frontend:  http://localhost:5173
API:       http://localhost:5000/api/v1
MongoDB:   localhost:27017
```

---

## ✅ Pre-flight Checklist

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running (`mongosh` works)
- [ ] Backend/.env exists
- [ ] Frontend/.env exists
- [ ] No errors in `node verify-setup.js`

---

## 🚫 DO NOT Commit These

```
.env                # Local config - HAS SECRETS
.env.prod           # Production reference
node_modules/       # Dependencies (auto-install)
dist/               # Build output
.DS_Store           # Mac files
Thumbs.db           # Windows files
```

---

## ✅ SAFE to Commit These

```
.env.local          # Local defaults only
.gitignore.local    # Reference
*.md                # Documentation
src/                # Source code
public/             # Assets
package.json        # Dependencies list
```

---

## 💡 Developer Tips

1. **Auto-reload:** Changes reload automatically
   - Backend: nodemon watches files
   - Frontend: Vite HMR (Hot Module Replacement)

2. **Debug Frontend:**
   - F12 → DevTools
   - Redux DevTools extension helpful

3. **Debug Backend:**
   - Console.log in code
   - Check terminal output

4. **Database Viewing:**
   - Install MongoDB Compass
   - Connect to localhost:27017

---

## 📊 Tech Stack at a Glance

```
Backend:
├── Node.js + Express
├── MongoDB + Mongoose
├── JWT Auth
└── Cloudinary (Images)

Frontend:
├── React 18
├── Vite
├── Redux Toolkit
├── Tailwind CSS
└── Axios
```

---

## 🎯 Typical Workflow

```
1. Run start-local.bat
   ↓
2. Backend starts (localhost:5000)
   ↓
3. Frontend starts (localhost:5173)
   ↓
4. Browser opens to frontend
   ↓
5. Edit code → Auto-reload
   ↓
6. Debug in DevTools
   ↓
7. Stop with Ctrl+C
```

---

## 📞 Help Resources

| Issue | See |
|-------|-----|
| Can't start? | QUICK_START.md |
| MongoDB issues? | SETUP_LOCAL.md |
| Port conflicts? | SETUP_LOCAL.md → Troubleshooting |
| Unknown error? | verify-setup.js |
| General help? | LOCAL_SETUP_INDEX.md |

---

**Status:** ✅ Ready to develop!

**Next:** Run `start-local.bat` or read `QUICK_START.md`
