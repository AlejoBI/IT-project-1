import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ReactNode } from "react";

import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";

import ScrollToTop from "../components/utils/ScrollToTop";

import Home from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";

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
                <AuthPage />
              </Layout>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
