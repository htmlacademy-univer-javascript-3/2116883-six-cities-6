import { memo, type FC } from 'react';
import type { Review } from '../../model/types';

type ReviewCardProps = {
  review: Review;
};

const formatReviewDate = (value: string) =>
  new Date(value).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const ratingWidth = `${Math.round(review.rating) * 20}%`;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {formatReviewDate(review.date)}
        </time>
      </div>
    </li>
  );
};

export default memo(ReviewCard);
