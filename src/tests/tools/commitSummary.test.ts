import { describe, it, expect } from "vitest";
import { getCommitSummary24HoursInstructions } from "../../tools/commitSummary.js";

describe("getCommitSummary24HoursInstructions", () => {
  it("returns content with one text block", () => {
    const result = getCommitSummary24HoursInstructions();
    expect(result.content).toHaveLength(1);
    expect(result.content[0]).toEqual({ type: "text", text: expect.any(String) });
  });

  it("includes GitHub MCP and list_commits in the instructions", () => {
    const result = getCommitSummary24HoursInstructions();
    const text = result.content[0].text;
    expect(text).toContain("GitHub MCP");
    expect(text).toContain("list_commits");
    expect(text).toContain("get_commit");
  });

  it("uses context hint when owner/repo omitted", () => {
    const result = getCommitSummary24HoursInstructions();
    expect(result.content[0].text).toContain(
      "owner and repo from the current repository context"
    );
  });

  it("uses provided owner and repo in the instructions", () => {
    const result = getCommitSummary24HoursInstructions({
      owner: "example-org",
      repo: "example-repo",
    });
    expect(result.content[0].text).toContain(
      'owner="example-org", repo="example-repo"'
    );
  });

  it("uses context hint when only one of owner/repo is provided", () => {
    const result = getCommitSummary24HoursInstructions({ owner: "some-org" });
    expect(result.content[0].text).toContain(
      "owner and repo from the current repository context"
    );
  });
});
