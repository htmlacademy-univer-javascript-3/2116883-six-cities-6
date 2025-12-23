import type { AxiosInstance } from 'axios';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { Offer } from '../entities/offer/model/types';
import type { RootState } from './index';
import { setOffers, type AppAction } from './action';

type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  RootState,
  AxiosInstance,
  AppAction
>;

export const fetchOffersAction = (): ThunkActionResult => async (
  dispatch,
  _getState,
  api
) => {
  const { data } = await api.get<Offer[]>('/offers');
  dispatch(setOffers(data));
};
