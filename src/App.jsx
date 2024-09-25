import {Route, Routes} from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Tracker from "./pages/Tracker/Tracker";
import {useDispatch, useSelector} from "react-redux";
import {selectIsRefresh} from "./redux/auth/selectors";
import {useEffect} from "react";
import {refreshThunk} from "./redux/auth/operations";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SharedLayout from "./components/SharedLayout/SharedLayout";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefresh);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Loading</p>
  ) : (
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
  );
}

export default App;
