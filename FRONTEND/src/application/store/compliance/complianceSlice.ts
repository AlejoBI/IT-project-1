// src/presentation/store/evaluationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveComplianceApi } from "../../../infrastructure/api/complianceApi";
import { validateComplianceData } from "../../../domain/services/complianceService";

interface EvaluationState {
  loading: boolean;
  error: string | null;
}

const initialState: EvaluationState = {
  loading: false,
  error: null,
};

export const saveEvaluation = createAsyncThunk<
  void, // No retorna datos
  { responses: { [key: string]: string } }, // Payload de entrada
  { rejectValue: string }
>("evaluation/save", async (payload, { rejectWithValue }) => {
  const validation = validateComplianceData(payload);
  if (!validation.success) {
    return rejectWithValue(validation.errors?.join(", ") || "Datos inválidos");
  }

  try {
    await saveComplianceApi(validation.data!);
    return;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const evaluationSlice = createSlice({
  name: "evaluation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveEvaluation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveEvaluation.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveEvaluation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error desconocido";
    });
  },
});

export default evaluationSlice.reducer;