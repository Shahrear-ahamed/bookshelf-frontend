import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { pathname } = useLocation();

  const { user, isLoading } = useAppSelector((state) => state.user);

  if (!user?.email && !isLoading) {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  return children;
}
