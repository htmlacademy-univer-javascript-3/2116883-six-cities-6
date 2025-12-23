import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import PlaceCard from './PlaceCard';
import reducer from '../../../../store/reducer';
import offersReducer from '../../../../store/offers-reducer';
import offerDetailsReducer from '../../../../store/offer-details-reducer';
import userReducer from '../../../../store/user-reducer';
import { AuthorizationStatus } from '../../../../const';
import type { Offer } from '../../model/types';
import type { RootState } from '../../../../store';
import { toggleFavoriteAction } from '../../../../store/api-actions';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../../../store/api-actions', () => ({
  toggleFavoriteAction: vi.fn(() => ({ type: 'toggle' })),
}));

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

const toggleFavoriteActionMock = vi.mocked(toggleFavoriteAction);

const getInitialState = (): RootState =>
  ({
    offers: offersReducer(undefined, { type: 'UNKNOWN' }),
    offerDetails: offerDetailsReducer(undefined, { type: 'UNKNOWN' }),
    user: userReducer(undefined, { type: 'UNKNOWN' }),
  } as RootState);

const renderCard = (authorizationStatus: AuthorizationStatus, offer: Offer) => {
  const baseState = getInitialState();
  const store = configureStore({
    reducer,
    preloadedState: {
      ...baseState,
      user: {
        ...baseState.user,
        authorizationStatus,
      },
    },
  });
  const dispatchSpy = vi.spyOn(store, 'dispatch');

  render(
    <Provider store={store}>
      <MemoryRouter>
        <PlaceCard offer={offer} />
      </MemoryRouter>
    </Provider>
  );

  return { dispatchSpy };
};

describe('PlaceCard', () => {
  it('calls onActiveOfferChange on hover', () => {
    const onActiveOfferChange = vi.fn();
    const offer = makeOffer();
    const baseState = getInitialState();
    const store = configureStore({
      reducer,
      preloadedState: {
        ...baseState,
        user: {
          ...baseState.user,
          authorizationStatus: AuthorizationStatus.Auth,
        },
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={offer} onActiveOfferChange={onActiveOfferChange} />
        </MemoryRouter>
      </Provider>
    );

    const card = container.querySelector('article');
    expect(card).not.toBeNull();
    if (!card) {
      return;
    }

    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);

    expect(onActiveOfferChange).toHaveBeenCalledWith(offer.id);
    expect(onActiveOfferChange).toHaveBeenCalledWith(null);
  });

  it('redirects to login when user is not authorized', () => {
    const offer = makeOffer();
    renderCard(AuthorizationStatus.NoAuth, offer);

    fireEvent.click(screen.getByRole('button'));

    expect(navigateMock).toHaveBeenCalledWith('/login');
    expect(toggleFavoriteActionMock).not.toHaveBeenCalled();
  });

  it('dispatches toggleFavoriteAction when authorized', () => {
    const offer = makeOffer();
    const { dispatchSpy } = renderCard(AuthorizationStatus.Auth, offer);

    fireEvent.click(screen.getByRole('button'));

    expect(toggleFavoriteActionMock).toHaveBeenCalledWith(offer.id, 1);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'toggle' });
  });
});
