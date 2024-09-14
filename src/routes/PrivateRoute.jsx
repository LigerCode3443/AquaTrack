import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to="/signin" state={location} />;
};
export default PrivateRoute;
