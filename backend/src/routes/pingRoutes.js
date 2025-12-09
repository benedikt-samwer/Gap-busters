import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const pingRouter = Router();

pingRouter.get("/", (req, res) => res.send("pong"));
pingRouter.post("/", upload.any(), (req, res) => {
  res.data.pipe(fs.createWriteStream("my.pdf"));
  res.send("oida alles gut");
});

export default pingRouter;
