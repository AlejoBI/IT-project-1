import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { ScrollToTop } from "../../shared/helpers";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const PrivacyPolicies = lazy(() => import("../pages/PrivacyPolicies"));
const Auth = lazy(() => import("../pages/Auth"));
const Audit = lazy(() => import("../pages/Audit"));
const Compliance = lazy(() => import("../pages/Compliance"));
const Reports = lazy(() => import("../pages/Reports"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const RecoverPassword = lazy(() => import("../pages/RecoverPassword"));
const EvaluationFormPage = lazy(() => import("../pages/EvaluationFormPage"));
const AuditListPage = lazy(() => import("../pages/AuditListPage"));
const AuditFormPage = lazy(() => import("../pages/AuditFormPage"));
const AuditReport = lazy(() => import("../pages/AuditReport"));
const AuditToUser = lazy(() => import("../pages/AuditToUser"));

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
          <Suspense fallback={<div role="status">Cargando página…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policies" element={<PrivacyPolicies />} />

              {/* Public and Protected Routes */}
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
          </Suspense>
        </Layout>
      </Router>
    </>
  );
};

export default App;
