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
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/audits" element={<Audit />} />
              <Route path="/self-assessments" element={<Compliance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
