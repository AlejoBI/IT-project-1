import { useSelector } from "react-redux";
import { RootState } from "../../application/store/store";

export const useUser = () => {
  return useSelector((state: RootState) => state.users);
};
