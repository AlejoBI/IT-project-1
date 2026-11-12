import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import complianceReducer from "./compliance/complianceSlice";
import regulationReducer from "./regulations/regulationsSlice";
import EvaluationFormReducer from "./evaluationForm/evaluationFormSlice";
import auditReducer from "./audits/auditSlice";

const persistConfig = {
  // Firebase is the source of truth for the session; do not restore stale users
  // before Firebase has restored its current user and ID token.
  key: "root-v2",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  compliance: complianceReducer,
  regulation: regulationReducer,
  evaluationForm: EvaluationFormReducer,
  audit: auditReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
