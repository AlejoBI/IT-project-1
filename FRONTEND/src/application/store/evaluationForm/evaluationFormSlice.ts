import { createSlice } from "@reduxjs/toolkit";
import {
  createEvaluationFormAction,
  deleteEvaluationFormAction,
  fetchEvaluationFormsAction,
  updateEvaluationFormAction
} from "./evaluationFormActions"; // Importa la acción asíncrona
import { Form } from "../../../domain/models/types/EvaluationFormTypes";

interface EvaluationFormState {
  forms: Form | null;
  loading: boolean;
  error: string | null;
}

const initialState: EvaluationFormState = {
  forms: null,
  loading: false,
  error: null,
};

const evaluationFormSlice = createSlice({
  name: "evaluationForm",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.forms = action.payload;
    },
    clearForm: (state) => {
      state.forms = null;
    },
  },
  extraReducers: (builder) => {
    // crear formulario
    builder.addCase(createEvaluationFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createEvaluationFormAction.fulfilled, (state, action) => {
      state.loading = false;
      state.forms = action.payload; // Se guarda el formulario creado
    });
    builder.addCase(createEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Error
    });

    // eliminar formulario
    builder.addCase(deleteEvaluationFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEvaluationFormAction.fulfilled, (state) => {
      state.loading = false;
      state.forms = null;
    });
    builder.addCase(deleteEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Obtener regulaciones
    builder.addCase(fetchEvaluationFormsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEvaluationFormsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.forms = action.payload;
    });
    builder.addCase(fetchEvaluationFormsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Actualizar formulario
    builder.addCase(updateEvaluationFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateEvaluationFormAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setForm, clearForm } = evaluationFormSlice.actions;
export default evaluationFormSlice.reducer;
