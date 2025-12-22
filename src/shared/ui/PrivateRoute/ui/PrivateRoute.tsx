import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../../../const';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  isAuthorized,
  children,
}) => (isAuthorized ? children : <Navigate to={AppRoute.Login} replace />);

export default PrivateRoute;
