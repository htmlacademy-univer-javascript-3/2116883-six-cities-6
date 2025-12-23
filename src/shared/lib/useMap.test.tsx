import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import useMap from './useMap';
import type { City } from '../../entities/offer/model/types';

const { mapInstance, MapMock, TileLayerMock } = vi.hoisted(() => {
  const instance = {
    setView: vi.fn(),
    addLayer: vi.fn(),
  };

  return {
    mapInstance: instance,
    MapMock: vi.fn(() => instance),
    TileLayerMock: vi.fn(() => ({})),
  };
});

vi.mock('leaflet', () => ({
  Map: MapMock,
  TileLayer: TileLayerMock,
}));

const makeCity = (overrides: Partial<City> = {}): City => ({
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 12,
  },
  ...overrides,
});

describe('useMap', () => {
  beforeEach(() => {
    MapMock.mockClear();
    TileLayerMock.mockClear();
    mapInstance.setView.mockClear();
    mapInstance.addLayer.mockClear();
  });

  it('returns null when ref is empty', () => {
    const mapRef = { current: null };
    const city = makeCity();

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).toBeNull();
    expect(MapMock).not.toHaveBeenCalled();
  });

  it('creates map instance and sets view on city change', async () => {
    const mapRef = { current: document.createElement('div') };
    const city = makeCity();

    const { result, rerender } = renderHook(
      ({ currentCity }) => useMap(mapRef, currentCity),
      { initialProps: { currentCity: city } }
    );

    await waitFor(() => expect(result.current).not.toBeNull());

    expect(MapMock).toHaveBeenCalledWith(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    });
    expect(TileLayerMock).toHaveBeenCalled();
    expect(mapInstance.addLayer).toHaveBeenCalled();

    const nextCity = makeCity({
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.89797,
        zoom: 12,
      },
    });

    rerender({ currentCity: nextCity });

    await waitFor(() =>
      expect(mapInstance.setView).toHaveBeenLastCalledWith(
        {
          lat: nextCity.location.latitude,
          lng: nextCity.location.longitude,
        },
        nextCity.location.zoom
      )
    );
  });
});
