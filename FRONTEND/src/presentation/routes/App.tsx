import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { ScrollToTop } from "../../shared/helpers";

import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Audit from "../pages/Audit";
import Compliance from "../pages/Compliance";
import Reports from "../pages/Reports";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import RecoverPassword from "../pages/RecoverPassword";
import EvaluationFormPage from "../pages/EvaluationFormPage";
import AuditListPage from "../pages/AuditListPage"; 
import AuditFormPage from "../pages/AuditFormPage";
import AuditReport from "../pages/AuditReport";
import AuditToUser from "../pages/AuditToUser";

import PublicRoute from "./protected/PublicRoute";
import ProtectedRoute from "./protected/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Auth />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/audits" element={<Audit />} />
              <Route path="/audit-list/:userId" element={<AuditListPage />} />
              <Route path="/audit-form/:selfAssessmentId" element={<AuditFormPage />} />
              <Route path="/audit-user" element={<AuditToUser />} />
              <Route path="/audit-report/:selfAssessmentId" element={<AuditReport />} />
              <Route path="/self-assessments" element={<Compliance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/evaluation/:regulationId" element={<EvaluationFormPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
