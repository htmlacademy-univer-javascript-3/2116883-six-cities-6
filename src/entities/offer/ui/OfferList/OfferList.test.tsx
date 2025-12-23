import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import type { Offer } from '../../model/types';
import OfferList from './OfferList';

vi.mock('../PlaceCard/PlaceCard', () => ({
  default: ({ offer }: { offer: Offer }) => <div>{offer.title}</div>,
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

describe('OfferList', () => {
  it('renders a list of offers', () => {
    const offers = [makeOffer(), makeOffer({ id: 'offer-2', title: 'Cozy' })];

    render(<OfferList offers={offers} />);

    expect(screen.getByText('Nice place')).toBeInTheDocument();
    expect(screen.getByText('Cozy')).toBeInTheDocument();
  });
});
