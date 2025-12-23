import { memo, useCallback, type FC, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../../const';
import type { Offer } from '../../model/types';
import type { AppDispatch } from '../../../../store';
import { toggleFavoriteAction } from '../../../../store/api-actions';
import { selectAuthorizationStatus } from '../../../../store/selectors';

export type PlaceCardVariant = 'cities' | 'favorites' | 'near-places';

type PlaceCardProps = {
  offer: Offer;
  variant?: PlaceCardVariant;
  onActiveOfferChange?: (offerId: string | null) => void;
};

const cardClassNameByVariant: Record<PlaceCardVariant, string> = {
  cities: 'cities__card place-card',
  favorites: 'favorites__card place-card',
  'near-places': 'near-places__card place-card',
};

const imageWrapperClassNameByVariant: Record<PlaceCardVariant, string> = {
  cities: 'cities__image-wrapper place-card__image-wrapper',
  favorites: 'favorites__image-wrapper place-card__image-wrapper',
  'near-places': 'near-places__image-wrapper place-card__image-wrapper',
};

const imageSizeByVariant: Record<PlaceCardVariant, { width: number; height: number }> = {
  cities: { width: 260, height: 200 },
  favorites: { width: 150, height: 110 },
  'near-places': { width: 260, height: 200 },
};

const PlaceCard: FC<PlaceCardProps> = ({
  offer,
  variant = 'cities',
  onActiveOfferChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const cardClassName = cardClassNameByVariant[variant];
  const imageWrapperClassName = imageWrapperClassNameByVariant[variant];
  const infoClassName =
    variant === 'favorites'
      ? 'favorites__card-info place-card__info'
      : 'place-card__info';
  const imageSize = imageSizeByVariant[variant];
  const previewImage =
    offer.previewImage ?? offer.images?.[0] ?? 'img/apartment-01.jpg';
  const ratingWidth = `${Math.round(offer.rating) * 20}%`;
  const bookmarkButtonClassName = offer.isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const offerType =
    offer.type.length > 0
      ? offer.type[0].toUpperCase() + offer.type.slice(1)
      : offer.type;

  const handleMouseEnter = () => {
    onActiveOfferChange?.(offer.id);
  };

  const handleMouseLeave = () => {
    onActiveOfferChange?.(null);
  };

  const handleFavoriteClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!isAuthorized) {
        navigate(AppRoute.Login);
        return;
      }
      dispatch(toggleFavoriteAction(offer.id, offer.isFavorite ? 0 : 1));
    },
    [dispatch, navigate, isAuthorized, offer.id, offer.isFavorite]
  );

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
          <button
            className={bookmarkButtonClassName}
            type="button"
            onClick={handleFavoriteClick}
          >
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
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>
  );
};

export default memo(PlaceCard);
