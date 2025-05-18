import { useSelector } from "react-redux";
import { RootState } from "../../application/store/store";

export const useAudit = () => {
  return useSelector((state: RootState) => state.audit);
};
