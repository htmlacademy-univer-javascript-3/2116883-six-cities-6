import { memo, type FC } from 'react';
import type { Offer } from '../../model/types';
import PlaceCard, { type PlaceCardVariant } from '../PlaceCard/PlaceCard';

type OfferListProps = {
  offers: Offer[];
  variant?: PlaceCardVariant;
  listClassName?: string;
  onActiveOfferChange?: (offerId: string | null) => void;
};

const OfferList: FC<OfferListProps> = ({
  offers,
  variant = 'cities',
  listClassName = 'cities__places-list places__list tabs__content',
  onActiveOfferChange,
}) => (
  <div className={listClassName}>
    {offers.map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
        variant={variant}
        onActiveOfferChange={onActiveOfferChange}
      />
    ))}
  </div>
);

export default memo(OfferList);
