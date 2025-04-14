// lib/scheduler.js

import { clearOldEntries } from "./rateLimiterStore";

let intervalId;

export function startCleanupScheduler() {
  if (intervalId) return; // Prevent duplicate schedulers on hot reloads

  intervalId = setInterval(() => {
    console.log("🧹 Running scheduled IP map cleanup");
    clearOldEntries();
  }, 15 * 60 * 1000); // Every 15 minutes
}
//below may be necessary for serverless environments ike vercel et al
// where the process may not be kept alive
export function stopCleanupScheduler() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
