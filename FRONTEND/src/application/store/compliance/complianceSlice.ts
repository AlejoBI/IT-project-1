import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSelfAssessment,
  saveSelfAssessmentDraft,
  completeSelfAssessment,
  fetchComplianceReports,
  fetchSelfAssessmentReport,
} from "./complianceActions";
import {
  GetDraftResponse,
  SectionScore,
  ComplianceReport,
  SelfAssessmentReport
} from "../../../domain/models/types/complianceTypes";

interface ComplianceState {
  currentDraft: GetDraftResponse | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  sectionScores: SectionScore[] | null;
  complianceReport: ComplianceReport[] | null;
  selfAssessmentReport: SelfAssessmentReport[] | null;
}

const initialState: ComplianceState = {
  currentDraft: null,
  loading: false,
  error: null,
  message: null,
  sectionScores: [],
  complianceReport: [],
  selfAssessmentReport: []
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
    },
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

    // fetch compliance reports
    builder.addCase(fetchComplianceReports.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchComplianceReports.fulfilled, (state, action) => {
      state.loading = false;
      state.complianceReport = action.payload;
    });
    builder.addCase(fetchComplianceReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // fetch self-assessment report
    builder.addCase(fetchSelfAssessmentReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSelfAssessmentReport.fulfilled, (state, action) => {
      state.loading = false;
      state.selfAssessmentReport = action.payload;
    });
    builder.addCase(fetchSelfAssessmentReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearComplianceState, clearNotificationState } =
  complianceSlice.actions;
export default complianceSlice.reducer;
