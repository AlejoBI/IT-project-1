import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { AuthUser } from "../../../domain/models/types/authTypes";
import {
  Audit,
  SelfAssessmentToAudit,
  AuditSection,
} from "../../../domain/models/types/auditTypes";
import {
  SectionAnswer,
  ChoiceOption,
} from "../../../domain/models/types/complianceTypes";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#333",
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: "1 solid #ccc",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 4,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 11,
    textAlign: "center",
    fontStyle: "italic",
    color: "#555",
    marginBottom: 12,
  },
  headerGroup: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#ecf0f1",
    border: "1 solid #bdc3c7",
    borderRadius: 4,
  },
  headerText: {
    fontSize: 11,
    marginBottom: 2,
    color: "#2c3e50",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1a5276",
    borderBottom: "1 solid #ddd",
    paddingBottom: 2,
  },
  answerContainer: {
    marginBottom: 6,
  },
  questionText: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#34495e",
  },
  subQuestionContainer: {
    marginLeft: 12,
    marginTop: 4,
    padding: 6,
    backgroundColor: "#f7f7f7",
    borderLeft: "2 solid #95a5a6",
    borderRadius: 2,
  },
  subQuestionLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subQuestionText: {
    fontSize: 10,
    fontStyle: "italic",
    marginBottom: 1,
    color: "#555",
    marginLeft: 4,
  },
  answerText: {
    fontSize: 10,
    marginBottom: 1,
    marginLeft: 8,
    color: "#2d3436",
  },
  auditBlock: {
    marginTop: 6,
    padding: 6,
    backgroundColor: "#eafaf1",
    border: "1 solid #27ae60",
    borderRadius: 4,
  },
  auditStatus: {
    fontSize: 11,
    color: "#1e8449",
    fontWeight: "bold",
  },
  auditObservation: {
    fontSize: 10,
    color: "#2c3e50",
  },
});

const groupAnswersBySection = (answers: SectionAnswer[]) => {
  const sections: { [key: string]: SectionAnswer[] } = {};
  answers.forEach((ans) => {
    const sectionTitle = ans.sectionTitle || "Sección sin título";
    if (!sections[sectionTitle]) sections[sectionTitle] = [];
    sections[sectionTitle].push(ans);
  });
  return sections;
};

const groupByMainAndSubQuestions = (answers: SectionAnswer[]) => {
  const grouped: {
    [mainId: string]: { main: SectionAnswer; subs: SectionAnswer[] };
  } = {};
  answers.forEach((ans) => {
    if (ans.subQuestionId && ans.questionId) {
      if (!grouped[ans.questionId]) {
        const main = answers.find(
          (a) => a.questionId === ans.questionId && !a.subQuestionId
        );
        grouped[ans.questionId] = { main: main || ans, subs: [] };
      }
      grouped[ans.questionId].subs.push(ans);
    } else if (ans.questionId) {
      if (!grouped[ans.questionId]) {
        grouped[ans.questionId] = { main: ans, subs: [] };
      }
    }
  });
  return Object.values(grouped);
};

const renderAnswerValue = (
  value: string | ChoiceOption | ChoiceOption[] | null | undefined
) => {
  try {
    if (Array.isArray(value) && value.length > 0) {
      return (
        <View>
          {value.map((v: ChoiceOption, idx: number) => (
            <Text key={idx} style={styles.answerText}>
              • {v?.label ?? "Sin etiqueta"}
              {v?.score !== undefined ? ` (Puntaje: ${v.score})` : ""}
            </Text>
          ))}
        </View>
      );
    }

    if (typeof value === "object" && value !== null && "label" in value) {
      return (
        <Text style={styles.answerText}>
          {value.label ?? "Sin etiqueta"}
          {value.score !== undefined ? ` (Puntaje: ${value.score})` : ""}
        </Text>
      );
    }

    if (typeof value === "string") {
      return <Text style={styles.answerText}>{value}</Text>;
    }

    return <Text style={styles.answerText}>No respondido</Text>;
  } catch (err) {
    console.error("Error rendering value:", value, err);
    return <Text style={styles.answerText}>Error al mostrar valor</Text>;
  }
};

const PDFTemplateReports = ({
  user,
  data,
  audits,
}: {
  user: AuthUser;
  data: SelfAssessmentToAudit;
  audits: Audit | Audit[];
}) => {
  const sections = groupAnswersBySection(
    Array.isArray(data.answers) ? data.answers : []
  );

  let auditSections: AuditSection[] = [];
  if (Array.isArray(audits)) {
    audits.forEach((audit) => {
      if (Array.isArray(audit.sectionAudit)) {
        auditSections.push(...audit.sectionAudit);
      } else if (audit.sectionAudit) {
        auditSections.push(audit.sectionAudit);
      }
      if (Array.isArray(audit.sectionAudits)) {
        auditSections.push(...audit.sectionAudits);
      }
    });
  } else if (audits?.sectionAudit) {
    auditSections = Array.isArray(audits.sectionAudit)
      ? audits.sectionAudit
      : [audits.sectionAudit];
    if (Array.isArray(audits.sectionAudits)) {
      auditSections.push(...audits.sectionAudits);
    }
  }

  const auditSectionMap: Record<string, AuditSection> = {};
  auditSections.forEach((section) => {
    auditSectionMap[section.sectionId] = section;
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Reporte de Auditoría</Text>
          <Text style={styles.subtitle}>
            Detalle de resultados y respuestas del proceso de auditoría
          </Text>
          <View style={styles.headerGroup}>
            <Text style={styles.headerText}>
              Nombre de Usuario: {user?.name || "Sin nombre"}
            </Text>
            <Text style={styles.headerText}>
              Formulario: {data?.formName || "No definido"}
            </Text>
            <Text style={styles.headerText}>
              Puntuación Total: {data?.totalScore ?? "No disponible"}
            </Text>
          </View>
        </View>

        {Object.entries(sections).map(([sectionTitle, answers]) => {
          const sectionId = answers[0]?.sectionId;
          const sectionAudit = sectionId
            ? auditSectionMap[sectionId]
            : undefined;

          return (
            <View key={sectionTitle} style={styles.section}>
              <Text style={styles.sectionTitle}>{sectionTitle}</Text>
              {groupByMainAndSubQuestions(answers).map(
                ({ main, subs }, idx) => (
                  <View key={idx} style={styles.answerContainer}>
                    <Text style={styles.questionText}>
                      {main.questionText || "Pregunta sin texto"}
                      {main.subQuestionText ? ` – ${main.subQuestionText}` : ""}
                    </Text>
                    {renderAnswerValue(main.value)}
                    {subs.length > 0 &&
                      subs.map((sub, subIdx) => (
                        <View key={subIdx} style={styles.subQuestionContainer}>
                          <Text style={styles.subQuestionLabel}>
                            Subpregunta:
                          </Text>
                          <Text style={styles.subQuestionText}>
                            {sub.subQuestionText || "Subpregunta sin texto"}
                          </Text>
                          {renderAnswerValue(sub.value)}
                        </View>
                      ))}
                  </View>
                )
              )}
              {sectionAudit && (
                <View style={styles.auditBlock}>
                  <Text style={styles.auditStatus}>
                    Estado de Auditoría: {sectionAudit.status}
                  </Text>
                  <Text style={styles.auditObservation}>
                    Observación: {sectionAudit.observation || "Sin observación"}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default PDFTemplateReports;
