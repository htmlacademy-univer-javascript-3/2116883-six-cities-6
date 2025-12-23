import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../entities/offer/model/types';

export const changeCity = createAction<string>('city/change');
export const setOffers = createAction<Offer[]>('offers/set');
export const setOffersLoading = createAction<boolean>('offers/loading');

export type AppAction =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof setOffersLoading>;
