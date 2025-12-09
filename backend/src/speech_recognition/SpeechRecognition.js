import * as fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechKey = "7c9699e7654e47e5b6468f72c3342276";
const speechRegion = "westeurope"; // For example, "eastus"
const speechEndpoint = `https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issuetoken`;

function transcribe() {
  const audioFile = fs.readFileSync("/Users/apple/Desktop/gapbuster/makeathon/backend/src/speech_recognition/test_audio.wav");

  fetch(speechEndpoint, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': speechKey,
      'Content-type': 'audio/wav; codec=audio/pcm; samplerate=16000'
    },
    body: audioFile,
    responseType: "json"
  })
  .then(response => {
    console.log(response);
    return response;
  })
  .then(result => {
    switch (result.RecognitionStatus) {
      case 'Success':
        console.log(`RECOGNIZED: Text=${result.DisplayText}`);
        break;
      case 'NoMatch':
        console.log("NOMATCH: Speech could not be recognized.");
        break;
      case 'Canceled':
        console.log(`CANCELED: Reason=${result.RecognitionStatus}`);
        console.log(`CANCELED: ErrorCode=${result.ErrorCode}`);
        console.log(`CANCELED: ErrorDetails=${result.ErrorDetails}`);
        console.log("CANCELED: Did you set the speech resource key and region values?");
        break;
    }
  })
  .catch(error => {
    console.error(error);
  });
}

transcribe();
