# E-Commerce Website

A full-stack e-commerce application with separated frontend and backend architecture.

## Project Structure

```
my-project/
│
├── frontend/         # React + Vite + Tailwind CSS frontend
├── backend/          # Next.js + Payload CMS backend
├── README.md
└── .gitignore
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm
- MongoDB (local or cloud)

### Development Setup

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your `MONGODB_URI` to the `.env` file.

3. Install dependencies and start the backend:
   ```bash
   pnpm install
   pnpm dev
   ```
   The backend will run on `http://localhost:3000`

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies and start the frontend:
   ```bash
   npm install
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

#### Docker Setup (Optional)

For local development with Docker:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update your `.env` file:
   ```
   MONGODB_URI=mongodb://127.0.0.1/<dbname>
   ```

3. Start the database:
   ```bash
   docker-compose up -d
   ```

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
