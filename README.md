# Game Review

A full-stack site for browsing video games and reviewing them. Anyone can sign up and post reviews, and an admin curates the list of games.

**Live site:** https://game-review-site-phi.vercel.app

> The API runs on Render's free tier, which sleeps when idle. The first load after a quiet stretch can take up to a minute, and the site shows a banner while the server wakes up.

<!-- Demo GIFs coming soon -->

## Features

- **Accounts:** sign up and log in. Sessions use an httpOnly JWT cookie, and passwords are hashed with bcrypt.
- **Reviews:** any logged-in user can review a game. Only the author or an admin can edit or delete a review. Long reviews are capped at 2,000 characters and collapse behind a "See more" toggle.
- **Games:** admins add games with a name, platforms and a cover image (uploaded to Cloudinary). The home page lists every game alongside the most recent reviews.

## Tech stack

| Layer | Tools |
| --- | --- |
| Client | React, React Router, Vite, Axios, Vitest |
| Server | Node.js, Express, Mongoose, JSON Web Tokens, bcrypt, Multer, express-rate-limit |
| Data and media | MongoDB Atlas, Cloudinary |
| Hosting | Vercel (client), Render (API) |

## 2026 update

I originally built this in 2022 as a coding bootcamp capstone project. In 2026 I went back to modernize it, fix what I'd missed, and deploy it. I used Claude Code as a pair programmer for this pass, and I made the design and deployment decisions myself. The main changes:

**Security and correctness**
- Moved every permission check to the server. "Admin only" and "only the author can edit" used to exist only in the React UI, so anyone could call the API directly to get around them. Express middleware now enforces them.
- Fixed a leak where the user endpoints returned the full user document, password hash included.
- Reviews now take the author from the logged-in session instead of trusting the request body, which used to allow posting as someone else.
- Login returns the same error for an unknown email and a wrong password, and compares against a dummy hash so response timing doesn't reveal which accounts exist. Login and sign-up are rate-limited.
- Fixed bugs including the auth cookie options never being applied, a "logged in?" check that hung forever for logged-out visitors, and missing `await`s on database writes.

**Modernization**
- Migrated from Create React App to Vite and from Reach Router to React Router 6.
- Upgraded the server dependencies (Mongoose 6 → 9, jsonwebtoken 8 → 9, bcrypt 5 → 6, Multer 1 → 2). `npm audit` now reports zero server vulnerabilities, down from 17.
- Moved cover images from local disk to Cloudinary so the app runs on hosts with temporary file systems.
- Replaced the default-template test with real smoke tests, and redesigned the site with a retro arcade look.

**Deployment**
- Deployed the client to Vercel and the API to Render (see below).

## How the deployment works

The client and the API live on different domains (`vercel.app` and `onrender.com`). Many browsers block cookies set by a different site, so logins would silently fail. To avoid this, `client/vercel.json` rewrites every `/api/*` request on the Vercel domain to the Render service. The browser only ever talks to the Vercel domain, so the login cookie is first-party and works in every browser.

## Running locally

**Requirements:** Node.js 20.19 or newer, a MongoDB database (a free Atlas cluster works) and a Cloudinary account (for cover uploads).

1. Clone the repo and install dependencies:
   ```bash
   npm install
   npm install --prefix client
   ```
2. Copy `.env.example` to `.env` in the project root and fill in `MONGO_URI`, `SECRET_KEY` and the Cloudinary keys.
3. Copy `client/.env.example` to `client/.env`. The default `VITE_API_BASE_URL=http://localhost:8000` works as is.
4. Start the API and the client together:
   ```bash
   npm start
   ```
   The client runs at http://localhost:3000 and the API at http://localhost:8000.

Client tests: `npm test --prefix client`

To make an account an admin, set `admin: true` on its document in the `users` collection. The app doesn't have a way to do this yet.
