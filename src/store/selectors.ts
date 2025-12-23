import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Offer } from '../entities/offer/model/types';
import { CITIES } from '../const';
import type { SortType } from '../features/offer-sorting/model/types';

export const selectCity = (state: RootState) => state.offers.city;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectOffersLoading = (state: RootState) =>
  state.offers.offersLoading;
export const selectOffersError = (state: RootState) =>
  state.offers.offersError;
export const selectFavorites = (state: RootState) => state.offers.favorites;
export const selectFavoritesLoading = (state: RootState) =>
  state.offers.favoritesLoading;
export const selectFavoritesError = (state: RootState) =>
  state.offers.favoritesError;

export const selectOffer = (state: RootState) => state.offerDetails.offer;
export const selectOfferLoading = (state: RootState) =>
  state.offerDetails.offerLoading;
export const selectOfferError = (state: RootState) =>
  state.offerDetails.offerError;
export const selectOfferNotFound = (state: RootState) =>
  state.offerDetails.offerNotFound;
export const selectNearbyOffers = (state: RootState) =>
  state.offerDetails.nearbyOffers;
export const selectComments = (state: RootState) => state.offerDetails.comments;
export const selectCommentsLoading = (state: RootState) =>
  state.offerDetails.commentsLoading;
export const selectCommentPosting = (state: RootState) =>
  state.offerDetails.commentPosting;

export const selectAuthorizationStatus = (state: RootState) =>
  state.user.authorizationStatus;
export const selectUser = (state: RootState) => state.user.user;

export const selectActiveCityOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const selectActiveCityData = createSelector([selectCity], (cityName) => {
  const city = CITIES.find((item) => item.name === cityName);
  return city ?? CITIES[0];
});

export const selectOffersCountByCity = createSelector(
  [selectActiveCityOffers],
  (offers) => offers.length
);

export const selectSortedOffers = createSelector(
  [selectActiveCityOffers, (_state: RootState, sortType: SortType) => sortType],
  (offers, sortType) => {
    if (sortType === 'Popular') {
      return offers;
    }

    const sorted = [...offers];

    switch (sortType) {
      case 'Price: low to high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }
);

export const selectFavoriteOffers = createSelector(
  [selectFavorites],
  (offers) => offers
);

export const selectFavoriteCount = createSelector(
  [selectFavorites],
  (offers) => offers.length
);

export const selectFavoritesByCity = createSelector(
  [selectFavorites],
  (offers) =>
    offers.reduce<Record<string, Offer[]>>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {})
);

export const selectNearbyOffersPreview = createSelector(
  [selectNearbyOffers],
  (offers) => offers.slice(0, 3)
);

export const selectSortedComments = createSelector([selectComments], (comments) =>
  [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
);
