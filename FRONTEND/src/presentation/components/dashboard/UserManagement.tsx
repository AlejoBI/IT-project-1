import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useUser } from "../../hooks/useUser";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";
import { Users, Save } from "lucide-react";
import { roles } from "../../../shared/utils";
import { fetchUsersAction, updateUserAction } from "../../../application/store/users/usersActions";
import Notification from "../common/Notification";
import { clearNotification } from "../../../application/store/users/usersSlice";
import Loader from "../common/Loader";

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const { users, loading, message, error } = useUser();

  const [localData, setLocalData] = useState<Record<string, { name: string; role: string }>>({});

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const initialData: Record<string, { name: string; role: string }> = {};
      users.forEach((user) => {
        initialData[user.uid] = {
          name: user.name || "",
          role: user.role || "",
        };
      });
      setLocalData(initialData);
    }
  }, [users]);

  const handleInputChange = (uid: string, field: "name" | "role", value: string) => {
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
    await dispatch(updateUserAction({ uid, updates })).unwrap();
  };

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message, dispatch]);

  return (
    <section
      className={`${UI_COLORS.SURFACE} ${UI_COLORS.BORDER} rounded-2xl border p-5 shadow-sm transition-colors sm:p-6 ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {message && <Notification message={message} type="success" />}
      {error && <Notification message={error} type="error" />}

      <h2
        className={`mb-2 flex items-center justify-center gap-2 text-xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        <><Users size={21} className={`${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`} /> Gestión de usuarios</>
      </h2>
      <p
        className={`mb-4 text-center ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        Aquí puedes editar, eliminar y gestionar los usuarios del sistema.
      </p>

      {loading ? (
        <Loader />
      ) : (
        <div className={`mt-5 overflow-x-auto rounded-xl border ${UI_COLORS.BORDER}`}>
          <table
            className={`min-w-[760px] w-full text-sm ${UI_COLORS.TABLE_SURFACE}`}
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
                  Email
                </th>
                <th
                  className={`px-4 py-3 text-left ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
                >
                  Rol
                </th>
                <th
                  className={`px-4 py-3 text-left ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user.uid}
                  className={`${UI_COLORS.TABLE_ROW} border-t transition-colors ${
                    ANIMATION_TIMINGS.TRANSITION_DURATION
                  }`}
                >
                  <td className="px-4 py-2">
                    <input
                      aria-label={`Nombre de ${user.email}`}
                      type="text"
                      value={localData[user.uid]?.name || ""}
                      onChange={(e) => handleInputChange(user.uid, "name", e.target.value)}
                      className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
                    />
                  </td>
                  <td
                    className={`px-4 py-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
                  >
                    {user.email}
                  </td>
                  <td className="px-4 py-2">
                    <select
                      aria-label={`Rol de ${user.email}`}
                      value={localData[user.uid]?.role || ""}
                      onChange={(e) => handleInputChange(user.uid, "role", e.target.value)}
                      className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
                    >
                      <option value="" disabled>
                        -- Selecciona un rol --
                      </option>
                      {Object.entries(roles).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUpdate(user.uid)}
                      title="Editar usuario"
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${UI_COLORS.SECONDARY_BUTTON} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
                    >
                      <Save size={16} /> Guardar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default UserManagement;
