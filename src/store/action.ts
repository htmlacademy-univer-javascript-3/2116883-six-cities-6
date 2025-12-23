import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../entities/offer/model/types';
import type { User } from '../entities/user/model/types';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('city/change');
export const setOffers = createAction<Offer[]>('offers/set');
export const setOffersLoading = createAction<boolean>('offers/loading');
export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/auth-status'
);
export const setUser = createAction<User | null>('user/set');

export type AppAction =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof setOffersLoading>
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof setUser>;
