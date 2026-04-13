/**
 * Integration test: spawn the MCP server and call a tool via the MCP client.
 * Requires the server to be built first (npm run build).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..", "..");
const serverPath = join(projectRoot, "dist", "server.js");
describe("MCP server integration", () => {
    let client;
    let transport;
    beforeAll(async () => {
        if (!existsSync(serverPath)) {
            throw new Error(`Server not built at ${serverPath}. Run "npm run build" first.`);
        }
        transport = new StdioClientTransport({
            command: "node",
            args: [serverPath],
            cwd: projectRoot,
        });
        client = new Client({ name: "rtr-ducky-test", version: "0.1.0" });
        await client.connect(transport);
    }, 15_000);
    afterAll(async () => {
        await client?.close();
    });
    it("lists tools including RTR_code_commit_summary_24hours", async () => {
        const { tools } = await client.listTools();
        const names = tools.map((t) => t.name);
        expect(names).toContain("RTR_code_commit_summary_24hours");
        expect(names).toContain("RTR_TODO_TO_JIRAS");
        expect(tools.length).toBeGreaterThanOrEqual(2);
    });
    it("calls RTR_TODO_TO_JIRAS and returns text content", async () => {
        const result = await client.callTool({
            name: "RTR_TODO_TO_JIRAS",
            arguments: {},
        });
        const content = result.content;
        expect(content).toBeDefined();
        expect(Array.isArray(content)).toBe(true);
        expect(content.length).toBeGreaterThan(0);
        const textBlock = content.find((c) => c.type === "text");
        expect(textBlock).toBeDefined();
        expect(textBlock.text).toContain("jira");
    });
    it("calls RTR_code_commit_summary_24hours with owner/repo", async () => {
        const result = await client.callTool({
            name: "RTR_code_commit_summary_24hours",
            arguments: { owner: "your-org", repo: "your-repo" },
        });
        const content = result.content;
        expect(content).toBeDefined();
        const textBlock = content.find((c) => c.type === "text");
        expect(textBlock).toBeDefined();
        expect(textBlock.text).toContain('owner="your-org", repo="your-repo"');
    });
});
