import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import OfferPage from './pages/OfferPage/OfferPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './shared/ui/PrivateRoute/ui/PrivateRoute';
import { AppRoute } from './const';
import type { Offer } from './entities/offer/model/types';

type AppProps = {
  offers: Offer[];
};

const App: FC<AppProps> = ({ offers }) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainPage offers={offers} />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute isAuthorized={false}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Offer}/:id`}
        element={<OfferPage offers={offers} />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
