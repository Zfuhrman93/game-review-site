export const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Keep in sync with maxlength in server/models/review.model.js
export const REVIEW_MAX_LENGTH = 2000;

// Vite inlines this at build time, so a missing .env would otherwise fail silently
if (!API_BASE) {
  throw new Error('VITE_API_BASE_URL is not set. Copy client/.env.example to client/.env.');
}
