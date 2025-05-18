import { createSlice } from "@reduxjs/toolkit";
import { createOrUpdateAudit, fetchSelfAssessmentToAudits } from "./auditActions";
import { SelfAssessmentToAudit } from "../../../domain/models/types/auditTypes";

interface AuditState {
  selfAssessmentToAudits: SelfAssessmentToAudit[] | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuditState = {
  selfAssessmentToAudits: null,
  loading: false,
  error: null,
  message: null,
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    clearSelfAssessmentState: (state) => {
      state.selfAssessmentToAudits = null;
      state.error = null;
      state.loading = false;
      state.message = null;
    },
    clearNotificationState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // create or update audit
    builder.addCase(createOrUpdateAudit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrUpdateAudit.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(createOrUpdateAudit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error as string;
    });

    // fetch self-assessment to audits
    builder.addCase(fetchSelfAssessmentToAudits.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSelfAssessmentToAudits.fulfilled, (state, action) => {
      state.loading = false;
      state.selfAssessmentToAudits = action.payload;
    });
    builder.addCase(fetchSelfAssessmentToAudits.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelfAssessmentState, clearNotificationState } =
  auditSlice.actions;
export default auditSlice.reducer;
