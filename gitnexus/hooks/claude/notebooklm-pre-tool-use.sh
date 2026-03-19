#!/bin/bash
# NotebookLM PreToolUse hook for Claude Code
# Enhances research and analysis tools with NotebookLM capabilities
# Receives JSON on stdin with { tool_name, tool_input, cwd, ... }
# Returns JSON with additionalContext for enhanced results

INPUT=$(cat)

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty' 2>/dev/null)
CWD=$(echo "$INPUT" | jq -r '.cwd // empty' 2>/dev/null)

# Extract research/analysis patterns
PATTERN=""
CONTENT_TYPE=""

case "$TOOL_NAME" in
  # Research and analysis tools
  "grep_search"|"ripgrep_search")
    PATTERN=$(echo "$INPUT" | jq -r '.tool_input.pattern // empty' 2>/dev/null)
    CONTENT_TYPE="code_search"
    ;;
  "read_file")
    FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.path // empty' 2>/dev/null)
    if [[ "$FILE_PATH" =~ \.(md|txt|pdf|docx)$ ]]; then
      CONTENT_TYPE="document_analysis"
      PATTERN="document_content"
    fi
    ;;
  "run_terminal_cmd")
    CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
    if echo "$CMD" | grep -qE "(research|analyze|study|investigate)"; then
      CONTENT_TYPE="research_task"
      PATTERN=$(echo "$CMD" | sed 's/.*\(research\|analyze\|study\|investigate\)\s*//')
    fi
    ;;
  *)
    # Not a research/analysis tool — skip
    exit 0
    ;;
esac

# Skip if no relevant pattern detected
if [ -z "$PATTERN" ] && [ -z "$CONTENT_TYPE" ]; then
  exit 0
fi

# Check if we're in a project that could benefit from NotebookLM
dir="${CWD:-$PWD}"
research_indicators=false

# Look for research/documentation indicators
if [ -d "$dir/docs" ] || [ -d "$dir/research" ] || [ -d "$dir/papers" ]; then
  research_indicators=true
fi

# Check for documentation files
if find "$dir" -name "*.md" -o -name "*.pdf" -o -name "*.docx" | head -5 | grep -q .; then
  research_indicators=true
fi

if [ "$research_indicators" = false ]; then
  exit 0
fi

# Generate NotebookLM enhancement context
NOTEBOOKLM_CONTEXT="{
  \"research_enhancement\": {
    \"available_tools\": [
      \"notebooklm-research\",
      \"notebooklm-summarization\",
      \"notebooklm-question-answering\",
      \"notebooklm-source-analysis\"
    ],
    \"suggested_actions\": [
      \"Use notebooklm-research for gathering information from multiple sources\",
      \"Use notebooklm-summarization for condensing complex documents\",
      \"Use notebooklm-question-answering for complex technical questions\",
      \"Use notebooklm-source-analysis for evaluating document credibility\"
    ],
    \"content_type\": \"$CONTENT_TYPE\",
    \"enhancement_opportunities\": [
      \"Cross-reference findings with multiple sources\",
      \"Generate executive summaries for long documents\",
      \"Verify technical claims against authoritative sources\",
      \"Create knowledge bases for complex topics\"
    ]
  }
}"

ESCAPED_CONTEXT=$(echo "$NOTEBOOKLM_CONTEXT" | jq -Rs .)

jq -n --argjson ctx "$ESCAPED_CONTEXT" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    additionalContext: $ctx
  }
}'