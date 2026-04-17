export const getDuckContextSwitchInstructions = async () => {
  return {
    content: [
      {
        type: "text" as const,
        text:
          "Provide a 'Zero Ramp-up' contextual briefing for a ticket. This tool eliminates focus debt by synthesizing context from Jira, Confluence, GitHub, and Splunk.\n\n" +
          "Follow these steps:\n\n" +
          "1. **Ticket Identification:** Identify the Jira ticket key. If not provided by the user, try to detect it from the current branch name (e.g., feature/PROJ-123-description).\n\n" +
          "2. **Jira Context:** Use the Jira MCP to fetch the ticket's title, description, acceptance criteria, labels, status, assignee, linked tickets, and current sprint context.\n\n" +
          "3. **Confluence Context:** Use the Confluence MCP to search for related ADRs (Architecture Decision Records), design documents, or relevant wiki pages that match the ticket's component or functional area.\n\n" +
          "4. **GitHub Context:** Use the GitHub MCP to find related Pull Requests (both open and recently merged) that touch the same files or services mentioned in the ticket. Also, verify if a development branch already exists for this ticket.\n\n" +
          "5. **Splunk Context:** Use the Splunk MCP to pull recent error rates, logs, and key health metrics for the service or component referenced in the ticket to understand current operational health.\n\n" +
          "6. **Synthesis:** Synthesize all gathered information into a concise **30-second briefing** that covers:\n" +
          "   - **The Mission:** What is this ticket trying to achieve?\n" +
          "   - **Need to Know:** Critical technical or business context/constraints.\n" +
          "   - **Prior Art:** What has been tried before or related work in historical tickets/PRs.\n" +
          "   - **Service Health:** Current status and recent issues in the affected service.\n" +
          "   - **Suggested Starting Point:** A recommended first step for implementation.\n\n" +
          "7. **Mentorship Closure:** End the briefing with the following question to prompt the developer's initial thought process: 'Based on this context, what's your initial approach?'",
      },
    ],
  };
};
