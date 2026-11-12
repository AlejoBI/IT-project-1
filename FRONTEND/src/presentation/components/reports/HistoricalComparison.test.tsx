import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HistoricalComparison from "./HistoricalComparison";
import { ComplianceReport } from "../../../domain/models/types/complianceTypes";

const report = (id: string, date: string, score: number): ComplianceReport => ({
  id,
  userId: "user-1",
  regulationId: "reg-1",
  regulationName: "Norma",
  formId: "form-1",
  formName: "Formulario",
  sectionScores: [],
  complianceStatus: score >= 80 ? "Cumple" : "Parcialmente Cumple",
  selfAssessmentId: id,
  totalScore: score,
  createdAt: new Date(date),
});

describe("HistoricalComparison", () => {
  it("ordena evaluaciones y muestra la variación", () => {
    render(
      <HistoricalComparison
        reports={[report("new", "2026-02-01", 85), report("old", "2026-01-01", 70)]}
      />
    );

    expect(screen.getByText("Comparación histórica")).toBeInTheDocument();
    expect(screen.getByText("Variación: +15.0 puntos")).toBeInTheDocument();
  });
});
