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

$ports = @(5000, 5001, 5002, 5003, 5004, 5005, 5006)
$processes = @()
$logDirectory = Join-Path $env:TEMP "isolytics-runtime-check"

New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null

try {
    for ($index = 0; $index -lt $services.Count; $index++) {
        $service = $services[$index]
        $servicePath = Join-Path (Get-Location) "services/$service"
        Copy-Item "$servicePath/.env.example" "$servicePath/.env" -Force

        $stdout = Join-Path $logDirectory "$service.log"
        $stderr = Join-Path $logDirectory "$service.err"
        $processes += Start-Process `
            -FilePath "node" `
            -ArgumentList "dist/app.js" `
            -WorkingDirectory $servicePath `
            -RedirectStandardOutput $stdout `
            -RedirectStandardError $stderr `
            -PassThru `
            -WindowStyle Hidden
    }

    Start-Sleep -Seconds 5
    $failed = $false

    for ($index = 0; $index -lt $ports.Count; $index++) {
        foreach ($path in @("/health", "/ready")) {
            $url = "http://localhost:$($ports[$index])$path"
            try {
                $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
                Write-Host "$url -> $($response.StatusCode) $($response.Content)"
                if ($response.StatusCode -ne 200) {
                    $failed = $true
                }
            }
            catch {
                Write-Error "$url -> $($_.Exception.Message)"
                $failed = $true
            }
        }
    }

    if ($failed) {
        Get-ChildItem $logDirectory -Filter "*.log*" | Get-Content
        exit 1
    }
}
finally {
    foreach ($process in $processes) {
        if ($process -and -not $process.HasExited) {
            Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
        }
    }

    foreach ($service in $services) {
        Remove-Item "services/$service/.env" -Force -ErrorAction SilentlyContinue
    }

    Remove-Item $logDirectory -Recurse -Force -ErrorAction SilentlyContinue
}
