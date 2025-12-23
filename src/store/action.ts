import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../entities/offer/model/types';
import type { Review } from '../entities/review/model/types';
import type { User } from '../entities/user/model/types';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('city/change');
export const setOffers = createAction<Offer[]>('offers/set');
export const setOffersLoading = createAction<boolean>('offers/loading');
export const setFavorites = createAction<Offer[]>('offers/favorites/set');
export const setFavoritesLoading = createAction<boolean>(
  'offers/favorites/loading'
);
export const updateOffer = createAction<Offer>('offers/update');
export const setOffer = createAction<Offer | null>('offer/set');
export const setOfferLoading = createAction<boolean>('offer/loading');
export const setOfferNotFound = createAction<boolean>('offer/not-found');
export const setNearbyOffers = createAction<Offer[]>('offer/nearby/set');
export const setNearbyOffersLoading = createAction<boolean>(
  'offer/nearby/loading'
);
export const setComments = createAction<Review[]>('comments/set');
export const setCommentsLoading = createAction<boolean>('comments/loading');
export const setCommentPosting = createAction<boolean>('comments/posting');
export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/auth-status'
);
export const setUser = createAction<User | null>('user/set');

export type AppAction =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof setOffersLoading>
  | ReturnType<typeof setFavorites>
  | ReturnType<typeof setFavoritesLoading>
  | ReturnType<typeof updateOffer>
  | ReturnType<typeof setOffer>
  | ReturnType<typeof setOfferLoading>
  | ReturnType<typeof setOfferNotFound>
  | ReturnType<typeof setNearbyOffers>
  | ReturnType<typeof setNearbyOffersLoading>
  | ReturnType<typeof setComments>
  | ReturnType<typeof setCommentsLoading>
  | ReturnType<typeof setCommentPosting>
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof setUser>;
