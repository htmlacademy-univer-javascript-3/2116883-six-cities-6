import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../shared/ui/Header/ui/Header';

const NotFoundPage: FC = () => (
  <div className="page page--gray page--main">
    <Header showNav={false} />

    <main className="page__main">
      <div
        className="container"
        style={{ textAlign: 'center', padding: '50px' }}
      >
        <h1>404. Page not found</h1>
        <Link
          to={AppRoute.Root}
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
          Вернуться на главную
        </Link>
      </div>
    </main>
  </div>
);

export default NotFoundPage;
