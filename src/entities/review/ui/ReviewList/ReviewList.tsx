import { memo, type FC } from 'react';
import type { Review } from '../../model/types';
import ReviewCard from '../ReviewCard/ReviewCard';

type ReviewListProps = {
  reviews: Review[];
};

const ReviewList: FC<ReviewListProps> = ({ reviews }) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <ReviewCard key={review.id} review={review} />
    ))}
  </ul>
);

export default memo(ReviewList);
