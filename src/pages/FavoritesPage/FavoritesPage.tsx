import { useEffect, type FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import OfferList from '../../entities/offer/ui/OfferList/OfferList';
import Footer from '../../shared/ui/Footer/ui/Footer';
import Header from '../../shared/ui/Header/ui/Header';
import Spinner from '../../shared/ui/Spinner/ui/Spinner';
import { AppRoute } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavoriteCount,
  selectFavoritesByCity,
  selectFavoritesError,
  selectFavoritesLoading,
} from '../../store/selectors';
import type { AppDispatch } from '../../store';
import { fetchFavoritesAction } from '../../store/api-actions';

const FavoritesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favoritesLoading = useSelector(selectFavoritesLoading);
  const favoritesError = useSelector(selectFavoritesError);
  const favoritesByCity = useSelector(selectFavoritesByCity);
  const favoritesCount = useSelector(selectFavoriteCount);
  const hasError = Boolean(favoritesError);
  const isEmpty = !favoritesLoading && favoritesCount === 0 && !hasError;
  const pageClassName = isEmpty ? 'page page--favorites-empty' : 'page';
  const mainClassName = isEmpty
    ? 'page__main page__main--favorites page__main--favorites-empty'
    : 'page__main page__main--favorites';

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <div className={pageClassName}>
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>
      <Header />
      <main className={mainClassName}>
        {favoritesLoading && <Spinner />}
        {!favoritesLoading && hasError && favoritesError && (
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Unable to load favorites.</b>
                <p className="favorites__status-description">
                  {favoritesError}
                </p>
              </div>
            </section>
          </div>
        )}
        {!favoritesLoading && !hasError && isEmpty && (
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          </div>
        )}
        {!favoritesLoading && !isEmpty && (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favoritesByCity).map(
                  ([cityName, cityOffers]) => (
                    <li className="favorites__locations-items" key={cityName}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link
                            className="locations__item-link"
                            to={AppRoute.Root}
                          >
                            <span>{cityName}</span>
                          </Link>
                        </div>
                      </div>
                      <OfferList
                        offers={cityOffers}
                        variant="favorites"
                        listClassName="favorites__places"
                      />
                    </li>
                  )
                )}
              </ul>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
