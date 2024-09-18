import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import PublicRoute from "./routes/PublicRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Tracker from "./pages/Tracker/Tracker";
import Container from "./components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefresh } from "./redux/auth/selectors";
import { useEffect } from "react";
import { refreshThunk } from "./redux/auth/operations";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefresh);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Loading</p>
  ) : (
    <Container>
      <Routes>
        <Route
          path="/"
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
          path="/tracker"
          element={
            <PrivateRoute>
              <Tracker />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
}

export default App;
