import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useRegulation } from "../../hooks/useRegulation";
import {
  deleteRegulationAction,
  fetchRegulationsAction,
  updateRegulationAction,
} from "../../../application/store/regulations/regulationsActions";
import { deleteEvaluationFormAction } from "../../../application/store/evaluationForm/evaluationFormActions";
import { Trash2, FileMinus, BookOpen, Save } from "lucide-react";

import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";

const RegulationList = () => {
  const dispatch = useAppDispatch();
  const { regulations, loading } = useRegulation();
  const [localData, setLocalData] = useState<
    Record<string, { name: string; description: string; version: string }>
  >({});
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchRegulationsAction());
  }, [dispatch]);

  useEffect(() => {
    if (regulations && Array.isArray(regulations)) {
      const initialData: Record<string, { name: string; description: string; version: string }> =
        {};
      regulations.forEach((regulation) => {
        if (regulation.id) {
          initialData[regulation.id] = {
            name: regulation.name || "",
            description: regulation.description || "",
            version: regulation.version || "",
          };
        }
      });
      setLocalData(initialData);
    }
  }, [regulations]);

  const handleEditChange = (
    uid: string,
    field: "name" | "description" | "version",
    value: string
  ) => {
    setLocalData((prev) => ({
      ...prev,
      [uid]: {
        ...prev[uid],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (uid: string) => {
    const updates = localData[uid];
    try {
      await dispatch(updateRegulationAction({ uid, updates })).unwrap();
      await dispatch(fetchRegulationsAction()).unwrap();
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Error al actualizar la normativa");
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  const handleDelete = async (uid: string) => {
    if (
      !window.confirm(
        "¿Eliminar esta normativa y su formulario de evaluación? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    setDeleteError(null);
    try {
      await dispatch(deleteRegulationAction(uid)).unwrap();
      await dispatch(deleteEvaluationFormAction(uid)).unwrap();
      await dispatch(fetchRegulationsAction());
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Error al eliminar la normativa");
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  const handleDeleteEvaluationForm = async (uid: string) => {
    if (!window.confirm("¿Eliminar el formulario de evaluación? Esta acción no se puede deshacer.")) {
      return;
    }

    setDeleteError(null);
    try {
      await dispatch(deleteEvaluationFormAction(uid)).unwrap();
      await dispatch(fetchRegulationsAction());
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "Error al eliminar el formulario de evaluación"
      );
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  return (
    <section
      className={`${UI_COLORS.SURFACE} ${UI_COLORS.BORDER} rounded-2xl border p-5 shadow-sm transition-colors sm:p-6 ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <h2
        className={`mb-6 flex items-center justify-center gap-2 text-2xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        <><BookOpen size={23} className={`${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`} /> Normativas</>
      </h2>

      {loading ? (
        <p
          className={`text-center ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Cargando...
        </p>
      ) : regulations?.length === 0 ? (
        <p
          role="status"
          className={`py-8 text-center ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          No hay normativas registradas.
        </p>
      ) : (
        <div className={`overflow-x-auto rounded-xl border ${UI_COLORS.BORDER}`}>
          <table
            className="min-w-[900px] w-full text-sm"
          >
            <thead
              className={`${UI_COLORS.TABLE_HEADER} text-xs uppercase tracking-wider`}
            >
              <tr>
                <th
                  className={`px-4 py-3 text-left font-semibold ${UI_COLORS.MUTED}`}
                >
                  Nombre
                </th>
                <th
                  className={`px-4 py-3 text-left ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
                >
                  Descripción
                </th>
                <th
                  className={`px-4 py-3 text-left ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
                >
                  Versión
                </th>
                <th
                  className={`px-4 py-3 text-left ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {regulations?.map((regulation, index) => {
                const id = regulation?.id;
                if (!id) return null;

                const currentEditData = localData[id] ?? {
                  name: "",
                  description: "",
                  version: "",
                };

                return (
                  <tr
                    key={id}
                    className={`${
                      index % 2 === 0
                        ? LIGHT_MODE_COLORS.BACKGROUND_WHITE
                        : LIGHT_MODE_COLORS.BACKGROUND
                    } ${UI_COLORS.TABLE_ROW} border-t transition-colors ${
                      ANIMATION_TIMINGS.TRANSITION_DURATION
                    }`}
                  >
                    <td className="px-4 py-2">
                      <input
                        aria-label={`Nombre de la normativa ${currentEditData.name}`}
                        type="text"
                        value={currentEditData.name}
                        onChange={(e) => handleEditChange(id, "name", e.target.value)}
                        className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <textarea
                        aria-label={`Descripción de la normativa ${currentEditData.name}`}
                        rows={2}
                        value={currentEditData.description}
                        onChange={(e) => handleEditChange(id, "description", e.target.value)}
                        className={`w-full resize-none ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        aria-label={`Versión de la normativa ${currentEditData.name}`}
                        type="text"
                        value={currentEditData.version}
                        onChange={(e) => handleEditChange(id, "version", e.target.value)}
                        className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2 justify-start items-center">
                        <button
                          type="button"
                          onClick={() => handleUpdate(id)}
                          aria-label={`Actualizar normativa ${currentEditData.name}`}
                          title="Actualizar normativa"
                          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${UI_COLORS.SECONDARY_BUTTON} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
                        >
                          <Save size={16} /> Guardar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(id)}
                          aria-label={`Eliminar normativa ${currentEditData.name}`}
                          title="Eliminar normativa"
                          className={`rounded-lg p-2 ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvaluationForm(id)}
                          aria-label={`Eliminar formulario de ${currentEditData.name}`}
                          title="Eliminar formulario"
                          className={`rounded-lg p-2 ${UI_COLORS.WARNING} ${UI_COLORS.WARNING_SURFACE} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
                        >
                          <FileMinus size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {deleteError && (
        <p
          className={`text-red-600 font-semibold mt-6 text-center ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          {deleteError}
        </p>
      )}
    </section>
  );
};

export default RegulationList;
