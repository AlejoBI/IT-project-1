import { useSelector } from "react-redux";
import { RootState } from "../../application/store/store";

export const useRegulation = () => {
  return useSelector((state: RootState) => state.regulation);
};