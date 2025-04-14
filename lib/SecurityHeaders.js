// lib/SecurityHeaders.js
//This file contains implementation for deterring clickjacking attacks
// and other security-related headers.
// It is used in the API routes to set security headers for responses.
// It is important to note that these headers should be set in the API routes
// and not in the client-side code.
// The headers are set in the API routes to ensure that they are applied to
// all responses from the server.
export function getSecurityHeaders() {
  const headers = new Headers();
  headers.set("X-Frame-Options", "DENY"); // Disallow framing of the response
  headers.set(
    "Content-Security-Policy",
    "default-src 'none'; frame-ancestors 'none'; sandbox;"
  );
  return headers;
}
