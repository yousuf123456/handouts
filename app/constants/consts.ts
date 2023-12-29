export const ORDERS_PER_PAGE = 5;

export const RETURNS_PER_PAGE = 5;

export const REVIEWS_PER_PAGE = 5;

export const CANCELLATIONS_PER_PAGE = 5;

export const PRODUCTS_REVIEWS_PER_PAGE = 25;

export const PRODUCTS_QUESTIONS_PER_PAGE = 5;

export const RatingAndReviewBucketCount = 200;
export const QuestionsPerBucketCount = 300;

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:3000/";
