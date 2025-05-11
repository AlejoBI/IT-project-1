// regulationSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  createRegulationAction,
  deleteRegulationAction,
  fetchRegulationsAction,
  updateRegulationAction,
} from "./regulationsActions";

import { Regulation } from "../../../domain/models/types/regulationsTypes";

interface RegulationsState {
  regulations: Regulation[] | null;
  loading: boolean;
  error: string | null;
  message: string;
}

const initialState: RegulationsState = {
  regulations: [],
  loading: false,
  error: null,
  message: "",
};

const regulationSlice = createSlice({
  name: "regulations",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.message = "";
      state.error = null;
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
      state.message = action.payload.message;
    });
    builder.addCase(createRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error as string;
    });

    // Eliminar
    builder.addCase(deleteRegulationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error as string;
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
    builder.addCase(updateRegulationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error as string;
    });
  },
});

export const { clearNotification } = regulationSlice.actions;

export default regulationSlice.reducer;
