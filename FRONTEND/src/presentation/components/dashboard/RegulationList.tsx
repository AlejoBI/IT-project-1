import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  deleteRegulationAction,
  fetchRegulationsAction,
  updateRegulationAction,
} from "../../../application/store/regulations/regulationsActions";
import {
  GRADIENTS,
  DARK_GRADIENTS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import Button from "../UI/Button";

const RegulationList = () => {
  const dispatch = useAppDispatch();
  const { regulations, loading } = useAppSelector((state) => state.regulation);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [localData, setLocalData] = useState<
    Record<string, { name: string; description: string; version: string }>
  >({});

  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchRegulationsAction());
  }, [dispatch]);

  useEffect(() => {
    if (regulations) {
      const initialData: Record<
        string,
        { name: string; description: string; version: string }
      > = {};
      regulations.forEach((regulation) => {
        initialData[regulation.id] = {
          name: regulation.name || "",
          description: regulation.description || "",
          version: regulation.version || "",
        };
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
      setSuccessMessage("Normativa actualizada con éxito");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error al actualizar la normativa"
      );
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDelete = async (uid: string) => {
    setDeleteError(null);
    try {
      await dispatch(deleteRegulationAction(uid)).unwrap();
      dispatch(fetchRegulationsAction());

      setSuccessMessage("Normativa eliminada con éxito");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error al eliminar la normativa:", error);
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Error al eliminar la normativa"
      );
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  return (
    <section
      className={`p-6 rounded-xl shadow-lg ${GRADIENTS.WELCOME_BANNER} ${DARK_GRADIENTS.WELCOME_BANNER} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Regulaciones</h2>

      {successMessage && (
        <p className="text-green-600 font-medium mb-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 font-medium mb-2">{errorMessage}</p>
      )}

      {/* Cargando... */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Descripción</th>
                  <th className="px-4 py-2">Versión</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {(regulations ?? []).map((r) => {
                  const { id, name, description, version } = r;
                  const currentEditData = localData[id] || {
                    name,
                    description,
                    version,
                  };

                  return (
                    <tr key={id}>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={currentEditData.name}
                          onChange={(e) =>
                            handleEditChange(id, "name", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <textarea
                          rows={3}
                          cols={60}
                          value={currentEditData.description}
                          onChange={(e) =>
                            handleEditChange(id, "description", e.target.value)
                          }
                          className="w-full p-2 border rounded-md resize-none"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={currentEditData.version}
                          onChange={(e) =>
                            handleEditChange(id, "version", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          type="button"
                          onClick={() => handleUpdate(id)}
                          children="Actualizar"
                        />
                        <Button
                          type="button"
                          onClick={() => handleDelete(id)}
                          children="Eliminar"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {deleteError && (
        <p className="text-red-600 font-medium mb-2">{deleteError}</p>
      )}
    </section>
  );
};

export default RegulationList;
