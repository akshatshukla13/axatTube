@echo off
REM Migration Helper - Switch between Production and Local Development (Windows)

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo   AXATube Environment Switcher
echo ==========================================
echo.

if /i "%1"=="local" (
    echo Switching to LOCAL development mode...
    echo.
    
    REM Backend
    echo Configuring Backend...
    if exist "Backend\.env.local" (
        copy "Backend\.env.local" "Backend\.env" >nul
        echo OK Backend configured (Port: 5000, MongoDB: localhost:27017)
    ) else (
        echo ERROR: Backend\.env.local not found
        exit /b 1
    )
    
    REM Frontend
    echo Configuring Frontend...
    if exist "Frontend\.env.local" (
        copy "Frontend\.env.local" "Frontend\.env" >nul
        echo OK Frontend configured (API: localhost:5000)
    ) else (
        echo ERROR: Frontend\.env.local not found
        exit /b 1
    )
    
    echo.
    echo OK Successfully switched to LOCAL mode!
    echo.
    echo Next steps:
    echo   1. Ensure MongoDB is running
    echo   2. Run: start-local.bat
    echo.

) else if /i "%1"=="prod" (
    echo Switching to PRODUCTION mode...
    echo.
    echo Configuring Backend...
    
    if exist "Backend\.env.prod" (
        copy "Backend\.env.prod" "Backend\.env" >nul
        echo OK Backend configured for production
    ) else (
        echo WARNING: Backend\.env.prod not found
        echo   Please manually configure Backend\.env with production settings
    )
    
    echo.
    echo WARNING:
    echo   - Never commit .env files with credentials
    echo   - Use .env.prod only for local reference
    echo   - Production env vars should be set on the deployment platform
    echo.

) else (
    echo Usage: migrate.bat [local^|prod]
    echo.
    echo Examples:
    echo   migrate.bat local    - Switch to local development
    echo   migrate.bat prod     - Switch to production settings
    echo.
    echo What each mode does:
    echo   local - Uses localhost MongoDB and local frontend URL
    echo   prod  - Uses production MongoDB Atlas and deployed URLs
    echo.
)
