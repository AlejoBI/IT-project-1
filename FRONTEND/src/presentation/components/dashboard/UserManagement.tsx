import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useUser } from "../../hooks/useUser";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  GRADIENTS,
  DARK_GRADIENTS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import { roles } from "../../../shared/utils";
import {
  fetchUsersAction,
  updateUserAction,
} from "../../../application/store/users/usersActions";
import ButtonSecundary from "../UI/ButtonSecundary";
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
      className={`p-6 rounded-xl shadow-lg ${GRADIENTS.WELCOME_BANNER} ${DARK_GRADIENTS.WELCOME_BANNER} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
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
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user.uid}
                  className="hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={localData[user.uid]?.name || ""}
                      onChange={(e) =>
                        handleInputChange(user.uid, "name", e.target.value)
                      }
                      className={`w-full p-2 rounded-md border 
                        ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} 
                        ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                        ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
                        ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
                    />
                  </td>
                  <td
                    className={`px-6 py-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
                  >
                    {user.email}
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={localData[user.uid]?.role || ""}
                      onChange={(e) =>
                        handleInputChange(user.uid, "role", e.target.value)
                      }
                      className={`w-full p-2 border border-gray-300 rounded-md 
                        ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} 
                        ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                        ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
                        ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
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
                  <td>
                    <ButtonSecundary
                      onClick={() => handleUpdate(user.uid)}
                      type="button"
                      children="Actualizar"
                    />
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
