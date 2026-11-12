import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReportSummary from "./ReportSummary";
import { ComplianceReport } from "../../../domain/models/types/complianceTypes";

const report = (score: number, status: ComplianceReport["complianceStatus"]): ComplianceReport => ({
  id: `report-${score}`,
  userId: "user-1",
  regulationId: "reg-1",
  regulationName: "Norma",
  formId: "form-1",
  formName: "Formulario",
  sectionScores: [{ sectionId: "section-1", sectionTitle: "Gobierno", score }],
  complianceStatus: status,
  selfAssessmentId: `assessment-${score}`,
  totalScore: score,
  createdAt: new Date("2026-01-01"),
});

describe("ReportSummary", () => {
  it("muestra métricas agregadas de los reportes", () => {
    render(<ReportSummary reports={[report(90, "Cumple"), report(60, "Parcialmente Cumple")]} />);

    expect(screen.getByText("Puntaje promedio")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
