import type { AxiosInstance } from 'axios';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { Offer } from '../entities/offer/model/types';
import type { Review } from '../entities/review/model/types';
import type { User } from '../entities/user/model/types';
import { AuthorizationStatus } from '../const';
import type { RootState } from './index';
import {
  setOffers,
  setOffersLoading,
  setFavorites,
  setFavoritesLoading,
  updateOffer,
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
import { dropToken, getToken, saveToken } from '../shared/api/token';

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

type CommentPayload = {
  comment: string;
  rating: number;
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

export const fetchFavoritesAction = (): ThunkActionResult => async (
  dispatch,
  _getState,
  api
) => {
  dispatch(setFavoritesLoading(true));
  try {
    const { data } = await api.get<Offer[]>('/favorite');
    dispatch(setFavorites(data));
  } finally {
    dispatch(setFavoritesLoading(false));
  }
};

export const toggleFavoriteAction =
  (offerId: string, status: 0 | 1): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);
    dispatch(updateOffer(data));
  };

export const fetchOfferAction =
  (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(setOfferLoading(true));
    dispatch(setOfferNotFound(false));
    dispatch(setOffer(null));
    try {
      const { data } = await api.get<Offer>(`/offers/${offerId}`);
      dispatch(setOffer(data));
    } catch {
      dispatch(setOfferNotFound(true));
      dispatch(setOffer(null));
    } finally {
      dispatch(setOfferLoading(false));
    }
  };

export const fetchNearbyOffersAction =
  (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(setNearbyOffersLoading(true));
    dispatch(setNearbyOffers([]));
    try {
      const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
      dispatch(setNearbyOffers(data));
    } finally {
      dispatch(setNearbyOffersLoading(false));
    }
  };

export const fetchCommentsAction =
  (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(setCommentsLoading(true));
    dispatch(setComments([]));
    try {
      const { data } = await api.get<Review[]>(`/comments/${offerId}`);
      dispatch(setComments(data));
    } finally {
      dispatch(setCommentsLoading(false));
    }
  };

export const postCommentAction =
  (offerId: string, payload: CommentPayload): ThunkActionResult<Promise<boolean>> =>
  async (dispatch, getState, api) => {
    dispatch(setCommentPosting(true));
    try {
      const { data } = await api.post<Review>(
        `/comments/${offerId}`,
        payload
      );
      const currentComments = getState().offerDetails.comments;
      dispatch(setComments([data, ...currentComments]));
      return true;
    } catch {
      return false;
    } finally {
      dispatch(setCommentPosting(false));
    }
  };

export const checkAuthAction = (): ThunkActionResult => async (
  dispatch,
  _getState,
  api
) => {
  if (!getToken()) {
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    return;
  }

  try {
    const { data } = await api.get<AuthData>('/login');
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(fetchFavoritesAction());
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
      dispatch(fetchFavoritesAction());
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
  dispatch(setFavorites([]));
};
