import type { Review } from '../entities/review/model/types';

const reviews: Review[] = [
  {
    id: 'review-1',
    offerId: 'amsterdam-1',
    date: '2019-04-24',
    rating: 4.6,
    comment:
      'A quiet cozy and picturesque place that hides behind a river by the unique lightness of Amsterdam.',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
  {
    id: 'review-2',
    offerId: 'amsterdam-1',
    date: '2019-03-12',
    rating: 4.2,
    comment:
      'Great location and clean apartment. The host was helpful and check-in was smooth.',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: 'review-3',
    offerId: 'amsterdam-2',
    date: '2019-02-17',
    rating: 3.8,
    comment:
      'Simple, cozy room for a short stay. Public transport is nearby, which is convenient.',
    user: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
  },
  {
    id: 'review-4',
    offerId: 'amsterdam-4',
    date: '2019-01-08',
    rating: 4.9,
    comment:
      'Bright studio with a nice terrace. Perfect for a weekend getaway.',
    user: {
      name: 'Liam',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
];

export default reviews;
