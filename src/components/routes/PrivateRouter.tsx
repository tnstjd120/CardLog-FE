import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  let auth = false;

  useAuth().then((res) => console.log("auth endpoint", res));

  // console.log(auth);

  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
