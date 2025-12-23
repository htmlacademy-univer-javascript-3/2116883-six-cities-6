import type { Offer } from '../entities/offer/model/types';
import type { Review } from '../entities/review/model/types';
import {
  setOffer,
  setOfferLoading,
  setOfferNotFound,
  setNearbyOffers,
  setNearbyOffersLoading,
  setComments,
  setCommentsLoading,
  setCommentPosting,
  type AppAction,
} from './action';

export type OfferDetailsState = {
  offer: Offer | null;
  offerLoading: boolean;
  offerNotFound: boolean;
  nearbyOffers: Offer[];
  nearbyOffersLoading: boolean;
  comments: Review[];
  commentsLoading: boolean;
  commentPosting: boolean;
};

const initialState: OfferDetailsState = {
  offer: null,
  offerLoading: false,
  offerNotFound: false,
  nearbyOffers: [],
  nearbyOffersLoading: false,
  comments: [],
  commentsLoading: false,
  commentPosting: false,
};

const offerDetailsReducer = (
  state: OfferDetailsState = initialState,
  action: AppAction
): OfferDetailsState => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default offerDetailsReducer;
