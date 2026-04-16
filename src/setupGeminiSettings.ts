import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execa } from "execa";

type Settings = {
  mcpServers: Record<string, unknown>;
};

type ReplaceMap = Record<string, string>;

async function promptWithDefault(
  rl: ReturnType<typeof createInterface>,
  question: string,
  defaultValue: string,
): Promise<string> {
  const answer = (await rl.question(`${question} [${defaultValue}]: `)).trim();
  return answer || defaultValue;
}

async function detectGithubToken(): Promise<string | null> {
  try {
    const { stdout } = await execa("gh", ["auth", "token"]);
    const token = stdout.trim();
    return token.length > 0 ? token : null;
  } catch {
    return null;
  }
}

async function main() {
  const root = process.cwd();
  const templatePath = resolve(root, "gemini-settings.example.json");
  const outputPath = resolve(root, "gemini-settings.generated.json");

  const rl = createInterface({ input, output });

  try {
    console.log("\nGenerate Gemini MCP settings from template.\n");
    console.log(
      "Note: API tokens usually require manual creation in provider UIs (MFA/interactive auth).",
    );
    console.log(
      "This script fills the template and can auto-read GitHub token from gh CLI if available.\n",
    );

    const jiraDomain = await promptWithDefault(
      rl,
      "Jira domain (without protocol)",
      "yourcompany.jira.com",
    );
    const email = await promptWithDefault(
      rl,
      "Atlassian email (used for Jira/Confluence)",
      "your-email@company.com",
    );
    const githubOrg = await promptWithDefault(rl, "Sonar org key", "your-org");
    const projectPath = await promptWithDefault(
      rl,
      "Absolute path to this project",
      root,
    );

    const githubTokenFromGh = await detectGithubToken();
    const githubToken = await promptWithDefault(
      rl,
      "GitHub token",
      githubTokenFromGh ?? "YOUR_GITHUB_PAT",
    );

    const jiraToken = await promptWithDefault(
      rl,
      "Jira API token",
      "YOUR_JIRA_API_TOKEN",
    );
    const confluenceToken = await promptWithDefault(
      rl,
      "Confluence API token",
      jiraToken || "YOUR_CONFLUENCE_API_TOKEN",
    );
    const splunkToken = await promptWithDefault(
      rl,
      "Splunk token",
      "YOUR_SPLUNK_TOKEN",
    );
    const sonarToken = await promptWithDefault(
      rl,
      "Sonar token",
      "YOUR_SONARQUBE_TOKEN",
    );

    const replacements: ReplaceMap = {
      "https://yourcompany.jira.com": `https://${jiraDomain}`,
      "https://yourcompany.jira.com/wiki/": `https://${jiraDomain}/wiki/`,
      "your-email@company.com": email,
      YOUR_JIRA_API_TOKEN: jiraToken,
      YOUR_CONFLUENCE_API_TOKEN: confluenceToken,
      YOUR_SPLUNK_TOKEN: splunkToken,
      YOUR_GITHUB_PAT: githubToken,
      YOUR_SONARQUBE_TOKEN: sonarToken,
      "your-org": githubOrg,
      "/path/to/rubber-ducky/src/server.ts": `${projectPath}/src/server.ts`,
      "/path/to/rubber-ducky": projectPath,
    };

    const rawTemplate = await readFile(templatePath, "utf8");

    const rendered = Object.entries(replacements).reduce(
      (acc, [needle, replacement]) => acc.split(needle).join(replacement),
      rawTemplate,
    );

    // Validate generated JSON before writing.
    JSON.parse(rendered) as Settings;
    await writeFile(outputPath, rendered, "utf8");

    console.log(`\nGenerated: ${outputPath}`);
    console.log(
      "Review it, then merge into ~/.gemini/settings.json under mcpServers.",
    );
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error("Failed to generate settings:", error);
  process.exit(1);
});
