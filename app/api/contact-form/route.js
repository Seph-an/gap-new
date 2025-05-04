// // app/api/inquiry/route.js
// import { NextResponse } from "next/server";
// import { forwardPost } from "@/lib/Helper";
// import { verifyTurnstile } from "@/lib/TurnstileVerifier";
// import { getSecurityHeaders } from "@/lib/SecurityHeaders";
// import { initApp } from "@/app/api/_utils/init";
// import { getClientIp } from "@/lib/getClientIP";
// import { trackRequest, isRateLimited } from "@/lib/rateLimiterStore";
// import { mailAgent } from "@/lib/MailAgent";

// // Initialize cleanup scheduler
// initApp();

// export async function POST(req) {
//   // --- Enforce Rate Limiting ---
//   const clientIp = getClientIp(req);
//   if (isRateLimited(clientIp)) {
//     return new NextResponse(JSON.stringify({ message: "Too many requests" }), {
//       status: 429,
//       headers: getSecurityHeaders(),
//     });
//   }
//   trackRequest(clientIp);

//   // --- Retrieve Standard Security Headers ---
//   const securityHeaders = getSecurityHeaders();

//   // --- Parse and Validate the JSON Payload ---
//   let body;
//   try {
//     body = await req.json();
//   } catch (err) {
//     return new NextResponse(
//       JSON.stringify({ message: "Invalid JSON payload." }),
//       { status: 400, headers: securityHeaders }
//     );
//   }

//   // --- Extract and Verify the Turnstile Token ---
//   const { token, ...formData } = body;
//   if (!token) {
//     return new NextResponse(
//       JSON.stringify({ message: "Turnstile token missing." }),
//       { status: 400, headers: securityHeaders }
//     );
//   }

//   // Verify the token
//   try {
//     const isVerified = await verifyTurnstile(token);
//     if (!isVerified) {
//       return new NextResponse(
//         JSON.stringify({ message: "Turnstile verification failed." }),
//         { status: 400, headers: securityHeaders }
//       );
//     }
//   } catch (error) {
//     console.error("Verification error:", error);
//     return new NextResponse(
//       JSON.stringify({ message: error.message || "Internal server error." }),
//       { status: 500, headers: securityHeaders }
//     );
//   }

//   // --- Send Emails in the Background ---
//   try {
//     mailAgent(formData).catch((error) => {
//       console.error("MailAgent error:", error);
//     });
//   } catch (error) {
//     console.error("Unexpected error in mailAgent:", error);
//   }

//   // --- Data Restructuring ---
//   const restructureFn = (body) => {
//     const { name, email, phone, role, message } = body;
//     return {
//       data: {
//         name,
//         mail: email,
//         phone,
//         role,
//         message,
//       },
//     };
//   };

//   const externalUrl = process.env.MAKE_INQUIRY_URL;
//   const forwardedResponse = await forwardPost(
//     restructureFn(formData),
//     req.headers,
//     externalUrl
//   );

//   forwardedResponse.headers.set("X-Frame-Options", "DENY");
//   forwardedResponse.headers.set(
//     "Content-Security-Policy",
//     "default-src 'none'; frame-ancestors 'none'; sandbox;"
//   );

//   return forwardedResponse;
// }

import { NextResponse } from "next/server";
import { forwardPost } from "@/lib/Helper";
import { verifyTurnstile } from "@/lib/TurnstileVerifier";
import { getSecurityHeaders } from "@/lib/SecurityHeaders";
import { getClientIp } from "@/lib/getClientIP";
import { trackRequest, isRateLimited } from "@/lib/rateLimiterStore";
import { mailAgent } from "@/lib/MailAgent";

export async function POST(req) {
  const clientIp = getClientIp(req);
  if (await isRateLimited(clientIp)) {
    return new NextResponse(JSON.stringify({ message: "Too many requests" }), {
      status: 429,
      headers: getSecurityHeaders(),
    });
  }
  await trackRequest(clientIp);

  const securityHeaders = getSecurityHeaders();

  let body;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Invalid JSON payload." }),
      {
        status: 400,
        headers: securityHeaders,
      }
    );
  }

  const { token, ...formData } = body;
  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "Turnstile token missing." }),
      {
        status: 400,
        headers: securityHeaders,
      }
    );
  }

  try {
    const isVerified = await verifyTurnstile(token);
    if (!isVerified) {
      return new NextResponse(
        JSON.stringify({ message: "Turnstile verification failed." }),
        {
          status: 400,
          headers: securityHeaders,
        }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message || "Internal server error." }),
      { status: 500, headers: securityHeaders }
    );
  }

  try {
    mailAgent(formData).catch(console.error);
  } catch (error) {
    console.error("Unexpected error in mailAgent:", error);
  }

  const restructureFn = ({ name, email, phone, role, message }) => ({
    data: { name, mail: email, phone, role, message },
  });

  const externalUrl = process.env.MAKE_INQUIRY_URL;
  const forwardedResponse = await forwardPost(
    restructureFn(formData),
    req.headers,
    externalUrl
  );

  forwardedResponse.headers.set("X-Frame-Options", "DENY");
  forwardedResponse.headers.set(
    "Content-Security-Policy",
    "default-src 'none'; frame-ancestors 'none'; sandbox;"
  );

  return forwardedResponse;
}
