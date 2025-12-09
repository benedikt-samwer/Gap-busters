import {
  uploadBytes,
  uploadBytesResumable,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import fs from "fs";
import { readFile } from "fs/promises";
import PDFDocument from "pdfkit";
import { summmarize } from "../summarizer/summarize.js";
import blobStream from "blob-stream";
import { storage } from "../firebase/config.js";
import { Stream } from "stream";

export async function createPDF(stringList, projectId, result) {
  const summarie = await summmarize(stringList);

  const projectReportInformation = {
    projectNumber: projectId,
    companyName: "Willi GmbH",
    city: "Munich",
    reports: [],
  };

  for (let i = 0; i < stringList.length; i++) {
    let reportTem = { reportId: i + 1, description: stringList[i] };
    projectReportInformation.reports.push(reportTem);
  }

  // Create a new PDFDocument
  const doc = new PDFDocument({ margin: 50 });

  const stream = doc.pipe(blobStream());

  // Set some metadata for the PDF
  doc.info.Title = "Report";
  doc.info.Author = "Lennart Köhnke";

  generateHeader(doc); // Invoke `generateHeader` function.
  //generateFooter(doc); // Invoke `generateFooter` function.

  // Add some text to the PDF
  doc.fontSize(10).font("Helvetica-Bold").text("Summary:", 50, 260);
  doc.fontSize(14).text(summarie, 50, 280).font("Helvetica-Bold");

  generateCustomerInformation(doc, projectReportInformation);

  generateReportTable(doc, projectReportInformation);

  // Save the PDF to a file
  doc.pipe(fs.createWriteStream("output.pdf", "utf-8"));

  // Close the PDF document
  doc.end();

  var downloadURL = "test";
  var waiting = true;

  stream.on("finish", async function () {
    // get a blob you can do whatever you like with
    const blob = stream.toBlob("application/pdf");
    const storageRef = ref(storage, "probe.pdf");
    const uploadTask = uploadBytesResumable(
      storageRef,
      await blob.arrayBuffer()
    ).on(
      "state_changed",
      (snapshot) => {
        this.uploadValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + this.uploadValue + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        alert("Upload failed! Error: " + error);
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          downloadURL = url;
          console.log("Create PDF(In-Loop): " + downloadURL);
          waiting = false;
          result.json({ url: downloadURL });
        });
      }
      ///Alt
    );
  });
}

function generateHeader(doc) {
  doc
    .image("src/pdfCreator/logo.png", 50, 45, { width: 110 })
    .fillColor("#444444")
    .fontSize(20)
    //.text("ACME Inc.", 110, 57)
    .fontSize(10)
    //.text("Arcisstraße 21, 80333 Munich", 200, 65, { align: "right" })
    .text("Munich, Garching", 200, 80, { align: "right" });
  //.moveDown();
}

function generateCustomerInformation(doc, projectReportInformation) {
  doc.fillColor("#444444").fontSize(20).text("Report", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Project Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(projectReportInformation.projectNumber, 150, customerInformationTop)
    .font("Helvetica")
    .text("Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)

    .font("Helvetica-Bold")
    .text(projectReportInformation.companyName, 300, customerInformationTop)
    .font("Helvetica")
    .text(projectReportInformation.city, 300, customerInformationTop + 15)

    .moveDown();

  generateHr(doc, 237);
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

function generateFooter(doc) {
  doc.fontSize(10).text("Report", 50, 780, { align: "center", width: 500 });
}

function generateReportTable(doc, projectReportInformation) {
  let i;
  const TableTop = 430;

  doc.font("Helvetica-Bold");
  generateTableRow(doc, TableTop, "", "Description");
  generateHr(doc, TableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < projectReportInformation.reports.length; i++) {
    const report = projectReportInformation.reports[i];
    const position = TableTop + (i + 1) * 40;
    generateTableRow(doc, position, report.reportId, report.description);

    generateHr(doc, position + 30);
  }
}

function generateTableRow(doc, y, id, description) {
  doc
    .fontSize(10)
    .text("Step " + id, 50, y)
    .text(description, 200, y, { align: "right" });
}
//for testing:
/*
const stringList = [
  "I ripped out the floor of the kitchen, then unfortunately there was no more time and I had to leave.",
  "Unfortunately, when I arrived, the barrier was also damaged. The tiles were laid as agreed.",
  "built-in cupboards",
];
createPDF(stringList, 123);
*/
