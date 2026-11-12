$ErrorActionPreference = "Stop"

$services = @(
    "auth-service",
    "user-service",
    "compliance-service",
    "notification-service",
    "regulation-service",
    "evaluation-form-service",
    "audit-service"
)

try {
    foreach ($service in $services) {
        $envExample = "services/$service/.env.example"
        $envFile = "services/$service/.env"
        if (-not (Test-Path $envExample)) {
            throw "No existe $envExample"
        }
        Copy-Item $envExample $envFile -Force
    }

    docker compose config | Out-Null
    Write-Host "✅ docker compose config pasó usando plantillas .env.example" -ForegroundColor Green
}
finally {
    foreach ($service in $services) {
        Remove-Item "services/$service/.env" -Force -ErrorAction SilentlyContinue
    }
}
