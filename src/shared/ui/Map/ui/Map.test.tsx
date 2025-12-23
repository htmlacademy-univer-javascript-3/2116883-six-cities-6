import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Map from './Map';
import type { City, Offer } from '../../../../entities/offer/model/types';

vi.mock('../../../lib/useMap', () => ({
  default: vi.fn(() => null),
}));

vi.mock('leaflet', () => {
  class IconMock {}
  class MarkerMock {
    setIcon() {
      return this;
    }
    addTo() {
      return this;
    }
  }

  return {
    Icon: IconMock,
    Marker: MarkerMock,
    layerGroup: vi.fn(() => ({ addTo: vi.fn() })),
  };
});

const city: City = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 12,
  },
};

const offer: Offer = {
  id: 'offer-1',
  title: 'Nice place',
  type: 'apartment',
  price: 120,
  city,
  location: city.location,
  isFavorite: false,
  isPremium: false,
  rating: 4,
};

describe('Map', () => {
  it('renders map container with default class', () => {
    const { container } = render(<Map city={city} offers={[]} />);
    const section = container.querySelector('section');

    expect(section).not.toBeNull();
    expect(section).toHaveClass('cities__map');
  });

  it('respects custom className', () => {
    const { container } = render(
      <Map city={city} offers={[offer]} className="custom-map" />
    );
    const section = container.querySelector('section');

    expect(section).not.toBeNull();
    expect(section).toHaveClass('custom-map');
  });
});
