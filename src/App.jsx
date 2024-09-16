// import { Route, Routes } from "react-router-dom";
import "./App.css";
// import PublicRoute from "./routes/PublicRoute";
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import PrivateRoute from "./routes/PrivateRoute";
// import Tracker from "./pages/Trecker/Tracker";
import Container from "./components/Container/Container";
import AddWaterForm from "./components/AddWaterForm/AddWaterForm";

function App() {
  return (
    <Container>
      <AddWaterForm />
      {/* <Routes>
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
      </Routes> */}
    </Container>
  );
}

export default App;
