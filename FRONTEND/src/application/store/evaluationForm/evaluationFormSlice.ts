import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEvaluationFormAction,
  deleteEvaluationFormAction,
  fetchEvaluationFormsAction,
  updateEvaluationFormAction
} from "./evaluationFormActions";
import { Form } from "../../../domain/models/types/EvaluationFormTypes";

interface NotificationState {
  type: "success" | "error" | "warning" | "info" | null;
  message: string | null;
}

interface EvaluationFormState {
  forms: Form | null;
  loading: boolean;
  error: string | null;
  notification: NotificationState;
}

const initialState: EvaluationFormState = {
  forms: null,
  loading: false,
  error: null,
  notification: {
    type: null,
    message: null,
  },
};

const evaluationFormSlice = createSlice({
  name: "evaluationForm",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<Form>) => {
      state.forms = action.payload;
    },
    clearForm: (state) => {
      state.forms = null;
    },
    setNotification: (state, action: PayloadAction<NotificationState>) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = { type: null, message: null };
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
      state.forms = action.payload;
      state.notification = {
        type: "success",
        message: "Formulario creado exitosamente",
      };
    });
    builder.addCase(createEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.notification = {
        type: "error",
        message: action.payload as string,
      };
    });

    // Eliminar formulario
    builder.addCase(deleteEvaluationFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEvaluationFormAction.fulfilled, (state) => {
      state.loading = false;
      state.forms = null;
      state.notification = {
        type: "success",
        message: "Formulario eliminado correctamente",
      };
    });
    builder.addCase(deleteEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.notification = {
        type: "error",
        message: action.payload as string,
      };
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
      state.notification = {
        type: "error",
        message: action.payload as string,
      };
    });

    // Actualizar formulario
    builder.addCase(updateEvaluationFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateEvaluationFormAction.fulfilled, (state) => {
      state.loading = false;
      state.notification = {
        type: "success",
        message: "Formulario actualizado correctamente",
      };
    });
    builder.addCase(updateEvaluationFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.notification = {
        type: "error",
        message: action.payload as string,
      };
    });
  },
});

export const {
  setForm,
  clearForm,
  setNotification,
  clearNotification,
} = evaluationFormSlice.actions;

export default evaluationFormSlice.reducer;