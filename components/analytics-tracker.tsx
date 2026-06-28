"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// We use uuidv4 since crypto.randomUUID() is not always available in older browsers or non-secure contexts

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    const initAnalytics = async () => {
      try {
        const consent = localStorage.getItem("wae_cookie_consent");
        if (consent !== "accepted") return;

        let visitorId = localStorage.getItem("visitor-id");
        if (!visitorId) {
          visitorId = uuidv4();
          localStorage.setItem("visitor-id", visitorId);
        }

        let visitCount = parseInt(localStorage.getItem("visit-count") || "0");
        visitCount += 1;
        localStorage.setItem("visit-count", visitCount.toString());

        const sessionId = uuidv4();
        sessionIdRef.current = sessionId;
        startTimeRef.current = Date.now();

        // Try to fetch location from a free API
        let location = { city: "Unknown", region: "Unknown", country_name: "Unknown" };
        try {
          const res = await fetch("https://ipapi.co/json/");
          if (res.ok) {
            location = await res.json();
          }
        } catch (e) {
          console.error("Failed to fetch location", e);
        }

        const utmSource = searchParams.get("utm_source") || "Direct";
        const utmMedium = searchParams.get("utm_medium") || "";
        const utmCampaign = searchParams.get("utm_campaign") || "";
        const referrer = document.referrer;

        const sessionData = {
          visitorId,
          visitCount,
          sessionId,
          timestamp: new Date().toISOString(),
          location: {
            city: location.city || "Unknown",
            state: location.region || "Unknown",
            country: location.country_name || "Unknown",
          },
          landingPage: pathname,
          trafficSource: {
            source: utmSource,
            medium: utmMedium,
            campaign: utmCampaign,
            referrer: referrer,
          },
          behavior: {
            pagesViewed: [pathname],
            timeSpentSeconds: 0,
            clicks: 0,
            downloads: 0,
          }
        };

        await setDoc(doc(db, "analytics_sessions", sessionId), sessionData);

      } catch (error) {
        console.error("Analytics initialization error:", error);
      }
    };

    if (!sessionIdRef.current) {
      initAnalytics();
    }

    const handleConsentUpdate = () => {
      if (!sessionIdRef.current) {
        initAnalytics();
      }
    };

    window.addEventListener("wae_cookie_consent_updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("wae_cookie_consent_updated", handleConsentUpdate);
    };
  }, [pathname, searchParams]);

  // Track page views and time spent
  useEffect(() => {
    if (!sessionIdRef.current) return;
    const consent = localStorage.getItem("wae_cookie_consent");
    if (consent !== "accepted") return;

    const updatePage = async () => {
      try {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        await updateDoc(doc(db, "analytics_sessions", sessionIdRef.current!), {
          "behavior.pagesViewed": arrayUnion(pathname),
          "behavior.timeSpentSeconds": timeSpent
        });
      } catch (e) {
         console.error("Failed to update page view", e);
      }
    };

    updatePage();
  }, [pathname]);

  // Track clicks globally
  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      if (!sessionIdRef.current) return;
      const consent = localStorage.getItem("wae_cookie_consent");
      if (consent !== "accepted") return;

      const target = e.target as HTMLElement;
      // Track clicks on important elements like links and buttons
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
         try {
           await updateDoc(doc(db, "analytics_sessions", sessionIdRef.current!), {
             "behavior.clicks": increment(1)
           });
           
           // If it's a download link, track it
           const link = (target.tagName === 'A' ? target : target.closest('a')) as HTMLAnchorElement;
           if (link && link.hasAttribute('download')) {
              await updateDoc(doc(db, "analytics_sessions", sessionIdRef.current!), {
                "behavior.downloads": increment(1)
              });
           }
         } catch (e) {
           console.error("Failed to update click", e);
         }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
