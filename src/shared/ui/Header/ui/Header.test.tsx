import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Header from './Header';
import { AuthorizationStatus } from '../../../../const';
import { logoutAction } from '../../../../store/api-actions';

const dispatchMock = vi.fn();
let mockState = {
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
  },
  offers: {
    favorites: [],
    favoritesLoading: false,
  },
};

vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
  useSelector: (selector: (state: typeof mockState) => unknown) =>
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
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      offers: {
        favorites: [],
        favoritesLoading: false,
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
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          name: 'John',
          avatarUrl: 'img/avatar.svg',
          isPro: false,
          email: 'john@example.com',
        },
      },
      offers: {
        favorites: [{ id: '1' }, { id: '2' }],
        favoritesLoading: false,
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
