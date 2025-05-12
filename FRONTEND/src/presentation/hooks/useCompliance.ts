import { useSelector } from "react-redux";
import { RootState } from "../../application/store/store";

export const useCompliance = () => {
  return useSelector((state: RootState) => state.compliance);
};
