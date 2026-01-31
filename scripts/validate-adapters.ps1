$ErrorActionPreference = "Stop"

function Get-SkillMeta($path) {
    if (-not (Test-Path $path)) { return $null }
    $content = Get-Content -Path $path -Raw
    $name = ([regex]::Match($content, '(?m)^name:\s*([\w.-]+)\s*$')).Groups[1].Value
    $version = ([regex]::Match($content, '(?m)^version:\s*([\w.-]+)\s*$')).Groups[1].Value
    return @{ Name = $name; Version = $version; Path = $path }
}

$standardMeta = Get-SkillMeta "SKILL.md"
$proMeta = Get-SkillMeta "SKILL_PROFESSIONAL.md"

if ($null -eq $standardMeta -or $null -eq $proMeta) {
    Write-Error "Could not find source skill files (SKILL.md / SKILL_PROFESSIONAL.md)"
    exit 1
}

$adapters = @(
    @{ Path = "adapters/antigravity-skill/SKILL.md"; Source = "SKILL.md"; Meta = $standardMeta },
    @{ Path = "adapters/antigravity-skill/SKILL_PROFESSIONAL.md"; Source = "SKILL_PROFESSIONAL.md"; Meta = $proMeta },
    @{ Path = "adapters/gemini-extension/GEMINI.md"; Source = "SKILL.md"; Meta = $standardMeta },
    @{ Path = "adapters/gemini-extension/GEMINI_PRO.md"; Source = "SKILL_PROFESSIONAL.md"; Meta = $proMeta },
    @{ Path = "adapters/vscode/HUMANIZER.md"; Source = "SKILL.md"; Meta = $standardMeta },
    @{ Path = "adapters/antigravity-rules-workflows/README.md"; Source = "SKILL.md"; Meta = $standardMeta },
    @{ Path = "adapters/qwen-cli/QWEN.md"; Source = "SKILL.md"; Meta = $standardMeta },
    @{ Path = "adapters/copilot/COPILOT.md"; Source = "SKILL.md"; Meta = $standardMeta },
    @{ Path = "AGENTS.md"; Source = "SKILL.md"; Meta = $standardMeta }
)

$errors = @()
foreach ($entry in $adapters) {
    $file = $entry.Path
    if (-not (Test-Path $file)) {
        $errors += "Missing adapter file: $file"
        continue
    }
    
    $content = Get-Content -Path $file -Raw
    $targetMeta = $entry.Meta
    
    # Check skill_name
    if ($content -notmatch "skill_name:\s*$($targetMeta.Name)") {
        $errors += "${file}: skill_name mismatch (expected $($targetMeta.Name))"
    }
    
    # Check skill_version
    if ($content -notmatch "skill_version:\s*$($targetMeta.Version)") {
        $errors += "${file}: skill_version mismatch (expected $($targetMeta.Version))"
    }
    
    # Check source_path
    if ($content -notmatch "source_path:\s*$($entry.Source)") {
        $errors += "${file}: source_path mismatch (expected $($entry.Source))"
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Output "All adapters validated successfully."
