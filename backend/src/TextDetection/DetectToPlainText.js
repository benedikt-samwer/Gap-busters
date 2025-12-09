import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import * as fs from "fs";

const endpoint = "https://westeurope.api.cognitive.microsoft.com/";
const key = "60da7825dd224e16b880fd5af00c081c";


// sample document
//const formUrl = "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"

export async function main(formUrl) {

  const file = fs.createReadStream(formUrl);
  // create your DocumentAnalysisClient instance and AzureKeyCredential variable
  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
  const poller = await client.beginAnalyzeDocument("prebuilt-read", file);

  const { content, languages, styles } = await poller.pollUntilDone();

  if (languages.length <= 0 && styles.length <= 0) {
    console.log("No language spans or text styles were extracted from the document.");
    return;
  }
  let combined = "";
  for (const languageEntry of languages) {
    for (const text of getTextOfSpans(content, languageEntry.spans)) {
      const escapedText = text.replace(/\r?\n/g, "\n").replace(/"/g, '\"');
     // console.log(`${languageEntry.language}: ${escapedText}`);
     console.log(` ${escapedText}`);
     combined += " " + escapedText;
    }
  }

  for (const style of styles) {
    for (const text of getTextOfSpans(content, style.spans)) {
      //console.log(`${style.styleName}: ${text}`);
    }
  }
  return combined
}

function* getTextOfSpans(content, spans) {
  for (const span of spans) {
    yield content.slice(span.offset, span.offset + span.length);
  }
}



//Link to large Test Image
//const formUrl = "https://cvws.icloud-content.com/B/AQpldwbSAZ31oKJokLzwQFqRH2U8ASolQ_Mhu1DZSeqHdVe9I90rLzQJ/IMG_0498.png?o=Al-etP0lCBYcZADLz58OfcL1b8YB4eqF7qV_MnRfirmO&v=1&x=3&a=CAogLQDXMbEi78oYQLEAaE_JSwoh8j0VdgmnTXh_i5prU3gSbRCM1dD1_DAYjLKs9_wwIgEAUgSRH2U8WgQrLzQJaiY2IKDmrR1-VJLW2YsHlSSgf_CikfwVK75lWPHWcKGOguo0I9CaNHImOs9HaneK-LPcx8gV79Oc4C-jbU8966ws1GzNAVG_3Mp9r63sACg&e=1682803726&fl=&r=8ea3d67a-074c-4685-82ca-70641fb36c2d-1&k=z1Ed0R5aA-CPucDShLd2Mg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=137&s=Qp3Lj68esxyx_boWZoSKMO1h6Qs&cd=i"

//Code that prints the text out twice; redundant: 

/*

const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

const endpoint = "https://westeurope.api.cognitive.microsoft.com/";
const key = "60da7825dd224e16b880fd5af00c081c";

// sample document
const formUrl = "https://cvws.icloud-content.com/B/AQHa0Bzfg_OwKzqossV8x7cI3ukNAbs68SGgJ1AIr0BJT4YAmtxnPm5o/IMG_818B175F1FF5-1.jpeg?o=AnJKFfu8QQXnXNJw3-AnW37mDSti_DFqoNuqS_GGdtu0&v=1&x=3&a=CAogZBmKOtTxH3pNgtMSysj4O4EnWY5-GJO50idNnVhlssMSbRDxu571_DAY8Zj69vwwIgEAUgQI3ukNWgRnPm5oaiYjToN7yh4PcSlWaJ02iARy7iert01SeNLOLcNLX9AYU8lNC5fPwnImfrR9zIu7J0QK5UsT7D-UMUYz3rLdNPOArwtZ57VJB3dm9URbfVY&e=1682802904&fl=&r=6ac4e428-5479-4a12-bd7a-706ed43ddf51-1&k=JE2DpWMcKaqNRvqrvmcGFA&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=137&s=U0XyqMEXY7MJGYA9HOFhA5CVNu0&cd=i"

async function main() {
// create your DocumentAnalysisClient instance and AzureKeyCredential variable
const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
const poller = await client.beginAnalyzeDocument("prebuilt-read", formUrl);

const { content, languages, styles } = await poller.pollUntilDone();


if (languages.length <= 0) {
console.log("No language spans were extracted from the document.");
} else {
console.log("Languages:");
for (const languageEntry of languages) {
for (const text of getTextOfSpans(content, languageEntry.spans)) {
const escapedText = text.replace(/\r?\n/g, "\n").replace(/"/g, '\"');
console.log(escapedText);
}
}
}

if (styles.length <= 0) {
console.log("No text styles were extracted from the document.");
} else {
console.log("Styles:");
for (const style of styles) {
for (const word of getTextOfSpans(content, style.spans)) {
console.log(word);
}
}
}
}


function* getTextOfSpans(content, spans) {
for (const span of spans) {
yield content.slice(span.offset, span.offset + span.length);
}
}

main().catch((error) => {
console.error("An error occurred:", error);
process.exit(1);
});

*/