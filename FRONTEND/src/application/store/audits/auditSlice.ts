import { createSlice } from "@reduxjs/toolkit";
import {
  createOrUpdateAudit,
  fetchSelfAssessmentToAudits,
  fetchAuditsBySelfAssessmentId,
} from "./auditActions";
import {
  SelfAssessmentToAudit,
  Audit,
} from "../../../domain/models/types/auditTypes";

interface AuditState {
  selfAssessmentToAudits: SelfAssessmentToAudit[] | null;
  audits: Audit | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuditState = {
  selfAssessmentToAudits: null,
  audits: null,
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
      state.audits = null;
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

    // fetch audits by self-assessment ID
    builder.addCase(fetchAuditsBySelfAssessmentId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchAuditsBySelfAssessmentId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.audits = action.payload;
      }
    );
    builder.addCase(fetchAuditsBySelfAssessmentId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelfAssessmentState, clearNotificationState } =
  auditSlice.actions;
export default auditSlice.reducer;
