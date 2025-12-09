import { translate } from "../translator/translator.js";
import { transcribe } from "../speech_recognition/SpeechRecognitionSDK.js";
//import { extract } from "../TextDetection/DetectToPlainText.cjs";
//import {extractTextFromForm} from "../TextDetection/DetectionPlayground.cjs"
//import {extractTextFromForm } from "../TextDetection/DetectionPlayground.js";
import { main } from "../TextDetection/DetectToPlainText.js";
import { addReport } from "../firebase/reportApi.js";

//Nur Text
export const uploadTranslatetText = async (projectId, userId, text) => {
  const translationText = await translate(text);
  console.log(translationText);
  const isAdded = await addReport(projectId, userId, text, translationText, 1);
  return isAdded;
};

//Audio
export const uploadTranscribedText = async (
  projectId,
  userId,
  audioFilePath
) => {
  console.log("Test");
  let transcriptionText = await transcribe(audioFilePath);

  console.log(transcriptionText);

  const translationText = await translate(transcriptionText);
  const isAdded = await addReport(
    projectId,
    userId,
    translationText,
    translationText,
    1
  );
  return isAdded;
};

//Picture
export const uploadPictureText = async (projectId, userId, PictureUml) => {
  const extractedText = await main(PictureUml);
  const translationText = await translate(extractedText);
  const isAdded = await addReport(
    projectId,
    userId,
    translationText,
    translationText,
    1
  );
  return isAdded;
};

//Just for testing
/*
uploadtranslatedText(
  "123",
  "456",
  "I would really like to drive your car around the block a few times!"
);


uploadAudioText(
  "123",
  "456",
"/Users/apple/Desktop/gapbuster/makeathon/backend/src/speech_recognition/test_audio.wav"
);

*/
