"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function WhatsAppWidget() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <Script
      type="text/javascript"
      src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
      id="aisensy-wa-widget"
      widget-id="aab32h"
    />
  );
}
