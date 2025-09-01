"use client"

import React from 'react';

interface CollaborateWithUsProps {
  introText: string;
}

const CollaborateWithUs: React.FC<CollaborateWithUsProps> = ({ introText }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const pageUrl = window.location.href;
    formData.append('pageUrl', pageUrl);

    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      urlSearchParams.append(key, value as string);
    }

    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbxb3RywLHPRbyFITG58mPfv4nTsrRwKCx-9f131o9oaEcGt5dIDzaq-6EwQ00XTnif3Ig/exec';

    try {
      await fetch(appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlSearchParams.toString(),
      });

      console.log('Form submission request sent to Google Apps Script.');
      alert('Thank you for your interest in collaborating with us! We will get back to you soon.');
      form.reset();

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <section className="bg-transparent text-black py-8 px-[4.44%]">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-20 max-w-screen-lg">
        {/* Left Side - Information */}
        <div className="mb-8 md:mb-0 w-full md:w-[calc(50%-10px)] md:mx-0 md:text-left">
          {/* Intro Text */}
          <p className="font-inter-tight font-normal text-sm leading-[120%] tracking-[0%] mb-6">
            {introText}
          </p>
          {/* Heading */}
          <h2 className="font-inter-tight font-normal text-[48px] leading-[120%] tracking-[0%] uppercase mt-4 md:mt-0">
            COLLABORATE WITH US
          </h2>
          <div className="my-6" />
        </div>

        {/* Right Side - Collaboration Form */}
        <div className="bg-transparent p-0 w-full md:w-[calc(50%-10px)] md:mx-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input fields */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="peer w-full border-b border-black border-opacity-20 h-[48px] pt-4 pb-2 px-0 font-inter-tight font-normal text-base leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black placeholder-transparent"
                placeholder="Name"
                required
              />
              <label htmlFor="name"
                     className="absolute left-0 top-0 text-base text-black text-opacity-60 transition-all
                               peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-black/60 peer-placeholder-shown:top-4
                               peer-focus:top-0 peer-focus:text-base peer-focus:text-black
                               font-inter-tight font-normal text-[11px] leading-[100%] tracking-[0.04em] text-center text-[#00000066]
                               md:peer-placeholder-shown:text-base md:peer-placeholder-shown:text-black md:peer-placeholder-shown:top-4
                               md:peer-focus:top-0 md:peer-focus:text-base md:peer-focus:text-black
                               md:font-inter-tight md:font-normal md:text-base md:leading-none md:tracking-[0.04em] md:text-left md:text-black md:text-opacity-60"
              >
                Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="peer w-full border-b border-black border-opacity-20 h-[48px] pt-4 pb-2 px-0 font-inter-tight font-normal text-base leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black placeholder-transparent"
                placeholder="Your Email"
                required
              />
              <label htmlFor="email"
                     className="absolute left-0 top-0 text-base text-black text-opacity-60 transition-all
                               peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-black/60 peer-placeholder-shown:top-4
                               peer-focus:top-0 peer-focus:text-base peer-focus:text-black
                               font-inter-tight font-normal text-[11px] leading-[100%] tracking-[0.04em] text-center text-[#00000066]
                               md:peer-placeholder-shown:text-base md:peer-placeholder-shown:text-black md:peer-placeholder-shown:top-4
                               md:peer-focus:top-0 md:peer-focus:text-base md:peer-focus:text-black
                               md:font-inter-tight md:font-normal md:text-base md:leading-none md:tracking-[0.04em] md:text-left md:text-black md:text-opacity-60"
              >
                Your Email
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="peer w-full border-b border-black border-opacity-20 h-[48px] pt-4 pb-2 px-0 font-inter-tight font-normal text-base leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black placeholder-transparent"
                placeholder="Company/Organization"
                required
              />
              <label htmlFor="companyName"
                     className="absolute left-0 top-0 text-base text-black text-opacity-60 transition-all
                               peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-black/60 peer-placeholder-shown:top-4
                               peer-focus:top-0 peer-focus:text-base peer-focus:text-black
                               font-inter-tight font-normal text-[11px] leading-[100%] tracking-[0.04em] text-center text-[#00000066]
                               md:peer-placeholder-shown:text-base md:peer-placeholder-shown:text-black md:peer-placeholder-shown:top-4
                               md:peer-focus:top-0 md:peer-focus:text-base md:peer-focus:text-black
                               md:font-inter-tight md:font-normal md:text-base md:leading-none md:tracking-[0.04em] md:text-left md:text-black md:text-opacity-60"
              >
                Contact No.
              </label>
            </div>

            <div className="relative">
              <textarea
                id="collaborationDetails"
                name="collaborationDetails"
                className="peer w-full border-b border-black border-opacity-20 min-h-[100px] pt-6 pb-2 px-0 font-inter-tight font-normal text-base leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black placeholder-transparent resize-none"
                placeholder="Tell us about your collaboration idea"
                required
              ></textarea>
              <label htmlFor="collaborationDetails"
                     className="absolute left-0 top-0 text-base text-black text-opacity-60 transition-all
                               peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-black/60 peer-placeholder-shown:top-4
                               peer-focus:top-0 peer-focus:text-base peer-focus:text-black
                               font-inter-tight font-normal text-[11px] leading-[100%] tracking-[0.04em] text-center text-[#00000066]
                               md:peer-placeholder-shown:text-base md:peer-placeholder-shown:text-black md:peer-placeholder-shown:top-4
                               md:peer-focus:top-0 md:peer-focus:text-base md:peer-focus:text-black
                               md:font-inter-tight md:font-normal md:text-base md:leading-none md:tracking-[0.04em] md:text-left md:text-black md:text-opacity-60"
              >
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-[64px] bg-black text-white font-inter-tight font-normal text-base leading-none tracking-[0.04em] border border-black flex items-center justify-center gap-4"
              >
                Submit <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5abb7483-f3f4-4645-1950-b9df77dbd900/public" alt="Arrow icon" className="w-[60px]" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CollaborateWithUs;