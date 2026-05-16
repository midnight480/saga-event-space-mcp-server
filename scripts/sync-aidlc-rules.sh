#!/usr/bin/env bash
# =============================================================================
# sync-aidlc-rules.sh
# 
# AI-DLC ルール定義の同期スクリプト
# 
# このスクリプトは .kiro/steering/aws-aidlc-rules/core-workflow.md を
# ソースオブトゥルースとして、各AIエージェント用の設定ファイルを生成・同期します。
#
# 対象エージェント:
#   - OpenAI Codex CLI (AGENTS.md)
#   - Claude Code (CLAUDE.md)
#   - Gemini CLI (GEMINI.md)
#   - Google Antigravity (.agents/rules/ + .agents/workflows/)
#   - Kiro IDE (.kiro/steering/ — ソース、変更不要)
#
# 使い方:
#   ./scripts/sync-aidlc-rules.sh [--check] [--verbose]
#
# オプション:
#   --check    差分チェックのみ（ファイル更新なし）。CIで使用。
#   --verbose  詳細出力
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

CHECK_ONLY=false
VERBOSE=false

for arg in "$@"; do
  case $arg in
    --check) CHECK_ONLY=true ;;
    --verbose) VERBOSE=true ;;
    *) echo "Unknown option: $arg"; exit 1 ;;
  esac
done

log() {
  if [ "$VERBOSE" = true ]; then
    echo -e "${GREEN}[sync]${NC} $1"
  fi
}

warn() {
  echo -e "${YELLOW}[warn]${NC} $1"
}

error() {
  echo -e "${RED}[error]${NC} $1"
}

# =============================================================================
# Step 1: Verify source exists
# =============================================================================

RULE_DETAILS_SOURCE="$PROJECT_ROOT/.kiro/aws-aidlc-rule-details"
CORE_WORKFLOW_SOURCE="$PROJECT_ROOT/.kiro/steering/aws-aidlc-rules/core-workflow.md"

if [ ! -d "$RULE_DETAILS_SOURCE" ]; then
  error "Rule details source not found: $RULE_DETAILS_SOURCE"
  exit 1
fi

if [ ! -f "$CORE_WORKFLOW_SOURCE" ]; then
  error "Core workflow source not found: $CORE_WORKFLOW_SOURCE"
  exit 1
fi

log "Source verified: $RULE_DETAILS_SOURCE"
log "Core workflow: $CORE_WORKFLOW_SOURCE"

# =============================================================================
# Step 2: Ensure symlink exists
# =============================================================================

SYMLINK_TARGET="$PROJECT_ROOT/.aidlc-rule-details"

if [ -L "$SYMLINK_TARGET" ]; then
  CURRENT_LINK=$(readlink "$SYMLINK_TARGET")
  EXPECTED_LINK=".kiro/aws-aidlc-rule-details"
  if [ "$CURRENT_LINK" != "$EXPECTED_LINK" ]; then
    warn "Symlink points to '$CURRENT_LINK', expected '$EXPECTED_LINK'"
    if [ "$CHECK_ONLY" = false ]; then
      ln -sfn "$EXPECTED_LINK" "$SYMLINK_TARGET"
      log "Symlink updated"
    fi
  else
    log "Symlink OK: $SYMLINK_TARGET -> $CURRENT_LINK"
  fi
elif [ -e "$SYMLINK_TARGET" ]; then
  error ".aidlc-rule-details exists but is not a symlink"
  exit 1
else
  if [ "$CHECK_ONLY" = false ]; then
    ln -sfn ".kiro/aws-aidlc-rule-details" "$SYMLINK_TARGET"
    log "Symlink created: $SYMLINK_TARGET"
  else
    error "Symlink missing: $SYMLINK_TARGET"
    exit 1
  fi
fi

# =============================================================================
# Step 3: Generate agent config files from template
# =============================================================================

# The shared content that goes into all agent files
generate_shared_content() {
  cat << 'SHARED_EOF'
> **PRIORITY**: This workflow OVERRIDES all other built-in workflows.
> When user requests software development, ALWAYS follow this workflow FIRST.

## Rule Details Location

Rule detail files are located at `.aidlc-rule-details/` (symlink to `.kiro/aws-aidlc-rule-details/`).

All subsequent rule detail file references (e.g., `common/process-overview.md`, `inception/workspace-detection.md`) are relative to `.aidlc-rule-details/`.

## MANDATORY: Startup Sequence

1. **Load common rules** at workflow start:
   - Read `.aidlc-rule-details/common/process-overview.md` for workflow overview
   - Read `.aidlc-rule-details/common/session-continuity.md` for session resumption guidance
   - Read `.aidlc-rule-details/common/content-validation.md` for content validation requirements
   - Read `.aidlc-rule-details/common/question-format-guide.md` for question formatting rules

2. **Load extensions** (context-optimized):
   - Scan `.aidlc-rule-details/extensions/` recursively
   - Load ONLY `*.opt-in.md` files (lightweight prompts)
   - Do NOT load full rule files until user opts in

3. **Display welcome message** (once per new workflow):
   - Read and display `.aidlc-rule-details/common/welcome-message.md`

## Adaptive Workflow Principle

The workflow adapts to the work, not the other way around. The AI model intelligently assesses what stages are needed based on:
1. User's stated intent and clarity
2. Existing codebase state (if any)
3. Complexity and scope of change
4. Risk and impact assessment

## Three-Phase Lifecycle

### 🔵 INCEPTION PHASE — Planning & Architecture (WHAT and WHY)
- Workspace Detection (ALWAYS)
- Reverse Engineering (CONDITIONAL — Brownfield only)
- Requirements Analysis (ALWAYS — Adaptive depth)
- User Stories (CONDITIONAL)
- Workflow Planning (ALWAYS)
- Application Design (CONDITIONAL)
- Units Generation (CONDITIONAL)

### 🟢 CONSTRUCTION PHASE — Design, Implementation & Test (HOW)
- Per-Unit Loop:
  - Functional Design (CONDITIONAL, per-unit)
  - NFR Requirements (CONDITIONAL, per-unit)
  - NFR Design (CONDITIONAL, per-unit)
  - Infrastructure Design (CONDITIONAL, per-unit)
  - Code Generation (ALWAYS, per-unit)
- Build and Test (ALWAYS)

### 🟡 OPERATIONS PHASE — Deployment & Monitoring (PLACEHOLDER)
- Operations (PLACEHOLDER for future expansion)

## Stage Execution Rules

For each stage, you MUST:
1. Read the corresponding rule detail file (e.g., `inception/workspace-detection.md`)
2. Follow ALL steps defined in that file
3. Log ALL user inputs in `aidlc-docs/audit.md` with ISO 8601 timestamps
4. Wait for explicit user approval before proceeding (except Workspace Detection)
5. Update `aidlc-docs/aidlc-state.md` with progress

## MANDATORY: Audit Trail

- Log EVERY user input with timestamp in `aidlc-docs/audit.md`
- Capture user's COMPLETE RAW INPUT exactly as provided (never summarize)
- ALWAYS append to audit.md, NEVER overwrite its contents
- Use ISO 8601 format for timestamps

## MANDATORY: Question Format

- NEVER ask questions directly in chat
- ALL questions must be placed in dedicated `.md` files
- Use multiple choice format (A, B, C, D, E options)
- ALWAYS include "Other" as the LAST option
- Use `[Answer]:` tag for user responses

## MANDATORY: Content Validation

Before creating ANY file:
- Validate Mermaid diagram syntax
- Validate ASCII art diagrams (basic ASCII only: `+` `-` `|` `^` `v` `<` `>`)
- Escape special characters properly
- Provide text alternatives for complex visual content

## MANDATORY: Plan-Level Checkbox Enforcement

1. NEVER complete any work without updating plan checkboxes
2. IMMEDIATELY after completing ANY step, mark that step `[x]`
3. This must happen in the SAME interaction where the work is completed

## Construction Phase Completion Messages

Construction phases MUST use standardized 2-option completion messages:
- 🔧 **Request Changes**
- ✅ **Continue to Next Stage**

DO NOT create 3-option menus or other emergent navigation patterns.

## Extension Enforcement

- Extension rules are hard constraints, not optional guidance
- Non-compliance with any applicable enabled extension rule is a **blocking finding**
- Check extension `Enabled` status in `aidlc-docs/aidlc-state.md` under `## Extension Configuration`

## Directory Structure

```
<WORKSPACE-ROOT>/                   # Application code HERE
├── [project-specific structure]
├── aidlc-docs/                     # Documentation ONLY
│   ├── inception/
│   │   ├── plans/
│   │   ├── reverse-engineering/
│   │   ├── requirements/
│   │   ├── user-stories/
│   │   └── application-design/
│   ├── construction/
│   │   ├── plans/
│   │   ├── {unit-name}/
│   │   └── build-and-test/
│   ├── operations/
│   ├── aidlc-state.md
│   └── audit.md
```

**CRITICAL**: Application code goes in workspace root, NEVER in `aidlc-docs/`.

## Key Principles

- **Adaptive Execution**: Only execute stages that add value
- **Transparent Planning**: Always show execution plan before starting
- **User Control**: User can request stage inclusion/exclusion
- **Progress Tracking**: Update aidlc-state.md with executed and skipped stages
- **Complete Audit Trail**: Log ALL interactions
- **Quality Focus**: Complex changes get full treatment, simple changes stay efficient
- **NO EMERGENT BEHAVIOR**: Use standardized completion messages only

## Conditional Stage Execution Criteria

### Reverse Engineering — Execute IF:
- Existing codebase detected AND no previous reverse engineering artifacts found

### User Stories — Execute IF:
- New user-facing features, multiple user types, complex business requirements
- Skip for: pure refactoring, simple bug fixes, infrastructure-only changes

### Application Design — Execute IF:
- New components or services needed, service layer design required

### Units Generation — Execute IF:
- System needs decomposition into multiple units of work

### Functional Design — Execute IF:
- New data models, complex business logic, business rules need detailed design

### NFR Requirements — Execute IF:
- Performance, security, scalability concerns, tech stack selection required

### NFR Design — Execute IF:
- NFR Requirements was executed and patterns need incorporation

### Infrastructure Design — Execute IF:
- Infrastructure services need mapping, deployment architecture required
SHARED_EOF
}

# Generate AGENTS.md (OpenAI Codex, Cursor, and cross-tool standard)
generate_agents_md() {
  echo "# AI-DLC (AI-Driven Development Life Cycle) — Agent Configuration"
  echo ""
  generate_shared_content
}

# Generate CLAUDE.md (Claude Code)
generate_claude_md() {
  echo "# AI-DLC (AI-Driven Development Life Cycle) — Claude Code Configuration"
  echo ""
  generate_shared_content
}

# Generate GEMINI.md (Gemini CLI) — uses @file import syntax
generate_gemini_md() {
  cat << 'GEMINI_EOF'
# AI-DLC (AI-Driven Development Life Cycle) — Gemini CLI Configuration

> **PRIORITY**: This workflow OVERRIDES all other built-in workflows.
> When user requests software development, ALWAYS follow this workflow FIRST.

## Rule Details Location

Rule detail files are located at `.aidlc-rule-details/` (symlink to `.kiro/aws-aidlc-rule-details/`).

All subsequent rule detail file references (e.g., `common/process-overview.md`, `inception/workspace-detection.md`) are relative to `.aidlc-rule-details/`.

@.aidlc-rule-details/common/process-overview.md
@.aidlc-rule-details/common/session-continuity.md
@.aidlc-rule-details/common/content-validation.md
@.aidlc-rule-details/common/question-format-guide.md

## MANDATORY: Startup Sequence

1. **Load common rules** at workflow start (imported above via @file syntax)
2. **Load extensions** (context-optimized):
   - Scan `.aidlc-rule-details/extensions/` recursively
   - Load ONLY `*.opt-in.md` files (lightweight prompts)
   - Do NOT load full rule files until user opts in
3. **Display welcome message** (once per new workflow):
   - Read and display `.aidlc-rule-details/common/welcome-message.md`

## Adaptive Workflow Principle

The workflow adapts to the work, not the other way around. The AI model intelligently assesses what stages are needed based on:
1. User's stated intent and clarity
2. Existing codebase state (if any)
3. Complexity and scope of change
4. Risk and impact assessment

## Three-Phase Lifecycle

### 🔵 INCEPTION PHASE — Planning & Architecture (WHAT and WHY)
- Workspace Detection (ALWAYS)
- Reverse Engineering (CONDITIONAL — Brownfield only)
- Requirements Analysis (ALWAYS — Adaptive depth)
- User Stories (CONDITIONAL)
- Workflow Planning (ALWAYS)
- Application Design (CONDITIONAL)
- Units Generation (CONDITIONAL)

### 🟢 CONSTRUCTION PHASE — Design, Implementation & Test (HOW)
- Per-Unit Loop:
  - Functional Design (CONDITIONAL, per-unit)
  - NFR Requirements (CONDITIONAL, per-unit)
  - NFR Design (CONDITIONAL, per-unit)
  - Infrastructure Design (CONDITIONAL, per-unit)
  - Code Generation (ALWAYS, per-unit)
- Build and Test (ALWAYS)

### 🟡 OPERATIONS PHASE — Deployment & Monitoring (PLACEHOLDER)
- Operations (PLACEHOLDER for future expansion)

## Stage Execution Rules

For each stage, you MUST:
1. Read the corresponding rule detail file (e.g., `inception/workspace-detection.md`)
2. Follow ALL steps defined in that file
3. Log ALL user inputs in `aidlc-docs/audit.md` with ISO 8601 timestamps
4. Wait for explicit user approval before proceeding (except Workspace Detection)
5. Update `aidlc-docs/aidlc-state.md` with progress

## MANDATORY: Audit Trail

- Log EVERY user input with timestamp in `aidlc-docs/audit.md`
- Capture user's COMPLETE RAW INPUT exactly as provided (never summarize)
- ALWAYS append to audit.md, NEVER overwrite its contents
- Use ISO 8601 format for timestamps

## MANDATORY: Question Format

- NEVER ask questions directly in chat
- ALL questions must be placed in dedicated `.md` files
- Use multiple choice format (A, B, C, D, E options)
- ALWAYS include "Other" as the LAST option
- Use `[Answer]:` tag for user responses

## MANDATORY: Content Validation

Before creating ANY file:
- Validate Mermaid diagram syntax
- Validate ASCII art diagrams (basic ASCII only: `+` `-` `|` `^` `v` `<` `>`)
- Escape special characters properly
- Provide text alternatives for complex visual content

## MANDATORY: Plan-Level Checkbox Enforcement

1. NEVER complete any work without updating plan checkboxes
2. IMMEDIATELY after completing ANY step, mark that step `[x]`
3. This must happen in the SAME interaction where the work is completed

## Construction Phase Completion Messages

Construction phases MUST use standardized 2-option completion messages:
- 🔧 **Request Changes**
- ✅ **Continue to Next Stage**

DO NOT create 3-option menus or other emergent navigation patterns.

## Extension Enforcement

- Extension rules are hard constraints, not optional guidance
- Non-compliance with any applicable enabled extension rule is a **blocking finding**
- Check extension `Enabled` status in `aidlc-docs/aidlc-state.md` under `## Extension Configuration`

## Directory Structure

```
<WORKSPACE-ROOT>/                   # Application code HERE
├── [project-specific structure]
├── aidlc-docs/                     # Documentation ONLY
│   ├── inception/
│   │   ├── plans/
│   │   ├── reverse-engineering/
│   │   ├── requirements/
│   │   ├── user-stories/
│   │   └── application-design/
│   ├── construction/
│   │   ├── plans/
│   │   ├── {unit-name}/
│   │   └── build-and-test/
│   ├── operations/
│   ├── aidlc-state.md
│   └── audit.md
```

**CRITICAL**: Application code goes in workspace root, NEVER in `aidlc-docs/`.

## Key Principles

- **Adaptive Execution**: Only execute stages that add value
- **Transparent Planning**: Always show execution plan before starting
- **User Control**: User can request stage inclusion/exclusion
- **Progress Tracking**: Update aidlc-state.md with executed and skipped stages
- **Complete Audit Trail**: Log ALL interactions
- **Quality Focus**: Complex changes get full treatment, simple changes stay efficient
- **NO EMERGENT BEHAVIOR**: Use standardized completion messages only

## Conditional Stage Execution Criteria

### Reverse Engineering — Execute IF:
- Existing codebase detected AND no previous reverse engineering artifacts found

### User Stories — Execute IF:
- New user-facing features, multiple user types, complex business requirements
- Skip for: pure refactoring, simple bug fixes, infrastructure-only changes

### Application Design — Execute IF:
- New components or services needed, service layer design required

### Units Generation — Execute IF:
- System needs decomposition into multiple units of work

### Functional Design — Execute IF:
- New data models, complex business logic, business rules need detailed design

### NFR Requirements — Execute IF:
- Performance, security, scalability concerns, tech stack selection required

### NFR Design — Execute IF:
- NFR Requirements was executed and patterns need incorporation

### Infrastructure Design — Execute IF:
- Infrastructure services need mapping, deployment architecture required
GEMINI_EOF
}

# =============================================================================
# Step 4: Write or check files
# =============================================================================

DIFF_FOUND=false

check_or_write() {
  local target_file="$1"
  local generator_func="$2"
  local generated_content
  generated_content=$($generator_func)

  if [ -f "$target_file" ]; then
    local current_content
    current_content=$(cat "$target_file")
    if [ "$generated_content" = "$current_content" ]; then
      log "✓ $target_file is up to date"
      return 0
    else
      if [ "$CHECK_ONLY" = true ]; then
        warn "✗ $target_file is out of sync"
        DIFF_FOUND=true
        return 0
      else
        echo "$generated_content" > "$target_file"
        echo -e "${GREEN}✓${NC} Updated: $target_file"
        return 0
      fi
    fi
  else
    if [ "$CHECK_ONLY" = true ]; then
      warn "✗ $target_file does not exist"
      DIFF_FOUND=true
      return 0
    else
      echo "$generated_content" > "$target_file"
      echo -e "${GREEN}✓${NC} Created: $target_file"
      return 0
    fi
  fi
}

check_or_write "$PROJECT_ROOT/AGENTS.md" generate_agents_md
check_or_write "$PROJECT_ROOT/CLAUDE.md" generate_claude_md
check_or_write "$PROJECT_ROOT/GEMINI.md" generate_gemini_md

# =============================================================================
# Step 5: Report results
# =============================================================================

if [ "$CHECK_ONLY" = true ]; then
  if [ "$DIFF_FOUND" = true ]; then
    echo ""
    error "Agent config files are out of sync!"
    echo "  Run: ./scripts/sync-aidlc-rules.sh"
    exit 1
  else
    echo -e "${GREEN}All agent config files are in sync.${NC}"
    exit 0
  fi
else
  echo ""
  echo -e "${GREEN}Sync complete.${NC} Files updated:"
  echo "  • AGENTS.md    (OpenAI Codex, Cursor, cross-tool standard)"
  echo "  • CLAUDE.md    (Claude Code)"
  echo "  • GEMINI.md    (Gemini CLI)"
  echo "  • .aidlc-rule-details -> .kiro/aws-aidlc-rule-details (symlink)"
  echo ""
  echo "Manually maintained (not auto-generated):"
  echo "  • .agents/rules/      (Google Antigravity — rules)"
  echo "  • .agents/workflows/  (Google Antigravity — workflows)"
  echo "  • .agents/skills/     (Google Antigravity — skills)"
  echo ""
  echo "Source of truth: .kiro/steering/aws-aidlc-rules/core-workflow.md"
  echo "Rule details:    .kiro/aws-aidlc-rule-details/"
fi
