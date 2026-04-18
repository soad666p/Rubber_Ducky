// src/tools/duckTools.ts
var getContextSwitchInstructions = async () => {
  return {
    content: [
      {
        type: "text",
        text: "Help the developer switch context between tasks using Jira and Confluence.\n\n1) Fetch current context:\n- Use Jira MCP to get the user's assigned tickets (in progress, todo)\n- Search Confluence for related documentation, ADRs, or technical specs\n- Look for any briefing documents or meeting notes\n\n2) Provide context summary:\n- Summarize the current state of each active ticket\n- List recent commits, PRs, and code changes\n- Highlight any blockers or dependencies\n\n3) Socratic questioning:\n- Ask: 'What's the most critical task to focus on next?'\n- Ask: 'Are there any dependencies blocking your progress?'\n- Ask: 'Have you reviewed the related ADRs or design docs?'\n\n4) Tool discovery:\n- Suggest using `full_sdlc_from_jira_to_github` for end-to-end workflow\n- Suggest `Explain_the_codebase` for understanding unfamiliar code\n- Suggest `Lint_the_JIRA_tickets` for ticket quality check\n\nOutput: Provide a concise context briefing with actionable next steps. (Source: gemini.md > Duck_Context_Switch)"
      }
    ]
  };
};
var getSecurityAuditInstructions = async () => {
  return {
    content: [
      {
        type: "text",
        text: "Perform a security audit of the codebase using security tools and best practices.\n\n1) Dependency security check:\n- Use GitHub MCP to check Dependabot alerts\n- Scan package.json / requirements.txt for known CVEs\n- Identify outdated or vulnerable dependencies\n\n2) Static analysis:\n- Use SonarQube MCP to check for security hotspots\n- Look for SQL injection, XSS, CSRF vulnerabilities\n- Check for hardcoded secrets or API keys\n\n3) Code review:\n- Review recent PRs for security-related changes\n- Check for proper input validation and sanitization\n- Verify authentication and authorization logic\n\n4) Socratic questioning:\n- Ask: 'Have you considered the OWASP Top 10 for this feature?'\n- Ask: 'Are all user inputs properly validated?'\n- Ask: 'What's the blast radius if this endpoint is compromised?'\n\n5) Tool discovery:\n- Suggest `Check_the_dependency_for_cves` for detailed CVE analysis\n- Suggest `Analyze_the_latest_incident` for learning from past issues\n- Suggest `Lint_the_JIRA_tickets` for security-related tickets\n\nOutput: Provide a security report with findings, severity levels, and remediation steps. (Source: gemini.md > Duck_Security_Audit)"
      }
    ]
  };
};
var getNetworkHoppingDetectionInstructions = async () => {
  return {
    content: [
      {
        type: "text",
        text: "Detect and report violations of the 'No Network Hopping' rule in tests.\n\n1) Analyze test files:\n- Use GitHub MCP to scan test files in the repository\n- Look for HTTP calls, database connections, external API calls\n- Identify tests that 'hop the network' instead of using mocks\n\n2) Classify test types:\n- Unit Tests: MUST NOT hop the network (FAIL if they do)\n- Component Tests: MUST use test doubles (FAIL if they don't)\n- Integration Tests: Allowed to hop network (with limitations)\n- E2E Tests: Allowed for critical paths only\n\n3) Violation detection:\n- Check for: fetch(), axios, http.get(), db.connect()\n- Check for: missing mocks, stubs, or test doubles\n- Check for: real API keys or credentials in tests\n\n4) Socratic questioning:\n- Ask: 'Why does this unit test need external dependencies?'\n- Ask: 'Could this test use a mock instead of a real API call?'\n- Ask: 'What happens if this external service is down during CI?'\n\n5) Output format:\n- List each violation with file path and line number\n- Mark as FAIL for Unit/Component tests with network hopping\n- Mark as WARNING for Integration tests with excessive hopping\n- Provide refactoring suggestions using test doubles\n\nTool discovery:\n- Suggest `Check_for_test_standards` for test pyramid compliance\n- Suggest `Report_the_latest_test_failures` for failure analysis\n\nOutput: Provide a detailed report with PASS/FAIL/WARNING status. (Source: gemini.md > Network Hopping Rule)"
      }
    ]
  };
};
var getOnboardCodebaseInstructions = async () => {
  return {
    content: [
      {
        type: "text",
        text: "Help new developers onboard to the codebase effectively.\n\n1) Architecture overview:\n- Use GitHub MCP to analyze repository structure\n- Identify main services, modules, and their relationships\n- Find architecture diagrams or ADRs in Confluence\n\n2) Getting started guide:\n- Locate README.md, CONTRIBUTING.md, SETUP.md\n- Identify development environment requirements\n- List setup commands and dependencies\n\n3) Key code paths:\n- Identify entry points (main.ts, index.ts, app.ts)\n- Trace common workflows (e.g., API request flow)\n- Highlight important design patterns used\n\n4) Socratic questioning:\n- Ask: 'What part of the system are you most curious about?'\n- Ask: 'Have you reviewed the architecture decision records?'\n- Ask: 'Which feature would you like to understand first?'\n\n5) Tool discovery:\n- Suggest `Explain_the_codebase` for detailed code explanations\n- Suggest `Who_is_the_owner_of_the_service` for finding experts\n- Suggest `full_sdlc_from_jira_to_github` for first contribution\n\n6) Onboarding checklist:\n- [ ] Environment setup complete\n- [ ] Can run tests locally\n- [ ] Understands deployment pipeline\n- [ ] Knows team communication channels\n- [ ] First PR submitted\n\nOutput: Provide a personalized onboarding guide with resources and next steps. (Source: gemini.md > Duck_Onboard_Codebase)"
      }
    ]
  };
};
export {
  getContextSwitchInstructions,
  getNetworkHoppingDetectionInstructions,
  getOnboardCodebaseInstructions,
  getSecurityAuditInstructions
};
