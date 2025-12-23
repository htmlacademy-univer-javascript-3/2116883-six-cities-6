import offerDetailsReducer from './offer-details-reducer';
import {
  setOffer,
  setOfferLoading,
  setOfferError,
  setOfferNotFound,
  setNearbyOffers,
  setNearbyOffersLoading,
  setComments,
  setCommentsLoading,
  setCommentPosting,
  setFavorites,
  updateOffer,
  type AppAction,
} from './action';
import type { Offer } from '../entities/offer/model/types';
import type { Review } from '../entities/review/model/types';

const city = {
  name: 'Paris',
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
};

const location = { latitude: 48.85661, longitude: 2.351499, zoom: 12 };

const makeOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: 'offer-1',
  title: 'Nice place',
  type: 'apartment',
  price: 120,
  city,
  location,
  isFavorite: false,
  isPremium: false,
  rating: 4,
  previewImage: 'img/apartment-01.jpg',
  ...overrides,
});

const makeReview = (overrides: Partial<Review> = {}): Review => ({
  id: 'review-1',
  date: '2023-01-01T10:00:00.000Z',
  rating: 4,
  comment: 'Nice place',
  user: {
    name: 'Test',
    avatarUrl: 'img/avatar.svg',
    isPro: false,
  },
  ...overrides,
});

describe('offerDetailsReducer', () => {
  it('returns initial state', () => {
    const initAction = { type: 'UNKNOWN' } as unknown as AppAction;

    expect(offerDetailsReducer(undefined, initAction)).toEqual({
      offer: null,
      offerLoading: false,
      offerError: null,
      offerNotFound: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      comments: [],
      commentsLoading: false,
      commentPosting: false,
    });
  });

  it('sets offer and flags', () => {
    const offer = makeOffer();
    const state = offerDetailsReducer(undefined, setOffer(offer));
    const loadingState = offerDetailsReducer(state, setOfferLoading(true));
    const errorState = offerDetailsReducer(
      loadingState,
      setOfferError('Network error')
    );
    const notFoundState = offerDetailsReducer(
      errorState,
      setOfferNotFound(true)
    );

    expect(state.offer).toEqual(offer);
    expect(loadingState.offerLoading).toBe(true);
    expect(errorState.offerError).toBe('Network error');
    expect(notFoundState.offerNotFound).toBe(true);
  });

  it('sets nearby offers and comments', () => {
    const nearbyOffers = [makeOffer({ id: 'offer-2' })];
    const comments = [makeReview(), makeReview({ id: 'review-2' })];
    const state = offerDetailsReducer(
      undefined,
      setNearbyOffers(nearbyOffers)
    );
    const stateWithComments = offerDetailsReducer(state, setComments(comments));
    const stateWithLoading = offerDetailsReducer(
      stateWithComments,
      setNearbyOffersLoading(true)
    );

    expect(state.nearbyOffers).toEqual(nearbyOffers);
    expect(stateWithComments.comments).toEqual(comments);
    expect(stateWithLoading.nearbyOffersLoading).toBe(true);
  });

  it('sets comment flags', () => {
    const state = offerDetailsReducer(undefined, setCommentsLoading(true));
    const nextState = offerDetailsReducer(state, setCommentPosting(true));

    expect(state.commentsLoading).toBe(true);
    expect(nextState.commentPosting).toBe(true);
  });

  it('syncs favorites with current offer and nearby offers', () => {
    const offer = makeOffer({ id: 'offer-1' });
    const nearbyOffers = [makeOffer({ id: 'offer-2' })];
    const favorites = [makeOffer({ id: 'offer-2', isFavorite: true })];
    const state = offerDetailsReducer(
      {
        offer,
        offerLoading: false,
        offerError: null,
        offerNotFound: false,
        nearbyOffers,
        nearbyOffersLoading: false,
        comments: [],
        commentsLoading: false,
        commentPosting: false,
      },
      setFavorites(favorites)
    );

    expect(state.offer?.isFavorite).toBe(false);
    expect(state.nearbyOffers[0].isFavorite).toBe(true);
  });

  it('updates offer in details and nearby list', () => {
    const offer = makeOffer({ id: 'offer-1', isFavorite: false });
    const nearbyOffer = makeOffer({ id: 'offer-2', isFavorite: false });
    const updated = { ...offer, isFavorite: true };
    const state = offerDetailsReducer(
      {
        offer,
        offerLoading: false,
        offerError: null,
        offerNotFound: false,
        nearbyOffers: [nearbyOffer],
        nearbyOffersLoading: false,
        comments: [],
        commentsLoading: false,
        commentPosting: false,
      },
      updateOffer(updated)
    );

    expect(state.offer?.isFavorite).toBe(true);
    expect(state.nearbyOffers[0].isFavorite).toBe(false);
  });
});
