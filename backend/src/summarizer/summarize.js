import {
  AzureKeyCredential,
  TextAnalysisClient,
} from "@azure/ai-language-text";

export async function summmarize(stringList) {
  let summary = "";
  const endpoint = "https://zusammenfassen2.cognitiveservices.azure.com/"; //"https://zusammenfassen2.https://zusammenfassen2.cognitiveservices.azure.com/.azure.com/";
  const apiKey = "f344b357ccf84eb296a51e1751f66184"; //"456c9601810d4591856124f517dc420b";

  let result = "";
  for (let i = 0; i < stringList.length; i++) {
    result += "Activity: " + (i + 1) + " :";
    result += stringList[i];
    result += "\n";
  }

  const documents = [result];

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
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      //console.log("Summary:");
      //console.log(result.summaries[0].text);
      //console.log(result.sentences.map((sentence) => sentence.text).join("\n"));
      summary = result.summaries[0].text;
    }
  }
  return summary;
}
//example:

/*const stringList = [
  "I ripped out the floor of the kitchen, then unfortunately there was no more time and I had to leave.",
  "Unfortunately, when I arrived, the barrier was also damaged. The tiles were laid as agreed.",
  "built-in cupboards",
];
const sum = await summmarize(stringList);
console.log(sum);
*/
