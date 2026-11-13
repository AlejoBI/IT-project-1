import { validateAnswersAgainstForm } from "../services/formAnswerValidation";

const firestoreMocks = {
  getDoc: jest.fn(),
  getDocs: jest.fn(),
};

jest.mock("../utils/firebaseConfig", () => ({ firestore: {} }));
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: (...args: unknown[]) => firestoreMocks.getDoc(...args),
  getDocs: (...args: unknown[]) => firestoreMocks.getDocs(...args),
  query: jest.fn(),
  where: jest.fn(),
}));

describe("validateAnswersAgainstForm", () => {
  beforeEach(() => jest.clearAllMocks());

  it("acepta respuestas de la sección y formulario correctos", async () => {
    firestoreMocks.getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ version: 3 }),
    });
    firestoreMocks.getDocs
      .mockResolvedValueOnce({ docs: [{ id: "section-1", data: () => ({ title: "General" }) }] })
      .mockResolvedValueOnce({
        docs: [{ id: "question-1", data: () => ({ sectionId: "section-1" }) }],
      });

    await expect(
      validateAnswersAgainstForm("form-1", "regulation-1", [
        {
          sectionId: "section-1",
          sectionTitle: "General",
          questionId: "question-1",
          questionText: "Pregunta",
          type: "text",
          value: "respuesta",
        },
      ])
    ).resolves.toEqual({ valid: true, formVersion: 3 });
  });

  it("rechaza una pregunta de otra sección", async () => {
    firestoreMocks.getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ version: 2 }),
    });
    firestoreMocks.getDocs
      .mockResolvedValueOnce({ docs: [{ id: "section-1", data: () => ({ title: "General" }) }] })
      .mockResolvedValueOnce({
        docs: [{ id: "question-1", data: () => ({ sectionId: "section-1" }) }],
      });

    const result = await validateAnswersAgainstForm("form-1", "regulation-1", [
      {
        sectionId: "section-2",
        sectionTitle: "Otra",
        questionId: "question-1",
        questionText: "Pregunta",
        type: "text",
        value: "respuesta",
      },
    ]);

    expect(result).toEqual({
      valid: false,
      error: "La pregunta question-1 no pertenece a la sección indicada del formulario.",
      formVersion: 2,
    });
  });

  it("valida el tipo y las opciones de una subpregunta", async () => {
    firestoreMocks.getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ version: 4 }),
    });
    firestoreMocks.getDocs
      .mockResolvedValueOnce({ docs: [{ id: "section-1", data: () => ({ title: "General" }) }] })
      .mockResolvedValueOnce({
        docs: [
          {
            id: "question-1",
            data: () => ({
              sectionId: "section-1",
              type: "single-choice",
              options: [{ id: "yes" }],
              subQuestions: [
                { id: "sub-1", type: "text", options: [] },
              ],
            }),
          },
        ],
      });

    await expect(
      validateAnswersAgainstForm("form-1", "regulation-1", [
        {
          sectionId: "section-1",
          sectionTitle: "General",
          questionId: "question-1",
          questionText: "Pregunta",
          subQuestionId: "sub-1",
          subQuestionText: "Detalle",
          type: "text",
          value: "respuesta",
        },
      ])
    ).resolves.toEqual({ valid: true, formVersion: 4 });
  });
});
