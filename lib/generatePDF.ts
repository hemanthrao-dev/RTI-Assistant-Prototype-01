"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { PDFPayload } from "@/types";

function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function compactFileDate(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}

function cleanFilenamePart(value: string) {
  return value.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "");
}

export function buildRTIPdf(payload: PDFPayload) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - margin * 2;

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("APPLICATION UNDER RIGHT TO INFORMATION ACT, 2005", pageWidth / 2, 54, {
    align: "center",
  });

  doc.setFont("times", "normal");
  doc.setFontSize(12);

  autoTable(doc, {
    startY: 82,
    theme: "plain",
    margin: { left: margin, right: margin },
    styles: {
      font: "times",
      fontSize: 12,
      cellPadding: { top: 4, right: 6, bottom: 4, left: 0 },
      valign: "top",
    },
    columnStyles: {
      0: { cellWidth: 52, fontStyle: "bold" },
      1: { cellWidth: usableWidth - 52 },
    },
    body: [
      [
        "To:",
        `${payload.pio.pioDesignation}\n${payload.pio.officeName}\n${payload.department}\n${payload.pio.address}`,
      ],
      [
        "From:",
        `${payload.applicant.name || "[Applicant Name]"}\n${payload.applicant.address || "[Applicant Address]"}\n${payload.applicant.contact || "[Phone/Email]"}`,
      ],
      ["Date:", formatDate()],
      ["Subject:", "Request for Information under RTI Act 2005"],
    ],
  });

  let y = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 210;
  y += 26;

  const bodyLines = doc.splitTextToSize(payload.body, usableWidth);
  doc.text(bodyLines, margin, y, { lineHeightFactor: 1.35 });
  y += bodyLines.length * 16.2 + 28;

  const footer =
    "I am willing to pay the prescribed fee. / I am a BPL cardholder (attach copy if applicable).";
  const footerLines = doc.splitTextToSize(footer, usableWidth);
  if (y > 710) {
    doc.addPage();
    y = margin;
  }
  doc.text(footerLines, margin, y, { lineHeightFactor: 1.35 });

  y += footerLines.length * 16.2 + 44;
  doc.text("Signature: __________________________", margin, y);
  doc.text(`Date: ${formatDate()}`, margin, y + 28);

  const fileName = `RTI_Application_${cleanFilenamePart(payload.department)}_${compactFileDate()}.pdf`;
  doc.save(fileName);
}
