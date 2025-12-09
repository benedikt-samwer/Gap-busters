import {
  AudioConfig,
  CancellationDetails,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer,
  AutoDetectSourceLanguageConfig
} from "microsoft-cognitiveservices-speech-sdk";
import fs from "fs";

const subscriptionKey = "7c9699e7654e47e5b6468f72c3342276";
const serviceRegion = "westeurope"; // For example, "eastus"

const speechConfig = SpeechConfig.fromSubscription(
  subscriptionKey,
  serviceRegion
);
var autoDetectSourceLanguageConfig = AutoDetectSourceLanguageConfig.fromLanguages(["en-US", "de-DE", "bg-BG", "ru-RU"]);
var speechRecognizer = SpeechRecognizer.FromConfig(speechConfig, autoDetectSourceLanguageConfig);
speechRecognizer.recognizeOnceAsync((result) => {
  var languageDetectionResult = SpeechSDK.AutoDetectSourceLanguageResult.fromResult(result);
  var detectedLanguage = languageDetectionResult.language;
},
  {});

export function transcribe(audioFilePath) {
  const audioConfig = AudioConfig.fromWavFileInput(
    fs.readFileSync(audioFilePath)
  );
  const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

  return new Promise((resolve, reject) => {
    speechRecognizer.recognizeOnceAsync((result) => {
      switch (result.reason) {
        case ResultReason.RecognizedSpeech:
          console.log(`RECOGNIZED: Text=${result.text}`);
          resolve(result.text);
          break;
        case ResultReason.NoMatch:
          console.log("NOMATCH: Speech could not be recognized.");
          reject(new Error("No speech was recognized"));
          break;
        case ResultReason.Canceled:
          const cancellation = CancellationDetails.fromResult(result);
          console.log(`CANCELED: Reason=${cancellation.reason}`);
          console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
          console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
          console.log(
            "CANCELED: Did you set the speech resource key and region values?"
          );
          reject(new Error("Speech recognition was canceled"));
          break;
      }
      speechRecognizer.close();
    });
  });
}

/*
import { AudioConfig, CancellationDetails, ResultReason, SpeechConfig, SpeechRecognizer } from "microsoft-cognitiveservices-speech-sdk";
import fs from "fs";

const subscriptionKey = "7c9699e7654e47e5b6468f72c3342276";
const serviceRegion = "westeurope"; // For example, "eastus"

const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
speechConfig.speechRecognitionLanguage = "de-DE";

function transcribe() {
    const audioConfig = AudioConfig.fromWavFileInput(fs.readFileSync("test_audio2.wav"));
    const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case ResultReason.Canceled:
                const cancellation = CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason === CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
}

transcribe();
*/
