import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Header from './Header';
import { AuthorizationStatus } from '../../../../const';
import { logoutAction } from '../../../../store/api-actions';
import type { RootState } from '../../../../store';
import type { Offer } from '../../../../entities/offer/model/types';

const dispatchMock = vi.fn();
let mockState: RootState = {
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
};

vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
  useSelector: (selector: (state: RootState) => unknown) =>
    selector(mockState),
}));

vi.mock('../../../../store/api-actions', () => ({
  logoutAction: vi.fn(() => ({ type: 'logout' })),
}));

const logoutActionMock = vi.mocked(logoutAction);

describe('Header', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
    logoutActionMock.mockClear();
  });

  it('renders sign in link for guests', () => {
    mockState = {
      ...mockState,
      offers: {
        ...mockState.offers,
        favorites: [] as Offer[],
        favoritesLoading: false,
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    };

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('renders user info and handles sign out for authorized users', () => {
    mockState = {
      ...mockState,
      offers: {
        ...mockState.offers,
        favorites: [{ id: '1' }, { id: '2' }] as Offer[],
        favoritesLoading: false,
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          name: 'John',
          avatarUrl: 'img/avatar.svg',
          isPro: false,
          email: 'john@example.com',
        },
      },
    };

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/sign out/i));

    expect(logoutActionMock).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'logout' });
  });
});
