import React, { useState } from 'react';

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
  ThumbsUp: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H16.4262C17.907 22 19.1662 20.9197 19.3914 19.4562L20.4683 12.4562C20.7479 10.6389 19.3418 9 17.5032 9H14C13.4477 9 13 8.55228 13 8V4.46584C13 3.10399 11.896 2 10.5342 2C10.2093 2 9.91498 2.1913 9.78306 2.48812L7.26394 8.40614C7.09746 8.76727 6.74355 9 6.35013 9H4C2.89543 9 2 9.89543 2 11V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
};

interface JobApplicationFormProps {
  jobTitle?: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobTitle = 'Job Application' }) => {
  // State to hold the name of the selected file
  const [resumeFileName, setResumeFileName] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the first file from the list of selected files
    const file = event.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
    } else {
      setResumeFileName(''); // Reset if no file is chosen
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    
    // Get form data
    const formData = new FormData(form);
    const applicantName = formData.get('applicantName') as string;
    const applicantEmail = formData.get('applicantEmail') as string;
    const applicantPhone = formData.get('applicantPhone') as string;
    const resume = formData.get('resume') as File;

    // Prepare email data
    const emailData = {
      to: 'wae.marktech@gmail.com',
      subject: jobTitle,
      body: `
New Job Application Received

Job Position: ${jobTitle}

Applicant Details:
- Name: ${applicantName}
- Email: ${applicantEmail}
- Phone: ${applicantPhone}
- Resume: ${resume?.name || 'No file attached'}

Page URL: ${window.location.href}
      `.trim(),
      applicantName,
      applicantEmail,
      applicantPhone,
      jobTitle,
      pageUrl: window.location.href,
    };

    try {
      // Send email via API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('Form submission successful');
        setShowToast(true);
        form.reset();
        setResumeFileName('');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <section className="bg-transparent text-black pb-20 md:pb-0">
      <div className="container flex flex-col md:flex-row md:justify-between items-start gap-8 px-4 md:px-0">
        {/* Left Side - Contact Information */}
        <div className="mb-8 md:mb-0 w-full md:w-[calc(50%-10px)]">
          <h2 className="font-inter-tight text-4xl uppercase leading-none">
            FILL FORM
          </h2>
          <div className="my-4" />
          <p className="font-inter-tight text-lg leading-relaxed">
          Contact us for any query
          </p>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="flex">
              {Icons.Email}
              <div className="ml-3 space-y-1">
                <p className="font-inter-tight text-sm leading-relaxed hover:underline">info@waecorp.com</p>
                <p className="font-inter-tight text-sm leading-relaxed hover:underline">marketing@waecorp.com</p>
              </div>
            </div>
            <div className="flex">
              {Icons.Phone}
              <p className="ml-3 font-inter-tight text-sm leading-relaxed hover:underline">+91 120687068</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-transparent p-0 md:p-6 w-full md:w-[calc(50%-10px)]">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative">
              <input
                type="text"
                id="applicantName"
                name="applicantName"
                className="peer w-full border-b border-black border-opacity-20 h-[60px] pt-6 pb-6 pl-4 pr-[9.72%] font-inter-tight font-normal text-xs leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black"
                placeholder="Name"
                style={{ width: '100%' }}
                required
              />
            </div>
            <div className="relative">
              <input
                type="email"
                id="applicantEmail"
                name="applicantEmail"
                className="peer w-full border-b border-black border-opacity-20 h-[60px] pt-6 pb-6 pl-4 pr-[9.72%] font-inter-tight font-normal text-xs leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black"
                placeholder="Your Email"
                style={{ width: '100%' }}
                required
              />
            </div>
            <div className="relative">
              <input
                type="tel"
                id="applicantPhone"
                name="applicantPhone"
                className="peer w-full border-b border-black border-opacity-20 h-[60px] pt-6 pb-6 pl-4 pr-[9.72%] font-inter-tight font-normal text-xs leading-none tracking-[0.04em] text-left bg-transparent focus:outline-none focus:border-black"
                placeholder="Contact No."
                style={{ width: '100%' }}
                required
              />
            </div>

            {/* FILE INPUT FIELD */}
            <div>
              <label
                htmlFor="fileUpload"
                className="w-full h-[64px] text-black font-inter-tight font-normal text-base leading-none tracking-[0.04em] border border-black flex items-center justify-center gap-5 cursor-pointer"
                style={{ width: '100%' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span className="truncate">{resumeFileName || 'Attach Resume/ CV'}</span>
              </label>

              <input
                type="file"
                id="fileUpload"
                name="resume"
                className="hidden"
                onChange={handleResumeChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full h-[64px] bg-black text-white font-inter-tight font-normal text-base leading-none tracking-[0.04em] border border-black flex items-center justify-center gap-5"
                style={{ width: '100%' }}
              >
                Submit <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5abb7483-f3f4-4645-1950-b9df77dbd900/public" alt="Arrow icon" className="w-[60px] h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
          <div className="bg-white border-2 border-black rounded-lg shadow-2xl px-6 py-4 flex items-center gap-4 min-w-[300px]">
            <div className="flex-shrink-0 text-black">
              {Icons.ThumbsUp}
            </div>
            <div className="flex-1">
              <p className="font-inter-tight font-semibold text-base text-black">
                Application Submitted!
              </p>
              <p className="font-inter-tight text-sm text-gray-600">
                We'll get back to you soon.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default JobApplicationForm;