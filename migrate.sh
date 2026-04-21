#!/bin/bash

# Migration Helper - Switch between Production and Local Development

echo ""
echo "=========================================="
echo "  AXATube Environment Switcher"
echo "=========================================="
echo ""

if [ "$1" = "local" ]; then
    echo "Switching to LOCAL development mode..."
    echo ""
    
    # Backend
    echo "Configuring Backend..."
    if [ -f "Backend/.env.local" ]; then
        cp Backend/.env.local Backend/.env
        echo "✓ Backend configured (Port: 5000, MongoDB: localhost:27017)"
    else
        echo "✗ Error: Backend/.env.local not found"
        exit 1
    fi
    
    # Frontend
    echo "Configuring Frontend..."
    if [ -f "Frontend/.env.local" ]; then
        cp Frontend/.env.local Frontend/.env
        echo "✓ Frontend configured (API: localhost:5000)"
    else
        echo "✗ Error: Frontend/.env.local not found"
        exit 1
    fi
    
    echo ""
    echo "✓ Successfully switched to LOCAL mode!"
    echo ""
    echo "Next steps:"
    echo "  1. Ensure MongoDB is running"
    echo "  2. Run: ./start-local.sh (Mac/Linux) or start-local.bat (Windows)"
    echo ""

elif [ "$1" = "prod" ]; then
    echo "Switching to PRODUCTION mode..."
    echo ""
    echo "Configuring Backend..."
    
    if [ -f "Backend/.env.prod" ]; then
        cp Backend/.env.prod Backend/.env
        echo "✓ Backend configured for production"
    else
        echo "⚠ Warning: Backend/.env.prod not found"
        echo "  Please manually configure Backend/.env with production settings"
    fi
    
    echo ""
    echo "⚠ Remember:"
    echo "  - Never commit .env files with credentials"
    echo "  - Use .env.prod only for local reference"
    echo "  - Production env vars should be set on the deployment platform"
    echo ""

else
    echo "Usage: ./migrate.sh [local|prod]"
    echo ""
    echo "Examples:"
    echo "  ./migrate.sh local    - Switch to local development"
    echo "  ./migrate.sh prod     - Switch to production settings"
    echo ""
    echo "What each mode does:"
    echo "  local - Uses localhost MongoDB and local frontend URL"
    echo "  prod  - Uses production MongoDB Atlas and deployed URLs"
    echo ""
fi
