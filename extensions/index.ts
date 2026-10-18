/*
 * The one place a fork or a custom deployment plugs its own code into the
 * app. The open-source app registers nothing here, and upstream changes never
 * touch this file, so a fork that replaces its body merges cleanly.
 *
 * registerExtensions runs once in every process that queues or runs jobs: the
 * Next.js server (instrumentation.ts, before the inline job loop starts), the
 * worker (worker/main.ts) and the MCP server (mcp/server.ts). Register here:
 * - job types: registerJobHandler (lib/jobs/handlers.ts)
 * - schedules: registerSchedule, registerScheduleFilter and
 *   registerSchedulerTask (lib/jobs/scheduler.ts)
 * - who may start a crawl: setCrawlPolicy (lib/jobs/policy.ts)
 * - who may add, change or delete a site: setSitePolicy (lib/site-policy.ts)
 *
 * Every registry lives on globalThis, so registering once per process covers
 * all routes, server actions and the job loop of that process.
 */

const holder = globalThis as unknown as { crawlseoExtensionsRegistered?: boolean };

/** Registers this deployment's extensions. Safe to call more than once. */
export function registerExtensions(): void {
  if (holder.crawlseoExtensionsRegistered) return;
  holder.crawlseoExtensionsRegistered = true;
  // Nothing to register in the open-source app.
}
