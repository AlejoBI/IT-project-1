import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ReactNode } from "react";

import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";

import { ScrollToTop } from "../utils/helpers";

import Home from "../pages/Home";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";

import PublicRoute from "./protected/PublicRoute";
/* import ProtectedRoute from "./protected/ProtectedRoute"; */

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const showHeaderAndFooter = !["/login", "/404"].includes(location.pathname);

  return (
    <>
      {showHeaderAndFooter && <Header />}
      {children}
      {showHeaderAndFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={
              <Layout>
                <Auth />
              </Layout>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
