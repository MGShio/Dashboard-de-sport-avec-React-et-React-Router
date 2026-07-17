@echo off
REM ============================================
REM Kill processes using ports 3000 and 8000
REM ============================================

echo Killing processes on ports 3000 and 8000...
echo.

REM Kill port 3000 (Frontend)
echo Freeing port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Found PID: %%a on port 3000
    taskkill /f /pid %%a >nul 2>&1
    echo Killed process %%a
)

REM Kill port 8000 (Backend)
echo Freeing port 8000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000 ^| findstr LISTENING') do (
    echo Found PID: %%a on port 8000
    taskkill /f /pid %%a >nul 2>&1
    echo Killed process %%a
)

echo.
echo All ports should now be free
echo.
pause
