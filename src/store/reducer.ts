import type { Offer } from '../entities/offer/model/types';
import { DEFAULT_CITY } from '../const';
import { changeCity, setOffers, type AppAction } from './action';

export type State = {
  city: string;
  offers: Offer[];
};

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
};

const reducer = (state: State = initialState, action: AppAction): State => {
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
    default:
      return state;
  }
};

export default reducer;
