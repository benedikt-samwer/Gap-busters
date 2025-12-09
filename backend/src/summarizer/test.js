/*const {
  AzureKeyCredential,
  TextAnalysisClient,
} = require("@azure/ai-language-text");
*/
import {
  AzureKeyCredential,
  TextAnalysisClient,
} from "@azure/ai-language-text";

// You'll need to set these environment variables or edit the following values

const endpoint = "https://zusammenfassen2.cognitiveservices.azure.com/"; //"https://zusammenfassen2.https://zusammenfassen2.cognitiveservices.azure.com/.azure.com/";
const apiKey = "f344b357ccf84eb296a51e1751f66184"; //"456c9601810d4591856124f517dc420b";
/*
const documents = [
  `The Story of the Tower of Babel
The evil was spread all over the earth once. God destroyed everyone and everything except one good man named Noah.
Years after the flood, Noah and his family settled in one place but when they had more children, they moved from place to place. Their family increased. The world again became full of people.They made cities. All the people used to speak the same language. They lived and worked together.
But soon people became greedy and full of pride. They all thought of building a tower that could touch the sky. They all wanted to reach heaven and wanted to be God.
There was pride in the hearts of the people, because they thought, from this tower, they could reach the height where God lives.
The Tower of Babel Story
They started building the tower. God understood the intentions of humans.
This pride was the reason for his downfall. When God came to that city and saw what the people were doing, he was very angry. 
God halted the construction work by changing the language of everyone. People were unable to see each other and left the construction work.
This is how God saved everyone from becoming full of pride.

`,
];*/

const stringList = [
  "Important!: I ripped out the floor of the kitchen, then unfortunately there was no more time and I had to leave.",
  "Unfortunately, when I arrived, the barrier was also damaged. The tiles were laid as agreed.",
  "very Important!:built-in cupboards",
  "terminated the project6 due to lack of money",
  "The Story of the Tower of Babel The evil was spread all over the earth once. God destroyed everyone and everything except one good man named Noah. Years after the flood, Noah and his family settled in one place but when they had more children, they moved from place to place. Their family increased. The world again became full of people.They made cities. All the people used to speak the same language. They lived and worked together. But soon people became greedy and full of pride. They all thought of building a tower that could touch the sky. They all wanted to reach heaven and wanted to be God. There was pride in the hearts of the people, because they thought, from this tower, they could reach the height where God lives.",
];

let result = "";
for (let i = 0; i < stringList.length; i++) {
  result += "What worker " + (i + 1) + " did:";
  result += stringList[i];
  result += "\n";
}

const documents = [result];

async function main() {
  console.log("== Extractive Summarization Sample ==");

  const client = new TextAnalysisClient(
    endpoint,
    new AzureKeyCredential(apiKey)
  );

  const actions = [
    {
      kind: "AbstractiveSummarization",
      maxSentenceCount: 1,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");

  poller.onProgress(() => {
    console.log(
      `Last time the operation was updated was on: ${
        poller.getOperationState().modifiedOn
      }`
    );
  });
  console.log(
    `The operation was created on ${poller.getOperationState().createdOn}`
  );
  console.log(
    `The operation results will expire on ${
      poller.getOperationState().expiresOn
    }`
  );

  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "AbstractiveSummarization") {
      throw new Error(
        `Expected extractive summarization results but got: ${actionResult.kind}`
      );
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log("Summary:");
      console.log(result.summaries[0].text);
      //console.log(result.sentences.map((sentence) => sentence.text).join("\n"));
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

//module.exports = { main };
