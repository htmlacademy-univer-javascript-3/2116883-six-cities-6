import { useCallback, type FC, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../../const';
import type { AppDispatch } from '../../../../store';
import { logoutAction } from '../../../../store/api-actions';
import {
  selectAuthorizationStatus,
  selectFavoriteCount,
  selectUser,
} from '../../../../store/selectors';

type HeaderProps = {
  isLogoActive?: boolean;
  showNav?: boolean;
};

const Header: FC<HeaderProps> = ({
  isLogoActive = false,
  showNav = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  const favoriteCount = useSelector(selectFavoriteCount);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const logoClassName = isLogoActive
    ? 'header__logo-link header__logo-link--active'
    : 'header__logo-link';

  const handleSignOut = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      dispatch(logoutAction());
    },
    [dispatch]
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={logoClassName} to={AppRoute.Root}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {showNav && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={isAuthorized ? AppRoute.Favorites : AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    {isAuthorized ? (
                      <>
                        <span className="header__user-name user__name">
                          {user?.email ?? 'User'}
                        </span>
                        <span className="header__favorite-count">
                          {favoriteCount}
                        </span>
                      </>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </Link>
                </li>
                {isAuthorized && (
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Root}
                      onClick={handleSignOut}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
