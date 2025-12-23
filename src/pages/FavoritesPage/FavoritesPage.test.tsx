import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import FavoritesPage from './FavoritesPage';
import type { RootState } from '../../store';
import type { Offer } from '../../entities/offer/model/types';
import { AuthorizationStatus } from '../../const';
import { fetchFavoritesAction } from '../../store/api-actions';

const mockDispatch = vi.fn();
let mockState: RootState;

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>(
    'react-redux'
  );
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (selector: (state: RootState) => unknown) =>
      selector(mockState),
  };
});

vi.mock('../../store/api-actions', () => ({
  fetchFavoritesAction: vi.fn(() => ({ type: 'fetchFavorites' })),
  logoutAction: vi.fn(() => ({ type: 'logout' })),
}));

vi.mock('../../entities/offer/ui/OfferList/OfferList', () => ({
  default: ({ offers }: { offers: Offer[] }) => (
    <div data-testid="offer-list">{offers.length}</div>
  ),
}));

const cityParis = {
  name: 'Paris',
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
};

const cityAmsterdam = {
  name: 'Amsterdam',
  location: { latitude: 52.37454, longitude: 4.89797, zoom: 12 },
};

const makeOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: 'offer-1',
  title: 'Nice place',
  type: 'apartment',
  price: 120,
  city: cityParis,
  location: cityParis.location,
  isFavorite: true,
  isPremium: false,
  rating: 4,
  previewImage: 'img/apartment-01.jpg',
  ...overrides,
});

const createBaseState = (): RootState => ({
  offers: {
    city: 'Paris',
    offers: [],
    offersLoading: false,
    offersError: null,
    favorites: [],
    favoritesLoading: false,
    favoritesError: null,
  },
  offerDetails: {
    offer: null,
    offerLoading: false,
    offerError: null,
    offerNotFound: false,
    nearbyOffers: [],
    nearbyOffersLoading: false,
    comments: [],
    commentsLoading: false,
    commentPosting: false,
  },
  user: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: {
      name: 'Test User',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
      email: 'test@example.com',
    },
  },
});

const renderFavoritesPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    </HelmetProvider>
  );

const fetchFavoritesActionMock = vi.mocked(fetchFavoritesAction);

describe('FavoritesPage', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('dispatches fetchFavoritesAction and shows spinner while loading', () => {
    mockState = createBaseState();
    mockState.offers.favoritesLoading = true;

    renderFavoritesPage();

    expect(fetchFavoritesActionMock).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchFavorites' });
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders favorites grouped by city', () => {
    mockState = createBaseState();
    mockState.offers.favoritesLoading = false;
    mockState.offers.favorites = [
      makeOffer({ id: 'offer-1', city: cityParis }),
      makeOffer({ id: 'offer-2', city: cityAmsterdam, location: cityAmsterdam.location }),
    ];

    renderFavoritesPage();

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getAllByTestId('offer-list')).toHaveLength(2);
  });

  it('renders empty state when favorites list is empty', () => {
    mockState = createBaseState();
    mockState.offers.favoritesLoading = false;
    mockState.offers.favorites = [];

    renderFavoritesPage();

    expect(screen.getByText(/nothing yet saved/i)).toBeInTheDocument();
  });

  it('renders error message when favorites fail to load', () => {
    mockState = createBaseState();
    mockState.offers.favoritesLoading = false;
    mockState.offers.favoritesError = 'Server is unavailable.';

    renderFavoritesPage();

    expect(screen.getByText(/unable to load favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/server is unavailable/i)).toBeInTheDocument();
  });
});
