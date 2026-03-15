#!/bin/bash
# NotebookLM SessionStart hook for Claude Code
# Initializes NotebookLM capabilities and provides research context
# Receives JSON on stdin with session information
# Returns JSON with session initialization data

INPUT=$(cat)

# Extract session information
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty' 2>/dev/null)
CWD=$(echo "$INPUT" | jq -r '.cwd // empty' 2>/dev/null)

# Check if this is a research/development session
dir="${CWD:-$PWD}"
session_type="general"

# Determine session type based on project structure
if [ -d "$dir/docs" ] || [ -d "$dir/research" ] || [ -d "$dir/papers" ]; then
  session_type="research"
elif [ -d "$dir/src" ] || [ -d "$dir/lib" ] || [ -f "$dir/package.json" ]; then
  session_type="development"
elif [ -d "$dir/.git" ]; then
  session_type="git_project"
fi

# Generate NotebookLM session initialization
NOTEBOOKLM_INIT="{
  \"notebooklm_session\": {
    \"session_id\": \"$SESSION_ID\",
    \"session_type\": \"$session_type\",
    \"capabilities\": {
      \"research\": {
        \"available\": true,
        \"description\": \"Multi-source research and knowledge synthesis\",
        \"commands\": [
          \"notebooklm research <topic>\",
          \"notebooklm create-kb --sources <files>\",
          \"notebooklm summarize --topic <subject>\"
        ]
      },
      \"analysis\": {
        \"available\": true,
        \"description\": \"Document analysis and source evaluation\",
        \"commands\": [
          \"notebooklm analyze-source <document>\",
          \"notebooklm fact-check <claim>\",
          \"notebooklm evaluate-docs <documentation>\"
        ]
      },
      \"question_answering\": {
        \"available\": true,
        \"description\": \"Complex question answering and explanation\",
        \"commands\": [
          \"notebooklm ask <question>\",
          \"notebooklm explain <concept> --audience <level>\",
          \"notebooklm compare <option1> <option2>\"
        ]
      },
      \"summarization\": {
        \"available\": true,
        \"description\": \"Content condensation and synthesis\",
        \"commands\": [
          \"notebooklm summarize <document>\",
          \"notebooklm extract-key-points <content>\",
          \"notebooklm summarize-structured <document>\"
        ]
      }
    },
    \"integration_tips\": [
      \"Use notebooklm-research for exploring new technologies\",
      \"Use notebooklm-source-analysis for evaluating documentation quality\",
      \"Use notebooklm-summarization for processing long technical papers\",
      \"Use notebooklm-question-answering for complex architecture decisions\"
    ],
    \"best_practices\": {
      \"research\": \"Always cross-reference multiple sources for important decisions\",
      \"analysis\": \"Verify source credibility before making recommendations\",
      \"questions\": \"Provide context when asking complex technical questions\",
      \"summaries\": \"Specify audience level for technical content\"
    }
  }
}"

ESCAPED_INIT=$(echo "$NOTEBOOKLM_INIT" | jq -Rs .)

jq -n --argjson init "$ESCAPED_INIT" '{
  hookSpecificOutput: {
    hookEventName: "SessionStart",
    sessionContext: $init
  }
}'