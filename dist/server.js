import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getCommitSummary24HoursInstructions } from "./tools/commitSummary.js";
import { getJiraLinterInstructions, getPullToJiraTicketInstructions, getTodoToJirasInstructions, } from "./tools/jiratool.js";
import { getDependencyTreeInstructions, getFlagChangeSinceLastReleaseInstructions, getIncidentAnalysisInstructions, getServiceOwnerInstructions, } from "./tools/investigateTools.js";
import { checkForTestStandards, reportTestFailures } from "./tools/testsTools.js";
import { getCodeSummaryInstructions } from "./tools/codeTools.js";
import { getFullSdlcFromJiraInstructions } from "./tools/sdlcTools.js";
export const server = new McpServer({
    name: "workflow-orchestrator-mcp",
    version: "0.1.0",
});
server.tool("Make_TODO_INTO_JIRA_TICKETS", async () => getTodoToJirasInstructions());
server.tool("Explain_the_codebase", async () => getCodeSummaryInstructions());
server.tool("Who_is_the_owner_of_the_service", async () => getServiceOwnerInstructions());
server.tool("Who_changed_flags_since_last_release", async () => getFlagChangeSinceLastReleaseInstructions());
server.tool("Report_the_latest_test_failures", async () => reportTestFailures());
server.tool("Check_for_test_standards", async () => checkForTestStandards());
server.tool("Check_if_a_PullRequest_has_been_converted_to_a_JIRA_ticket", async () => getPullToJiraTicketInstructions());
server.tool("Lint_the_JIRA_tickets", async () => getJiraLinterInstructions());
server.tool("Analyze_the_latest_incident", async () => getIncidentAnalysisInstructions());
server.tool("Check_the_dependency_for_cves", async () => getDependencyTreeInstructions());
server.tool("full_sdlc_from_jira_to_github", async () => getFullSdlcFromJiraInstructions());
// Workflow state store
server.tool("Get_a_summary_of_the_latest_code_commits", {
    owner: z
        .string()
        .optional()
        .describe("GitHub owner/org (e.g. your-org). If omitted, use the repo from context."),
    repo: z
        .string()
        .optional()
        .describe("GitHub repo name. If omitted, use the repo from context."),
}, async (args) => getCommitSummary24HoursInstructions(args));
async function main() {
    if (process.env.MCP_TRANSPORT === "sse") {
        // Skip stdio if explicitly told to use sse
        return;
    }
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Workflow Orchestrator MCP Server is running (Stdio)");
}
main();
