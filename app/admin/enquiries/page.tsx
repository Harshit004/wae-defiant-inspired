"use client";

import { useEffect, useState } from "react";
import Header from "@/components/admin/header";
import { Trash2, Download } from "lucide-react";
import { Enquiry } from "@/data/enquiries";
import * as XLSX from 'xlsx';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'product' | 'general' | 'contact-us'>('product');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`/api/admin/enquiries?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete enquiry:", error);
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    if ((e.type || 'product') !== activeTab) return false;
    
    const date = new Date(e.createdAt);
    if (startDate && new Date(startDate) > date) return false;
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (end < date) return false;
    }
    return true;
  });

  const downloadEnquiries = () => {
    // Filter all enquiries by date range (ignoring activeTab)
    const filteredByDate = enquiries.filter(e => {
      const date = new Date(e.createdAt);
      if (startDate && new Date(startDate) > date) return false;
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (end < date) return false;
      }
      return true;
    });

    const createSheetData = (typeFilter: string) => {
      const typeFiltered = filteredByDate.filter(e => (e.type || 'product') === typeFilter);
      const headers = ["Date", "Name", "Company", "Email", "Phone", "Page Link", "Message"];
      const data = typeFiltered.map(e => [
        new Date(e.createdAt).toLocaleDateString(),
        e.fullName || '',
        e.companyName || '',
        e.email || '',
        e.phone || '',
        e.pageLink || '',
        e.message || ''
      ]);
      return [headers, ...data];
    };

    const wb = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(createSheetData('product')), "Product Enquiries");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(createSheetData('general')), "General Enquiries");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(createSheetData('contact-us')), "Contact Us");

    XLSX.writeFile(wb, `enquiries_${startDate || 'all'}_to_${endDate || 'all'}.xlsx`);
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <Header searchQuery="" onSearchChange={() => {}} />
      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Enquiries</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="bg-[#0a1929] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none"
              />
              <span className="text-white/50">to</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="bg-[#0a1929] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none"
              />
              <button 
                onClick={downloadEnquiries} 
                className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-md text-sm font-medium transition-colors ml-2 flex items-center gap-2"
              >
                <Download size={16} /> Download
              </button>
            </div>
            <div className="flex bg-[#0a1929] border border-white/10 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('product')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'product' ? 'bg-white text-black' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                Product Enquiries
              </button>
              <button 
                onClick={() => setActiveTab('general')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-white text-black' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                General Enquiries
              </button>
              <button 
                onClick={() => setActiveTab('contact-us')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'contact-us' ? 'bg-white text-black' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-white/50">Loading enquiries...</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-white/50">No enquiries found for this category and date range.</div>
        ) : (
          <div className="bg-[#0a1929] border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm text-white">
              <thead className="bg-[#05131f] border-b border-white/10 text-white/70">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Page Link</th>
                  {(activeTab === 'general' || activeTab === 'contact-us') && <th className="px-4 py-3 font-medium">Message</th>}
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-white/70">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{enq.fullName}</td>
                    <td className="px-4 py-3 text-white/70">{enq.companyName || "-"}</td>
                    <td className="px-4 py-3 text-white/70">
                      <div>{enq.email}</div>
                      <div className="text-xs">{enq.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-blue-400 hover:underline">
                      <a href={enq.pageLink} target="_blank" rel="noopener noreferrer">
                        {enq.pageLink.split('/').slice(3).join('/') || "Link"}
                      </a>
                    </td>
                    {(activeTab === 'general' || activeTab === 'contact-us') && (
                      <td className="px-4 py-3 text-white/70 max-w-xs">
                        <div className="truncate mb-1" title={enq.message}>{enq.message || "-"}</div>
                        {enq.message && enq.message.length > 30 && (
                          <button onClick={() => setSelectedMessage(enq.message!)} className="text-blue-400 text-xs hover:underline">Read more</button>
                        )}
                      </td>
                    )}
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteEnquiry(enq.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
           <div className="bg-[#0a1929] border border-white/10 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4 text-white">Full Message</h3>
              <p className="whitespace-pre-wrap text-white/80">{selectedMessage}</p>
              <button onClick={() => setSelectedMessage(null)} className="mt-6 px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors">Close</button>
           </div>
        </div>
      )}
    </div>
  );
}
