param(
    [Parameter(Mandatory = $true)]
    [string]$BaseUrl,
    [Parameter(Mandatory = $true)]
    [string]$Token,
    [Parameter(Mandatory = $true)]
    [string]$UserId,
    [string]$RegulationId,
    [switch]$IncludeAdmin
)

$ErrorActionPreference = "Stop"
$headers = @{ Authorization = "Bearer $Token" }
$checks = @(
    @{ Name = "Regulaciones"; Path = "/api/regulations/" },
    @{ Name = "Autorrevisiones del usuario"; Path = "/api/compliance/self-assessments/$UserId" },
    @{ Name = "Reportes del usuario"; Path = "/api/compliance/compliance-reports/$UserId" }
)

if ($RegulationId) {
    $checks += @{ Name = "Formulario de evaluación"; Path = "/api/evaluation/forms/$RegulationId" }
}

if ($IncludeAdmin) {
    $checks += @{ Name = "Usuarios administrativos"; Path = "/api/users/" }
}

$failed = 0
foreach ($check in $checks) {
    try {
        $response = Invoke-WebRequest -Uri "$BaseUrl$($check.Path)" -Headers $headers -UseBasicParsing -TimeoutSec 30
        $body = $response.Content | ConvertFrom-Json
        $count = if ($body -is [array]) { $body.Count } else { 1 }
        Write-Host "OK   $($check.Name): HTTP $($response.StatusCode), elementos=$count" -ForegroundColor Green
    }
    catch {
        $status = $_.Exception.Response.StatusCode.value__
        Write-Host "FAIL $($check.Name): HTTP $status - $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

if ($failed -gt 0) {
    exit 1
}
