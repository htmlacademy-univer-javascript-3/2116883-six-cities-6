import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import OfferPage from './OfferPage';
import type { RootState } from '../../store';
import type { Offer } from '../../entities/offer/model/types';
import type { Review } from '../../entities/review/model/types';
import { AuthorizationStatus } from '../../const';
import {
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  toggleFavoriteAction,
} from '../../store/api-actions';

const mockDispatch = vi.fn();
let mockState: RootState;
const navigateMock = vi.fn();

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

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ id: 'offer-1' }),
  };
});

vi.mock('../../store/api-actions', () => ({
  fetchOfferAction: vi.fn(() => ({ type: 'fetchOffer' })),
  fetchNearbyOffersAction: vi.fn(() => ({ type: 'fetchNearby' })),
  fetchCommentsAction: vi.fn(() => ({ type: 'fetchComments' })),
  toggleFavoriteAction: vi.fn(() => ({ type: 'toggle' })),
  logoutAction: vi.fn(() => ({ type: 'logout' })),
}));

vi.mock('../../entities/offer/ui/OfferList/OfferList', () => ({
  default: ({ offers }: { offers: Offer[] }) => (
    <div data-testid="offer-list">{offers.length}</div>
  ),
}));

vi.mock('../../entities/review/ui/ReviewList/ReviewList', () => ({
  default: ({ reviews }: { reviews: Review[] }) => (
    <div data-testid="review-list">{reviews.length}</div>
  ),
}));

vi.mock('../../features/review-form/ui/ReviewForm/ReviewForm', () => ({
  default: () => <div data-testid="review-form" />, 
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

const createBaseState = (): RootState => ({
  offers: {
    city: 'Paris',
    offers: [],
    offersLoading: false,
    favorites: [],
    favoritesLoading: false,
  },
  offerDetails: {
    offer: null,
    offerLoading: false,
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

const renderOfferPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <OfferPage />
      </MemoryRouter>
    </HelmetProvider>
  );

const toggleFavoriteActionMock = vi.mocked(toggleFavoriteAction);
const fetchOfferActionMock = vi.mocked(fetchOfferAction);
const fetchNearbyOffersActionMock = vi.mocked(fetchNearbyOffersAction);
const fetchCommentsActionMock = vi.mocked(fetchCommentsAction);

describe('OfferPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders not found page when offer is missing', () => {
    mockState = {
      ...createBaseState(),
      offerDetails: {
        ...createBaseState().offerDetails,
        offerNotFound: true,
      },
    };

    renderOfferPage();

    expect(screen.getByText(/404\. Page not found/i)).toBeInTheDocument();
  });

  it('renders review form for authorized users and toggles favorite', async () => {
    const offer = makeOffer({ isFavorite: false });
    mockState = {
      ...createBaseState(),
      offerDetails: {
        ...createBaseState().offerDetails,
        offer,
        comments: [makeReview(), makeReview({ id: 'review-2' })],
        nearbyOffers: [offer],
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
    };

    renderOfferPage();

    await waitFor(() => {
      expect(fetchOfferActionMock).toHaveBeenCalledWith('offer-1');
      expect(fetchNearbyOffersActionMock).toHaveBeenCalledWith('offer-1');
      expect(fetchCommentsActionMock).toHaveBeenCalledWith('offer-1');
    });

    expect(screen.getByTestId('review-form')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /to bookmarks/i }));

    expect(toggleFavoriteActionMock).toHaveBeenCalledWith(offer.id, 1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'toggle' });
  });

  it('redirects to login when user is not authorized', () => {
    const offer = makeOffer({ isFavorite: false });
    mockState = {
      ...createBaseState(),
      offerDetails: {
        ...createBaseState().offerDetails,
        offer,
        comments: [makeReview()],
        nearbyOffers: [offer],
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    };

    renderOfferPage();

    fireEvent.click(screen.getByRole('button', { name: /to bookmarks/i }));

    expect(navigateMock).toHaveBeenCalledWith('/login');
    expect(toggleFavoriteActionMock).not.toHaveBeenCalled();
  });
});
