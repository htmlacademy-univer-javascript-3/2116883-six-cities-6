import type { Offer } from '../entities/offer/model/types';
import { DEFAULT_CITY } from '../const';
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

export type OffersState = {
  city: string;
  offers: Offer[];
  offersLoading: boolean;
  offersError: string | null;
  favorites: Offer[];
  favoritesLoading: boolean;
  favoritesError: string | null;
};

const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  offersLoading: false,
  offersError: null,
  favorites: [],
  favoritesLoading: false,
  favoritesError: null,
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
    case setOffersError.type:
      return {
        ...state,
        offersError: action.payload,
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
    case setFavoritesError.type:
      return {
        ...state,
        favoritesError: action.payload,
      };
    case updateOffer.type: {
      const updatedOffer = action.payload;
      const offers = state.offers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );
      let favorites: Offer[];

      if (updatedOffer.isFavorite) {
        const isFavorite = state.favorites.some(
          (offer) => offer.id === updatedOffer.id
        );
        if (isFavorite) {
          favorites = state.favorites.map((offer) =>
            offer.id === updatedOffer.id ? updatedOffer : offer
          );
        } else {
          favorites = [updatedOffer, ...state.favorites];
        }
      } else {
        favorites = state.favorites.filter(
          (offer) => offer.id !== updatedOffer.id
        );
      }

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
