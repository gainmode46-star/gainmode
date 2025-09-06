# Deployment Guide for O2 E-commerce Website

## Option 1: Vercel (Recommended)

### Backend Deployment
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your repository
4. Set these environment variables in Vercel:
   ```
   DATABASE_URI=your_mongodb_connection_string
   PAYLOAD_SECRET=your_secret_key
   PORT=3001
   ```
5. Deploy backend first

### Frontend Deployment
1. Update API URLs in `frontend/src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'https://your-backend-url.vercel.app/api';
   ```
2. Deploy frontend to Vercel

## Option 2: Railway

### Backend
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Add environment variables
4. Deploy

### Frontend
1. Update API URLs to Railway backend URL
2. Deploy to Vercel/Netlify

## Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings:
   - Backend: Node.js, build command: `npm install`, run command: `npm start`
   - Frontend: Static site, build command: `npm run build`
3. Add environment variables
4. Deploy

## Required Environment Variables

### Backend (.env)
```
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PAYLOAD_SECRET=your-secret-key-minimum-32-characters
PORT=3001
```

### Frontend
Update API_BASE_URL to your deployed backend URL

## Database Setup
- Use MongoDB Atlas (free tier available)
- Get connection string from Atlas dashboard
- Add to backend environment variables

## Domain Setup
1. Buy domain from Namecheap/GoDaddy
2. Point DNS to your hosting provider
3. Configure custom domain in hosting dashboard

## SSL Certificate
- Most platforms (Vercel, Railway, DigitalOcean) provide free SSL automatically

## Cost Estimate
- **Free Option**: Vercel (frontend) + Railway (backend) + MongoDB Atlas free tier
- **Paid Option**: $5-20/month for better performance and custom domain