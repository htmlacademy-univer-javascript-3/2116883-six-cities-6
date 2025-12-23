import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';
import type { Review } from '../../model/types';

describe('ReviewCard', () => {
  it('renders review content', () => {
    const review: Review = {
      id: 'review-1',
      date: '2023-01-15T10:00:00.000Z',
      rating: 4,
      comment: 'Everything was great.',
      user: {
        name: 'Angelina',
        avatarUrl: 'img/avatar-angelina.jpg',
        isPro: true,
      },
    };

    const formattedDate = new Date(review.date).toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    render(<ReviewCard review={review} />);

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
