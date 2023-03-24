import { Navigate } from "react-router-dom";
import { getCookie } from "utils/cookie/universal-cookie";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const accessToken = getCookie("access");

  return accessToken ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
