import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../../const';
import Spinner from '../../Spinner/ui/Spinner';
import { selectAuthorizationStatus } from '../../../../store/selectors';

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

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
