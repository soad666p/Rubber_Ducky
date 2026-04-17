import { describe, it, expect } from "vitest";
import { getDuckContextSwitchInstructions } from "../../tools/duckCheckTools.js";

describe("getDuckContextSwitchInstructions", () => {
  it("returns content with one text block", async () => {
    const result = await getDuckContextSwitchInstructions();
    expect(result.content).toHaveLength(1);
    expect(result.content[0]).toEqual({ type: "text", text: expect.any(String) });
  });

  it("includes all required MCPs in the instructions", async () => {
    const result = await getDuckContextSwitchInstructions();
    const text = result.content[0].text;
    expect(text).toContain("Jira MCP");
    expect(text).toContain("Confluence MCP");
    expect(text).toContain("GitHub MCP");
    expect(text).toContain("Splunk MCP");
  });

  it("includes the 30-second briefing requirement", async () => {
    const result = await getDuckContextSwitchInstructions();
    const text = result.content[0].text;
    expect(text).toContain("30-second briefing");
  });

  it("includes the mentorship question at the end", async () => {
    const result = await getDuckContextSwitchInstructions();
    const text = result.content[0].text;
    expect(text).toContain("Based on this context, what's your initial approach?");
  });
});
