export type ReviewUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id: string;
  offerId?: string;
  date: string;
  rating: number;
  comment: string;
  user: ReviewUser;
};
