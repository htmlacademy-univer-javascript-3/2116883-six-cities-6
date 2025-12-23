import type { Offer } from '../entities/offer/model/types';
import { DEFAULT_CITY } from '../const';
import {
  changeCity,
  setOffers,
  setOffersLoading,
  type AppAction,
} from './action';

export type OffersState = {
  city: string;
  offers: Offer[];
  offersLoading: boolean;
};

const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  offersLoading: false,
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
    default:
      return state;
  }
};

export default offersReducer;
