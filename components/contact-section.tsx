import React from 'react';

const Icons = {
  ChevronRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 7L14.5 12L9.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  Phone: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.1737 11.8042C12.1017 13.7371 13.3667 15.5486 14.9689 17.1507C16.571 18.7528 18.3825 20.0178 20.3153 20.9458C20.4816 21.0257 20.5647 21.0656 20.6699 21.0962C21.0437 21.2052 21.5027 21.1269 21.8193 20.9002C21.9083 20.8365 21.9846 20.7602 22.137 20.6078C22.6031 20.1417 22.8362 19.9086 23.0706 19.7562C23.9544 19.1816 25.0938 19.1816 25.9777 19.7562C26.2121 19.9086 26.4451 20.1417 26.9113 20.6078L27.1711 20.8677C27.8797 21.5762 28.234 21.9305 28.4265 22.311C28.8092 23.0678 28.8092 23.9615 28.4265 24.7182C28.234 25.0987 27.8797 25.453 27.1711 26.1616L26.9609 26.3718C26.2548 27.078 25.9017 27.431 25.4216 27.7007C24.889 27.9999 24.0616 28.2151 23.4507 28.2133C22.9001 28.2116 22.5238 28.1048 21.7712 27.8912C17.7267 26.7433 13.9102 24.5773 10.7262 21.3933C7.54224 18.2093 5.37627 14.3929 4.22831 10.3483C4.0147 9.59574 3.9079 9.21944 3.90626 8.66885C3.90444 8.05788 4.11959 7.23056 4.41882 6.69789C4.68848 6.21785 5.04157 5.86476 5.74773 5.1586L5.95791 4.94842C6.6665 4.23983 7.02079 3.88554 7.4013 3.69308C8.15805 3.31032 9.05174 3.31032 9.80848 3.69308C10.189 3.88554 10.5433 4.23983 11.2519 4.94842L11.5117 5.20825C11.9778 5.67439 12.2109 5.90746 12.3633 6.14183C12.938 7.02568 12.938 8.16512 12.3633 9.04898C12.2109 9.28335 11.9778 9.51642 11.5117 9.98256C11.3593 10.135 11.2831 10.2112 11.2193 10.3003C10.9926 10.6168 10.9143 11.0759 11.0233 11.4497C11.054 11.5548 11.0939 11.638 11.1737 11.8042Z"
      stroke="#00000066"
      strokeOpacity="0.7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  Email: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.6665 9.33325L13.5531 16.9538C14.4346 17.5709 14.8754 17.8795 15.3549 17.999C15.7784 18.1046 16.2213 18.1046 16.6448 17.999C17.1243 17.8795 17.565 17.5709 18.4466 16.9538L29.3332 9.33325M9.0665 26.6666H22.9332C25.1734 26.6666 26.2935 26.6666 27.1491 26.2306C27.9018 25.8471 28.5137 25.2352 28.8972 24.4825C29.3332 23.6269 29.3332 22.5068 29.3332 20.2666V11.7333C29.3332 9.49304 29.3332 8.37294 28.8972 7.51729C28.5137 6.76464 27.9018 6.15272 27.1491 5.76923C26.2935 5.33325 25.1734 5.33325 22.9332 5.33325H9.0665C6.82629 5.33325 5.70619 5.33325 4.85054 5.76923C4.09789 6.15272 3.48597 6.76464 3.10248 7.51729C2.6665 8.37294 2.6665 9.49304 2.6665 11.7333V20.2666C2.6665 22.5068 2.6665 23.6269 3.10248 24.4825C3.48597 25.2352 4.09789 25.8471 4.85054 26.2306C5.70619 26.6666 6.82629 26.6666 9.0665 26.6666Z"
      stroke="#00000066"
      strokeOpacity="0.7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
};

const ContactSection = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted!');
    // Add your form submission logic here
  };

  const errors = {
    name: '',
    email: '',
    contact: '',
    companyName: '',
  };

  return (
    <section className="bg-transparent text-black">
      <div className="container flex md:justify-between items-start gap-20">
        {/* Left Side - Contact Information */}
        <div className="mb-8 md:mb-0 md:w-[calc(50%-10px)]">
          <h2 className="font-inter-tight text-4xl uppercase leading-none">
            FOR MORE INFO
          </h2>
          <div className="my-4" />
          <p className="font-inter-tight text-lg leading-relaxed">
            Talk to our Water Expert
          </p>
          <div className="mt-10 flex flex-row gap-10">
            <div className="flex items-center">
              {Icons.Email}
              <div className="ml-3 space-y-1">
                <p className="font-inter-tight text-sm leading-relaxed hover:underline">xyz@gmail.com</p>
                <p className="font-inter-tight text-sm leading-relaxed hover:underline">xyzwae@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center">
              {Icons.Phone}
              <p className="ml-3 font-inter-tight text-sm leading-relaxed hover:underline">+91 120687068</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-transparent p-6 md:w-[calc(50%-10px)]">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="peer w-full border-b border-black border-opacity-20 h-[60px] pt-6 pb-6 pl-[9.72%] pr-[9.72%] font-inter-tight font-normal text-xs leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black"
                placeholder="Name"
                style={{ width: '100%' }}
                required
              />
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="peer w-full border-b border-black border-opacity-20 h-[60px] pt-6 pb-6 pl-[9.72%] pr-[9.72%] font-inter-tight font-normal text-xs leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black"
                placeholder="Your Email"
                style={{ width: '100%' }}
                required
              />
            </div>
            <div className="relative">
              <input
                type="tel"
                id="contact"
                name="contact"
                className="peer w-full border-b border-black border-opacity-20 h-[60px] pt-6 pb-6 pl-[9.72%] pr-[9.72%] font-inter-tight font-normal text-xs leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black"
                placeholder="Contact No."
                style={{ width: '100%' }}
                required
              />
            </div>
            <div className="relative">
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="peer w-full border-b border-black border-opacity-20 h-[60px] pt-6 pb-6 pl-[9.72%] pr-[9.72%] font-inter-tight font-normal text-xs leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black"
                placeholder="ABC Company"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full h-[64px] bg-black text-white font-inter-tight font-normal text-base leading-none tracking-[0.04em] border border-black flex items-center justify-center gap-5"
                style={{ width: '100%' }}
              >
                Contact Us {Icons.ChevronRight}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;