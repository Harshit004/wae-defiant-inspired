"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Globe, MousePointer, Clock, FileDown, RefreshCw } from "lucide-react";

type Session = {
  id: string;
  visitorId: string;
  visitCount: number;
  sessionId: string;
  timestamp: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  landingPage: string;
  trafficSource: {
    source: string;
    medium: string;
    campaign: string;
    referrer: string;
  };
  behavior: {
    pagesViewed: string[];
    timeSpentSeconds: number;
    clicks: number;
    downloads: number;
  };
};

export default function AnalyticsDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics");
      if (!res.ok) {
        throw new Error("Failed to fetch analytics");
      }
      const data = await res.json();
      setSessions(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          </div>
          <button 
            onClick={fetchAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
            <h2 className="font-semibold mb-2">Error Loading Analytics</h2>
            <p>{error}</p>
            <p className="mt-4 text-sm opacity-80">
              Did you forget to add the FIREBASE_SERVICE_ACCOUNT environment variable? 
              The Admin Dashboard requires a service account to securely read from Firestore.
            </p>
          </div>
        )}

        {loading && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-white/50">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Loading analytics data...</p>
          </div>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="text-center py-20 text-white/50 border border-white/10 rounded-xl">
            <p>No analytics data available yet.</p>
            <p className="text-sm mt-2">Wait for visitors to accept cookies and generate sessions.</p>
          </div>
        )}

        {!loading && !error && sessions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="p-6 bg-[#1A1A1A] rounded-xl border border-white/10">
               <h3 className="text-white/60 text-sm mb-2 uppercase tracking-wider">Total Sessions</h3>
               <p className="text-4xl font-bold">{sessions.length}</p>
             </div>
             <div className="p-6 bg-[#1A1A1A] rounded-xl border border-white/10">
               <h3 className="text-white/60 text-sm mb-2 uppercase tracking-wider">Unique Visitors</h3>
               <p className="text-4xl font-bold">{new Set(sessions.map(s => s.visitorId)).size}</p>
             </div>
             <div className="p-6 bg-[#1A1A1A] rounded-xl border border-white/10">
               <h3 className="text-white/60 text-sm mb-2 uppercase tracking-wider">Avg Time Spent</h3>
               <p className="text-4xl font-bold">
                  {Math.round(sessions.reduce((acc, curr) => acc + (curr.behavior?.timeSpentSeconds || 0), 0) / sessions.length)}s
               </p>
             </div>
          </div>
        )}

        {!loading && !error && sessions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Sessions</h2>
            <div className="grid grid-cols-1 gap-4">
              {sessions.map((session) => (
                <div key={session.id} className="p-6 bg-[#1A1A1A] rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Visitor Info */}
                  <div>
                    <h3 className="text-xs text-white/50 uppercase tracking-wider mb-2">Visitor</h3>
                    <p className="font-mono text-xs opacity-70 mb-1">{session.visitorId}</p>
                    <p className="text-sm"><span className="text-white/50">Visit #</span>{session.visitCount}</p>
                    <p className="text-sm mt-2 text-white/50">{new Date(session.timestamp).toLocaleString()}</p>
                  </div>

                  {/* Location & Source */}
                  <div>
                    <h3 className="text-xs text-white/50 uppercase tracking-wider mb-2">Acquisition</h3>
                    <div className="flex items-start gap-2 mb-2 text-sm">
                      <Globe className="w-4 h-4 mt-0.5 text-white/50 shrink-0" />
                      <span>{session.location?.city}, {session.location?.country}</span>
                    </div>
                    <p className="text-sm">
                      <span className="text-white/50">Source: </span> 
                      {session.trafficSource?.source || 'Direct'}
                    </p>
                    <p className="text-xs text-white/50 mt-1 truncate">
                       {session.trafficSource?.referrer ? `Ref: ${session.trafficSource.referrer}` : ''}
                    </p>
                  </div>

                  {/* Behavior */}
                  <div>
                    <h3 className="text-xs text-white/50 uppercase tracking-wider mb-2">Behavior</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white/50" />
                        <span>{session.behavior?.timeSpentSeconds || 0}s</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MousePointer className="w-4 h-4 text-white/50" />
                        <span>{session.behavior?.clicks || 0} clicks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileDown className="w-4 h-4 text-white/50" />
                        <span>{session.behavior?.downloads || 0} dl</span>
                      </div>
                    </div>
                  </div>

                  {/* Pages Viewed */}
                  <div>
                    <h3 className="text-xs text-white/50 uppercase tracking-wider mb-2">Pages Viewed ({session.behavior?.pagesViewed?.length || 0})</h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(session.behavior?.pagesViewed || [])).map((page, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs">
                          {page}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
