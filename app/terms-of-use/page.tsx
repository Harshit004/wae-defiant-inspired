"use client";

import type React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]";

export default function TermsOfUse() {
  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-white selection:bg-white selection:text-black overflow-x-hidden font-sans">
      {/* Dark background gradient */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)', height: 'clamp(500px, 80vh, 875px)'
        }}
      />
      <Header />

      <div className={`${containerClass} relative z-10 pt-[230px] pb-[120px]`}>
        {/* Title & Subtitle */}
        <h1 className="font-['Inter_Tight'] font-normal text-[40px] leading-[105%] text-white mb-[19px]">
          Terms of Use
        </h1>
        <p className="font-['Manrope'] font-normal text-[12px] leading-none text-[#AEAEAE] mb-[40px]">
          Effective Date: 1 January 2026 &nbsp;|&nbsp; Last Updated: April 2026
        </p>

        {/* Intro Text */}
        <div className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE] text-justify space-y-[24px] mb-[63px]">
          <p className="leading-[1.3]">
            By accessing the WAE website (www.waecorp.com) or any associated digital portals, users confirm that they have read and agree to these Terms. The Terms apply to all visitors — architects, engineers, procurement officers, contractors, distributors, and members of the public alike. WAE reserves the right to amend them at any time; continued use of the site after posting of changes constitutes acceptance.
          </p>
          <p className="leading-[1.3]">
            The website may be used for lawful purposes such as researching products, submitting enquiries, downloading technical documentation, and engaging WAE for legitimate business needs. Prohibited conduct includes fraud, data harvesting without consent, introducing malware, scraping with automated tools, impersonation, unauthorised access attempts, and posting defamatory or discriminatory content. All website content — text, images, videos, product specifications, logos, and the "Our Green is Blue" brand identity — is the exclusive intellectual property of WAE. Users are granted a limited, non-exclusive, revocable licence for personal or professional reference only; commercial reproduction or derivative works require prior written consent.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Sidebar (Sticky) */}
          <div
            className="hidden lg:block border-r border-white/20 flex-shrink-0"
            style={{
              width: '30%',
              paddingRight: '6.59vw' // Responsive 95px gap at 1440px
            }}
          >
            <div className="sticky top-[120px] flex flex-col font-['Inter_Tight'] text-[14px] leading-[150%]">

              {[
                { id: "acceptance", heading: "1. Acceptance of Terms", subheadings: [{ id: "amendments", title: "Amendments & Updates" }] },
                { id: "permitted", heading: "2. Permitted Use of This Website", subheadings: [{ id: "authorised", title: "Authorised Access" }, { id: "prohibited", title: "Prohibited Conduct" }] },
                { id: "intellectual", heading: "3. Intellectual Property Rights", subheadings: [{ id: "wae-content", title: "WAE Content & Trademarks" }, { id: "licence", title: "Licence Restrictions" }] },
                { id: "product", heading: "4. Product Information & Disclaimers", subheadings: [{ id: "specification", title: "Specification Accuracy" }, { id: "pricing", title: "Pricing & Availability" }] },
                { id: "third-party", heading: "5. Third-Party Links & Content", subheadings: [] },
                { id: "limitation", heading: "6. Limitation of Liability", subheadings: [{ id: "exclusion", title: "Exclusion of Warranties" }, { id: "cap", title: "Cap on Liability" }] },
                { id: "governing", heading: "7. Governing Law & Jurisdiction", subheadings: [] },
                { id: "contact", heading: "8. Contact for Legal Enquiries", subheadings: [] }
              ].map((section, idx, arr) => (
                <div key={section.id} style={{ marginBottom: idx === arr.length - 1 ? 0 : '40px' }}>
                  <a href={`#${section.id}`} className="font-['Manrope'] font-semibold text-[14px] leading-none text-white hover:opacity-80 transition-opacity block">
                    {section.heading}
                  </a>
                  {section.subheadings.length > 0 && (
                    <div style={{ marginTop: '24px' }} className="flex flex-col gap-[12px]">
                      {section.subheadings.map(sub => (
                        <a key={sub.id} href={`#${sub.id}`} className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-[#AEAEAE] hover:text-white transition-colors block">
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* Right Content Area */}
          <div
            className="flex-shrink-0 flex flex-col font-['Manrope'] text-[14px] text-[#AEAEAE] leading-[160%]"
            style={{
              width: '70%',
              paddingLeft: '3.33vw' // Responsive 48px gap at 1440px
            }}
          >

            {/* Section 1 */}
            <div id="acceptance" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">1. Acceptance of Terms</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                By accessing, browsing, or otherwise using the WAE website (www.waecorp.com) and any associated digital platforms, portals, or resources (collectively, the "Website"), you confirm that you have read, understood, and agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please discontinue use of the Website immediately. These Terms apply to all visitors, users, and any other person or organisation who accesses or uses the Website, including architects, engineers, procurement officers, contractors, distributors, and members of the public.
              </p>

              <h3 id="amendments" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Amendments & Updates</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE reserves the right to amend these Terms at any time. Updated Terms will be posted on this page with the revised effective date. Your continued use of the Website after any amendment constitutes your acceptance of the revised Terms. We recommend reviewing these Terms periodically.
              </p>
              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 2 */}
            <div id="permitted" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">2. Permitted Use of This Website</h2>

              <h3 id="authorised" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Authorised Access</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                The Website is provided for lawful purposes related to: researching WAE products and solutions; submitting product enquiries or service requests; accessing technical documentation and resources; exploring WAE's sustainability and governance commitments; and engaging with WAE for legitimate business purposes. You may access and download content for your own personal or professional reference, provided you comply with these Terms.
              </p>

              <h3 id="prohibited" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Prohibited Conduct</h3>
              <div className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                <p className="mb-4">You must not use the Website to:</p>
                <ul className="list-none space-y-4">
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#AEAEAE]">Engage in any unlawful, fraudulent, harmful, or deceptive activity.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#AEAEAE]">Collect, harvest, or compile personal data about other users without consent.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#AEAEAE]">Introduce viruses, malware, or any code designed to disrupt, damage, or interfere with the Website or associated systems.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#AEAEAE]">Use automated tools, bots, scrapers, or crawlers to extract data without WAE's written authorisation.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#AEAEAE]">Impersonate WAE, its employees, or any other person or entity.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#AEAEAE]">Attempt to gain unauthorised access to any part of the Website, server, or database.</li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#AEAEAE]">Post, upload, or transmit any content that is defamatory, obscene, discriminatory, or in breach of any third-party rights.</li>
                </ul>
              </div>
              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 3 */}
            <div id="intellectual" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">3. Intellectual Property Rights</h2>

              <h3 id="wae-content" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">WAE Content & Trademarks</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                All content on this Website - including but not limited to text, graphics, photographs, videos, product specifications, technical drawings, brochures, case studies, logos, and the WAE trademark and "Our Green is Blue" brand identity - is the exclusive intellectual property of WAE and is protected by applicable intellectual property laws. Unauthorised reproduction, distribution, modification, or commercial use of any WAE content is strictly prohibited.
              </p>

              <h3 id="licence" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Licence Restrictions</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE grants you a limited, non-exclusive, non-transferable, revocable licence to access and use the Website for lawful purposes in accordance with these Terms. This licence does not include: the right to reproduce or distribute WAE content commercially; the right to create derivative works based on WAE content; or the right to use WAE trademarks, logos, or brand elements without prior written consent.
              </p>
              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 4 */}
            <div id="product" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">4. Product Information & Disclaimers</h2>

              <h3 id="specification" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Specification Accuracy</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE endeavours to ensure that product information, specifications, and technical data published on this Website are accurate and current. However, product specifications may change without notice as part of our continual improvement programme. Product images are for illustrative purposes only. We recommend contacting our sales team to confirm current specifications before making procurement decisions.
              </p>

              <h3 id="pricing" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Pricing & Availability</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                Prices, delivery timelines, and product availability are not published on this Website and are subject to formal quotation. Nothing on this Website constitutes an offer to contract or a binding price commitment. All orders are subject to WAE's standard terms and conditions of sale, which will be provided at the time of quotation.
              </p>
              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 5 */}
            <div id="third-party" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">5. Third-Party Links & Content</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                The Website may contain links to third-party websites, platforms, or resources for your convenience. WAE does not endorse, control, or accept responsibility for the content, privacy practices, or policies of any third-party website. Access to third-party sites is at your own risk, and we encourage you to review the applicable third-party terms and privacy policies.
              </p>
              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 6 */}
            <div id="limitation" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">6. Limitation of Liability</h2>

              <h3 id="exclusion" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Exclusion of Warranties</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                The Website and all content therein are provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted access. WAE does not warrant that the Website will be free of errors, interruptions, or security vulnerabilities.
              </p>

              <h3 id="cap" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Cap on Liability</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                To the fullest extent permitted by applicable law, WAE and its directors, officers, employees, agents, and suppliers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Website, even if advised of the possibility of such damages. WAE's total aggregate liability arising from or related to these Terms shall not exceed the greater of INR 10,000 or the amount paid by you to WAE in the preceding 12 months.
              </p>
              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 7 */}
            <div id="governing" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">7. Governing Law & Jurisdiction</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of [New Delhi / registered office jurisdiction], India.
              </p>
              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 8 */}
            <div id="contact">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">8. Contact for Legal Enquiries</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE]">
                For questions relating to these Terms of Use or to report a potential violation, please contact: Legal & Compliance Team @ WAE | Email: legal@waecorp.com
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
