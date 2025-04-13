import { useDispatch } from "react-redux";
import { AppDispatch } from "../../application/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
