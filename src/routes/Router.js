import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";

import { useAuth } from "../contexts/AuthContext";
import DetailPage from "../pages/DetailPage";
import PageNotFound from "../pages/PageNotFound";
import FormPage from "../pages/FormPage";
import FavouritePage from "../pages/FavouritePage";

function Router() {
  let location = useLocation();
  let state = location.state;
  function RequireAuth({ children }) {
    let auth = useAuth();
    console.log("user status:", auth.user);
    if (!auth.user) {
      return <Navigate to="/form" state={{ from: location }} replace />;
    }
    return children;
  }
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/movie/:movieId"
            element={
              <RequireAuth>
                <DetailPage />
              </RequireAuth>
            }
          />
          <Route path="/form" element={<FormPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/favourite"
            element={
              <RequireAuth>
                <FavouritePage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/form" element={<FormPage />} />
        </Routes>
      )}
    </>
  );
}

export default Router;
