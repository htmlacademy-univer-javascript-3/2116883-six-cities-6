import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MainPage from './MainPage';
import type { RootState } from '../../store';
import type { Offer } from '../../entities/offer/model/types';
import { AuthorizationStatus } from '../../const';

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

vi.mock('../../entities/offer/ui/OfferList/OfferList', () => ({
  default: ({ offers }: { offers: Offer[] }) => (
    <div data-testid="offer-list">{offers.length}</div>
  ),
}));

vi.mock('../../shared/ui/Map/ui/Map', () => ({
  default: () => <div data-testid="map" />,
}));

const city = {
  name: 'Paris',
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
};

const makeOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: 'offer-1',
  title: 'Nice place',
  type: 'apartment',
  price: 120,
  city,
  location: city.location,
  isFavorite: false,
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
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
  },
});

const renderMainPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('MainPage', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('shows spinner while offers are loading', () => {
    mockState = {
      ...createBaseState(),
      offers: {
        ...createBaseState().offers,
        offersLoading: true,
      },
    };

    renderMainPage();

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders empty state when there are no offers', () => {
    mockState = createBaseState();

    renderMainPage();

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  it('renders error message when offers fail to load', () => {
    mockState = createBaseState();
    mockState.offers.offersError = 'Server is unavailable.';

    renderMainPage();

    expect(
      screen.getByText(/unable to load offers/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/server is unavailable/i)).toBeInTheDocument();
  });

  it('renders offer list and map when offers exist', () => {
    mockState = createBaseState();
    mockState.offers.offers = [
      makeOffer(),
      makeOffer({ id: 'offer-2', price: 200 }),
    ];

    renderMainPage();

    expect(
      screen.getByText(/2 places to stay in Paris/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('offer-list')).toHaveTextContent('2');
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
