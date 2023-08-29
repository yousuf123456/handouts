import { useBreakpoint } from "../hooks/useBreakpoints";

export const ORDERS_PER_PAGE = 5;

export const RETURNS_PER_PAGE = 5;

export const REVIEWS_PER_PAGE = 5;

export const CANCELLATIONS_PER_PAGE = 5;

export const PRODUCTS_REVIEWS_PER_PAGE = 1;

export const PRODUCTS_QUESTIONS_PER_PAGE = 5;

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:3000/";
