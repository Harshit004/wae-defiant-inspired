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
        tooltip.innerText = "Chat With Us";
        tooltip.style.position = "fixed";
        tooltip.style.bottom = "36px"; /* Centered vertically relative to the 54px widget at bottom: 24px */
        tooltip.style.right = "94px"; /* 24px (widget right) + 54px (widget width) + 16px (gap) = 94px */
        tooltip.style.backgroundColor = "#ffffff";
        tooltip.style.color = "#000000";
        tooltip.style.fontFamily = "'Manrope', sans-serif";
        tooltip.style.fontWeight = "400";
        tooltip.style.fontSize = "13px";
        tooltip.style.whiteSpace = "nowrap";
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
    <>
      <Script
        type="text/javascript"
        src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
        id="aisensy-wa-widget"
        widget-id="aab3lf"
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .df-btn-text svg.df-svg-icon {
            display: none !important;
          }
          .df-btn {
            width: 54px !important;
            height: 54px !important;
            min-width: 54px !important;
            min-height: 54px !important;
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .df-btn-text {
            background: transparent !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          #df-btn-cont .df-btn-text::before {
            content: "";
            display: inline-block;
            width: 54px;
            height: 54px;
            background-image: url('https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/948bd474-7dce-4e82-edf0-be31f6620e00/public') !important;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }
        `
      }} />
    </>
  );
}
