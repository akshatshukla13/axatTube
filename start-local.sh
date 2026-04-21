#!/bin/bash

# Start AXATube Local Development - Mac/Linux

echo ""
echo "========================================"
echo "  AXATube Local Development Startup"
echo "========================================"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
mongosh --eval "db.version()" > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "WARNING: MongoDB does not appear to be running!"
    echo "Please start MongoDB before continuing."
    echo ""
    echo "Options:"
    echo "  - macOS: brew services start mongodb-community"
    echo "  - Linux: sudo systemctl start mongod"
    echo "  - Docker: docker start mongodb"
    echo ""
    read -p "Press Enter to continue anyway, or Ctrl+C to cancel..."
fi

echo ""
echo "Starting Backend Server..."
cd Backend
npm run dev &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend Server..."
cd ../Frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  Local Development Started"
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers..."
echo ""

# Wait for interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
