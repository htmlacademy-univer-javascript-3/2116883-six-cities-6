import { useCallback, useEffect, useState, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OfferList from '../../entities/offer/ui/OfferList/OfferList';
import { Helmet } from 'react-helmet-async';
import Header from '../../shared/ui/Header/ui/Header';
import Map from '../../shared/ui/Map/ui/Map';
import Spinner from '../../shared/ui/Spinner/ui/Spinner';
import CityList from '../../features/city-selector/ui/CityList/CityList';
import SortingOptions from '../../features/offer-sorting/ui/SortingOptions/SortingOptions';
import type { SortType } from '../../features/offer-sorting/model/types';
import { CITIES } from '../../const';
import { changeCity } from '../../store/action';
import type { AppDispatch, RootState } from '../../store';
import PlacesEmpty from './ui/PlacesEmpty/PlacesEmpty';
import {
  selectActiveCityData,
  selectCity,
  selectOffersCountByCity,
  selectOffersError,
  selectOffersLoading,
  selectSortedOffers,
} from '../../store/selectors';
import OffersError from './ui/OffersError/OffersError';

const CITY_NAMES = CITIES.map((item) => item.name);

const MainPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeCity = useSelector(selectCity);
  const offersLoading = useSelector(selectOffersLoading);
  const offersError = useSelector(selectOffersError);
  const offersCount = useSelector(selectOffersCountByCity);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortType>('Popular');
  const sortedOffers = useSelector((state: RootState) =>
    selectSortedOffers(state, activeSort)
  );
  const city = useSelector(selectActiveCityData);
  const hasError = Boolean(offersError);
  const isEmpty = !offersLoading && offersCount === 0 && !hasError;
  const mainClassName = isEmpty
    ? 'page__main page__main--index page__main--index-empty'
    : 'page__main page__main--index';

  useEffect(() => {
    setActiveOfferId(null);
  }, [activeCity]);

  const handleCitySelect = useCallback(
    (cityName: string) => {
      dispatch(changeCity(cityName));
    },
    [dispatch]
  );

  const handleSortChange = useCallback((sortType: SortType) => {
    setActiveSort(sortType);
  }, []);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities - Main</title>
      </Helmet>
      <Header isLogoActive />
      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList
            cities={CITY_NAMES}
            activeCity={activeCity}
            onCitySelect={handleCitySelect}
          />
        </div>
        {offersLoading && <Spinner />}
        {!offersLoading && hasError && offersError && (
          <OffersError message={offersError} />
        )}
        {!offersLoading && !hasError && isEmpty && (
          <PlacesEmpty cityName={activeCity} />
        )}
        {!offersLoading && !hasError && !isEmpty && (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersCount} places to stay in {activeCity}
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
