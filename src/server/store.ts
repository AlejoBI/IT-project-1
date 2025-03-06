import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./controller/authSlice";
import { authMiddleware } from "./middlewares/authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Esto es para poder usar useDispatch en los componentes
