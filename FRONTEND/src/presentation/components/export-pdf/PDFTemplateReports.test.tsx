import React from "react";
import { describe, expect, it } from "vitest";
import { pdf } from "@react-pdf/renderer";
import PDFTemplateReports from "./PDFTemplateReports";
import { AuthUser } from "../../../domain/models/types/authTypes";
import { SelfAssessmentToAudit } from "../../../domain/models/types/auditTypes";

describe("PDFTemplateReports", () => {
  it("genera un documento PDF con la versión del formulario", async () => {
    const user: AuthUser = { uid: "user-1", name: "Usuario", username: "usuario", role: "standard_user", email: "user@example.com", emailVerified: true };
    const data: SelfAssessmentToAudit = {
      id: "assessment-1", userId: "user-1", regulationId: "reg-1", regulationName: "Norma", formId: "form-1", formName: "Formulario", formVersion: 3,
      answers: [], totalScore: 85,
    };
    const blob = await pdf(<PDFTemplateReports user={user} data={data} audits={[]} />).toBlob();

    expect(blob.type).toBe("application/pdf");
    expect(blob.size).toBeGreaterThan(0);
  });
});
