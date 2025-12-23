import offersReducer from './offers-reducer';
import {
  changeCity,
  setOffers,
  setOffersLoading,
  setOffersError,
  setFavorites,
  setFavoritesLoading,
  setFavoritesError,
  updateOffer,
  type AppAction,
} from './action';
import { DEFAULT_CITY } from '../const';
import type { Offer } from '../entities/offer/model/types';

const city = {
  name: 'Paris',
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
};

const location = { latitude: 48.85661, longitude: 2.351499, zoom: 12 };

const makeOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: 'offer-1',
  title: 'Nice place',
  type: 'apartment',
  price: 120,
  city,
  location,
  isFavorite: false,
  isPremium: false,
  rating: 4,
  previewImage: 'img/apartment-01.jpg',
  ...overrides,
});

describe('offersReducer', () => {
  it('returns initial state', () => {
    const initAction = { type: 'UNKNOWN' } as unknown as AppAction;

    expect(offersReducer(undefined, initAction)).toEqual({
      city: DEFAULT_CITY,
      offers: [],
      offersLoading: false,
      offersError: null,
      favorites: [],
      favoritesLoading: false,
      favoritesError: null,
    });
  });

  it('changes city', () => {
    const state = offersReducer(undefined, changeCity('Amsterdam'));

    expect(state.city).toBe('Amsterdam');
  });

  it('sets offers and loading flag', () => {
    const offers = [makeOffer(), makeOffer({ id: 'offer-2' })];
    const stateWithLoading = offersReducer(
      undefined,
      setOffersLoading(true)
    );
    const stateWithOffers = offersReducer(stateWithLoading, setOffers(offers));

    expect(stateWithLoading.offersLoading).toBe(true);
    expect(stateWithOffers.offers).toEqual(offers);
  });

  it('sets offers error', () => {
    const state = offersReducer(undefined, setOffersError('Network error'));

    expect(state.offersError).toBe('Network error');
  });

  it('sets favorites and syncs offer flags', () => {
    const offers = [makeOffer(), makeOffer({ id: 'offer-2' })];
    const favorites = [offers[1]];
    const state = offersReducer(
      {
        city: DEFAULT_CITY,
        offers,
        offersLoading: false,
        offersError: null,
        favorites: [],
        favoritesLoading: false,
        favoritesError: null,
      },
      setFavorites(favorites)
    );

    expect(state.favorites).toEqual(favorites);
    expect(state.offers[0].isFavorite).toBe(false);
    expect(state.offers[1].isFavorite).toBe(true);
  });

  it('sets favorites loading flag', () => {
    const state = offersReducer(undefined, setFavoritesLoading(true));

    expect(state.favoritesLoading).toBe(true);
  });

  it('sets favorites error', () => {
    const state = offersReducer(undefined, setFavoritesError('Network error'));

    expect(state.favoritesError).toBe('Network error');
  });

  it('updates offer and favorites list', () => {
    const offers = [makeOffer(), makeOffer({ id: 'offer-2' })];
    const updated = { ...offers[1], isFavorite: true };
    const state = offersReducer(
      {
        city: DEFAULT_CITY,
        offers,
        offersLoading: false,
        offersError: null,
        favorites: [],
        favoritesLoading: false,
        favoritesError: null,
      },
      updateOffer(updated)
    );

    expect(state.offers[1].isFavorite).toBe(true);
    expect(state.favorites).toEqual([updated]);
  });

  it('removes offer from favorites when unfavorited', () => {
    const offers = [makeOffer(), makeOffer({ id: 'offer-2', isFavorite: true })];
    const updated = { ...offers[1], isFavorite: false };
    const state = offersReducer(
      {
        city: DEFAULT_CITY,
        offers,
        offersLoading: false,
        offersError: null,
        favorites: [offers[1]],
        favoritesLoading: false,
        favoritesError: null,
      },
      updateOffer(updated)
    );

    expect(state.favorites).toEqual([]);
    expect(state.offers[1].isFavorite).toBe(false);
  });
});
