declare global {
  function oaiq(
    action: string,
    event: string,
    parameters?: Record<string, any>
  ): void;

  interface Window {
    oaiq?: ((...args: any[]) => void) & { q?: any[] };
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

export {};
