// lib/TurnstileVerifier.js
import axios from "axios";

export async function verifyTurnstile(token) {
  if (!token) {
    throw new Error("Turnstile token missing.");
  }

  const secret = process.env.CLOUDFLARE_SECRET_KEY;

  if (!secret) {
    throw new Error("Cloudflare Turnstile secret key is missing.");
  }

  try {
    const verifyResponse = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      new URLSearchParams({
        secret,
        response: token,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return verifyResponse.data.success;
  } catch (error) {
    console.error(
      "Turnstile verification error:",
      error?.response?.data || error.message
    );
    throw new Error("Internal server error during verification.");
  }
}
// This function verifies the Turnstile token by sending a POST request to Cloudflare's verification endpoint.
// It checks if the token is valid and returns a boolean indicating the verification result.
// If the token is missing or if there's an error during the verification process, it throws an error.
// The function uses axios for making HTTP requests and URLSearchParams for formatting the request body.
// The secret key for Turnstile verification is retrieved from environment variables.
// The function is designed to be used in server-side code, such as API routes or serverless functions.
// The verification process involves sending the token and secret key to Cloudflare's endpoint,
// and checking the response for a success status.
// This is a common pattern for implementing CAPTCHA verification in web applications.
// The function is asynchronous and returns a promise that resolves to a boolean value.
// It can be used in various contexts, such as form submissions or API requests,
// where Turnstile verification is required.
