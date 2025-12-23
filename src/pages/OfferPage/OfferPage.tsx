import { useCallback, useEffect, useState, type FC, type MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import OfferList from '../../entities/offer/ui/OfferList/OfferList';
import ReviewList from '../../entities/review/ui/ReviewList/ReviewList';
import ReviewForm from '../../features/review-form/ui/ReviewForm/ReviewForm';
import Header from '../../shared/ui/Header/ui/Header';
import Map from '../../shared/ui/Map/ui/Map';
import Spinner from '../../shared/ui/Spinner/ui/Spinner';
import { AppRoute, AuthorizationStatus } from '../../const';
import type { AppDispatch } from '../../store';
import {
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  toggleFavoriteAction,
} from '../../store/api-actions';
import {
  selectAuthorizationStatus,
  selectComments,
  selectNearbyOffersPreview,
  selectOffer,
  selectOfferLoading,
  selectOfferNotFound,
  selectSortedComments,
} from '../../store/selectors';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const OfferPage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const offer = useSelector(selectOffer);
  const offerLoading = useSelector(selectOfferLoading);
  const offerNotFound = useSelector(selectOfferNotFound);
  const nearbyOffersList = useSelector(selectNearbyOffersPreview);
  const comments = useSelector(selectComments);
  const sortedComments = useSelector(selectSortedComments);
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const [activeNearbyOfferId, setActiveNearbyOfferId] = useState<string | null>(
    null
  );
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const offerId = offer?.id ?? '';
  const isFavorite = offer?.isFavorite ?? false;

  const handleFavoriteClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!isAuthorized) {
        navigate(AppRoute.Login);
        return;
      }
      if (!offerId) {
        return;
      }
      dispatch(toggleFavoriteAction(offerId, isFavorite ? 0 : 1));
    },
    [dispatch, navigate, isAuthorized, offerId, isFavorite]
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchCommentsAction(id));
    setActiveNearbyOfferId(null);
  }, [dispatch, id]);

  if (offerNotFound) {
    return <NotFoundPage />;
  }

  if (offerLoading || !offer) {
    return (
      <div className="page">
        <Helmet>
          <title>6 cities — Offer</title>
        </Helmet>
        <Header />
        <main className="page__main page__main--offer">
          <Spinner />
        </main>
      </div>
    );
  }

  const ratingWidth = `${Math.round(offer.rating) * 20}%`;
  const galleryImages =
    offer.images ?? (offer.previewImage ? [offer.previewImage] : []);
  const insideGoods = offer.goods ?? [];
  const description = offer.description ?? 'No description available.';
  const host = offer.host ?? {
    name: 'Unknown',
    avatarUrl: 'img/avatar.svg',
    isPro: false,
  };
  const bedrooms = offer.bedrooms ?? 1;
  const maxAdults = offer.maxAdults ?? 1;
  const hostClassName = host.isPro
    ? 'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper'
    : 'offer__avatar-wrapper user__avatar-wrapper';

  return (
    <div className="page">
      <Helmet>
        <title>6 cities — Offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {galleryImages.map((image, index) => (
                <div
                  className="offer__image-wrapper"
                  key={`${offer.id}-${index}`}
                >
                  <img className="offer__image" src={image} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={
                    offer.isFavorite
                      ? 'offer__bookmark-button offer__bookmark-button--active button'
                      : 'offer__bookmark-button button'
                  }
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating.toFixed(1)}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {insideGoods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={hostClassName}>
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews ·{' '}
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewList reviews={sortedComments} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm offerId={offer.id} />
                )}
              </section>
            </div>
          </div>
          <Map
            className="offer__map map"
            city={offer.city}
            offers={nearbyOffersList}
            selectedOfferId={activeNearbyOfferId}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferList
              offers={nearbyOffersList}
              variant="near-places"
              listClassName="near-places__list places__list"
              onActiveOfferChange={setActiveNearbyOfferId}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
