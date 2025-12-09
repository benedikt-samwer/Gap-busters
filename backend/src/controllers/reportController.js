import { getReportsData } from "../firebase/reportApi.js";
import { createPDF } from "../pdfCreator/pdfCreator.js";

export const createReport = async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  const data = await getReportsData(projectId);
  createPDF(data, projectId, res);
};
