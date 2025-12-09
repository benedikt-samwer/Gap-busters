import express from "express";
import reportRouter from "./routes/reportRoutes.js";
import userRouter from "./routes/userRoutes.js";
import pingRouter from "./routes/pingRoutes.js";
import cors from "cors";
import uploadRouter from "./routes/uploadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!")); // This is a route handler

app.use("/report", reportRouter);
app.use("/user", userRouter);
app.use("/ping", pingRouter);
app.use("/upload", uploadRouter);

app.listen(8000, () => console.log("Server listening at port 8000"));
