import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App";
import { Provider } from "react-redux";
import { store } from "./server/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
