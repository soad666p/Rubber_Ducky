# Plan: Duck_Context_Switch Implementation

## Objective
Implement a "Zero Ramp-up" contextual briefing tool (`Duck_Context_Switch`) to eliminate focus debt for developers picking up new Jira tickets.

## Workflow Steps
1. **Ticket Identification**: Extract the Jira ticket key from user input or automatically detect it from the current git branch name.
2. **Jira Integration**: Fetch comprehensive ticket metadata (title, description, ACs, linked tickets, sprint context).
3. **Confluence Integration**: Search for relevant architectural documentation (ADRs, design docs) based on the ticket's component area.
4. **GitHub Integration**: Identify related Pull Requests and existing development branches to understand "Prior Art."
5. **Splunk Integration**: Pull recent operational health metrics and error rates for the affected services.
6. **Synthesis**: Generate a concise 30-second briefing covering the mission, critical context, prior art, and service health.
7. **Mentorship**: Close with a prompt to engage the developer's initial architectural approach.

## Implementation Details
- **File**: `src/tools/duckCheckTools.ts` - Logic for generating the synthesized instructions.
- **Server Registration**: Register the tool in `src/server.ts` under the name `Duck_Context_Switch`.
- **Validation**: Unit tests in `src/tests/tools/duckCheckTools.test.ts` to ensure all MCP integrations are included in the instruction output.
