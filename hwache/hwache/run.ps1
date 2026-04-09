# Запуск сайта «Хваче» из папки с hwache.csproj.
#
# Локально (только этот ПК):     .\run.ps1
# Доступ в локальной сети:      .\run.ps1 -Network
#   На другом устройстве в том же Wi‑Fi откройте: http://ВАШ_IP:5085
#
# ПК без установленного .NET: скопируйте папку из publish\win-x64 (см. publish-windows.ps1) и запустите hwache.exe

param(
    [switch]$Network
)

Set-Location -LiteralPath $PSScriptRoot

if ($Network) {
    Write-Host ""
    Write-Host "Сайт будет доступен в вашей сети по HTTP (порт 5085)." -ForegroundColor Cyan
    Write-Host "Откройте на другом устройстве один из адресов:" -ForegroundColor Cyan
    $ips = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
        Where-Object { $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -ne 'WellKnown' } |
        Select-Object -ExpandProperty IPAddress -Unique
    foreach ($ip in $ips) {
        Write-Host ("  http://{0}:5085" -f $ip) -ForegroundColor Green
    }
    if (-not $ips) {
        Write-Host "  (не удалось определить IP — выполните ipconfig и найдите IPv4)" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "Если страница не открывается: разрешите порт 5085 в брандмауэре Windows." -ForegroundColor DarkGray
    Write-Host ""
    dotnet run --launch-profile lan @args
} else {
    dotnet run @args
}
