"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnquireNowPopupProps {
  isOpen: boolean;
  onClose: () => void;
  pageLink: string;
  downloadUrl?: string;
}

export default function EnquireNowPopup({ isOpen, onClose, pageLink, downloadUrl }: EnquireNowPopupProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields (*)");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, pageLink }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        if (downloadUrl) {
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = downloadUrl.split("/").pop() || "download";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ fullName: "", companyName: "", email: "", phone: "" });
          onClose();
        }, 3000);
      } else {
        setError(data.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000CC]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#092238] overflow-hidden" // Guessed bg color from standard blue theme or we could use the bg from image, but wait, the image background looks like #0c2d48. Let me set it to #09263f approximately based on common WAE themes or let me check the image. The prompt didn't specify the exact bg color of the modal, only the overlay. I'll use a deep blue or black. Let's use #0b263b based on the image (which is a dark blue). Actually, I'll use #0B253A.
        style={{
          width: "100%",
          maxWidth: "734px",
          height: "498px",
          backgroundColor: "#0F2E45" // closest to image provided
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-[26px] right-[26px] w-[34px] h-[34px] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <X size={34} strokeWidth={1} />
        </button>

        <div className="w-full h-full flex flex-col items-center justify-center px-8 py-10 md:px-[162px] md:py-[83px]">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <img
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a55238d4-7851-4d1a-72a4-829c47bab400/public"
                alt="Success Tick"
                className="w-[60px] h-[60px]"
              />
              <div style={{ height: "37px" }}></div>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 300,
                  fontSize: "28px",
                  lineHeight: "130%",
                  textAlign: "center",
                  color: "white"
                }}
              >
                Your Enquiry has<br />been successfully submitted
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col h-full">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "28px",
                  lineHeight: "105%",
                  color: "white",
                  margin: 0
                }}
              >
                Enquire Now
              </h2>
              
              <div style={{ height: "27px" }}></div>
              
              <div className="flex flex-col gap-[17px]">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={{
                    height: "39px",
                    border: "1px solid #AEAEAE",
                    backgroundColor: "transparent",
                    padding: "0 14px",
                    color: "white",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                  className="placeholder-[#C5C5C580] focus:outline-none focus:border-white transition-colors text-[10px]"
                />
                
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name*"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  style={{
                    height: "39px",
                    border: "1px solid #AEAEAE",
                    backgroundColor: "transparent",
                    padding: "0 14px",
                    color: "white",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                  className="placeholder-[#C5C5C580] focus:outline-none focus:border-white transition-colors text-[10px]"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    height: "39px",
                    border: "1px solid #AEAEAE",
                    backgroundColor: "transparent",
                    padding: "0 14px",
                    color: "white",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                  className="placeholder-[#C5C5C580] focus:outline-none focus:border-white transition-colors text-[10px]"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    height: "39px",
                    border: "1px solid #AEAEAE",
                    backgroundColor: "transparent",
                    padding: "0 14px",
                    color: "white",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                  className="placeholder-[#C5C5C580] focus:outline-none focus:border-white transition-colors text-[10px]"
                />
              </div>

              {error && <div className="text-red-400 text-xs mt-2">{error}</div>}

              <div style={{ height: "31px" }}></div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  height: "39px",
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
                className="hover:bg-gray-200 transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
