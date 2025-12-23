import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import OfferList from '../../entities/offer/ui/OfferList/OfferList';
import Footer from '../../shared/ui/Footer/ui/Footer';
import Header from '../../shared/ui/Header/ui/Header';
import Spinner from '../../shared/ui/Spinner/ui/Spinner';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';
import {
  selectFavoritesByCity,
  selectOffersLoading,
} from '../../store/selectors';

const FavoritesPage: FC = () => {
  const offersLoading = useSelector(selectOffersLoading);
  const favoritesByCity = useSelector(selectFavoritesByCity);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        {offersLoading ? (
          <Spinner />
        ) : (
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
