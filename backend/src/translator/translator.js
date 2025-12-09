import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function translate(textToTranslate) {
  let key = "7ebeb2cb0b94464c82670e1a38d48065";
  let endpoint = "https://api.cognitive.microsofttranslator.com";
  let location = "westeurope";

  let translationText = "sorry something went wrong";

  await axios({
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
      to: ["en"],
    },
    data: [
      {
        text: textToTranslate,
      },
    ],
    responseType: "json",
  }).then(function (response) {
    //console.log(JSON.stringify(response.data, null, 4));

    translationText = JSON.stringify(
      response.data[0].translations[0].text,
      null,
      4
    );
    //console.log(translationText);
  });

  return translationText;
}

/*
translate(
  "I would really like to drive your car around the block a few times!"
);
*/
/*
//const axios = require("axios").default;
//const { v4: uuidv4 } = require("uuid");
import axios from "axios";
import { v4 as uuidv4 } from "uuid";



let key = "7ebeb2cb0b94464c82670e1a38d48065";
let endpoint = "https://api.cognitive.microsofttranslator.com";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = "westeurope";

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
    from: "en",
    to: ["de"],
  },
  data: [
    {
      text: "I would really like to drive your car around the block a few times!",
    },
  ],
  responseType: "json",
}).then(function (response) {
  console.log(JSON.stringify(response.data, null, 4));
});

*/
