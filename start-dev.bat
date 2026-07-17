@echo off
REM SportSee - Start Backend and Frontend
REM =================================

echo Starting SportSee...
echo.

REM Free port 3000 if something is using it
echo Freeing port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1
echo Done.
echo.

REM Start backend
echo Starting Backend on port 8000...
start "Backend" cmd /k "cd /d "%~dp0" && node app/index.js"

timeout /t 2 >nul

REM Start frontend
echo Starting Frontend on port 3000...
start "Frontend" cmd /k "cd /d "%~dp0sportsee-frontend" && npm start"

echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause
