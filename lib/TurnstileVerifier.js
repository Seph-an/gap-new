// // lib/TurnstileVerifier.js
// import axios from "axios";

// export async function verifyTurnstile(token) {
//   if (!token) {
//     throw new Error("Turnstile token missing.");
//   }

//   const secret = process.env.CLOUDFLARE_SECRET_KEY;

//   if (!secret) {
//     throw new Error("Cloudflare Turnstile secret key is missing.");
//   }

//   try {
//     const verifyResponse = await axios.post(
//       "https://challenges.cloudflare.com/turnstile/v0/siteverify",
//       new URLSearchParams({
//         secret,
//         response: token,
//       }),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     return verifyResponse.data.success;
//   } catch (error) {
//     console.error(
//       "Turnstile verification error:",
//       error?.response?.data || error.message
//     );
//     throw new Error("Internal server error during verification.");
//   }
// }

// lib/TurnstileVerifier.js
import axios from "axios";
import redis from "./redis";

export async function verifyTurnstile(token) {
  if (!token) {
    throw new Error("Turnstile token missing.");
  }

  const secret = process.env.CLOUDFLARE_SECRET_KEY;
  if (!secret) {
    throw new Error("Cloudflare Turnstile secret key is missing.");
  }

  // Prevent replay attacks: check if token has been used
  const cached = await redis.get(`turnstile_token:${token}`);
  if (cached) {
    throw new Error("Replay detected: Turnstile token already used.");
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

    const isValid = verifyResponse.data.success;

    if (isValid) {
      // Store token in Redis with short TTL (e.g., 5 minutes)
      await redis.set(`turnstile_token:${token}`, "used", "EX", 300);
    }

    return isValid;
  } catch (error) {
    console.error(
      "Turnstile verification error:",
      error?.response?.data || error.message
    );
    throw new Error("Internal server error during verification.");
  }
}
