import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import OfferPage from './pages/OfferPage/OfferPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AppRoute } from './const';

type AppProps = {
  offerCount: number;
};

const App: FC<AppProps> = ({ offerCount }) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainPage offerCount={offerCount} />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute isAuthorized={false}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Offer}/:id`}
        element={<OfferPage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
