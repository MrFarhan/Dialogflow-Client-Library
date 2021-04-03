const dialogflow = require('dialogflow');
const sessionId = '123456';
const languageCode = 'en';
const credentials = require("./service_key.json")
const projectId = credentials.project_id;// your dialogflow agent project Id here
const eventName = "Welcome";// name of the event to be triggered

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "./service_key.json"// path to your service account key file here
});

async function detectEventIntent(projectId, sessionId, eventName, languageCode) {

  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: eventName,
        languageCode: languageCode
      }
    },
  };
  const responses = await sessionClient.detectIntent(request);

  console.log("fulfillment Text is : ", responses[0].queryResult.fulfillmentText);
}

detectEventIntent(projectId, sessionId, eventName, languageCode)