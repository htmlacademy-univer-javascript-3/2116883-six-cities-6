import type { Offer } from '../entities/offer/model/types';
import type { Review } from '../entities/review/model/types';
import type { User } from '../entities/user/model/types';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import {
  changeCity,
  setOffers,
  setOffersLoading,
  setOffer,
  setOfferLoading,
  setOfferNotFound,
  setNearbyOffers,
  setNearbyOffersLoading,
  setComments,
  setCommentsLoading,
  setCommentPosting,
  setAuthorizationStatus,
  setUser,
  type AppAction,
} from './action';

export type State = {
  city: string;
  offers: Offer[];
  offersLoading: boolean;
  offer: Offer | null;
  offerLoading: boolean;
  offerNotFound: boolean;
  nearbyOffers: Offer[];
  nearbyOffersLoading: boolean;
  comments: Review[];
  commentsLoading: boolean;
  commentPosting: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  offersLoading: false,
  offer: null,
  offerLoading: false,
  offerNotFound: false,
  nearbyOffers: [],
  nearbyOffersLoading: false,
  comments: [],
  commentsLoading: false,
  commentPosting: false,
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
    case setOffer.type:
      return {
        ...state,
        offer: action.payload,
      };
    case setOfferLoading.type:
      return {
        ...state,
        offerLoading: action.payload,
      };
    case setOfferNotFound.type:
      return {
        ...state,
        offerNotFound: action.payload,
      };
    case setNearbyOffers.type:
      return {
        ...state,
        nearbyOffers: action.payload,
      };
    case setNearbyOffersLoading.type:
      return {
        ...state,
        nearbyOffersLoading: action.payload,
      };
    case setComments.type:
      return {
        ...state,
        comments: action.payload,
      };
    case setCommentsLoading.type:
      return {
        ...state,
        commentsLoading: action.payload,
      };
    case setCommentPosting.type:
      return {
        ...state,
        commentPosting: action.payload,
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
