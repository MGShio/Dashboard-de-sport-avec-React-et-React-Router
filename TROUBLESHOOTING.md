# Troubleshooting Guide - SportSee

## "Backend works, but frontend no"

This guide helps you resolve common issues when the backend starts but the frontend fails.

## Common Causes & Solutions

### 1. Port 3000 is already in use

**Symptom:** Frontend fails to start, error like `Something is already running on port 3000`

**Solution:**
```cmd
REM Run this to free port 3000
netstat -ano | findstr :3000 | findstr LISTENING
REM Note the PID number, then:
taskkill /f /pid <PID>
```

Or use the provided script:
```cmd
double-click kill-port-3000.bat
```

### 2. Frontend dependencies not installed

**Symptom:** Errors about missing modules

**Solution:**
```cmd
cd sportsee-frontend
npm install
```

### 3. React-router-dom version issue

**Symptom:** Error `Cannot find module 'react-router/dom'` in tests

This is a known issue with react-router-dom v7 and Jest. It doesn't affect the development server, only tests.

**Solution for running the app:**
The development server (`npm start`) should work fine. Just ignore the test errors.

**If you really need to fix tests:**
```cmd
cd sportsee-frontend
npm install react-router-dom@6.22.3
```

### 4. React-scripts version mismatch

**Symptom:** Compilation errors, "Cannot read property..."

**Solution:**
```cmd
cd sportsee-frontend
npm install react-scripts@5.0.1
```

### 5. Node.js version incompatible

**Symptom:** Various errors during startup

**Solution:** Use Node.js v16, v18, or v20 (LTS versions)

Check your version:
```cmd
node --version
```

Download from: https://nodejs.org/

## Step-by-Step Diagnosis

### Step 1: Check what's running on port 3000
```cmd
netstat -ano | findstr :3000
```
If you see output, something is using port 3000. Kill it with `taskkill /f /pid <PID>`

### Step 2: Try to start frontend manually
```cmd
cd sportsee-frontend
npm start
```

Look at the error message. Common errors:
- `Something is already running on port 3000` → See Step 1
- `Cannot find module 'xxx'` → Run `npm install`
- Compilation errors → Check React version compatibility

### Step 3: Check backend is running
```cmd
curl http://localhost:8000
```

Or open in browser: http://localhost:8000

If backend is running, you should see a response (possibly 404, but not connection refused).

### Step 4: Verify API endpoints
```cmd
REM Test login endpoint
curl -X POST http://localhost:8000/api/login -H "Content-Type: application/json" -d '{"username":"user123","password":"password123"}'
```

## Quick Fix Scripts

### start-dev.bat
Double-click to start both servers (frees port 3000 first)

### start-dev-concurrently.bat  
Starts both in one window (requires concurrently installed)

### kill-port-3000.bat
Frees port 3000 if something is using it

## Common Error Messages

### "Something is already running on port 3000"
Port is occupied. Use `kill-port-3000.bat` or manually kill the process.

### "Cannot find module 'react-router/dom'"
This is a Jest testing issue, not a runtime issue. The app should still start with `npm start`.

If you want to fix it:
```cmd
cd sportsee-frontend
npm install react-router-dom@6.22.3
```

### "Invalid hook call"
Usually means React version mismatch or multiple React instances.

**Solution:**
```cmd
cd sportsee-frontend
rm -rf node_modules package-lock.json
npm install
```

### "Failed to compile"
Check the error message. Often it's a syntax error in your code.

## Verify Your Setup

```cmd
REM Check Node.js
node --version

REM Check npm
npm --version

REM Check backend dependencies
cd /d "path\to\project"
ls node_modules/express

REM Check frontend dependencies  
cd sportsee-frontend
ls node_modules/react
ls node_modules/react-router-dom
```

## Still Not Working?

Try a clean install:

```cmd
REM In project root
rd /s /q node_modules
cd sportsee-frontend
rd /s /q node_modules
cd ..
del package-lock.json
cd sportsee-frontend
del package-lock.json
cd ..
npm install
cd sportsee-frontend
npm install
```

Then try starting again.
