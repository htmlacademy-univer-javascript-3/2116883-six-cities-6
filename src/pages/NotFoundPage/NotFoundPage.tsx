import type { FC } from 'react';

const NotFoundPage: FC = () => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </a>
          </div>
        </div>
      </div>
    </header>

    <main className="page__main">
      <div
        className="container"
        style={{ textAlign: 'center', padding: '50px' }}
      >
        <h1>404. Page not found</h1>
        <a
          href="/"
          className="button"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4481c3',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          Return to main page
        </a>
      </div>
    </main>
  </div>
);

export default NotFoundPage;
