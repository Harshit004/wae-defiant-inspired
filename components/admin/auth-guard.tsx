"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("wae_cms_token");
    if (!token) {
      router.push("/secret-cms-login");
      return;
    }

    // Set up fetch interceptor to append authorization header
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const currentToken = localStorage.getItem("wae_cms_token");
      let modifiedInit = init || {};

      const urlString = typeof input === "string" 
        ? input 
        : input instanceof URL 
          ? input.toString() 
          : (input as Request).url;

      const isProtectedApi = 
        urlString.startsWith("/api/admin") || 
        urlString.startsWith("/api/analytics") || 
        (urlString.startsWith("/api/subscribers") && (!init?.method || init.method.toUpperCase() === "GET"));

      if (currentToken && isProtectedApi) {
        const headers = new Headers(modifiedInit.headers || {});
        headers.set("Authorization", `Bearer ${currentToken}`);
        modifiedInit = { ...modifiedInit, headers };
      }

      const response = await originalFetch(input, modifiedInit);

      if (response.status === 401 && isProtectedApi) {
        localStorage.removeItem("wae_cms_token");
        window.location.href = "/secret-cms-login";
      }

      return response;
    };

    setIsAuthenticated(true);

    return () => {
      // Restore original fetch if unmounted
      window.fetch = originalFetch;
    };
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-sm font-medium tracking-wide" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          Authenticating...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
