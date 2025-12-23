import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { vi } from 'vitest';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
  fetchFavoritesAction,
  toggleFavoriteAction,
} from './api-actions';
import {
  setOffers,
  setOffersLoading,
  setOffersError,
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
  setFavoritesLoading,
  setFavoritesError,
  updateOffer,
} from './action';
import type { Offer } from '../entities/offer/model/types';
import type { Review } from '../entities/review/model/types';
import type { RootState } from './index';

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

const extractActions = (dispatch: { mock: { calls: unknown[][] } }) =>
  dispatch.mock.calls.map(([action]) => action);

describe('async actions', () => {
  let api: ReturnType<typeof axios.create>;
  let mockApi: MockAdapter;
  let dispatch: ReturnType<typeof vi.fn>;
  let getState: () => RootState;

  beforeEach(() => {
    api = axios.create();
    mockApi = new MockAdapter(api);
    dispatch = vi.fn();
    getState = vi.fn<[], RootState>(() => ({} as RootState));
  });

  afterEach(() => {
    mockApi.restore();
  });

  it('fetchOffersAction dispatches offers flow', async () => {
    const offers = [makeOffer(), makeOffer({ id: 'offer-2' })];
    mockApi.onGet('/offers').reply(200, offers);

    await fetchOffersAction()(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setOffersLoading(true),
      setOffersError(null),
      setOffers(offers),
      setOffersError(null),
      setOffersLoading(false),
    ]);
  });

  it('fetchOffersAction sets error on failure', async () => {
    mockApi.onGet('/offers').reply(500);

    await fetchOffersAction()(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setOffersLoading(true),
      setOffersError(null),
      setOffersError('Server is unavailable. Please try again later.'),
      setOffersLoading(false),
    ]);
  });

  it('fetchOfferAction dispatches offer flow', async () => {
    const offer = makeOffer();
    mockApi.onGet('/offers/offer-1').reply(200, offer);

    await fetchOfferAction('offer-1')(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setOfferLoading(true),
      setOfferNotFound(false),
      setOfferError(null),
      setOffer(null),
      setOffer(offer),
      setOfferError(null),
      setOfferLoading(false),
    ]);
  });

  it('fetchOfferAction marks not found on 404', async () => {
    mockApi.onGet('/offers/missing').reply(404);

    await fetchOfferAction('missing')(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setOfferLoading(true),
      setOfferNotFound(false),
      setOfferError(null),
      setOffer(null),
      setOfferNotFound(true),
      setOffer(null),
      setOfferLoading(false),
    ]);
  });

  it('fetchOfferAction sets error on server failure', async () => {
    mockApi.onGet('/offers/bad').reply(500);

    await fetchOfferAction('bad')(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setOfferLoading(true),
      setOfferNotFound(false),
      setOfferError(null),
      setOffer(null),
      setOfferError('Server is unavailable. Please try again later.'),
      setOfferLoading(false),
    ]);
  });

  it('fetchNearbyOffersAction dispatches nearby flow', async () => {
    const offers = [makeOffer({ id: 'offer-2' })];
    mockApi.onGet('/offers/offer-1/nearby').reply(200, offers);

    await fetchNearbyOffersAction('offer-1')(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setNearbyOffersLoading(true),
      setNearbyOffers([]),
      setNearbyOffers(offers),
      setNearbyOffersLoading(false),
    ]);
  });

  it('fetchCommentsAction dispatches comments flow', async () => {
    const comments = [makeReview(), makeReview({ id: 'review-2' })];
    mockApi.onGet('/comments/offer-1').reply(200, comments);

    await fetchCommentsAction('offer-1')(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setCommentsLoading(true),
      setComments([]),
      setComments(comments),
      setCommentsLoading(false),
    ]);
  });

  it('postCommentAction prepends new comment', async () => {
    const existing = [makeReview({ id: 'review-1' })];
    const newComment = makeReview({ id: 'review-2', comment: 'New comment' });
    mockApi.onPost('/comments/offer-1').reply(201, newComment);
    getState = vi.fn<[], RootState>(
      () =>
        ({
          offerDetails: {
            comments: existing,
          },
        } as RootState)
    );

    await postCommentAction('offer-1', {
      comment: newComment.comment,
      rating: newComment.rating,
    })(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setCommentPosting(true),
      setComments([newComment, ...existing]),
      setCommentPosting(false),
    ]);
  });

  it('fetchFavoritesAction dispatches favorites flow', async () => {
    const favorites = [makeOffer({ id: 'offer-2', isFavorite: true })];
    mockApi.onGet('/favorite').reply(200, favorites);

    await fetchFavoritesAction()(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setFavoritesLoading(true),
      setFavoritesError(null),
      setFavorites(favorites),
      setFavoritesError(null),
      setFavoritesLoading(false),
    ]);
  });

  it('fetchFavoritesAction sets error on failure', async () => {
    mockApi.onGet('/favorite').reply(500);

    await fetchFavoritesAction()(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([
      setFavoritesLoading(true),
      setFavoritesError(null),
      setFavoritesError('Server is unavailable. Please try again later.'),
      setFavoritesLoading(false),
    ]);
  });

  it('toggleFavoriteAction dispatches updated offer', async () => {
    const updated = makeOffer({ isFavorite: true });
    mockApi.onPost('/favorite/offer-1/1').reply(200, updated);

    await toggleFavoriteAction('offer-1', 1)(dispatch, getState, api);

    expect(extractActions(dispatch)).toEqual([updateOffer(updated)]);
  });
});
