import { useEffect, useState, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OfferList from '../../entities/offer/ui/OfferList/OfferList';
import { Helmet } from 'react-helmet-async';
import Header from '../../shared/ui/Header/ui/Header';
import Map from '../../shared/ui/Map/ui/Map';
import CityList from '../../features/city-selector/ui/CityList/CityList';
import { CITIES } from '../../const';
import { changeCity } from '../../store/action';
import type { AppDispatch, RootState } from '../../store';

const MainPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector((state: RootState) => state.offers);
  const activeCity = useSelector((state: RootState) => state.city);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const filteredOffers = offers.filter(
    (offer) => offer.city.name === activeCity
  );
  const city = CITIES.find((item) => item.name === activeCity) ?? CITIES[0];

  useEffect(() => {
    setActiveOfferId(null);
  }, [activeCity]);

  const handleCitySelect = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities - Main</title>
      </Helmet>
      <Header isLogoActive />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList
            cities={CITIES.map((item) => item.name)}
            activeCity={activeCity}
            onCitySelect={handleCitySelect}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {activeCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <OfferList
                offers={filteredOffers}
                onActiveOfferChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                offers={filteredOffers}
                selectedOfferId={activeOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
