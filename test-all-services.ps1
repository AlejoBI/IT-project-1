# Lista de rutas de los servicios
$services = @(
    "services/audit-service",
    "services/auth-service",
    "services/compliance-service",
    "services/evaluation-form-service",
    "services/notification-service",
    "services/regulation-service",
    "services/user-service"
)

foreach ($service in $services) {
    Write-Host "🧪 Running tests in $service" -ForegroundColor Cyan

    Push-Location $service

    # Instala dependencias si es necesario (opcional, puedes comentar si ya están instaladas)
    if (Test-Path "package-lock.json") {
        npm ci
    }
    else {
        npm install
    }

    # Ejecuta los tests
    try {
        npm test
        if ($LASTEXITCODE -ne 0) {
            throw "❌ Tests failed in $service"
        }
    }
    catch {
        Write-Host $_ -ForegroundColor Red
        Pop-Location
        exit 1
    }

    Pop-Location
}

Write-Host "`n✅ All tests passed successfully!" -ForegroundColor Green
