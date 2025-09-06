#!/bin/bash

echo "🚀 Starting O2 Nutrition Backend..."

cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found! Copying from .env.example..."
    cp .env.example .env
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Start the development server
echo "🔥 Starting development server on port 3000..."
pnpm dev