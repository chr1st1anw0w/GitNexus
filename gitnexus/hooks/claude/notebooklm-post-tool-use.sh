#!/bin/bash
# NotebookLM PostToolUse hook for Claude Code
# Processes results and suggests NotebookLM enhancements
# Receives JSON on stdin with tool results
# Returns JSON with post-processing suggestions

INPUT=$(cat)

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty' 2>/dev/null)
TOOL_RESULT=$(echo "$INPUT" | jq -r '.tool_result // empty' 2>/dev/null)
CWD=$(echo "$INPUT" | jq -r '.cwd // empty' 2>/dev/null)

# Analyze tool results for NotebookLM enhancement opportunities
ENHANCEMENT_SUGGESTIONS="[]"

case "$TOOL_NAME" in
  "grep_search"|"ripgrep_search")
    # Check if search returned many results that could benefit from summarization
    RESULT_COUNT=$(echo "$TOOL_RESULT" | jq '.results | length' 2>/dev/null || echo "0")
    if [ "$RESULT_COUNT" -gt 10 ]; then
      ENHANCEMENT_SUGGESTIONS="[
        \"Consider using notebooklm-summarization to condense these search results\",
        \"Use notebooklm-source-analysis to evaluate the credibility of found sources\",
        \"Create a knowledge base with notebooklm-research for this topic\"
      ]"
    fi
    ;;
  "read_file")
    # Check if file content is long or complex
    CONTENT_LENGTH=$(echo "$TOOL_RESULT" | jq -r '.content // empty' 2>/dev/null | wc -c 2>/dev/null || echo "0")
    if [ "$CONTENT_LENGTH" -gt 5000 ]; then
      ENHANCEMENT_SUGGESTIONS="[
        \"Use notebooklm-summarization to create an executive summary of this document\",
        \"Apply notebooklm-source-analysis to evaluate document quality and credibility\",
        \"Extract key points with notebooklm-summarization for quick reference\"
      ]"
    fi
    ;;
  "run_terminal_cmd")
    # Check for research/analysis commands
    CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
    if echo "$CMD" | grep -qE "(curl|wget|git clone|npm install|pip install)"; then
      ENHANCEMENT_SUGGESTIONS="[
        \"Use notebooklm-research to understand the newly installed tools or libraries\",
        \"Apply notebooklm-source-analysis to evaluate documentation quality\",
        \"Create integration guides with notebooklm-summarization\"
      ]"
    fi
    ;;
  "list_dir")
    # Check for documentation/research directories
    LS_OUTPUT=$(echo "$TOOL_RESULT" | jq -r '.contents // empty' 2>/dev/null)
    if echo "$LS_OUTPUT" | grep -qE "\.(md|pdf|docx|txt)$"; then
      ENHANCEMENT_SUGGESTIONS="[
        \"Use notebooklm-research to synthesize information from these documents\",
        \"Apply notebooklm-source-analysis to evaluate document collection quality\",
        \"Create a knowledge base covering all documents in this directory\"
      ]"
    fi
    ;;
esac

# Generate post-processing context
NOTEBOOKLM_POST_PROCESS="{
  \"post_tool_enhancements\": {
    \"tool_used\": \"$TOOL_NAME\",
    \"enhancement_suggestions\": $ENHANCEMENT_SUGGESTIONS,
    \"follow_up_actions\": [
      \"Review results for research opportunities\",
      \"Consider documentation improvement suggestions\",
      \"Evaluate if deeper analysis would be beneficial\"
    ],
    \"integration_opportunities\": {
      \"gitnexus\": \"Cross-reference with code knowledge graph\",
      \"browser_automation\": \"Research related web content\",
      \"github_integration\": \"Check for related repositories\",
      \"firecrawl\": \"Scrape additional web resources\"
    }
  }
}"

ESCAPED_POST_PROCESS=$(echo "$NOTEBOOKLM_POST_PROCESS" | jq -Rs .)

jq -n --argjson post "$ESCAPED_POST_PROCESS" '{
  hookSpecificOutput: {
    hookEventName: "PostToolUse",
    postProcessingContext: $post
  }
}'