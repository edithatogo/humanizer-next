param(
    [switch]$SkipValidation
)

$ErrorActionPreference = "Stop"
$RepoRoot = Get-Location

# 1. Validate first (unless skipped)
if (-not $SkipValidation) {
    Write-Host "Running validation before installation..."
    powershell -NoProfile -ExecutionPolicy Bypass -File "$PSScriptRoot/validate-adapters.ps1"
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Validation failed. Aborting installation."
    }
}

Write-Host "Starting Universal Installation..."

# Helper for creating dirs and copying
function Install-File {
    param($Source, $DestDir, $DestName)
    if (-not (Test-Path $Source)) {
        Write-Warning "Source not found: $Source"
        return
    }
    if (-not (Test-Path $DestDir)) {
        New-Item -ItemType Directory -Path $DestDir -Force | Out-Null
    }
    $finalPath = Join-Path $DestDir $DestName
    Copy-Item -Path $Source -Destination $finalPath -Force
    Write-Host "Installed: $finalPath"
}

# 2. Gemini CLI Extension (User Dir)
$geminiExtensions = Join-Path $env:USERPROFILE ".gemini\extensions\humanizer"
Write-Host "Installing Gemini CLI Extension..."
if (-not (Test-Path $geminiExtensions)) {
    New-Item -ItemType Directory -Path $geminiExtensions -Force | Out-Null
}
Copy-Item -Path "$RepoRoot\adapters\gemini-extension\*" -Destination $geminiExtensions -Recurse -Force
Write-Host "Installed to: $geminiExtensions"

# 3. Google Antigravity (Workspace)
Install-File -Source "$RepoRoot\adapters\antigravity-skill\SKILL.md" -DestDir "$RepoRoot\.agent\skills\humanizer" -DestName "SKILL.md"
Install-File -Source "$RepoRoot\adapters\antigravity-skill\SKILL_PROFESSIONAL.md" -DestDir "$RepoRoot\.agent\skills\humanizer" -DestName "SKILL_PROFESSIONAL.md"
Install-File -Source "$RepoRoot\adapters\antigravity-skill\README.md" -DestDir "$RepoRoot\.agent\skills\humanizer" -DestName "README.md"
Install-File -Source "$RepoRoot\adapters\antigravity-rules-workflows\rules\humanizer.md" -DestDir "$RepoRoot\.agent\rules" -DestName "humanizer.md"
Install-File -Source "$RepoRoot\adapters\antigravity-rules-workflows\workflows\humanize.md" -DestDir "$RepoRoot\.agent\workflows" -DestName "humanize.md"

# 4. VS Code (Workspace)
Install-File -Source "$RepoRoot\adapters\vscode\humanizer.code-snippets" -DestDir "$RepoRoot\.vscode" -DestName "humanizer.code-snippets"

# 5. Qwen CLI (Root)
Install-File -Source "$RepoRoot\adapters\qwen-cli\QWEN.md" -DestDir "$RepoRoot" -DestName "QWEN.md"

# 6. GitHub Copilot (Root .github)
Install-File -Source "$RepoRoot\adapters\copilot\COPILOT.md" -DestDir "$RepoRoot\.github" -DestName "copilot-instructions.md"

Write-Host "`nUniversal Installation Complete."
