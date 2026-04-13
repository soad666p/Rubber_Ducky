export const getServiceOwnerInstructions = async () => {
    return {
        content: [
            {
                type: "text",
                text: "who is the owner of the service, look at the code and see who is the owner of the service " +
                    "then return the owner of the service " +
                    "use the github mcp to look at the code and see who is the owner of the service and show me who push commits to the repository recently",
            },
        ],
    };
};
export const getFlagChangeSinceLastReleaseInstructions = async () => {
    return {
        content: [
            {
                type: "text",
                text: "check the git history for the last release and see who changed the flags " +
                    "in splunkmcp and see if any flags were changed, look for LaunchDarkly flags using the splunk mcp, do not do this in real time, " +
                    "only look for LaunchDarkly index in splunkmcp",
            },
        ],
    };
};
export const getIncidentAnalysisInstructions = async () => {
    return {
        content: [
            {
                type: "text",
                text: "check slack for incidents; if there is a new incident that has been raised, " +
                    "check what code was merged in the last 24 hours, " +
                    "check if the code is related to the incident, " +
                    "check splunk for any errors related to the incident, " +
                    "see if you can determine if the incident has been caused by the code change; if not, use splunk logs to see whether the error is happening, " +
                    "then list what steps you took to discover the root cause of the incident and possible fixes",
            },
        ],
    };
};
export const getDependencyTreeInstructions = async () => {
    return {
        content: [
            {
                type: "text",
                text: "using the github mcp and the dependabot tool, check the repository for any CVEs; " +
                    "list the repositories that are affected and the CVEs",
            },
        ],
    };
};
