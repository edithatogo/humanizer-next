$ErrorActionPreference = "Stop"

# 1. Fragments Path
$srcDir = "src"
$coreFrontmatterPath = Join-Path $srcDir "core_frontmatter.yaml"
$corePatternsPath = Join-Path $srcDir "core_patterns.md"
$humanHeaderPath = Join-Path $srcDir "human_header.md"
$proHeaderPath = Join-Path $srcDir "pro_header.md"

# 2. Helper to Compile Skill
function Compile-Skill($headerPath) {
    if (-not (Test-Path $headerPath)) { throw "Header not found: $headerPath" }
    $header = Get-Content $headerPath -Raw
    $coreFM = Get-Content $coreFrontmatterPath -Raw
    $corePatterns = Get-Content $corePatternsPath -Raw
    
    $full = $header.Replace("<<<<[CORE_FRONTMATTER]>>>>", $coreFM)
    $full = $full + "`n" + $corePatterns
    return $full
}

# 3. Compile Standard and Professional
Write-Host "Compiling Standard Humanizer..."
$standardContent = Compile-Skill $humanHeaderPath
Set-Content -Path "SKILL.md" -Value $standardContent -NoNewline

Write-Host "Compiling Humanizer Pro..."
$proContent = Compile-Skill $proHeaderPath
Set-Content -Path "SKILL_PROFESSIONAL.md" -Value $proContent -NoNewline

# Parse Versions
$vStandard = ([regex]::Match($standardContent, '(?m)^version:\s*([\w.-]+)\s*$')).Groups[1].Value
$vPro = ([regex]::Match($proContent, '(?m)^version:\s*([\w.-]+)\s*$')).Groups[1].Value
$today = Get-Date -Format "yyyy-MM-dd"

Write-Host "Standard Version: $vStandard"
Write-Host "Pro Version: $vPro"

# 4. Sync Adapters
$adapters = @(
    @{ Name = "Antigravity Skill Standard"; Path = "adapters/antigravity-skill/SKILL.md"; Source = $standardContent; ID = "antigravity-skill"; Format = "Antigravity skill"; Base = "SKILL.md" },
    @{ Name = "Antigravity Skill Pro"; Path = "adapters/antigravity-skill/SKILL_PROFESSIONAL.md"; Source = $proContent; ID = "antigravity-skill-pro"; Format = "Antigravity skill"; Base = "SKILL_PROFESSIONAL.md" },
    @{ Name = "Gemini Extension Standard"; Path = "adapters/gemini-extension/GEMINI.md"; Source = $standardContent; ID = "gemini-extension"; Format = "Gemini extension"; Base = "SKILL.md" },
    @{ Name = "Gemini Extension Pro"; Path = "adapters/gemini-extension/GEMINI_PRO.md"; Source = $proContent; ID = "gemini-extension-pro"; Format = "Gemini extension"; Base = "SKILL_PROFESSIONAL.md" },
    @{ Name = "Rules Workflows Standard"; Path = "adapters/antigravity-rules-workflows/README.md"; Source = $standardContent; ID = "antigravity-rules-workflows"; Format = "Antigravity rules/workflows"; Base = "SKILL.md" },
    @{ Name = "Qwen CLI Standard"; Path = "adapters/qwen-cli/QWEN.md"; Source = $standardContent; ID = "qwen-cli"; Format = "Qwen CLI context"; Base = "SKILL.md" },
    @{ Name = "Copilot Standard"; Path = "adapters/copilot/COPILOT.md"; Source = $standardContent; ID = "copilot"; Format = "Copilot instructions"; Base = "SKILL.md" },
    @{ Name = "VSCode Standard"; Path = "adapters/vscode/HUMANIZER.md"; Source = $standardContent; ID = "vscode"; Format = "VSCode markdown"; Base = "SKILL.md" }
)

foreach ($adapter in $adapters) {
    Write-Host "Syncing $($adapter.Name)..."
    $skillName = ([regex]::Match($adapter.Source, '(?m)^name:\s*([\w.-]+)\s*$')).Groups[1].Value
    $skillVersion = ([regex]::Match($adapter.Source, '(?m)^version:\s*([\w.-]+)\s*$')).Groups[1].Value
    
    $metaBlock = @"
---
adapter_metadata:
  skill_name: $skillName
  skill_version: $skillVersion
  last_synced: $today
  source_path: $($adapter.Base)
  adapter_id: $($adapter.ID)
  adapter_format: $($adapter.Format)
---

"@
    $newContent = $metaBlock + "`n" + $adapter.Source
    Set-Content -Path $adapter.Path -Value $newContent -NoNewline
}

Write-Host "Sync Complete."
