import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import type { Offer } from '../../model/types';

export type PlaceCardVariant = 'cities' | 'favorites' | 'near-places';

type PlaceCardProps = {
  offer: Offer;
  variant?: PlaceCardVariant;
  onActiveOfferChange?: (offerId: string | null) => void;
};

const PlaceCard: FC<PlaceCardProps> = ({
  offer,
  variant = 'cities',
  onActiveOfferChange,
}) => {
  const cardClassName =
    variant === 'favorites'
      ? 'favorites__card place-card'
      : variant === 'near-places'
      ? 'near-places__card place-card'
      : 'cities__card place-card';
  const imageWrapperClassName =
    variant === 'favorites'
      ? 'favorites__image-wrapper place-card__image-wrapper'
      : variant === 'near-places'
      ? 'near-places__image-wrapper place-card__image-wrapper'
      : 'cities__image-wrapper place-card__image-wrapper';
  const infoClassName =
    variant === 'favorites'
      ? 'favorites__card-info place-card__info'
      : 'place-card__info';
  const imageSize =
    variant === 'favorites'
      ? { width: 150, height: 110 }
      : { width: 260, height: 200 };
  const previewImage =
    offer.previewImage ?? offer.images?.[0] ?? 'img/apartment-01.jpg';
  const ratingWidth = `${Math.round(offer.rating) * 20}%`;
  const bookmarkButtonClassName = offer.isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';

  const handleMouseEnter = () => {
    onActiveOfferChange?.(offer.id);
  };

  const handleMouseLeave = () => {
    onActiveOfferChange?.(null);
  };

  return (
    <article
      className={cardClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClassName}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={bookmarkButtonClassName} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
