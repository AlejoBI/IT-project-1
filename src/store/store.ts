import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { authListener } from "./auth/authListener";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

authListener(store.dispatch); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
