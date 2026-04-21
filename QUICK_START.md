# Quick Start Guide - Windows Users

## 🚀 Super Quick Setup (5 minutes)

### Step 1: Install MongoDB (One-time only)

**Option A: Using Windows Installer (Easiest)**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer and select "Install MongoDB as a Service"
3. MongoDB will auto-start on boot

**Option B: Using Docker (If Docker is installed)**
```cmd
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option C: Using Chocolatey**
```cmd
choco install mongodb
```

---

### Step 2: Install Dependencies

```cmd
# Backend
cd Backend
npm install

# Frontend (in another command prompt)
cd Frontend
npm install
```

---

### Step 3: Configure Local Environment

**Windows Command Prompt:**
```cmd
# From root directory
copy Backend\.env.local Backend\.env
copy Frontend\.env.local Frontend\.env
```

---

### Step 4: Start Development Servers

**Option A: Using Batch Script (Recommended)**
```cmd
# Double-click this file from the root directory:
# start-local.bat
# This opens 2 terminals automatically
```

**Option B: Manual (Two Command Prompts)**

**Terminal 1:**
```cmd
cd Backend
npm run dev
```

**Terminal 2:**
```cmd
cd Frontend
npm run dev
```

---

### Step 5: Open in Browser

```
Frontend: http://localhost:5173
API: http://localhost:5000/api/v1
```

Done! ✅

---

## 🔄 Environment Switching

### Switch to Local Mode:
```cmd
migrate.bat local
```

### Switch to Production Mode:
```cmd
migrate.bat prod
```

---

## ⚠️ Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution:**
```cmd
# Check if MongoDB service is running
# Windows: Services App → Look for "MongoDB Server"
# Or restart it:
net stop MongoDB
net start MongoDB
```

### Issue: "Port 5000 already in use"
**Solution:** Edit Backend\.env and change PORT to 5001 or another free port

### Issue: "Port 5173 already in use"
**Solution:** 
```cmd
# Frontend will auto-increment port (5174, 5175, etc.)
# Or kill the process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Issue: "node_modules issues"
**Solution:**
```cmd
# Clear and reinstall
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 📁 Project Structure

```
axatTube/
├── Backend/              # Express.js API
│   ├── .env            # Local config (auto-created)
│   ├── .env.local      # Local defaults
│   ├── .env.prod       # Production reference
│   └── package.json    # Dependencies
├── Frontend/            # React + Vite
│   ├── .env            # Local config (auto-created)
│   ├── .env.local      # Local defaults
│   └── package.json    # Dependencies
├── start-local.bat     # 🟢 Click to start everything
├── migrate.bat         # Switch between local/prod
└── SETUP_LOCAL.md      # Detailed setup guide
```

---

## 🎯 What Each File Does

| File | Purpose |
|------|---------|
| `start-local.bat` | Starts both backend & frontend automatically |
| `migrate.bat local` | Switches to local development settings |
| `migrate.bat prod` | Switches to production settings |
| `.env.local` | Local defaults (safe to commit) |
| `.env` | Active config (auto-generated, DO NOT commit) |
| `.env.prod` | Production reference (DO NOT commit) |

---

## 📝 Environment Variables Explained

### Backend (.env)
```
PORT                      → API server port (5000)
MONGODB_URI              → Database connection string
DB_NAME                  → Database name
CORS_ORIGIN              → Allowed frontend URL
CLOUDINARY_*             → Image upload service
ACCESS_TOKEN_SECRET      → JWT secret for auth
NODE_ENV                 → development/production
```

### Frontend (.env)
```
VITE_API_BASE_URL        → Backend API address (http://localhost:5000/api/v1)
NODE_ENV                 → development/production
```

---

## 🔐 Security Notes

- **DO NOT commit `.env` files** - Add to .gitignore
- `.env.local` files are safe (contains only defaults)
- `.env.prod` is for reference only - never use for actual production
- Real production credentials should be set on:
  - Vercel Dashboard (Frontend)
  - Server Environment Variables (Backend)

---

## 🛠️ Development Workflow

1. **Start Development:**
   ```cmd
   start-local.bat
   ```

2. **Edit Code:**
   - Backend changes auto-reload (nodemon)
   - Frontend changes auto-reload (Vite HMR)

3. **View Changes:**
   - Browser: http://localhost:5173
   - Check Console for errors

4. **Stop Servers:**
   - Close both terminal windows (or Ctrl+C)

---

## 📚 Additional Resources

- Backend Setup: See SETUP_LOCAL.md
- MongoDB Local: https://docs.mongodb.com/manual/installation/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Express: https://expressjs.com/

---

## 💡 Pro Tips

1. **Use VS Code Terminal:** Open integrated terminal (Ctrl+~) and split it for both servers
2. **Network Testing:** Access from mobile: Use your PC's IP address instead of localhost
3. **Database Backup:** Export data before major changes: `mongodump --db aktube_local`
4. **Performance:** For heavy development, keep only necessary console logs

---

Need help? Check SETUP_LOCAL.md for detailed troubleshooting!
