import React, { FC, useState, useRef, useEffect } from 'react';
import { animate } from "framer-motion";

const Icons = {
    Email: <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.6665 9.33325L13.5531 16.9538C14.4346 17.5709 14.8754 17.8795 15.3549 17.999C15.7784 18.1046 16.2213 18.1046 16.6448 17.999C17.1243 17.8795 17.565 17.5709 18.4466 16.9538L29.3332 9.33325M9.0665 26.6666H22.9332C25.1734 26.6666 26.2935 26.6666 27.1491 26.2306C27.9018 25.8471 28.5137 25.2352 28.8972 24.4825C29.3332 23.6269 29.3332 22.5068 29.3332 20.2666V11.7333C29.3332 9.49304 29.3332 8.37294 28.8972 7.51729C28.5137 6.76464 27.9018 6.15272 27.1491 5.76923C26.2935 5.33325 25.1734 5.33325 22.9332 5.33325H9.0665C6.82629 5.33325 5.70619 5.33325 4.85054 5.76923C4.09789 6.15272 3.48597 6.76464 3.10248 7.51729C2.6665 8.37294 2.6665 9.49304 2.6665 11.7333V20.2666C2.6665 22.5068 2.6665 23.6269 3.10248 24.4825C3.48597 25.2352 4.09789 25.8471 4.85054 26.2306C5.70619 26.6666 6.82629 26.6666 9.0665 26.6666Z"
            stroke="#FFFFFF"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>,
};

const ContactSectionDark = () => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const pageUrl = window.location.href;

        const payload = {
            fullName: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('contact'),
            companyName: formData.get('companyName'),
            message: formData.get('message'),
            pageLink: pageUrl,
            type: 'general'
        };

        try {
            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to submit enquiry');
            }

            alert('Thank you for contacting us! Your message has been sent.');
            form.reset();
        } catch (error: any) {
            console.error('Error submitting form:', error);
            alert(error.message || 'There was an error submitting the form. Please try again.');
        }
    };

    return (
        <div className="w-full bg-black text-white flex flex-col md:flex-row justify-between items-start">
            {/* Left Side */}
            <div className="w-full md:w-[40%] flex flex-col pt-12 md:pt-0">
                <h2 style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: '60px',
                    lineHeight: '110%',
                    color: '#FFFFFF',
                    marginBottom: '40px'
                }}>
                    For More Info
                </h2>
                <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '140%',
                    color: '#FFFFFF',
                    marginBottom: '60px',
                    maxWidth: '350px'
                }}>
                    Every water challenge is different.<br />Let's find the right solution for yours.
                </p>

                <div className="flex items-start gap-4 mt-auto">
                    <div className="mt-1">{Icons.Email}</div>
                    <div className="flex flex-col gap-2">
                        <p style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 400,
                            fontSize: '16px',
                            textDecoration: 'underline',
                            color: '#FFFFFF'
                        }}>
                            info@waecorp.com
                        </p>
                        <p style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 400,
                            fontSize: '16px',
                            textDecoration: 'underline',
                            color: '#FFFFFF'
                        }}>
                            marketing@waecorp.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-[50%] mt-12 md:mt-0">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <style jsx>{`
                        input::placeholder, textarea::placeholder {
                            color: #FFFFFF4D !important;
                            opacity: 1;
                        }
                    `}</style>
                    <div className="relative group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            className="w-full bg-transparent border-b border-[#FFFFFF4D] py-4 focus:outline-none focus:border-[#FFFFFF4D] transition-colors font-manrope text-sm"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email*"
                            className="w-full bg-transparent border-b border-[#FFFFFF4D] py-4 focus:outline-none focus:border-[#FFFFFF4D] transition-colors font-manrope text-sm"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact No.*"
                            className="w-full bg-transparent border-b border-[#FFFFFF4D] py-4 focus:outline-none focus:border-[#FFFFFF4D] transition-colors font-manrope text-sm"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="text"
                            name="companyName"
                            placeholder="ABC Company*"
                            className="w-full bg-transparent border-b border-[#FFFFFF4D] py-4 focus:outline-none focus:border-[#FFFFFF4D] transition-colors font-manrope text-sm"
                        />
                    </div>
                    <div className="relative group">
                        <textarea
                            name="message"
                            placeholder="Message"
                            maxLength={2000}
                            className="w-full bg-transparent border-b border-[#FFFFFF4D] py-4 focus:outline-none focus:border-[#FFFFFF4D] transition-colors font-manrope text-sm resize-none h-32"
                        />
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full h-[54px] bg-white text-black flex items-center justify-center gap-4 group transition-colors hover:bg-white/90"
                        >
                            <span style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 400,
                                fontSize: '16px',
                            }}>
                                Get in Touch
                            </span>
                            <svg width="29" height="14" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-2">
                                <path d="M2 12H38M38 12L28 2M38 12L28 22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactSectionDark;
