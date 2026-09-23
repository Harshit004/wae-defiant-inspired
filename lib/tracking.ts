/**
 * Utility for tracking lead conversions across OpenAI Measurement Pixel,
 * Google Tag Manager / Google Ads, and Meta (Facebook) Pixel.
 */
export function trackLeadCreated() {
  if (typeof window === "undefined") return;

  // 1. OpenAI Measurement Pixel
  try {
    if (typeof (window as any).oaiq === "function") {
      (window as any).oaiq("measure", "lead_created", { type: "customer_action" });
    } else if (typeof oaiq === "function") {
      oaiq("measure", "lead_created", { type: "customer_action" });
    }
  } catch (e) {
    console.warn("OpenAI measurement pixel error:", e);
  }

  // 2. Google Tag Manager / dataLayer (feeds Google Ads and Meta Pixel tags configured in GTM)
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "lead_created",
      type: "customer_action",
    });
  } catch (e) {
    console.warn("dataLayer push error:", e);
  }

  // 3. Meta (Facebook) Pixel (if present)
  try {
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
  } catch (e) {
    console.warn("Meta pixel error:", e);
  }

  // 4. Google Analytics / gtag (if present)
  try {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "generate_lead", {
        event_category: "engagement",
        event_label: "customer_action",
      });
    }
  } catch (e) {
    console.warn("gtag error:", e);
  }
}
