import { useSelector } from "react-redux";
import { RootState } from "../../application/store/store";

export const useEvaluation = () => {
  return useSelector((state: RootState) => state.evaluationForm);
};
