import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import LoginPage from './LoginPage';
import type { RootState } from '../../store';
import { AuthorizationStatus } from '../../const';
import { loginAction } from '../../store/api-actions';

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
  };
});

vi.mock('../../store/api-actions', () => ({
  loginAction: vi.fn(() => ({ type: 'login' })),
}));

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

const renderLoginPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </HelmetProvider>
  );

const loginActionMock = vi.mocked(loginAction);

describe('LoginPage', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    navigateMock.mockClear();
    loginActionMock.mockClear();
  });

  it('dispatches loginAction on valid submit', async () => {
    mockState = createBaseState();

    renderLoginPage();

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@mail.com');
    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      'test123'
    );
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginActionMock).toHaveBeenCalledWith({
      email: 'test@mail.com',
      password: 'test123',
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'login' });
  });

  it('does not dispatch loginAction when password is invalid', async () => {
    mockState = createBaseState();

    renderLoginPage();

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@mail.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginActionMock).not.toHaveBeenCalled();
  });

  it('redirects to root when authorized', async () => {
    mockState = {
      ...createBaseState(),
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

    renderLoginPage();

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/'));
  });

  it('dispatches changeCity when promo city link is clicked', async () => {
    mockState = createBaseState();
    const randomMock = vi.spyOn(Math, 'random').mockReturnValue(0);

    renderLoginPage();

    await userEvent.click(screen.getByText('Paris'));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'city/change', payload: 'Paris' })
    );

    randomMock.mockRestore();
  });
});
