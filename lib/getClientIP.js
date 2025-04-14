export function getClientIp(req) {
  const forwardedFor =
    req.headers.get("x-forwarded-for") || req.headers.get("X-Forwarded-For");

  if (forwardedFor) {
    // May contain multiple IPs: client, proxy1, proxy2, ...
    const ips = forwardedFor.split(",");
    return ips[0].trim(); // Return the first IP (original client)
  }

  // Fallback for local environments
  return req.headers.get("x-real-ip") || req.socket?.remoteAddress || "unknown";
}
