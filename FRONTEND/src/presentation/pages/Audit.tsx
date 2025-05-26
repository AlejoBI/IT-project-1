import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../shared/constants";
import { useUser } from "../hooks/useUser";
import { User } from "../../domain/models/types/userTypes";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchUsersWithEvaluationsAndAuditsAction } from "../../application/store/users/usersActions";
import Loader from "../components/common/Loader";

const Audit = () => {
  const navigate = useNavigate();
  const { users, loading } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersWithEvaluationsAndAuditsAction());
  }, [dispatch]);

  const handleNavigate = (userId: string) => {
    navigate(`/audit-list/${userId}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1
        className={`text-3xl font-bold mb-6 text-center p ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Usuarios para auditoría
      </h1>
      <p
        className={`text-center mb-8 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        Aquí puedes ver la lista de usuarios junto con el número de evaluaciones y auditorías realizadas. Selecciona un usuario para listar sus evaluaciones.
      </p>
      <div className="grid grid-cols-4 font-semibold mb-2 px-4">
        <span
          className={`col-span-1 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Nombre
        </span>
        <span
          className={`col-span-1 text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Evaluaciones
        </span>
        <span
          className={`col-span-1 text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Auditorías
        </span>
        <span className="col-span-1"></span>
      </div>
      {users?.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No hay usuarios disponibles para auditoría.
        </div>
      ) : (
        users?.map((user: User) => (
          <div
            key={user.uid}
            className={`grid grid-cols-4 items-center p-4 mb-4 ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} rounded-lg border border-gray-300 dark:border-[#2A4C61] transition-shadow hover:shadow-md`}
          >
            <span
              className={`font-medium truncate ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} col-span-1`}
              title={user.name || "Sin nombre"}
            >
              {user.name || "Sin nombre"}
            </span>
            <span
              className={`text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} col-span-1`}
            >
              {user.evaluationsCount ?? 0}
            </span>
            <span
              className={`text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} col-span-1`}
            >
              {user.auditsCount ?? 0}
            </span>
            <div className="col-span-1 text-right">
              <Button onClick={() => handleNavigate(user.uid)}>
                Listar Evaluaciones
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Audit;
