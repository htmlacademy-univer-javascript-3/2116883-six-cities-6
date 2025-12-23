import type { Offer } from '../entities/offer/model/types';
import { DEFAULT_CITY } from '../const';
import {
  changeCity,
  setOffers,
  setOffersLoading,
  setFavorites,
  setFavoritesLoading,
  updateOffer,
  type AppAction,
} from './action';

export type OffersState = {
  city: string;
  offers: Offer[];
  offersLoading: boolean;
  favorites: Offer[];
  favoritesLoading: boolean;
};

const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  offersLoading: false,
  favorites: [],
  favoritesLoading: false,
};

const offersReducer = (
  state: OffersState = initialState,
  action: AppAction
): OffersState => {
  switch (action.type) {
    case changeCity.type:
      return {
        ...state,
        city: action.payload,
      };
    case setOffers.type:
      return {
        ...state,
        offers: action.payload,
      };
    case setOffersLoading.type:
      return {
        ...state,
        offersLoading: action.payload,
      };
    case setFavorites.type: {
      const favoriteIds = new Set(action.payload.map((offer) => offer.id));
      const updatedOffers = state.offers.map((offer) => ({
        ...offer,
        isFavorite: favoriteIds.has(offer.id),
      }));

      return {
        ...state,
        offers: updatedOffers,
        favorites: action.payload,
      };
    }
    case setFavoritesLoading.type:
      return {
        ...state,
        favoritesLoading: action.payload,
      };
    case updateOffer.type: {
      const updatedOffer = action.payload;
      const offers = state.offers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );
      const favorites = updatedOffer.isFavorite
        ? state.favorites.some((offer) => offer.id === updatedOffer.id)
          ? state.favorites.map((offer) =>
              offer.id === updatedOffer.id ? updatedOffer : offer
            )
          : [updatedOffer, ...state.favorites]
        : state.favorites.filter((offer) => offer.id !== updatedOffer.id);

      return {
        ...state,
        offers,
        favorites,
      };
    }
    default:
      return state;
  }
};

export default offersReducer;
