// lib/rateLimiterStore.js

export const ipRequestMap = new Map();
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const IP_MAP_HARD_LIMIT = 10000;

// Track the request timestamp for a specific IP
export function trackRequest(ip) {
  const now = Date.now();

  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, []);
  }

  ipRequestMap.get(ip).push(now);

  // Emergency cleanup if the map is too big
  if (ipRequestMap.size > IP_MAP_HARD_LIMIT) {
    console.warn(
      "IP map size exceeded safe limit, triggering emergency cleanup..."
    );
    clearOldEntries();
  }
}

// Check if an IP is rate limited
export function isRateLimited(ip, maxRequests = 100) {
  const now = Date.now();
  const timestamps = ipRequestMap.get(ip) || [];

  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  ipRequestMap.set(ip, recentTimestamps); // prune expired timestamps

  return recentTimestamps.length > maxRequests;
}

// Regular cleanup of old entries
// export function clearOldEntries() {
//   const now = Date.now();
//   for (const [ip, timestamps] of ipRequestMap.entries()) {
//     const filtered = timestamps.filter(
//       (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
//     );
//     if (filtered.length === 0) {
//       ipRequestMap.delete(ip);
//     } else {
//       ipRequestMap.set(ip, filtered);
//     }
//   }
// }

export function clearOldEntries() {
  const now = Date.now();
  const totalIps = ipRequestMap.size;

  // Don't bother cleaning if map is tiny
  if (totalIps < 100) {
    console.log("⏭️ Cleanup skipped: not enough entries.");
    return;
  }

  let cleaned = 0;
  for (const [ip, timestamps] of ipRequestMap.entries()) {
    const filteredTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );

    if (filteredTimestamps.length === 0) {
      ipRequestMap.delete(ip);
      cleaned++;
    } else {
      ipRequestMap.set(ip, filteredTimestamps);
    }
  }

  if (cleaned > 0) {
    console.log(`🧹 Cleaned ${cleaned} old IP entries.`);
  } else {
    console.log("✅ Cleanup ran but no stale IPs were found.");
  }
}
