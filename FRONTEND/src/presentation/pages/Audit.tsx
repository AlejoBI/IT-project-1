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
        className={`text-2xl font-bold mb-6 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Usuarios para auditoría
      </h1>

      {users?.map((user: User) => (
        <div
          key={user.uid}
          className={`flex items-center justify-between p-4 mb-4 ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} rounded-lg border border-gray-300 dark:border-[#2A4C61]`}
        >
          <span
            className={`font-medium ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} w-1/4`}
          >
            {user.name || "Sin nombre"}
          </span>
          <span
            className={`text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} w-1/4`}
          >
            {user.evaluationsCount ?? 0}
          </span>
          <span
            className={`text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} w-1/4`}
          >
            {user.auditsCount ?? 0}
          </span>
          <div className="w-1/4 text-right">
            <Button onClick={() => handleNavigate(user.uid)}>
              Listar Evaluaciones
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Audit;
