import { useSelector } from "react-redux";
import { RootState } from "../server/store";

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};
