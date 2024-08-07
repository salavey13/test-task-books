@echo off
setlocal

:: Define variables
set PROJECT_ROOT=%~dp0
set BACKEND_DIR=%PROJECT_ROOT%backend
set FRONTEND_DIR=%PROJECT_ROOT%frontend

:: 1. Install PostgreSQL
echo Installing PostgreSQL...
:: Check if PostgreSQL is installed
where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo PostgreSQL not found. Please download and install PostgreSQL from https://www.postgresql.org/download/windows/.
    exit /b 1
) else (
    echo PostgreSQL is already installed.
)

:: 2. Create PostgreSQL database and user
echo Creating PostgreSQL database and user...
psql -U postgres -c "CREATE DATABASE your_database;"
psql -U postgres -c "CREATE USER your_user WITH PASSWORD 'your_password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;"

:: 3. Set up Prisma
echo Setting up Prisma...
cd %BACKEND_DIR%
npm install @prisma/client
npm install --save-dev prisma

:: Prizma (default is Supabase), if you want prizma - uncomment following            
::            npx prisma init

::            :: 4. Configure Prisma schema
::            echo Configuring Prisma schema...
::            :: Ensure the schema.prisma file is properly set up
::            set SCHEMA_PRISMA_FILE=%BACKEND_DIR%\prisma\schema.prisma
::            echo datasource db {
::            echo   provider = "postgresql" >> %SCHEMA_PRISMA_FILE%
::          echo   url      = env("DATABASE_URL") >> %SCHEMA_PRISMA_FILE%
::            echo } >> %SCHEMA_PRISMA_FILE%
::            echo generator client { >> %SCHEMA_PRISMA_FILE%
::            echo   provider = "prisma-client-js" >> %SCHEMA_PRISMA_FILE%
::            echo } >> %SCHEMA_PRISMA_FILE%
::            echo model Book { >> %SCHEMA_PRISMA_FILE%
::            echo   id              Int      @id @default(autoincrement()) >> %SCHEMA_PRISMA_FILE%
::            echo   title           String >> %SCHEMA_PRISMA_FILE%
::            echo   author          String >> %SCHEMA_PRISMA_FILE%
::            echo   publicationDate DateTime >> %SCHEMA_PRISMA_FILE%
::            echo   genres          String >> %SCHEMA_PRISMA_FILE%
::            echo } >> %SCHEMA_PRISMA_FILE%
::            echo model User { >> %SCHEMA_PRISMA_FILE%
::            echo   id       Int      @id @default(autoincrement()) >> %SCHEMA_PRISMA_FILE%
::            echo   username String   @unique >> %SCHEMA_PRISMA_FILE%
::            echo   password String >> %SCHEMA_PRISMA_FILE%
::            echo   email    String   @unique >> %SCHEMA_PRISMA_FILE%
::            echo   role     Int >> %SCHEMA_PRISMA_FILE%
::            echo } >> %SCHEMA_PRISMA_FILE%

::            :: 5. Update .env file for Prisma
::            echo Updating .env file...
::            set ENV_FILE=%BACKEND_DIR%\.env
::            echo DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_database" > %ENV_FILE%
::            echo JWT_SECRET=your_jwt_secret >> %ENV_FILE%

::            :: 6. Run Prisma migrations
::            echo Running Prisma migrations...
::            npx prisma migrate dev --name init

::            :: 7. Generate Prisma client
::            echo Generating Prisma client...
::            npx prisma generate

:: 8. Install backend dependencies
echo Installing backend dependencies...
npm install

:: 9. Compile backend TypeScript
echo Compiling backend TypeScript...
npx tsc

:: 10. Start backend server
echo Starting backend server...
start /B node dist/server.js

:: 11. Install frontend dependencies
echo Installing frontend dependencies...
cd %FRONTEND_DIR%
npm install

:: 12. Compile frontend TypeScript
echo Compiling frontend TypeScript...
npx tsc

:: 13. Start frontend server
echo Starting frontend server...
start /B npx live-server public

echo Project setup completed successfully!

endlocal
pause
