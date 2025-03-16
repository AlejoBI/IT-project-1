import { useSelector } from "react-redux";
import { RootState } from "../server/store";

export const useUser = () => {
  return useSelector((state: RootState) => state.user);
};
