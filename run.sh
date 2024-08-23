#!/bin/bash

# Install dependencies for backend
cd backend
npm install

# Start backend server in the background
npm run dev &

# Install dependencies for frontend
cd ../frontend
npm install

# Start frontend development server
npm run dev