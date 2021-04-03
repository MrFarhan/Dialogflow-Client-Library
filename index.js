
const credentials = require("./service_key.json")

function detectTextIntent(projectId, sessionId, queries, languageCode) {

    const dialogflow = require('@google-cloud/dialogflow');

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./service_key.json"// path to your service account key file here
    });

    async function detectIntent(
        projectId,
        sessionId,
        query,
        contexts,
        languageCode
    ) {
        // The path to identify the agent that owns the created intent.
        const sessionPath = sessionClient.projectAgentSessionPath(
            projectId,
            sessionId
        );

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: languageCode,
                },
            },
        };

        if (contexts && contexts.length > 0) {
            request.queryParams = {
                contexts: contexts,
            };
        }

        const responses = await sessionClient.detectIntent(request);
        return responses[0];
    }

    async function executeQueries(projectId, sessionId, queries, languageCode) {
        let context;
        let intentResponse;
        for (const query of queries) {
            try {
                console.log(`Sending Query: ${query}`);
                intentResponse = await detectIntent(
                    projectId,
                    sessionId,
                    query,
                    context,
                    languageCode
                );
                console.log('Detected intent');
                console.log(
                    `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
                );
                // Use the context from this response for next queries
                context = intentResponse.queryResult.outputContexts;
            } catch (error) {
                console.log(error);
            }
        }
    }
    executeQueries(projectId, sessionId, queries, languageCode);
    // [END dialogflow_detect_intent_text]
}
detectTextIntent(credentials.project_id, 1111, ["hi"], "en")