/**
 * Integration test: spawn the MCP server and call a tool via the MCP client.
 * Requires the server to be built first (npm run build).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { join } from "path";
import { existsSync } from "fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const projectRoot = process.cwd();
const serverPath = join(projectRoot, "dist", "server.js");

describe("MCP server integration", () => {
  let client: Client;
  let transport: StdioClientTransport;

  beforeAll(async () => {
    if (!existsSync(serverPath)) {
      throw new Error(
        `Server not built at ${serverPath}. Run "npm run build" first.`
      );
    }
    transport = new StdioClientTransport({
      command: "node",
      args: [serverPath],
      cwd: projectRoot,
    });
    client = new Client({ name: "workflow-orchestrator-test", version: "0.1.0" });
    await client.connect(transport);
  }, 15_000);

  afterAll(async () => {
    await client?.close();
  });

  it("lists tools including Get_a_summary_of_the_latest_code_commits", async () => {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name);
    expect(names).toContain("Get_a_summary_of_the_latest_code_commits");
    expect(names).toContain("Make_TODO_INTO_JIRA_TICKETS");
    expect(names).toContain("Explain_the_codebase");
    expect(names).toContain("Who_is_the_owner_of_the_service");
    expect(names).toContain("Who_changed_flags_since_last_release");
    expect(names).toContain("Report_the_latest_test_failures");
    expect(names).toContain("Check_for_test_standards");
    expect(names).toContain("Check_if_a_PullRequest_has_been_converted_to_a_JIRA_ticket");
    expect(names).toContain("Lint_the_JIRA_tickets");
    expect(names).toContain("Analyze_the_latest_incident");
    expect(names).toContain("Check_the_dependency_for_cves");
    expect(names).toContain("full_sdlc_from_jira_to_github");
    expect(tools.length).toBeGreaterThanOrEqual(10);
  });

  it("calls Make_TODO_INTO_JIRA_TICKETS and returns text content", async () => {
    const result = await client.callTool({
      name: "Make_TODO_INTO_JIRA_TICKETS",
      arguments: {},
    });
    const content = result.content as Array<{ type: string; text?: string }> | undefined;
    expect(content).toBeDefined();
    expect(Array.isArray(content)).toBe(true);
    expect(content!.length).toBeGreaterThan(0);
    const textBlock = content!.find((c) => c.type === "text");
    expect(textBlock).toBeDefined();
    expect(textBlock!.text).toContain("jira");
  });

  it("calls Get_a_summary_of_the_latest_code_commits with owner/repo", async () => {
    const result = await client.callTool({
      name: "Get_a_summary_of_the_latest_code_commits",
      arguments: { owner: "example-org", repo: "example-repo" },
    });
    const content = result.content as Array<{ type: string; text?: string }> | undefined;
    expect(content).toBeDefined();
    const textBlock = content!.find((c) => c.type === "text");
    expect(textBlock).toBeDefined();
    expect(textBlock!.text).toContain(
      'owner="example-org", repo="example-repo"'
    );
  });
});
