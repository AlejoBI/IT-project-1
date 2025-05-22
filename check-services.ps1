# Array con URLs de health check de cada servicio
$services = @(
    "https://auth-service-pepu.onrender.com/health",
    "https://user-service-bk9s.onrender.com/health",
    "https://compliance-service-1wg9.onrender.com/health",
    "https://notification-service-ntqz.onrender.com/health",
    "https://regulation-service.onrender.com/health",
    "https://evaluation-form-service.onrender.com/health",
    "https://audit-service-welu.onrender.com/health"
)

foreach ($url in $services) {
    try {
        # Hacer la petición HTTP GET
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10

        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $url está activo" -ForegroundColor Green
        }
        else {
            Write-Host "❌ $url respondió con código $($response.StatusCode)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "⚠️ ERROR: No se pudo conectar a $url" -ForegroundColor Yellow
    }
}
