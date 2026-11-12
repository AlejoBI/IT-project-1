$ErrorActionPreference = "Stop"
$configPath = Join-Path $PSScriptRoot "services/api-gateway/nginx.conf"
$commonPath = Join-Path $PSScriptRoot "services/api-gateway/common.conf"
$config = Get-Content -Raw $configPath
$common = Get-Content -Raw $commonPath

$requiredLocations = @(
    "/api/auth/", "/api/users/", "/api/compliance/", "/api/notifications/",
    "/api/regulations/", "/api/evaluation/", "/api/audit/", "/health", "/ready"
)
$missing = $requiredLocations | Where-Object { $config -notmatch "location\s+$([regex]::Escape($_))\s*\{" }
if ($missing.Count -gt 0) {
    throw "Faltan locations del Gateway: $($missing -join ', ')"
}

if (-not $config.Contains('map $http_x_request_id $request_id') -or
    -not $common.Contains('proxy_set_header X-Request-ID $request_id')) {
    throw "El Gateway no propaga correctamente X-Request-ID."
}

$proxyCount = ([regex]::Matches($config, "proxy_pass\s+https?://")).Count
if ($proxyCount -lt 7) {
    throw "Se esperaban al menos siete upstreams configurados; encontrados: $proxyCount"
}

Write-Host "OK Gateway: $($requiredLocations.Count) locations, $proxyCount upstreams y correlation ID configurados." -ForegroundColor Green
