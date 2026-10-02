const { rateLimit } = require('express-rate-limit');

// Slows password guessing and signup spam: 10 attempts per IP per 15 minutes.
// Each route gets its own counter so failed signups don't eat into login attempts.
const createAuthLimiter = () => rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: "Too many attempts, please try again in 15 minutes" },
});

const loginLimiter = createAuthLimiter();
const registerLimiter = createAuthLimiter();

module.exports = { loginLimiter, registerLimiter };
