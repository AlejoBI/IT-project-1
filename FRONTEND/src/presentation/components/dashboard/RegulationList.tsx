import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useRegulation } from "../../hooks/useRegulation";
import {
  deleteRegulationAction,
  fetchRegulationsAction,
  updateRegulationAction,
} from "../../../application/store/regulations/regulationsActions";
import { deleteEvaluationFormAction } from "../../../application/store/evaluationForm/evaluationFormActions";
import { Pencil, Trash2, FileMinus } from "lucide-react";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

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
      const initialData: Record<
        string,
        { name: string; description: string; version: string }
      > = {};
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
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Error al actualizar la normativa"
      );
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  const handleDelete = async (uid: string) => {
    setDeleteError(null);
    try {
      await dispatch(deleteRegulationAction(uid)).unwrap();
      await dispatch(deleteEvaluationFormAction(uid)).unwrap();
      await dispatch(fetchRegulationsAction());
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Error al eliminar la normativa"
      );
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  const handleDeleteEvaluationForm = async (uid: string) => {
    setDeleteError(null);
    try {
      await dispatch(deleteEvaluationFormAction(uid)).unwrap();
      await dispatch(fetchRegulationsAction());
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Error al eliminar el formulario de evaluación"
      );
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  return (
    <section
      className={`${LIGHT_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} p-6 transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <h2
        className={`text-2xl font-bold mb-6 text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Regulaciones
      </h2>

      {loading ? (
        <p
          className={`text-center ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Cargando...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className={`min-w-full text-sm border-collapse rounded-lg shadow-sm
              ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}
              `}
          >
            <thead
              className={`text-gray-700 uppercase text-xs tracking-wider
              ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}
              `}
            >
              <tr>
                <th
                  className={`px-4 py-3 text-left ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
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
                    } ${
                      DARK_MODE_COLORS.BACKGROUND_COMPONENT
                    } border-t transition-colors ${
                      ANIMATION_TIMINGS.TRANSITION_DURATION
                    }`}
                  >
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={currentEditData.name}
                        onChange={(e) =>
                          handleEditChange(id, "name", e.target.value)
                        }
                        className={`w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                          ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                        `}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <textarea
                        rows={2}
                        value={currentEditData.description}
                        onChange={(e) =>
                          handleEditChange(id, "description", e.target.value)
                        }
                        className={`w-full px-2 py-1 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400
                          ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                        `}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={currentEditData.version}
                        onChange={(e) =>
                          handleEditChange(id, "version", e.target.value)
                        }
                        className={`w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                          ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                        `}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2 justify-start items-center">
                        <button
                          onClick={() => handleUpdate(id)}
                          title="Actualizar normativa"
                          className={`text-blue-600 hover:text-blue-800 transition ${ANIMATION_TIMINGS.TRANSITION_DURATION} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}`}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          title="Eliminar normativa"
                          className={`text-red-600 hover:text-red-800 transition ${ANIMATION_TIMINGS.TRANSITION_DURATION} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}`}
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteEvaluationForm(id)}
                          title="Eliminar formulario"
                          className={`text-yellow-600 hover:text-yellow-800 transition ${ANIMATION_TIMINGS.TRANSITION_DURATION} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}`}
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
