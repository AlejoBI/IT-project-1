import { createSlice } from "@reduxjs/toolkit";
import { createEvaluationForm, deleteEvaluationForm } from "./evaluationFormActions"; // Importa la acción asíncrona
import { Form } from "../../../domain/models/types/EvaluationFormTypes";

interface EvaluationFormState {
  form: Form | null;
  loading: boolean;
  error: string | null;
}

const initialState: EvaluationFormState = {
  form: null,
  loading: false,
  error: null,
};

const evaluationFormSlice = createSlice({
  name: "evaluationForm",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
    clearForm: (state) => {
      state.form = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvaluationForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvaluationForm.fulfilled, (state, action) => {
        state.loading = false;
        state.form = action.payload; // Se guarda el formulario creado
      })
      .addCase(createEvaluationForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Error
      });
    builder
      .addCase(deleteEvaluationForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvaluationForm.fulfilled, (state) => {
        state.loading = false;
        state.form = null; // Se elimina el formulario
      })
      .addCase(deleteEvaluationForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Error
      })
  },
});

export const { setForm, clearForm } = evaluationFormSlice.actions;
export default evaluationFormSlice.reducer;