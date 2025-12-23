import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../entities/offer/model/types';
import type { Review } from '../entities/review/model/types';
import type { User } from '../entities/user/model/types';
import { AuthorizationStatus } from '../const';

const createActionWithPayload = <Payload, Type extends string>(type: Type) =>
  createAction<Payload, Type>(type);

export const changeCity = createActionWithPayload<string, 'city/change'>(
  'city/change'
);
export const setOffers = createActionWithPayload<Offer[], 'offers/set'>(
  'offers/set'
);
export const setOffersLoading = createActionWithPayload<
  boolean,
  'offers/loading'
>('offers/loading');
export const setOffersError = createActionWithPayload<
  string | null,
  'offers/error'
>('offers/error');
export const setFavorites = createActionWithPayload<
  Offer[],
  'offers/favorites/set'
>('offers/favorites/set');
export const setFavoritesLoading = createActionWithPayload<
  boolean,
  'offers/favorites/loading'
>('offers/favorites/loading');
export const setFavoritesError = createActionWithPayload<
  string | null,
  'offers/favorites/error'
>('offers/favorites/error');
export const updateOffer = createActionWithPayload<Offer, 'offers/update'>(
  'offers/update'
);
export const setOffer = createActionWithPayload<Offer | null, 'offer/set'>(
  'offer/set'
);
export const setOfferLoading = createActionWithPayload<
  boolean,
  'offer/loading'
>('offer/loading');
export const setOfferError = createActionWithPayload<
  string | null,
  'offer/error'
>('offer/error');
export const setOfferNotFound = createActionWithPayload<
  boolean,
  'offer/not-found'
>('offer/not-found');
export const setNearbyOffers = createActionWithPayload<
  Offer[],
  'offer/nearby/set'
>('offer/nearby/set');
export const setNearbyOffersLoading = createActionWithPayload<
  boolean,
  'offer/nearby/loading'
>('offer/nearby/loading');
export const setComments = createActionWithPayload<Review[], 'comments/set'>(
  'comments/set'
);
export const setCommentsLoading = createActionWithPayload<
  boolean,
  'comments/loading'
>('comments/loading');
export const setCommentPosting = createActionWithPayload<
  boolean,
  'comments/posting'
>('comments/posting');
export const setAuthorizationStatus = createActionWithPayload<
  AuthorizationStatus,
  'user/auth-status'
>('user/auth-status');
export const setUser = createActionWithPayload<User | null, 'user/set'>(
  'user/set'
);

export type AppAction =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof setOffersLoading>
  | ReturnType<typeof setOffersError>
  | ReturnType<typeof setFavorites>
  | ReturnType<typeof setFavoritesLoading>
  | ReturnType<typeof setFavoritesError>
  | ReturnType<typeof updateOffer>
  | ReturnType<typeof setOffer>
  | ReturnType<typeof setOfferLoading>
  | ReturnType<typeof setOfferError>
  | ReturnType<typeof setOfferNotFound>
  | ReturnType<typeof setNearbyOffers>
  | ReturnType<typeof setNearbyOffersLoading>
  | ReturnType<typeof setComments>
  | ReturnType<typeof setCommentsLoading>
  | ReturnType<typeof setCommentPosting>
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof setUser>;
