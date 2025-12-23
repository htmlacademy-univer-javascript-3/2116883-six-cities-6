import { render, screen } from '@testing-library/react';
import ReviewList from './ReviewList';
import type { Review } from '../../model/types';

describe('ReviewList', () => {
  it('renders list of reviews', () => {
    const reviews: Review[] = [
      {
        id: 'review-1',
        date: '2023-01-01T10:00:00.000Z',
        rating: 4,
        comment: 'Nice place.',
        user: {
          name: 'Kate',
          avatarUrl: 'img/avatar.svg',
          isPro: false,
        },
      },
      {
        id: 'review-2',
        date: '2023-02-01T10:00:00.000Z',
        rating: 5,
        comment: 'Perfect stay.',
        user: {
          name: 'Mark',
          avatarUrl: 'img/avatar.svg',
          isPro: true,
        },
      },
    ];

    render(<ReviewList reviews={reviews} />);

    expect(screen.getByText('Nice place.')).toBeInTheDocument();
    expect(screen.getByText('Perfect stay.')).toBeInTheDocument();
  });
});
