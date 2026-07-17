# SportSee Dashboard - Frontend & Backend

This project consists of a **React frontend** and an **Express backend** for the SportSee dashboard application.

## Project Structure

```
├── app/                      # Backend (Express API)
│   ├── index.js             # Express server entry point
│   ├── routes.js            # API routes
│   ├── middleware.js        # JWT authentication middleware
│   └── data.json            # User data
│
└── sportsee-frontend/       # Frontend (React)
    ├── src/
    │   ├── pages/
    │   │   ├── Login.js      # Login page
    │   │   └── Dashboard.js  # Main dashboard
    │   ├── services/
    │   │   └── api.js        # API service with axios
    │   ├── App.js           # React Router configuration
    │   ├── App.css          # Styles
    │   └── index.js         # React entry point
    └── package.json
```

## Prerequisites

- Node.js (v14+)
- npm (v6+)

## Installation

### 1. Install Backend Dependencies

```bash
cd "Dashboard de sport avec React et React Router"
npm install
```

### 2. Install Frontend Dependencies

```bash
cd sportsee-frontend
npm install
```

## Running the Application

### Start the Backend Server

Open **Terminal 1**:
```bash
cd "Dashboard de sport avec React et React Router"
npm start
# or for development with auto-restart:
npm run dev
```

Backend runs on: `http://localhost:8000`

### Start the Frontend Server

Open **Terminal 2**:
```bash
cd sportsee-frontend
npm start
```

Frontend runs on: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/login` | Login and get JWT token | No |
| GET | `/api/user-info` | Get user profile and statistics | Yes |
| GET | `/api/user-activity?startWeek=YYYY-MM-DD&endWeek=YYYY-MM-DD` | Get running sessions by date range | Yes |

## Test Credentials

Use these credentials to login:

- **Username:** `sophiemartin` | **Password:** `password123`
- **Username:** `emmaleroy` | **Password:** `password789`
- **Username:** `marcdubois` | **Password:** `password456`

## Features

- JWT Authentication
- User profile display
- Overall statistics (total distance, sessions, duration)
- Recent activity table (last 7 days)
- Responsive design
- Protected routes

## Tech Stack

**Frontend:**
- React 19
- React Router DOM 7
- Axios

**Backend:**
- Express
- JWT (jsonwebtoken)
- CORS
- Body Parser
