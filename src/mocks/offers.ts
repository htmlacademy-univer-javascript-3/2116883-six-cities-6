import type { Offer } from '../entities/offer/model/types';

const offers: Offer[] = [
  {
    id: 'amsterdam-1',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.89797,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: 'img/apartment-01.jpg',
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    description:
      'A quiet cozy and picturesque place that hides behind a river and the unique lightness of Amsterdam.',
    bedrooms: 3,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Kitchen',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
      'Cable TV',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: 'amsterdam-2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.89797,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1,
    previewImage: 'img/room.jpg',
    images: [
      'img/room.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/studio-01.jpg',
      'img/room.jpg',
    ],
    description:
      'Simple and quiet room with a view of the old city and a short walk to the center.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Towels'],
    host: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
  {
    id: 'brussels-1',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8476,
        longitude: 4.3572,
        zoom: 12,
      },
    },
    location: {
      latitude: 50.8503,
      longitude: 4.3517,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.9,
    previewImage: 'img/apartment-03.jpg',
    images: [
      'img/apartment-03.jpg',
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/studio-01.jpg',
      'img/apartment-03.jpg',
    ],
    description:
      'Spacious apartment with a bright living room, perfect for a long stay.',
    bedrooms: 2,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Kitchen',
      'Washing machine',
      'Heating',
      'Baby seat',
    ],
    host: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: 'hamburg-1',
    title: 'Compact studio with terrace',
    type: 'Studio',
    price: 90,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 12,
      },
    },
    location: {
      latitude: 53.5589,
      longitude: 9.9276,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.3,
    previewImage: 'img/apartment-02.jpg',
    images: [
      'img/studio-01.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
    ],
    description:
      'Compact studio with a sunny terrace and quick access to public transport.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Fridge', 'Coffee machine'],
    host: {
      name: 'Liam',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
];

export default offers;
