export const getFullSdlcFromJiraInstructions = async () => {
    return {
      content: [
        {
          type: "text" as const,
          text:
            "Use one work item (Jira ticket or GitHub Issue) as the source of truth and execute an end-to-end SDLC workflow with Jira, GitHub, Slack, and CI/Cypress MCPs. Prefer doing the work, not only describing it.\n\n" +
            "Execution rules:\n" +
            "- If work-item details are unclear, list gaps and assumptions before proceeding.\n" +
            "- Follow repository conventions and keep scope limited to the ticket.\n" +
            "- If a call fails, use a fallback and continue.\n" +
            "- Never claim tests passed if they did not.\n" +
            "\n\n" +
            "1) Work-item intake and plan:\n" +
            "- Identify whether the source is Jira or GitHub Issue.\n" +
            "- For Jira: fetch key, title, description, acceptance criteria, labels, and status.\n" +
            "- For GitHub Issue: fetch issue number, title, body, labels, milestone, linked PRs, and status.\n" +
            "- Validate quality; if incomplete, record assumptions and continue only when reasonable.\n" +
            "- Produce a short implementation plan and test strategy.\n" +
            "\n" +
            "2) Branch setup:\n" +
            "- Detect repo and default branch.\n" +
            "- For Jira items, reuse existing `feature/<JIRA_KEY>-*` branch when present; otherwise create `feature/<JIRA_KEY>-short-slug`.\n" +
            "- For GitHub Issue items, reuse existing `feature/issue-<NUMBER>-*` branch when present; otherwise create `feature/issue-<NUMBER>-short-slug`.\n" +
            "- Sync with default branch before coding.\n" +
            "\n" +
            "3) Implement code changes:\n" +
            "- Inspect relevant files and implement only what is needed for acceptance criteria.\n" +
            "- Follow existing patterns; avoid unrelated refactors.\n" +
            "\n" +
            "4) Update tests:\n" +
            "- Prefer updating existing tests first (Cypress, unit, integration).\n" +
            "- Add Cypress only when UI/user-flow behavior changed; otherwise skip Cypress and add suitable unit/integration/API tests.\n" +
            "- If no tests exist, add a minimal core test and call out the gap.\n" +
            "\n" +
            "5) Run tests and capture results:\n" +
            "- Prefer CI/GitHub workflow runs; use local commands only if needed.\n" +
            "- If failures occur, identify root cause (new vs pre-existing), fix when clear, otherwise document clearly in PR and Jira.\n" +
            "- Include links to Cypress videos/artifacts when available.\n" +
            "\n" +
            "6) Commit and open/update PR:\n" +
            "- For Jira items, use Jira key in commit messages, e.g. `ABC-123: short description`.\n" +
            "- For GitHub Issues, include issue reference in commit messages, e.g. `#123: short description`.\n" +
            "- Reuse existing PR for the branch if present; otherwise create one to default branch.\n" +
            "- PR body must include summary, acceptance-criteria mapping, test results, and artifact links.\n" +
            "\n" +
            "7) Post status to Slack:\n" +
            "- Pick the best matching team/project channel; ask user if no clear channel exists.\n" +
            "- Include work-item identifier/title, PR URL, short summary, test status, and artifact links.\n" +
            "\n" +
            "8) Update source tracker:\n" +
            "- For Jira: comment with branch, PR URL, implemented scope, test coverage/results, artifact links, assumptions, and unresolved failures.\n" +
            "- For Jira: transition status (e.g. In Progress to In Review) when allowed.\n" +
            "- For GitHub Issue: post an issue comment with branch, PR URL, implemented scope, test coverage/results, artifact links, assumptions, and unresolved failures.\n" +
            "- For GitHub Issue: update labels/milestone/assignees when appropriate.\n" +
            "\n" +
            "Output format:\n" +
            "- Provide a concise step-by-step execution log.\n" +
            "- End with: Deliverables, Test Results, Risks/Assumptions, and Next Actions.",
        },
      ],
    };
  };