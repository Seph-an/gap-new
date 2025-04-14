// app/api/_utils/init.js

import { startCleanupScheduler } from "@/lib/scheduler";

let initialized = false;

export function initApp() {
  if (!initialized) {
    startCleanupScheduler();
    initialized = true;
  }
}
// This function can be called in the main entry point of your application
// or in a specific API route to ensure the scheduler starts running.
