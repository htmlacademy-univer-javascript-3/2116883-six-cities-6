import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../../const';
import Spinner from '../../Spinner/ui/Spinner';
import type { RootState } from '../../../../store';

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} replace />
  );
};

export default PrivateRoute;
