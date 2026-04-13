/**
 * Tool handler: 24-hour commit summary instructions.
 * Exported for unit testing.
 */
export function getCommitSummary24HoursInstructions(params?: {
  owner?: string;
  repo?: string;
}): { content: Array<{ type: "text"; text: string }> } {
  const { owner, repo } = params ?? {};
  const repoHint =
    owner && repo
      ? `owner="${owner}", repo="${repo}"`
      : "owner and repo from the current repository context";
  const text =
    `# 24-Hour Commit Summary (use GitHub MCP)\n\n` +
    `To get commits from the last 24 hours with committer emails and lines of code, use the **GitHub MCP** (do not use custom code or direct API calls).\n\n` +
    `**Step 1:** Call the \`list_commits\` tool from the GitHub MCP with:\n` +
    `- ${repoHint}\n` +
    `- Optionally restrict to the last 24 hours (use the tool's parameters for branch, since, until, or similar as supported).\n\n` +
    `**Step 2:** For each commit, you can call \`get_commit\` with the commit SHA to get author email and stats (additions/deletions) if needed.\n\n` +
    `**Step 3:** Summarize and return:\n` +
    `- Committer email / name\n` +
    `- Amount of lines of code (additions and deletions per commit or total)\n\n` +
    `All data must come from the GitHub MCP tools \`list_commits\` and \`get_commit\`.`;
  return {
    content: [{ type: "text" as const, text }],
  };
}
