import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import reducer from '../../../../store/reducer';
import offersReducer from '../../../../store/offers-reducer';
import offerDetailsReducer from '../../../../store/offer-details-reducer';
import userReducer from '../../../../store/user-reducer';
import { AuthorizationStatus } from '../../../../const';
import type { RootState } from '../../../../store';

const getInitialState = (): RootState =>
  ({
    offers: offersReducer(undefined, { type: 'UNKNOWN' }),
    offerDetails: offerDetailsReducer(undefined, { type: 'UNKNOWN' }),
    user: userReducer(undefined, { type: 'UNKNOWN' }),
  } as RootState);

const makeStore = (authorizationStatus: AuthorizationStatus) => {
  const baseState = getInitialState();
  return configureStore({
    reducer,
    preloadedState: {
      ...baseState,
      user: {
        ...baseState.user,
        authorizationStatus,
      },
    },
  });
};

const renderWithRouter = (authorizationStatus: AuthorizationStatus) => {
  const store = makeStore(authorizationStatus);
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/favorites']}>
        <Routes>
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <div>Private content</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('PrivateRoute', () => {
  it('renders spinner while auth status is unknown', () => {
    renderWithRouter(AuthorizationStatus.Unknown);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders children when authorized', () => {
    renderWithRouter(AuthorizationStatus.Auth);

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('redirects to login when unauthorized', async () => {
    renderWithRouter(AuthorizationStatus.NoAuth);

    await waitFor(() =>
      expect(screen.getByText('Login page')).toBeInTheDocument()
    );
  });
});
