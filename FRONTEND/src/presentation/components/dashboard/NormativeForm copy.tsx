import React, { useState } from "react";
import SectionBuilder from "./SectionEditor";
import { Question } from "../../../domain/models/types/regulationsTypes";

interface Regulation {
  id: string;
  name: string;
}

interface NormativeFormProps {
  regulations: Regulation[];
  onSubmit: (formData: {
    regulationId: string;
    name: string;
    description: string;
    sections: { title: string; questions: Question[] }[];
  }) => void;
}

const NormativeForm: React.FC<NormativeFormProps> = ({ regulations, onSubmit }) => {
  const [regulationId, setRegulationId] = useState("");
  const [formName, setFormName] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<
    { title: string; questions: Question[] }[]
  >([]);

  const addSection = () => {
    setSections([
      ...sections,
      { title: "", questions: [{ text: "", type: "text", isRequired: false }] },
    ]);
  };

  const handleSectionChange = (
    index: number,
    section: { title: string; questions: Question[] }
  ) => {
    const updated = [...sections];
    updated[index] = {
      ...section,
      questions: section.questions.map((q) => ({
        ...q,
        type: ["text", "single-choice", "multiple-choice"].includes(q.type)
          ? (q.type as "text" | "single-choice" | "multiple-choice")
          : "text",
      })),
    };
    setSections(updated);
  };

  const handleSubmit = () => {
    if (!regulationId) {
      alert("Debes seleccionar una normativa antes de guardar.");
      return;
    }

    const form = {
      regulationId,
      name: formName,
      description,
      sections,
    };
    onSubmit(form);
  };

  return (
    <div className="space-y-4">
      <select
        className="w-full p-2 rounded-md border"
        value={regulationId}
        onChange={(e) => setRegulationId(e.target.value)}
      >
        <option value="">Selecciona una normativa</option>
        {regulations.map((reg) => (
          <option key={reg.id} value={reg.id}>
            {reg.name}
          </option>
        ))}
      </select>

      <input
        className="w-full p-2 rounded-md border"
        placeholder="Nombre del formulario"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
      />
      <textarea
        className="w-full p-2 rounded-md border"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {sections.map((section, i) => (
        <SectionBuilder
          key={i}
          index={i}
          data={section}
          onChange={(s) =>
            handleSectionChange(i, {
              ...s,
              questions: s.questions.map((q) => ({
                ...q,
                type: ["text", "single-choice", "multiple-choice"].includes(q.type)
                  ? (q.type as "text" | "single-choice" | "multiple-choice")
                  : "text",
              })),
            })
          }
        />
      ))}

      <button onClick={addSection} className="btn">
        Agregar Sección
      </button>
      <button onClick={handleSubmit} className="btn-primary">
        Guardar Formulario
      </button>
    </div>
  );
};

export default NormativeForm;