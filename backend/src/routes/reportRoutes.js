import { Router } from "express";
import { createReport } from "../controllers/reportController.js";

const reportRouter = Router();

reportRouter.post("/:projectId", (req, res) => {
  createReport(req, res);
});

export default reportRouter;
