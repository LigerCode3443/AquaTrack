import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { selectIsRefresh } from "./redux/auth/selectors";
import { refreshThunk } from "./redux/auth/operations";
import Loader from "./components/Loader/Loader";

const Register = lazy(() => import("./pages/Register/Register"));
const Tracker = lazy(() => import("./pages/Tracker/Tracker"));
const ChangePassword = lazy(() =>
  import("./pages/ChangePassword/ChangePassword")
);
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefresh);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/password-recovery/:verificationToken"
            element={
              <PublicRoute>
                <ChangePassword />
              </PublicRoute>
            }
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute>
                <Tracker />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
