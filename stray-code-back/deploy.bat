@echo off

@REM REM Step 1: Build the Project
@REM echo Building the project...
@REM call npm run build

@REM REM Step 2: Copy package.json to the dist folder
@REM echo Copying package.json to the dist folder...
@REM call copy package.json dist\

REM Step 3: Deploy to Vercel with environment variable
echo Deploying to Vercel with STAGING=true...
set STAGING=true
call vercel --env STAGING=%STAGING%

echo Deployment Complete.