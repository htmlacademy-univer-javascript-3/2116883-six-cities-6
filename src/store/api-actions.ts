import type { AxiosInstance } from 'axios';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { Offer } from '../entities/offer/model/types';
import type { RootState } from './index';
import { setOffers, setOffersLoading, type AppAction } from './action';

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
  dispatch(setOffersLoading(true));
  try {
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(setOffers(data));
  } finally {
    dispatch(setOffersLoading(false));
  }
};
