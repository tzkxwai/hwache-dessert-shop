# Собирает переносимую папку для Windows: на другом ПК не нужен .NET SDK.
# Результат: .\publish\win-x64\ и архив .\hwache-win-x64.zip — можно отправить zip почтой/мессенджером.
#
# Запуск на другом компьютере (Windows x64):
#   .\hwache.exe --urls "http://0.0.0.0:5085"
# Локально только у себя:
#   .\hwache.exe

Set-Location -LiteralPath $PSScriptRoot
$out = Join-Path $PSScriptRoot "publish\win-x64"

Write-Host "Публикация в $out ..." -ForegroundColor Cyan
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=false -o $out

if ($LASTEXITCODE -eq 0) {
    $bat = @"
@echo off
chcp 65001 >nul
echo Запуск «Хваче» для доступа в локальной сети по http://ВАШ_IP:5085
echo Остановка: закройте окно или Ctrl+C
hwache.exe --urls "http://0.0.0.0:5085"
pause
"@
    Set-Content -Path (Join-Path $out "run-lan.bat") -Value $bat -Encoding UTF8

    Write-Host ""
    Write-Host "Готово. Скопируйте всю папку:" -ForegroundColor Green
    Write-Host "  $out" -ForegroundColor Green
    Write-Host ""
    Write-Host "На другом ПК: дважды run-lan.bat или в консоли:" -ForegroundColor Cyan
    Write-Host "  hwache.exe --urls `"http://0.0.0.0:5085`"" -ForegroundColor White

    $zipPath = Join-Path $PSScriptRoot "hwache-win-x64.zip"
    if (Test-Path -LiteralPath $zipPath) {
        Remove-Item -LiteralPath $zipPath -Force
    }
    Write-Host ""
    Write-Host "Создаю ZIP для отправки..." -ForegroundColor Cyan
    Compress-Archive -LiteralPath $out -DestinationPath $zipPath -CompressionLevel Optimal

    Write-Host ""
    Write-Host "Архив готов (отправьте этот файл):" -ForegroundColor Green
    Write-Host "  $zipPath" -ForegroundColor Green
    Write-Host ""
    Write-Host "У получателя: распаковать → открыть папку win-x64 → run-lan.bat" -ForegroundColor DarkGray
}
