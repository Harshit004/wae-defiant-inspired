"use client";

import { useEffect, useState } from "react";
import Header from "@/components/admin/header";
import { Trash2 } from "lucide-react";
import { Enquiry } from "@/data/enquiries";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/admin/enquiries");
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

  return (
    <div className="flex flex-col flex-1 h-full">
      <Header searchQuery="" onSearchChange={() => {}} />
      <div className="flex-1 bg-black p-10 text-white flex flex-col justify-start">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Enquiries</h1>
        </div>

        {isLoading ? (
          <div className="text-white/50">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="text-white/50">No enquiries found.</div>
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
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.map((enq) => (
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
    </div>
  );
}
