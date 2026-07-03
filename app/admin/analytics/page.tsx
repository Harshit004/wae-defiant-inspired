"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Globe, MousePointer, Clock, FileDown, RefreshCw, Users, Eye, Activity, MonitorSmartphone, MapPin, ExternalLink } from "lucide-react";

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
    clicksList?: Array<{
      page: string;
      label: string;
      action: string;
      timestamp: string;
    }>;
    downloads: number;
  };
};

function formatTime(seconds: number) {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s}s`;
}

export default function AnalyticsDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch analytics");
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

  const filteredSessions = sessions.filter(session => {
    const date = new Date(session.timestamp);
    if (startDate && new Date(startDate) > date) return false;
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (end < date) return false;
    }
    return true;
  });

  const totalSessions = filteredSessions.length;
  const uniqueVisitors = new Set(filteredSessions.map((s) => s.visitorId)).size;
  const avgTimeSpent = totalSessions > 0 
    ? filteredSessions.reduce((acc, curr) => acc + (curr.behavior?.timeSpentSeconds || 0), 0) / totalSessions 
    : 0;
  const totalPageViews = filteredSessions.reduce((acc, curr) => acc + (curr.behavior?.pagesViewed?.length || 0), 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 group">
              <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </Link>
            <div>
              <h1 className="text-3xl font-medium tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Analytics Overview</h1>
              <p className="text-sm text-white/50 mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Real-time user behavior and engagement metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none"
              />
              <span className="text-white/50 text-sm">to</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none"
              />
            </div>
            <button 
              onClick={fetchAnalytics}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 disabled:opacity-50 text-sm font-medium"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 flex flex-col gap-2">
            <h2 className="font-semibold text-red-400 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Error Loading Analytics
            </h2>
            <p className="text-sm opacity-90">{error}</p>
            <p className="text-xs opacity-70 mt-2">
              Ensure the FIREBASE_SERVICE_ACCOUNT environment variable is correctly configured in your deployment settings.
            </p>
          </div>
        )}

        {loading && !error && (
          <div className="flex flex-col items-center justify-center py-32 text-white/40">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-white/20" />
            <p className="font-medium tracking-wide text-sm uppercase" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Synchronizing Data</p>
          </div>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-white/40 border border-white/5 rounded-3xl bg-white/[0.02]">
            <Globe className="w-12 h-12 mb-4 text-white/20 opacity-50" />
            <p className="font-medium text-lg" style={{ fontFamily: 'Inter Tight, sans-serif' }}>No sessions recorded yet</p>
            <p className="text-sm mt-2 max-w-sm text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>Data will appear here once visitors interact with your site and accept cookies.</p>
          </div>
        )}

        {!loading && !error && sessions.length > 0 && filteredSessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-white/40 border border-white/5 rounded-3xl bg-white/[0.02]">
            <Globe className="w-12 h-12 mb-4 text-white/20 opacity-50" />
            <p className="font-medium text-lg" style={{ fontFamily: 'Inter Tight, sans-serif' }}>No sessions found</p>
            <p className="text-sm mt-2 max-w-sm text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>Try adjusting your date filters to see more results.</p>
          </div>
        )}

        {!loading && !error && filteredSessions.length > 0 && (
          <div className="space-y-8">
            
            {/* Bento Grid Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {/* Total Sessions */}
               <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col justify-between group hover:bg-white/[0.05] transition-colors">
                 <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-blue-500/10 rounded-2xl">
                     <Activity className="w-6 h-6 text-blue-400" />
                   </div>
                 </div>
                 <div>
                   <h3 className="text-white/50 text-sm font-medium mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Total Sessions</h3>
                   <p className="text-4xl font-medium tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{totalSessions}</p>
                 </div>
               </div>

               {/* Unique Visitors */}
               <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col justify-between group hover:bg-white/[0.05] transition-colors">
                 <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-purple-500/10 rounded-2xl">
                     <Users className="w-6 h-6 text-purple-400" />
                   </div>
                 </div>
                 <div>
                   <h3 className="text-white/50 text-sm font-medium mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Unique Visitors</h3>
                   <p className="text-4xl font-medium tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{uniqueVisitors}</p>
                 </div>
               </div>

               {/* Avg Time Spent */}
               <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col justify-between group hover:bg-white/[0.05] transition-colors">
                 <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-amber-500/10 rounded-2xl">
                     <Clock className="w-6 h-6 text-amber-400" />
                   </div>
                 </div>
                 <div>
                   <h3 className="text-white/50 text-sm font-medium mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Avg Session Duration</h3>
                   <p className="text-4xl font-medium tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{formatTime(avgTimeSpent)}</p>
                 </div>
               </div>

               {/* Total Page Views */}
               <div className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col justify-between group hover:bg-white/[0.05] transition-colors">
                 <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-emerald-500/10 rounded-2xl">
                     <Eye className="w-6 h-6 text-emerald-400" />
                   </div>
                 </div>
                 <div>
                   <h3 className="text-white/50 text-sm font-medium mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Total Page Views</h3>
                   <p className="text-4xl font-medium tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{totalPageViews}</p>
                 </div>
               </div>
            </div>

            {/* Session List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-medium tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Recent Activity log</h2>
                <span className="text-xs font-medium text-white/40 px-3 py-1 bg-white/5 rounded-full uppercase tracking-widest">{filteredSessions.length} Records</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {filteredSessions.map((session) => (
                  <div key={session.id} className="group flex flex-col lg:flex-row gap-0 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-3xl overflow-hidden transition-colors">
                    
                    {/* Left Column: Context & Metrics */}
                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                      
                      {/* Top section: Identity & Location */}
                      <div className="space-y-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-xs font-medium uppercase tracking-widest text-white/40">Visitor ID</span>
                              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/70">Visit #{session.visitCount}</span>
                            </div>
                            <p className="font-mono text-sm text-white/90 truncate max-w-[200px] sm:max-w-xs">{session.visitorId}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-white/40 font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              {new Date(session.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </span>
                            <p className="text-sm text-white/70" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                          {/* Location */}
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-white/5 mt-0.5">
                              <MapPin className="w-4 h-4 text-white/50" />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Location</p>
                              <p className="text-sm text-white/80" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {session.location?.city ? `${session.location.city}, ${session.location.country}` : 'Unknown'}
                              </p>
                            </div>
                          </div>

                          {/* Acquisition */}
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-white/5 mt-0.5">
                              <ExternalLink className="w-4 h-4 text-white/50" />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Acquisition</p>
                              <p className="text-sm text-white/80" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {session.trafficSource?.source || 'Direct Traffic'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom section: Quick Metrics & Pages */}
                      <div className="mt-8 pt-6 border-t border-white/5 space-y-6">
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-400/70" />
                            <span className="text-sm font-medium text-white/80">{formatTime(session.behavior?.timeSpentSeconds || 0)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MousePointer className="w-4 h-4 text-blue-400/70" />
                            <span className="text-sm font-medium text-white/80">{session.behavior?.clicks || 0} clicks</span>
                          </div>
                          {session.behavior?.downloads > 0 && (
                            <div className="flex items-center gap-2">
                              <FileDown className="w-4 h-4 text-emerald-400/70" />
                              <span className="text-sm font-medium text-white/80">{session.behavior?.downloads} dl</span>
                            </div>
                          )}
                        </div>

                        {session.behavior?.pagesViewed?.length > 0 && (
                           <div>
                             <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Journey ({session.behavior.pagesViewed.length} Pages)</p>
                             <div className="flex flex-wrap gap-2">
                               {Array.from(new Set(session.behavior.pagesViewed)).map((page, idx) => (
                                 <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 truncate max-w-[150px]">
                                   {page === '/' ? 'Home' : page.replace('/', '')}
                                 </span>
                               ))}
                             </div>
                           </div>
                        )}
                      </div>

                    </div>

                    {/* Right Column: Click Timeline */}
                    <div className="w-full lg:w-96 p-6 lg:p-8 bg-black/20 flex flex-col">
                      <div className="flex items-center gap-2 mb-6">
                        <MonitorSmartphone className="w-4 h-4 text-white/40" />
                        <h3 className="text-sm font-medium text-white/80" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Interaction Timeline</h3>
                      </div>
                      
                      {session.behavior?.clicksList && session.behavior.clicksList.length > 0 ? (
                        <div className="relative flex-1 max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 pl-2">
                          {/* Timeline vertical line */}
                          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10 z-0"></div>
                          
                          <div className="space-y-6 relative z-10">
                            {session.behavior.clicksList.map((click, cIdx) => {
                              
                              const isNav = click.action.includes('Navigate');
                              const isDownload = click.action.includes('Download');
                              const isSubmit = click.action.includes('Submit');
                              
                              let dotColor = 'bg-white/20 border-white/10';
                              if (isNav) dotColor = 'bg-blue-500/20 border-blue-500/30';
                              if (isDownload) dotColor = 'bg-purple-500/20 border-purple-500/30';
                              if (isSubmit) dotColor = 'bg-emerald-500/20 border-emerald-500/30';

                              return (
                                <div key={cIdx} className="relative pl-8 group/item">
                                  {/* Dot */}
                                  <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border ${dotColor} bg-[#0A0A0A] flex items-center justify-center`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${isNav ? 'bg-blue-400' : isDownload ? 'bg-purple-400' : isSubmit ? 'bg-emerald-400' : 'bg-white/50'}`}></div>
                                  </div>
                                  
                                  {/* Content */}
                                  <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-baseline gap-2">
                                      <span className="text-sm font-medium text-white/90 leading-tight">
                                        {click.label}
                                      </span>
                                      <span className="text-[10px] font-mono text-white/40 shrink-0">
                                        {new Date(click.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${
                                        isNav ? 'bg-blue-500/10 text-blue-300' : 
                                        isDownload ? 'bg-purple-500/10 text-purple-300' : 
                                        isSubmit ? 'bg-emerald-500/10 text-emerald-300' : 'bg-white/5 text-white/50'
                                      }`}>
                                        {click.action}
                                      </span>
                                      <span className="text-[10px] text-white/40 truncate">
                                        on {click.page === '/' ? 'Home' : click.page.replace('/', '')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-2xl">
                          <MousePointer className="w-8 h-8 text-white/10 mb-3" />
                          <p className="text-sm text-white/40" style={{ fontFamily: 'Manrope, sans-serif' }}>No explicit click events recorded in this session.</p>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
