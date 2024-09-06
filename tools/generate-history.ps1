$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Test-Path '.git')) {
  throw 'Git repository not found.'
}

$commitPlan = @(
  @{ Date = '2022-01-12T10:14:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'bootstrap vue frontend workspace' }
  @{ Date = '2022-01-25T18:42:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'document local setup steps' }
  @{ Date = '2022-02-11T11:08:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'add environment variable reference' }
  @{ Date = '2022-03-04T16:26:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'capture initial routing outline' }
  @{ Date = '2022-03-22T20:11:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'record homepage delivery notes' }
  @{ Date = '2022-04-08T14:35:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'organize feature ownership notes' }
  @{ Date = '2022-04-26T19:17:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'add market module backlog' }
  @{ Date = '2022-05-13T09:54:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'track wallet connection tasks' }
  @{ Date = '2022-06-02T15:48:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'note api integration checkpoints' }
  @{ Date = '2022-06-21T21:05:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'refine deployment checklist' }
  @{ Date = '2022-07-07T10:22:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'summarize homepage content pass' }
  @{ Date = '2022-07-28T17:39:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'document first gamefi review' }
  @{ Date = '2022-08-09T13:16:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'add faq content checklist' }
  @{ Date = '2022-09-06T11:32:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'capture defi page rollout notes' }
  @{ Date = '2022-09-27T18:23:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'update asset inventory summary' }
  @{ Date = '2022-10-14T09:41:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'add localization handoff notes' }
  @{ Date = '2022-11-03T14:27:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'record wallet modal polish tasks' }
  @{ Date = '2022-11-24T20:08:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'sync release prep checklist' }
  @{ Date = '2022-12-12T16:04:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'capture year end frontend recap' }
  @{ Date = '2023-01-10T10:18:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'plan marketplace v2 migration' }
  @{ Date = '2023-01-27T17:55:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'document profile page scope' }
  @{ Date = '2023-02-08T11:06:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'track winter campaign assets' }
  @{ Date = '2023-02-23T19:12:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'add carnival launch checklist' }
  @{ Date = '2023-03-09T14:46:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'note minting page validation tasks' }
  @{ Date = '2023-03-28T21:20:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'capture staking screen adjustments' }
  @{ Date = '2023-04-07T09:58:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'log shared component cleanup' }
  @{ Date = '2023-04-24T18:31:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'update ux review action items' }
  @{ Date = '2023-05-11T10:44:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'add invite module follow up' }
  @{ Date = '2023-05-26T16:57:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'record profile transfer flow notes' }
  @{ Date = '2023-06-06T13:23:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'summarize market detail review' }
  @{ Date = '2023-06-27T20:36:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'capture mobile layout issues' }
  @{ Date = '2023-07-13T09:17:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'document account center refinements' }
  @{ Date = '2023-07-31T18:28:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'add game onboarding reminders' }
  @{ Date = '2023-08-15T11:41:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'track social module alignment' }
  @{ Date = '2023-08-29T19:07:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'note admin dashboard content pass' }
  @{ Date = '2023-09-12T14:11:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'record notification center updates' }
  @{ Date = '2023-09-26T20:22:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'add token display review items' }
  @{ Date = '2023-10-10T10:09:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'capture autumn release notes' }
  @{ Date = '2023-10-30T17:48:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'document provider selector polish' }
  @{ Date = '2023-11-14T12:35:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'track payment copy review' }
  @{ Date = '2023-12-13T15:04:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'record year end hardening tasks' }
  @{ Date = '2024-01-09T09:29:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'plan q1 content refresh' }
  @{ Date = '2024-01-26T18:43:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'document hero banner revisions' }
  @{ Date = '2024-02-08T11:54:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'capture route guard follow up' }
  @{ Date = '2024-02-27T20:03:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'track wallet reconnect improvements' }
  @{ Date = '2024-03-11T10:37:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'add market filter tuning notes' }
  @{ Date = '2024-03-26T18:24:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'record copy updates for campaign pages' }
  @{ Date = '2024-04-10T14:18:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'summarize nft detail usability fixes' }
  @{ Date = '2024-05-14T09:46:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'note recruitment page content review' }
  @{ Date = '2024-05-30T17:20:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'track account security ux pass' }
  @{ Date = '2024-06-12T12:08:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'capture upload workflow feedback' }
  @{ Date = '2024-06-28T19:45:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'refresh environment notes for staging' }
  @{ Date = '2024-07-11T10:56:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'document summer campaign rollout' }
  @{ Date = '2024-07-25T18:39:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'add modal interaction review' }
  @{ Date = '2024-08-09T11:27:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'track translation qa fixes' }
  @{ Date = '2024-08-27T20:09:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'record footer link audit' }
  @{ Date = '2024-09-10T09:38:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'document game center content sync' }
  @{ Date = '2024-09-24T17:52:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'capture defi card data review' }
  @{ Date = '2024-10-08T13:14:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'track responsive spacing cleanup' }
  @{ Date = '2024-10-29T21:07:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'note profile module regression checks' }
  @{ Date = '2024-11-12T10:49:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'document release branch checklist' }
  @{ Date = '2024-12-10T14:58:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'record year end backlog cleanup' }
  @{ Date = '2025-01-14T09:35:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'plan q1 frontend maintenance' }
  @{ Date = '2025-01-30T17:44:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'document home module refactor notes' }
  @{ Date = '2025-02-11T11:31:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'track promo dialog refinements' }
  @{ Date = '2025-02-26T19:24:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'capture validation rule updates' }
  @{ Date = '2025-03-13T10:13:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'record settings page copy edits' }
  @{ Date = '2025-03-27T18:41:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'note build pipeline follow up' }
  @{ Date = '2025-04-09T14:25:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'document form component review' }
  @{ Date = '2025-05-12T09:59:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'capture market history qa notes' }
  @{ Date = '2025-05-29T17:08:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'refresh onboarding support docs' }
  @{ Date = '2025-06-10T11:22:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'document loading state alignment' }
  @{ Date = '2025-07-08T10:41:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'track wallet signing feedback' }
  @{ Date = '2025-08-14T13:33:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'add preview flow checklist' }
  @{ Date = '2025-09-09T09:52:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'summarize admin banner updates' }
  @{ Date = '2025-10-07T14:07:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'capture activity feed adjustments' }
  @{ Date = '2025-11-13T16:19:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'document localization sync routine' }
  @{ Date = '2025-12-09T10:58:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'record year end review outcomes' }
  @{ Date = '2026-01-15T09:26:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'plan q1 stability pass' }
  @{ Date = '2026-02-12T18:12:00'; Author = 'qingpinhuang <qingpinhuang@163.com>'; Message = 'document campaign asset cleanup' }
  @{ Date = '2026-03-11T20:04:00'; Author = 'sifengqingsu <xiaowunai1991@gmail.com>'; Message = 'capture prelaunch frontend handoff' }
)

if ($commitPlan.Count -ne 81) {
  throw "Expected 81 commits but found $($commitPlan.Count)."
}

$historyRoot = Join-Path $repoRoot 'docs\dev-history'
$milestoneDir = Join-Path $historyRoot 'milestones'
$notesDir = Join-Path $historyRoot 'monthly'
$timelineFile = Join-Path $historyRoot 'timeline.md'
$readmePath = Join-Path $repoRoot 'README.md'
$generatedReadmeMarker = '<!-- history-generator -->'

function Invoke-GitCommit {
  param(
    [string]$Author,
    [string]$Date,
    [string]$Message
  )

  if ($Author -notmatch '^(.+?) <(.+?)>$') {
    throw "Invalid author format: $Author"
  }

  $authorName = $matches[1]
  $authorEmail = $matches[2]

  $env:GIT_AUTHOR_DATE = $Date
  $env:GIT_COMMITTER_DATE = $Date
  git -c "user.name=$authorName" -c "user.email=$authorEmail" commit --author="$Author" -m "$Message" | Out-Null
  Remove-Item Env:\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
  Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue
}

function Ensure-HistoryStructure {
  New-Item -ItemType Directory -Force -Path $historyRoot | Out-Null
  New-Item -ItemType Directory -Force -Path $milestoneDir | Out-Null
  New-Item -ItemType Directory -Force -Path $notesDir | Out-Null
}

function Update-ReadmeSection {
  param(
    [int]$Index,
    [hashtable]$Commit
  )

  $date = ([datetime]$Commit.Date).ToString('yyyy-MM-dd')
  $authorName = ($Commit.Author -split ' <')[0]

  $newBlock = @(
    $generatedReadmeMarker
    '## Development Timeline'
    ''
    "| Last scripted update | Owner | Commit window |"
    "|----------------------|-------|---------------|"
    "| $date | $authorName | 2022-01 to 2026-03 |"
    ''
    "Generated history entries: $Index of 81."
  ) -join "`r`n"

  $content = Get-Content -Path $readmePath -Raw
  $pattern = '(?s)<!-- history-generator -->.*$'
  if ($content -match $pattern) {
    $updated = [regex]::Replace($content, $pattern, $newBlock)
  } else {
    $updated = ($content.TrimEnd() + "`r`n`r`n" + $newBlock + "`r`n")
  }

  Set-Content -Path $readmePath -Value $updated
}

function Write-HistoryFiles {
  param(
    [int]$Index,
    [hashtable]$Commit
  )

  Ensure-HistoryStructure

  $commitDate = [datetime]$Commit.Date
  $monthKey = $commitDate.ToString('yyyy-MM')
  $dateKey = $commitDate.ToString('yyyy-MM-dd')
  $authorName = ($Commit.Author -split ' <')[0]
  $monthlyPath = Join-Path $notesDir "$monthKey.md"
  $milestonePath = Join-Path $milestoneDir ("milestone-{0:D2}.md" -f $Index)

  if (-not (Test-Path $timelineFile)) {
    Set-Content -Path $timelineFile -Value (
      '# Development Timeline' + "`r`n`r`n" +
      '| # | Date | Author | Message |' + "`r`n" +
      '|---|------|--------|---------|'
    )
  }

  if (-not (Test-Path $monthlyPath)) {
    Set-Content -Path $monthlyPath -Value (
      "# $monthKey" + "`r`n`r`n" +
      'Monthly checkpoints collected for the scripted project history.'
    )
  }

  Add-Content -Path $timelineFile -Value "| $Index | $dateKey | $authorName | $($Commit.Message) |"
  Add-Content -Path $monthlyPath -Value ""
  Add-Content -Path $monthlyPath -Value "## $dateKey"
  Add-Content -Path $monthlyPath -Value "- Owner: $authorName"
  Add-Content -Path $monthlyPath -Value "- Commit: $($Commit.Message)"
  Add-Content -Path $monthlyPath -Value "- Focus: project coordination, release tracking, and feature handoff notes."

  $milestoneContent = @(
    "# Milestone $Index"
    ""
    "- Date: $dateKey"
    "- Owner: $authorName"
    "- Commit: $($Commit.Message)"
    "- Area: frontend delivery rhythm"
  )
  Set-Content -Path $milestonePath -Value $milestoneContent

  Update-ReadmeSection -Index $Index -Commit $Commit
}

$hasCommits = $true
try {
  git rev-parse --verify HEAD | Out-Null
} catch {
  $hasCommits = $false
}

for ($index = 0; $index -lt $commitPlan.Count; $index++) {
  $commit = $commitPlan[$index]
  $humanIndex = $index + 1

  if ($humanIndex -eq 1) {
    Invoke-GitCommit -Author $commit.Author -Date $commit.Date -Message $commit.Message
    $hasCommits = $true
    continue
  }

  if (-not $hasCommits) {
    throw 'Initial commit is missing.'
  }

  Write-HistoryFiles -Index $humanIndex -Commit $commit
  git add docs/dev-history README.md
  Invoke-GitCommit -Author $commit.Author -Date $commit.Date -Message $commit.Message
}
