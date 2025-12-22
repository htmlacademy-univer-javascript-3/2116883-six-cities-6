import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';

type HeaderProps = {
  isLogoActive?: boolean;
  showNav?: boolean;
  isAuthorized?: boolean;
  userEmail?: string;
  favoriteCount?: number;
};

const Header: FC<HeaderProps> = ({
  isLogoActive = false,
  showNav = true,
  isAuthorized = true,
  userEmail = 'Oliver.conner@gmail.com',
  favoriteCount = 3,
}) => {
  const logoClassName = isLogoActive
    ? 'header__logo-link header__logo-link--active'
    : 'header__logo-link';

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
                          {userEmail}
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
                    <Link className="header__nav-link" to={AppRoute.Login}>
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
