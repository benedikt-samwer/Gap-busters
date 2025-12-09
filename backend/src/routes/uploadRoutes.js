import { Router } from "express";
import {
  uploadPictureText,
  uploadTranscribedText,
  uploadTranslatetText,
} from "../controllers/uploadController.js";
import multer from "multer";
import fs from "fs";
import bodyParser from "body-parser";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.mimetype) {
      case "application/pdf":
        cb(null, "uploads/pdfs/");
        break;
      case "image/jpeg":
      case "image/png":
        cb(null, "uploads/images/");
        break;
      case "audio/wav":
      case "audio/webm":
        cb(null, "uploads/audios/");
        break;
      default:
        console.log(file.mimetype);
        cb(null, "uploads/");
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: fileStorage });

const uploadRouter = Router();

uploadRouter.post("/text/:projectId", (req, res) => {
  if (uploadTranslatetText(req.params.projectId, 10, req.body.text)) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

uploadRouter.post("/pdf/:projectId", upload.any(), (req, res) => {
  if (
    uploadPictureText(
      req.params.projectId,
      10,
      "uploads/pdfs/" + req.files[0].filename
    )
  ) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});
uploadRouter.post("/image/:projectId", upload.any(), (req, res) => {
  if (
    uploadPictureText(
      req.params.projectId,
      10,
      "uploads/images/" + req.files[0].filename
    )
  ) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});
uploadRouter.post("/image64/:projectId", upload.any(), (req, res) => {
  var base64Data = req.body.base64.replace(/^data:image\/jpeg;base64,/, "");
  fs.writeFile(
    "uploads/images/base64.jpeg",
    base64Data,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );
  if (
    uploadPictureText(req.params.projectId, 10, "uploads/images/base64.jpeg")
  ) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});
uploadRouter.post("/audio/:projectId", upload.any(), (req, res) => {
  if (
    uploadTranscribedText(
      req.params.projectId,
      10,
      "uploads/audios/" + req.files[0].filename
    )
  ) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});
uploadRouter.post("/memo/:projectId", upload.any(), (req, res) => {
  if (
    uploadTranscribedText(
      req.params.projectId,
      10,
      "uploads/audios/" + req.files[0].filename
    )
  ) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

export default uploadRouter;
