import { useEffect, useMemo, useState, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OfferList from '../../entities/offer/ui/OfferList/OfferList';
import { Helmet } from 'react-helmet-async';
import Header from '../../shared/ui/Header/ui/Header';
import Map from '../../shared/ui/Map/ui/Map';
import Spinner from '../../shared/ui/Spinner/ui/Spinner';
import CityList from '../../features/city-selector/ui/CityList/CityList';
import SortingOptions, {
  type SortType,
} from '../../features/offer-sorting/ui/SortingOptions/SortingOptions';
import { CITIES } from '../../const';
import { changeCity } from '../../store/action';
import type { AppDispatch, RootState } from '../../store';

const MainPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector((state: RootState) => state.offers);
  const activeCity = useSelector((state: RootState) => state.city);
  const offersLoading = useSelector(
    (state: RootState) => state.offersLoading
  );
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortType>('Popular');
  const filteredOffers = offers.filter(
    (offer) => offer.city.name === activeCity
  );
  const sortedOffers = useMemo(() => {
    if (activeSort === 'Popular') {
      return filteredOffers;
    }

    const sorted = [...filteredOffers];

    switch (activeSort) {
      case 'Price: low to high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return filteredOffers;
    }
  }, [activeSort, filteredOffers]);
  const city = CITIES.find((item) => item.name === activeCity) ?? CITIES[0];

  useEffect(() => {
    setActiveOfferId(null);
  }, [activeCity]);

  const handleCitySelect = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  const handleSortChange = (sortType: SortType) => {
    setActiveSort(sortType);
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
        {offersLoading ? (
          <Spinner />
        ) : (
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {activeCity}
              </b>
              <SortingOptions
                activeSort={activeSort}
                onSortChange={handleSortChange}
              />
              <OfferList
                offers={sortedOffers}
                onActiveOfferChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                offers={sortedOffers}
                selectedOfferId={activeOfferId}
              />
            </div>
          </div>
        </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
