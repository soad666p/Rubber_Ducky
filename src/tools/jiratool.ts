export const getTodoToJirasInstructions = async () => {
  return {
    content: [
      {
        type: "text" as const,
        text:
          "goes through the all the todos and converts them to jiras, i want to you to chose either that they " +
          "are task or epic or story or feature or bug or chore or docs or refactor or test or other. " +
          "use the jira mcp to create the jiras",
      },
    ],
  };
};

export const getPullToJiraTicketInstructions = async () => {
  return {
    content: [
      {
        type: "text" as const,
        text:
          "check if the pull request is related to a jira ticket, if it is, then link the pull request to the jira ticket. " +
          "use the jira mcp to check if the pull request is related to a jira ticket. " +
          "use the github mcp to check if the pull request is related to a jira ticket and to link the pull request to the jira ticket.",
      },
    ],
  };
};

export const getJiraLinterInstructions = async () => {
  return {
    content: [
      {
        type: "text" as const,
        text:
          "lint the jira tickets and see if they are valid and if they are not valid, fix them. " +
          "use the jira mcp to lint the jira tickets, fix the jira tickets, and validate the jira tickets.",
      },
    ],
  };
};
