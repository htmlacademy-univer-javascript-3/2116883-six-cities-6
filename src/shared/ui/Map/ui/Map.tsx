import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import type { City, Offer } from '../../../../entities/offer/model/types';
import useMap from '../../../lib/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOfferId?: string | null;
  className?: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const Map = ({
  city,
  offers,
  selectedOfferId = null,
  className = 'cities__map map',
}: MapProps): JSX.Element => {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      });

      marker
        .setIcon(
          offer.id === selectedOfferId ? currentCustomIcon : defaultCustomIcon
        )
        .addTo(markerLayer);
    });

    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, offers, selectedOfferId]);

  return <section className={className} ref={mapRef}></section>;
};

export default Map;
