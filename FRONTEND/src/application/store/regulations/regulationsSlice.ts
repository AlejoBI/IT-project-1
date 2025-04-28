import { createSlice } from "@reduxjs/toolkit";

import {
  createRegulationAction,
  deleteRegulationAction,
  fetchRegulationAction,
  fetchRegulationsAction,
  updateRegulationAction,
} from "./regulationsActions";

import { Regulation } from "../../../domain/models/types/regulationsTypes";

interface RegulationsState {
  regulations: Regulation[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: RegulationsState = {
  regulations: [],
  loading: false,
  error: null,
};

const regulationSlice = createSlice({
  name: "regulations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Crear regulacion
    builder.addCase(createRegulationAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createRegulationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.regulations = [action.payload];
    });
    builder.addCase(createRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Eliminar regulacion
    builder.addCase(deleteRegulationAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteRegulationAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Obtener regulaciones
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

    // Obtener regulacion
    builder.addCase(fetchRegulationAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRegulationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.regulations = [action.payload];
    });
    builder.addCase(fetchRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Actualizar regulacion
    builder.addCase(updateRegulationAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateRegulationAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateRegulationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default regulationSlice.reducer;
