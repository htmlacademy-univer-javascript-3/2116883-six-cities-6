import type { Offer } from '../entities/offer/model/types';
import type { User } from '../entities/user/model/types';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import {
  changeCity,
  setOffers,
  setOffersLoading,
  setAuthorizationStatus,
  setUser,
  type AppAction,
} from './action';

export type State = {
  city: string;
  offers: Offer[];
  offersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  offersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
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
    case setOffersLoading.type:
      return {
        ...state,
        offersLoading: action.payload,
      };
    case setAuthorizationStatus.type:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case setUser.type:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
