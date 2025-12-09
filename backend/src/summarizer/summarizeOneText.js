import {
  AzureKeyCredential,
  TextAnalysisClient,
} from "@azure/ai-language-text";

export async function summarizeOneText(string, threshold) {
  if (string.length > threshold) {
    let summary = "";
    const endpoint = "https://zusammenfassen2.cognitiveservices.azure.com/"; //"https://zusammenfassen2.https://zusammenfassen2.cognitiveservices.azure.com/.azure.com/";
    const apiKey = "f344b357ccf84eb296a51e1751f66184"; //"456c9601810d4591856124f517dc420b";

    const documents = [string];

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
  } else {
    return string;
  }
}
//example:
/*
const string = "Craftsmanship is an art that requires skill"; //, patience, and creativity. As a craftsman, I take pride in my work, and I strive to deliver quality products that meet the needs of my clients. My work involves using various tools and materials to create items that are both functional and aesthetically pleasing. I pay attention to every detail, from the choice of wood to the finishing touches, to ensure that the final product meets the highest standards.";
const sum = await summarizeOneText(string, 200);
console.log(sum);
*/
