declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
