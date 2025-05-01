// regulationSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  createRegulationAction,
  deleteRegulationAction,
  fetchRegulationsAction,
  updateRegulationAction,
} from "./regulationsActions";

import { Regulation } from "../../../domain/models/types/regulationsTypes";

interface Notification {
  message: string;
  type: "success" | "error";
}

interface RegulationsState {
  regulations: Regulation[] | null;
  loading: boolean;
  error: string | null;
  notification: Notification;
}

const initialState: RegulationsState = {
  regulations: [],
  loading: false,
  error: null,
  notification: { message: "", type: "success" },
};

const regulationSlice = createSlice({
  name: "regulations",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.notification = { message: "", type: "success" };
    },
  },
  extraReducers: (builder) => {
    // Crear
    builder.addCase(createRegulationAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createRegulationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.notification = {
        message: "Normativa creada correctamente.",
        type: "success",
      };
      state.regulations = [action.payload];
    });
    builder.addCase(createRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.notification = {
        message: action.payload as string,
        type: "error",
      };
    });

    // Eliminar
    builder.addCase(deleteRegulationAction.fulfilled, (state) => {
      state.loading = false;
      state.notification = {
        message: "Normativa eliminada correctamente.",
        type: "success",
      };
    });
    builder.addCase(deleteRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.notification = {
        message: action.payload as string,
        type: "error",
      };
    });

    // Obtener
    builder.addCase(fetchRegulationsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRegulationsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.regulations = action.payload;
    });
    builder.addCase(fetchRegulationsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Actualizar
    builder.addCase(updateRegulationAction.fulfilled, (state) => {
      state.loading = false;
      state.notification = {
        message: "Normativa actualizada correctamente.",
        type: "success",
      };
    });
    builder.addCase(updateRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.notification = {
        message: action.payload as string,
        type: "error",
      };
    });
  },
});

export const { clearNotification } = regulationSlice.actions;

export default regulationSlice.reducer;
