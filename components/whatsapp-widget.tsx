"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function WhatsAppWidget() {
  const pathname = usePathname();

  useEffect(() => {
    let interval = setInterval(() => {
      const container = document.getElementById("df-btn-cont");
      if (container && !container.hasAttribute("data-tooltip-added")) {
        container.setAttribute("data-tooltip-added", "true");
        
        const tooltip = document.createElement("div");
        tooltip.innerText = "Click to chat with an Expert";
        tooltip.style.position = "fixed";
        tooltip.style.bottom = "96px";
        tooltip.style.right = "24px";
        tooltip.style.backgroundColor = "#ffffff";
        tooltip.style.color = "#000000";
        tooltip.style.fontFamily = "'Manrope', sans-serif";
        tooltip.style.fontWeight = "400";
        tooltip.style.fontSize = "13px";
        tooltip.style.padding = "8px 12px";
        tooltip.style.borderRadius = "6px";
        tooltip.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        tooltip.style.pointerEvents = "none";
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateY(5px)";
        tooltip.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        tooltip.style.zIndex = "10000";
        
        document.body.appendChild(tooltip);
        
        container.addEventListener("mouseenter", () => {
          tooltip.style.opacity = "1";
          tooltip.style.transform = "translateY(0)";
        });
        container.addEventListener("mouseleave", () => {
          tooltip.style.opacity = "0";
          tooltip.style.transform = "translateY(5px)";
        });
        
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <Script
      type="text/javascript"
      src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
      id="aisensy-wa-widget"
      widget-id="aab3lf"
    />
  );
}
