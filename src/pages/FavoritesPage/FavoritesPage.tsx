import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import OfferList from '../../entities/offer/ui/OfferList/OfferList';
import type { Offer } from '../../entities/offer/model/types';
import Footer from '../../shared/ui/Footer/ui/Footer';
import Header from '../../shared/ui/Header/ui/Header';
import { AppRoute } from '../../const';
import type { FavoritesPageProps } from '../../types';

const FavoritesPage: FC<FavoritesPageProps> = ({ offers }) => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const favoritesByCity = favoriteOffers.reduce<Record<string, Offer[]>>(
    (acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    },
    {}
  );

  return (
    <div className="page">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByCity).map(([cityName, cityOffers]) => (
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
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
