import type { AxiosInstance } from 'axios';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { Offer } from '../entities/offer/model/types';
import type { User } from '../entities/user/model/types';
import { AuthorizationStatus } from '../const';
import type { RootState } from './index';
import {
  setOffers,
  setOffersLoading,
  setAuthorizationStatus,
  setUser,
  type AppAction,
} from './action';
import { dropToken, saveToken } from '../shared/api/token';

type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  RootState,
  AxiosInstance,
  AppAction
>;

type AuthData = User & {
  token: string;
};

type AuthPayload = {
  email: string;
  password: string;
};

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

export const checkAuthAction = (): ThunkActionResult => async (
  dispatch,
  _getState,
  api
) => {
  try {
    const { data } = await api.get<AuthData>('/login');
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
};

export const loginAction =
  ({ email, password }: AuthPayload): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<AuthData>('/login', { email, password });
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      throw new Error('Login failed');
    }
  };

export const logoutAction = (): ThunkActionResult => async (
  dispatch,
  _getState,
  api
) => {
  try {
    await api.delete('/logout');
  } catch {
    // Ignore logout errors to ensure local state is cleared.
  }
  dropToken();
  dispatch(setUser(null));
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
};
