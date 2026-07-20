export interface Review {
  id: number;
  bookTitle: string;
  comment: string;
  rating: number;
}

export type ReviewDraft = Omit<Review, 'id'>;

export interface JsonPlaceholderPost {
  id: number;
  userId?: number;
  title: string;
  body: string;
  rating?: number;
}
