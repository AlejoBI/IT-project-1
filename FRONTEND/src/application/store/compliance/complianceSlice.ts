import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSelfAssessment,
  saveSelfAssessmentDraft,
  completeSelfAssessment,
} from "./complianceActions";
import {
  GetDraftResponse,
} from "../../../domain/models/types/complianceTypes";

interface ComplianceState {
  currentDraft: GetDraftResponse | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ComplianceState = {
  currentDraft: null,
  loading: false,
  error: null,
  message: null,
};

const complianceSlice = createSlice({
  name: "compliance",
  initialState,
  reducers: {
    clearComplianceState: (state) => {
      state.currentDraft = null;
      state.error = null;
      state.loading = false;
      state.message = null;
    },
    clearNotificationState: (state) => {
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchSelfAssessment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSelfAssessment.fulfilled, (state, action) => {
      state.loading = false;
      state.currentDraft = action.payload;
    });
    builder.addCase(fetchSelfAssessment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // save draft
    builder.addCase(saveSelfAssessmentDraft.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveSelfAssessmentDraft.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload as string;
    });
    builder.addCase(saveSelfAssessmentDraft.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // complete
    builder.addCase(completeSelfAssessment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(completeSelfAssessment.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload as string;
    });
    builder.addCase(completeSelfAssessment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearComplianceState, clearNotificationState } = complianceSlice.actions;
export default complianceSlice.reducer;
