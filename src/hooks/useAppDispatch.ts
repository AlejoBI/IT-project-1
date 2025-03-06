import { useDispatch } from "react-redux";
import { AppDispatch } from "../server/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
