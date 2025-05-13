import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEvaluationFormAction,
  deleteEvaluationFormAction,
  fetchEvaluationFormsAction,
  fetchEvaluationFormByIdAction,
  updateEvaluationFormAction,
} from "./evaluationFormActions";
import { FormGetResponse } from "../../../domain/models/types/EvaluationFormTypes";

interface EvaluationFormState {
  forms: FormGetResponse | null;
  loading: boolean;
  error: string | null;
  message: string;
}

const initialState: EvaluationFormState = {
  forms: null,
  loading: false,
  error: null,
  message: "",
};

const evaluationFormSlice = createSlice({
  name: "evaluationForm",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<FormGetResponse>) => {
      state.forms = action.payload;
    },
    clearForms: (state) => {
      state.forms = null;
    },
    clearNotification: (state) => {
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Crear formulario
    builder.addCase(createEvaluationFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createEvaluationFormAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(createEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error as string;
    });

    // Eliminar formulario
    builder.addCase(deleteEvaluationFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEvaluationFormAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error as string;
    });

    // Obtener formularios
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

    // Obtener formulario por ID
    builder.addCase(fetchEvaluationFormByIdAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchEvaluationFormByIdAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      }
    );
    builder.addCase(fetchEvaluationFormByIdAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Actualizar formulario
    builder.addCase(updateEvaluationFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateEvaluationFormAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error as string;
    });
  },
});

export const { setForm, clearNotification, clearForms } =
  evaluationFormSlice.actions;

export default evaluationFormSlice.reducer;
