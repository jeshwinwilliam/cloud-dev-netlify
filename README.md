# cloud-dev-netlify

Cloud Development assignment using Netlify + Neon PostgreSQL.

## Features
- Static homepage deployed on Netlify
- Neon PostgreSQL database connection
- Netlify Functions for GET, POST, and DELETE
- Downloadable `get-visitors.js` link shown on the homepage

## Files
- `index.html` - homepage UI
- `styles.css` - page styling
- `downloads/get-visitors.js` - downloadable source file linked from homepage
- `netlify/functions/get-visitors.js` - GET API
- `netlify/functions/add-visitor.js` - POST API
- `netlify/functions/delete-visitor.js` - DELETE API
- `setup.sql` - create the visitors table
- `netlify.toml` - Netlify config
- `package.json` - project dependencies

## Deploy settings
- Build command: leave blank
- Publish directory: `.`

## Required Netlify environment variable
- `DATABASE_URL` = your Neon PostgreSQL connection string
