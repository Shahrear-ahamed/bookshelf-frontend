import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { pathname } = useLocation();

  const user = false;

  if (!user) {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  return children;
}
