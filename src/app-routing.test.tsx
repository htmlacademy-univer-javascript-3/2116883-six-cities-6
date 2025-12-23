import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import reducer from './store/reducer';
import offersReducer from './store/offers-reducer';
import offerDetailsReducer from './store/offer-details-reducer';
import userReducer from './store/user-reducer';
import { AuthorizationStatus } from './const';
import type { RootState } from './store';
import type { AppAction } from './store/action';

const initAction = { type: 'UNKNOWN' } as unknown as AppAction;

const getInitialState = (): RootState =>
  ({
    offers: offersReducer(undefined, initAction),
    offerDetails: offerDetailsReducer(undefined, initAction),
    user: userReducer(undefined, initAction),
  } as RootState);

const makeStore = (preloadedState?: Partial<RootState>) => {
  const baseState = getInitialState();
  const mergedState: RootState = {
    ...baseState,
    ...preloadedState,
    offers: {
      ...baseState.offers,
      ...preloadedState?.offers,
    },
    offerDetails: {
      ...baseState.offerDetails,
      ...preloadedState?.offerDetails,
    },
    user: {
      ...baseState.user,
      ...preloadedState?.user,
    },
  };

  return configureStore({
    reducer,
    preloadedState: mergedState,
  });
};

const renderApp = (route: string, preloadedState?: Partial<RootState>) => {
  window.history.pushState({}, '', route);
  const store = makeStore(preloadedState);

  render(
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  );
};

describe('App routing', () => {
  it('renders main page on root route', () => {
    renderApp('/');

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  it('renders login page on /login route', () => {
    renderApp('/login');

    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('redirects unauthorized users from /favorites', async () => {
    renderApp('/favorites', {
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /sign in/i })
      ).toBeInTheDocument()
    );
  });

  it('renders not found page on unknown route', () => {
    renderApp('/unknown');

    expect(screen.getByText(/404\. Page not found/i)).toBeInTheDocument();
  });
});
