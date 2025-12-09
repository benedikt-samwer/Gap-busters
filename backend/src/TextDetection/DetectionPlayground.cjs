const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

async function extractTextFromForm(formUrl) {
  const endpoint = "https://westeurope.api.cognitive.microsoft.com/";
  const key = "60da7825dd224e16b880fd5af00c081c";

  // create your DocumentAnalysisClient instance and AzureKeyCredential variable
  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
  const poller = await client.beginAnalyzeDocument("prebuilt-read", formUrl);

  const { content, languages, styles } = await poller.pollUntilDone();

  if (languages.length <= 0 && styles.length <= 0) {
    console.log("No language spans or text styles were extracted from the document.");
    return;
  }

  const extractedTexts = [];

  for (const languageEntry of languages) {
    for (const text of getTextOfSpans(content, languageEntry.spans)) {
      const escapedText = text.replace(/\r?\n/g, "\n").replace(/"/g, '\"');
      extractedTexts.push(escapedText);
    }
  }

  for (const style of styles) {
    for (const text of getTextOfSpans(content, style.spans)) {
      //console.log(`${style.styleName}: ${text}`);
    }
  }

  return extractedTexts;
}

function* getTextOfSpans(content, spans) {
  for (const span of spans) {
    yield content.slice(span.offset, span.offset + span.length);
  }
}
export { extractTextFromForm };
//module.exports = extractTextFromForm;

