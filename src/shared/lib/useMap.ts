import {
  useEffect,
  useState,
  type MutableRefObject,
  useRef,
} from 'react';
import { Map as LeafletMap, TileLayer } from 'leaflet';
import type { City } from '../../entities/offer/model/types';

const TILE_LAYER_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): LeafletMap | null => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new LeafletMap(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(TILE_LAYER_URL, {
        attribution: TILE_LAYER_ATTRIBUTION,
      });

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom
      );
    }
  }, [map, city]);

  return map;
};

export default useMap;
