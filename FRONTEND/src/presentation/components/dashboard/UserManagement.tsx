import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useUser } from "../../hooks/useUser";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import { Pencil } from "lucide-react";
import { roles } from "../../../shared/utils";
import {
  fetchUsersAction,
  updateUserAction,
} from "../../../application/store/users/usersActions";
import Notification from "../common/Notification";
import { clearNotification } from "../../../application/store/users/usersSlice";
import Loader from "../common/Loader";

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const { users, loading, message, error } = useUser();

  const [localData, setLocalData] = useState<
    Record<string, { name: string; role: string }>
  >({});

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

  const handleInputChange = (
    uid: string,
    field: "name" | "role",
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
      className={`${LIGHT_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} p-6 rounded-xl shadow-md transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {message && <Notification message={message} type="success" />}
      {error && <Notification message={error} type="error" />}

      <h2
        className={`text-xl font-semibold mb-4 text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Gestión de Usuarios
      </h2>
      <p
        className={`mb-4 text-center ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        Aquí puedes editar, eliminar y gestionar los usuarios del sistema.
      </p>

      {loading ? (
        <Loader />
      ) : (
        <div className="mt-4 overflow-x-auto">
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
              {users?.map((user, index) => (
                <tr
                  key={user.uid}
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
                      value={localData[user.uid]?.name || ""}
                      onChange={(e) =>
                        handleInputChange(user.uid, "name", e.target.value)
                      }
                      className={`w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
              ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
              ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
            `}
                    />
                  </td>
                  <td
                    className={`px-4 py-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
                  >
                    {user.email}
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={localData[user.uid]?.role || ""}
                      onChange={(e) =>
                        handleInputChange(user.uid, "role", e.target.value)
                      }
                      className={`w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
              ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
              ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
            `}
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
                      className={`text-blue-600 hover:text-blue-800 transition ${ANIMATION_TIMINGS.TRANSITION_DURATION} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}`}
                    >
                      <Pencil size={18} />
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
