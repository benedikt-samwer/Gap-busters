import axios from "axios";
import { v4 as uuidv4 } from "uuid";

let key = "7ebeb2cb0b94464c82670e1a38d48065";
let endpoint = "https://api.cognitive.microsofttranslator.com";
let location = "westeurope";

function translate(text_to_translate) {
  axios({
    baseURL: endpoint,
    url: "/translate",
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      // location required if you're using a multi-service or regional (not global) resource.
      "Ocp-Apim-Subscription-Region": location,
      "Content-type": "application/json",
      "X-ClientTraceId": uuidv4().toString(),
    },
    params: {
      "api-version": "3.0",
      //from: "en",
      to: ["de"],
    },
    data: [
      {
        text: text_to_translate,
      },
    ],
    responseType: "json",
  }).then(function (response) {
    console.log(JSON.stringify(response.data, null, 4));

    const obj2 = JSON.stringify(response.data[0].translations[0].text, null, 4);
    console.log(typeof obj2);
    console.log(obj2);
    //translatedText = obj[0].translations[0].text;
    //console.log(translatedText);
  });
}

translate(
  "I would really like to drive your car around the block a few times!"
);
