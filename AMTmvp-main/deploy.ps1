# PowerShell deployment script

# Stop on error
$ErrorActionPreference = "Stop"

Write-Host "🏗️ Building the application..." -ForegroundColor Cyan
npm run build

Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host "📂 The application has been built to the 'out' directory" -ForegroundColor Yellow
Write-Host "🚀 To deploy manually, upload the contents of the 'out' directory to your web server" -ForegroundColor Yellow
Write-Host "🔗 Remember the app is configured with basePath: '/Athlete-Management-Platform'" -ForegroundColor Yellow 