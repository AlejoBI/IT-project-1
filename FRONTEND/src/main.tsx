import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./presentation/routes/App";
import { Provider } from "react-redux";
import { store, persistor } from "./application/store/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
