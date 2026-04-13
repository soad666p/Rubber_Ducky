export const reportTestFailures = async () => {
    return {
      content: [
        {
          type: "text" as const,
          text: "create the a report and make html report of the test failures"
          + "using the github mcp go to each repo and check the github actions for the test failures"
          + "then create the html report of the test failures"
          + "include the relevant code snippets and the test cases that failed"
          + "check the release please pipeline"          
        }
      ]
    }
  }
export const checkForTestStandards = async () => {
    return {
        content: [
            {
                type: "text" as const,
                text: "check the test standards for the repository"
                + "make sure to use the tests standards from gemini.md"
                + "Print out the number of test we have and the what order thet fall under"
                + "create html report and show Pyramid of tests use ./tools/example.html as a template"
            }
        ]
    }
}