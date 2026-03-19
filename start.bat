@echo off
echo Starting Roundtable backend...
start "Backend" cmd /k ".venv\Scripts\python.exe -m uvicorn backend.server:app --reload --port 8000"

echo Waiting for backend to start...
timeout /t 2 /nobreak > nul

echo Starting Roundtable frontend...
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers starting:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8000
