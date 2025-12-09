import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

let key = "7c9699e7654e47e5b6468f72c3342276";
let endpoint = "https://westeurope.api.cognitive.microsoft.com";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = "westeurope";

const audioFile = fs.readFileSync("test_audio.wav");

axios({
  baseURL: endpoint,
  url: "/sts/v1.0/issuetoken",
  method: "post",
  headers: {
    "Ocp-Apim-Subscription-Key": key,
    "Ocp-Apim-Subscription-Region": location,
    "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
    "Transfer-Encoding": "chunked", //?<
    Expect: "100-continue",
  },
  data: audioFile,
  responseType: "json",
})
  .then((response) => {
    console.error("no error");
    console.log(response.data.DisplayText);
    console.log(typeof response.data);
  })
  .catch((error) => {
    console.error("error");
    console.error(error);
  });

/*
fetch(speechEndpoint, {
  method: "POST",
  headers: {
    "Ocp-Apim-Subscription-Key": speechKey,
    "Content-type": "audio/wav; codec=audio/pcm; samplerate=16000",
  },
  body: audioFile,
  responseType: "json",
});



 const file = fs.readFileSync("YourAudioFile.wav");
 const url = `https://${speechRegion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${speechRecognitionLanguage}`;

 const headers = {
   "Ocp-Apim-Subscription-Key": speechKey,
   "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
   "Transfer-Encoding": "chunked",
   Expect: "100-continue",
 };

 const response = await axios({
   method: "post",
   url: url,
   data: file,
   headers: headers,
 });
*/
