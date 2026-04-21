@echo off
REM Start AXATube Local Development - Windows
setlocal enabledelayedexpansion

echo.
echo ========================================
echo   AXATube Local Development Startup
echo ========================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
mongosh --eval "db.version()" >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB does not appear to be running!
    echo Please start MongoDB before continuing.
    echo.
    echo Options:
    echo  - Windows Service: Check Services app for "MongoDB Server"
    echo  - Docker: Run "docker start mongodb"
    echo  - Manual: Start MongoDB from installation folder
    echo.
    pause
)

echo.
echo Starting Backend Server...
start "AXATube Backend" cmd /k "cd Backend && npm run dev"

timeout /t 3

echo Starting Frontend Server...
start "AXATube Frontend" cmd /k "cd Frontend && npm run dev"

echo.
echo ========================================
echo   Local Development Started
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause
