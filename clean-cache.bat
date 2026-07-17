@echo off
REM Clean React cache and restart

echo Cleaning cache...
cd /d "%~dp0sportsee-frontend"

REM Remove Webpack cache
if exist "node_modules/.cache" (
    rmdir /s /q "node_modules/.cache"
    echo Webpack cache cleaned
)

REM Remove temp files
if exist "node_modules/.vite" (
    rmdir /s /q "node_modules/.vite"
    echo Vite cache cleaned
)

echo.
echo Cache cleaned successfully!
echo.
echo Now restart your development server:
echo   cd sportsee-frontend
echo   npm start

echo.
pause
