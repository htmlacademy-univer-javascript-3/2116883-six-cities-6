import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  isAuthorized,
  children,
}) => (isAuthorized ? children : <Navigate to="/login" replace />);

export default PrivateRoute;

