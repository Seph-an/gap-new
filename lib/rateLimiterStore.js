// lib/rateLimiterStore.js

// export const ipRequestMap = new Map();
// export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
// export const IP_MAP_HARD_LIMIT = 10000;

// // Track the request timestamp for a specific IP
// export function trackRequest(ip) {
//   const now = Date.now();

//   if (!ipRequestMap.has(ip)) {
//     ipRequestMap.set(ip, []);
//   }

//   ipRequestMap.get(ip).push(now);

//   // Emergency cleanup if the map is too big
//   if (ipRequestMap.size > IP_MAP_HARD_LIMIT) {
//     console.warn(
//       "IP map size exceeded safe limit, triggering emergency cleanup..."
//     );
//     clearOldEntries();
//   }
// }

// // Check if an IP is rate limited
// export function isRateLimited(ip, maxRequests = 100) {
//   const now = Date.now();
//   const timestamps = ipRequestMap.get(ip) || [];

//   const recentTimestamps = timestamps.filter(
//     (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
//   );

//   ipRequestMap.set(ip, recentTimestamps); // prune expired timestamps

//   return recentTimestamps.length > maxRequests;
// }

// export function clearOldEntries() {
//   const now = Date.now();
//   const totalIps = ipRequestMap.size;

//   // Don't bother cleaning if map is tiny
//   if (totalIps < 100) {
//     console.log("⏭️ Cleanup skipped: not enough entries.");
//     return;
//   }

//   let cleaned = 0;
//   for (const [ip, timestamps] of ipRequestMap.entries()) {
//     const filteredTimestamps = timestamps.filter(
//       (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
//     );

//     if (filteredTimestamps.length === 0) {
//       ipRequestMap.delete(ip);
//       cleaned++;
//     } else {
//       ipRequestMap.set(ip, filteredTimestamps);
//     }
//   }

//   if (cleaned > 0) {
//     console.log(`🧹 Cleaned ${cleaned} old IP entries.`);
//   } else {
//     console.log("✅ Cleanup ran but no stale IPs were found.");
//   }
// }

import redis from "./redis";

const WINDOW_SIZE_IN_SECONDS = 15 * 60; // 15 minutes
const MAX_REQUESTS = 100;

export async function trackRequest(ip) {
  const key = `ratelimit:${ip}`;
  const now = Date.now();

  await redis
    .multi()
    .zadd(key, now, `${now}`)
    .expire(key, WINDOW_SIZE_IN_SECONDS)
    .exec();
}

export async function isRateLimited(ip) {
  const key = `ratelimit:${ip}`;
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE_IN_SECONDS * 1000;

  await redis.zremrangebyscore(key, 0, windowStart);
  const count = await redis.zcard(key);

  return count > MAX_REQUESTS;
}
