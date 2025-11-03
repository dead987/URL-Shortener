import express from 'express';
import { getBigUrl, urlShort, getAllUrls, updateUrl } from '../../../controllers/url-controller.js';
import { auth } from '../../../utils/middleware/auth.js';

export const urlRoute = express.Router();

// Create a short URL (protected)
urlRoute.post('/short-url', auth, urlShort);

// Return all URLs for authenticated user (protected)
urlRoute.get('/short-url', auth, getAllUrls);

// Update a url (label etc.)
urlRoute.patch('/short-url/:id', auth, updateUrl);

// Redirect from short code to big URL (public)
urlRoute.get('/small/:code', getBigUrl);