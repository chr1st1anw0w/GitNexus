---
name: notebooklm-summarization
description: "Use when the user needs to summarize long documents, meetings, research papers, or complex information. Examples: \"Summarize this research paper\", \"Create meeting notes\", \"Condense this documentation\""
---

# NotebookLM Content Summarization

Specialized skill for condensing, organizing, and presenting complex information in digestible formats.

## Core Capabilities

### Document Summarization
- **Executive summaries**: High-level overviews of long documents
- **Key point extraction**: Identify and prioritize important information
- **Structure preservation**: Maintain logical flow while reducing length
- **Multi-format support**: Handle PDFs, documents, web pages, and text

### Meeting & Discussion Summarization
- **Action item extraction**: Identify tasks and responsibilities
- **Decision tracking**: Record key decisions and their rationale
- **Discussion synthesis**: Combine multiple perspectives into coherent summaries
- **Follow-up identification**: Highlight areas needing further attention

## Usage Patterns

### When to Use
- Processing long research papers or technical documents
- Creating meeting notes and action items
- Summarizing code documentation or API references
- Condensing project proposals or reports
- Preparing briefings for stakeholders

### Content Types
- **Academic papers**: Extract methodology, findings, and conclusions
- **Technical documentation**: Focus on implementation details and usage
- **Business documents**: Highlight key decisions and financial impacts
- **Meeting transcripts**: Identify actions, decisions, and follow-ups

## Commands & Features

### Basic Summarization
```bash
# Summarize a document
notebooklm summarize "document.pdf" --type executive

# Extract key points
notebooklm extract-key-points "meeting-transcript.txt"

# Create structured summary
notebooklm summarize-structured "research-paper.pdf" --sections "abstract,methodology,results"
```

### Advanced Features
- **Length control**: Specify desired summary length (brief, standard, detailed)
- **Focus areas**: Target specific aspects (technical, business, strategic)
- **Format options**: Output in various formats (bullet points, paragraphs, outlines)
- **Language adaptation**: Summarize in different languages

## Best Practices

1. **Know your audience**: Tailor summary depth and focus to reader needs
2. **Preserve context**: Include necessary background information
3. **Highlight decisions**: Emphasize key choices and their implications
4. **Action orientation**: Focus on actionable insights and next steps

## Quality Guidelines

### Completeness
- Include all critical information
- Maintain logical connections between ideas
- Preserve important qualifications and caveats

### Accuracy
- Avoid introducing new information
- Maintain original meaning and intent
- Flag uncertain or speculative content

### Usability
- Use clear, concise language
- Organize information hierarchically
- Include relevant examples when helpful

## Integration with Development Workflow

- **Code review summaries**: Condense review feedback and decisions
- **Documentation synthesis**: Combine multiple sources into coherent guides
- **Research integration**: Summarize findings for implementation planning
- **Meeting facilitation**: Create agendas and follow-up materials