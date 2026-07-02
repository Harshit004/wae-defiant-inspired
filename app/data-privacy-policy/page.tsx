"use client";

import type React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]";

export default function DataPrivacyPolicy() {
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
          Data Privacy Policy
        </h1>
        <p className="font-['Manrope'] font-normal text-[12px] leading-none text-[#AEAEAE] mb-[40px]">
          Effective Date: 1 January 2026 &nbsp;|&nbsp; Last Updated: April 2026
        </p>

        {/* Intro Text */}
        <div className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE] text-justify space-y-[24px] mb-[63px]">
          <p className="leading-normal">
            WAE Ltd. is the data controller for all personal data collected through its website, enquiry forms, dealer portals, marketing campaigns, and employment processes. The Policy is aligned with India's Digital Personal Data Protection Act 2023 (DPDPA) and international standards including the GDPR, applying the principles of purpose limitation, data minimisation, accuracy, storage limitation, and accountability.
          </p>
          <p className="leading-normal">
            Data collected includes information you provide directly — name, job title, email, phone number, and project requirements — as well as technical data gathered automatically via cookies, such as IP address and browsing behaviour. WAE may also receive data from channel partners, LinkedIn, event organisers, and public procurement portals. This data is used for service delivery, sales, marketing communications (with consent), and legal compliance. WAE does not sell personal data. It is shared only with data processors under binding contracts (cloud hosts, CRM and email tools, IT security vendors), channel partners where relevant for project coordination, and regulatory bodies when legally required.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Sidebar (Sticky) */}
          <div
            className="hidden lg:block border-r border-white/20 flex-shrink-0"
            style={{
              width: '30%',
              paddingRight: '6.59vw'
            }}
          >
            <div className="sticky top-[120px] flex flex-col font-['Inter_Tight'] text-[14px] leading-[150%]">

              {[
                { id: "intro", heading: "1. Introduction & Our Commitment to Privacy", subheadings: [{ id: "who-we-are", title: "Who We Are" }, { id: "scope", title: "Scope of This Policy" }, { id: "philosophy", title: "Our Data Protection Philosophy" }] },
                { id: "personal-data", heading: "2. Personal Data We Collect", subheadings: [{ id: "info-directly", title: "Information You Provide Directly" }, { id: "info-auto", title: "Information Collected Automatically" }, { id: "info-third", title: "Information from Third Parties" }] },
                { id: "how-we-use", heading: "3. How We Use Your Personal Data", subheadings: [{ id: "biz-ops", title: "Business Operations & Service Delivery" }, { id: "marketing", title: "Marketing Communications" }, { id: "compliance", title: "Legal & Regulatory Compliance" }] },
                { id: "sharing", heading: "4. Data Sharing & Third Parties", subheadings: [{ id: "providers", title: "Service Providers & Data Processors" }, { id: "partners", title: "Business Partners & Channel Partners" }, { id: "disclosures", title: "Legal & Regulatory Disclosures" }] },
                { id: "rights", heading: "5. Your Rights", subheadings: [{ id: "exercise", title: "How to Exercise Your Rights" }] },
                { id: "security", heading: "6. Data Security & Retention", subheadings: [{ id: "measures", title: "Technical & Organisational Security Measures" }, { id: "retention", title: "Retention Periods" }] },
                { id: "cookies", heading: "7. Cookies & Tracking Technologies", subheadings: [] },
                { id: "transfers", heading: "8. International Data Transfers", subheadings: [] },
                { id: "updates", heading: "9. Policy Updates", subheadings: [] },
                { id: "contact", heading: "10. Contact Our Data Protection Team", subheadings: [] }
              ].map((section, idx, arr) => (
                <div key={section.id} style={{ marginBottom: idx === arr.length - 1 ? 0 : '40px' }}>
                  <a href={`#${section.id}`} className={`font-['Manrope'] font-semibold text-[14px] leading-none text-white hover:opacity-80 transition-opacity block ${section.id === "intro" ? "whitespace-nowrap" : ""}`}>
                    {section.heading}
                  </a>
                  {section.subheadings.length > 0 && (
                    <div style={{ marginTop: '24px' }} className="flex flex-col gap-[12px]">
                      {section.subheadings.map(sub => (
                        <a 
                          key={sub.id} 
                          href={`#${sub.id}`} 
                          className={`font-['Inter_Tight'] font-normal text-[14px] text-[#AEAEAE] hover:text-white transition-colors block ${sub.title === "Technical & Organisational Security Measures" ? "leading-[130%]" : "leading-[105%]"}`}
                        >
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
              paddingLeft: '3.33vw'
            }}
          >

            {/* Section 1 */}
            <div id="intro" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">1. Introduction & Our Commitment to Privacy</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE Ltd. (“WAE,” “we,” “us,” or “our”) is committed to protecting the privacy and personal data of every individual who interacts with our organization — whether as a website visitor, customer, business partner, job applicant, or employee. This Privacy Policy explains what personal data we collect, why we collect it, how we use and protect it, and what rights you have over your own data.<br/><br/>
                WAE is a manufacturer and supplier of sustainable drinking water solutions including drinking water stations, bottle filling stations, water dispensers, water coolers, reverse osmosis systems, and public utility water infrastructure. Our operations span commercial, institutional, hospitality, industrial, and government sectors across India and internationally.
              </p>

              <h3 id="who-we-are" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Who We Are</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE is the data controller responsible for personal data processed through this website (www.waecorp.com) and our associated digital platforms. Our registered office is located in India. For data protection enquiries, please contact us at the address provided in Section 10.
              </p>

              <h3 id="scope" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Scope of This Policy</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                This Policy applies to personal data collected through: (a) our corporate website and digital portals; (b) marketing and sales enquiries; (c) customer service interactions; (d) employment applications; and (e) event and exhibition registrations. It does not apply to third-party websites linked from our pages.
              </p>

              <h3 id="philosophy" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Our Data Protection Philosophy</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE is guided by the principles of purpose limitation, data minimisation, accuracy, storage limitation, integrity, and accountability. We collect only what we need, retain it only as long as necessary, and protect it with appropriate technical and organisational measures. We are committed to compliance with India's Digital Personal Data Protection Act 2023 (DPDPA) and align our practices with international standards including the GDPR.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 2 */}
            <div id="personal-data" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">2. Personal Data We Collect</h2>

              <h3 id="info-directly" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Information You Provide Directly</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We collect personal data that you provide voluntarily when you: submit a contact or product enquiry form; register for a webinar, event, or product demonstration; apply for a job with WAE; engage with our sales or customer service teams; or participate in surveys and feedback programmes.<br/><br/>
                This may include: full name; job title and organisation; professional email address; phone number; postal address; project type and requirements; and any other information you choose to include in your communications with us.
              </p>

              <h3 id="info-auto" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Information Collected Automatically</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                When you visit our website, we automatically collect certain technical data including: IP address; browser type and version; operating system; referring URLs; pages visited and time spent; device identifiers; and cookie identifiers. This data is collected via cookies and similar tracking technologies (see Section 7 and our separate Cookie Policy).
              </p>

              <h3 id="info-third" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Information from Third Parties</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We may receive personal data about you from third parties including: channel partners and distributors who introduce your organisation to WAE; LinkedIn and other professional networks when you engage with our content; event organisers who share attendee lists; and public procurement portals and tender databases.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 3 */}
            <div id="how-we-use" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">3. How We Use Your Personal Data</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE processes personal data only for legitimate, specified purposes. The primary bases for processing are: contractual necessity (to fulfil your order or service request); legitimate interests (to manage our business relationships and improve our services); consent (for marketing communications); and legal obligation (to comply with applicable law).
              </p>

              <h3 id="biz-ops" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Business Operations & Service Delivery</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We use your data to: respond to product enquiries and provide quotations; process and fulfil orders; manage installation and after-sales service; administer dealer and distributor relationships; and manage contracts and payments.
              </p>

              <h3 id="marketing" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Marketing Communications</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                With your consent, we may send you information about our products, sustainability initiatives, case studies, industry insights, and events. You may withdraw consent at any time by clicking the unsubscribe link in any marketing email or by contacting us directly. Withdrawal of consent does not affect the lawfulness of processing conducted prior to withdrawal.
              </p>

              <h3 id="compliance" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Legal & Regulatory Compliance</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We process data as required by applicable law, including tax obligations, anti-money laundering requirements, Prevention of Corruption Act compliance, and regulatory reporting.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 4 */}
            <div id="sharing" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">4. Data Sharing & Third Parties</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE does not sell personal data to third parties. We share data only as necessary and under appropriate safeguards with the following categories of recipients:
              </p>

              <h3 id="providers" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Service Providers & Data Processors</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We engage third-party service providers acting as data processors including cloud hosting providers, CRM platforms, email marketing tools, and IT security vendors - who process data strictly on our instructions and under binding contractual data protection obligations.
              </p>

              <h3 id="partners" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Business Partners & Channel Partners</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                Where you have been introduced to WAE through a project partner, we may share relevant project details with that partner for the purposes of coordinating your service.
              </p>

              <h3 id="disclosures" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Legal & Regulatory Disclosures</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We disclose personal data to courts, regulatory authorities, or law enforcement bodies when required by applicable law or legal process, or to protect the rights, property, or safety of WAE, our employees, or our customers.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 5 */}
            <div id="rights" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">5. Your Rights</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-[#AEAEAE] mb-[40px]">
                Under applicable data protection law, you have the following rights in relation to your personal data:<br/><br/>
                Right of Access: To obtain a copy of personal data we hold about you.<br/><br/>
                Right to Correction: To request correction of inaccurate or incomplete data.<br/><br/>
                Right to Erasure: To request deletion of your data where it is no longer necessary for the purpose for which it was collected, or where you have withdrawn consent.<br/><br/>
                Right to Withdraw Consent: Where processing is based on consent, to withdraw it at any time.<br/><br/>
                Right to Grievance Redressal: To raise a complaint with WAE's Data Protection Officer or the relevant regulatory authority.
              </p>

              <h3 id="exercise" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">How to Exercise Your Rights</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                To exercise any of the above rights, please submit a request to our Data Protection team using the contact details in Section 10. We will respond within 30 days. We may need to verify your identity before processing your request.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 6 */}
            <div id="security" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">6. Data Security & Retention</h2>

              <h3 id="measures" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Technical & Organisational Security Measures</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE implements appropriate technical and organisational measures to protect personal data against unauthorised access, loss, destruction, or alteration. These measures include: encryption of data in transit (TLS 1.2+); access controls and role-based permissions; regular security assessments and penetration testing; employee data protection training; and incident response procedures.
              </p>

              <h3 id="retention" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Retention Periods</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by law. Typical retention periods are: customer order data - 7 years (statutory/tax obligation); marketing contact data - 3 years from last interaction or until consent withdrawn; job applicant data — 12 months after hiring decision; website analytics data — 26 months (as per cookie consent configuration).
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 7 */}
            <div id="cookies" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">7. Cookies & Tracking Technologies</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                Our website uses cookies and similar technologies. For full details of the cookies we use and how to manage your preferences, please refer to our Cookie Policy. You can manage your cookie preferences at any time via the Cookie Preference Centre accessible in our website footer.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 8 */}
            <div id="transfers" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">8. International Data Transfers</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                Where personal data is transferred outside India to service providers or group entities in other jurisdictions, WAE ensures appropriate safeguards are in place, including Standard Contractual Clauses or equivalent mechanisms, to protect your data to the same standard as required under applicable Indian and international privacy law.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 9 */}
            <div id="updates" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">9. Policy Updates</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We may update this Privacy Policy periodically to reflect changes in our data practices, legal obligations, or regulatory guidance. We will notify you of material changes by updating the "Last Updated" date at the top of this page and, where appropriate, by direct communication. We encourage you to review this Policy regularly.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 10 */}
            <div id="contact">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">10. Contact Our Data Protection Team</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-[#AEAEAE] mb-[40px]">
                For any questions regarding this Privacy Policy, to exercise your rights, or to raise a data protection concern, please contact:<br/><br/>
                Legal @ WAE | Email: legal@waecorp.com | Website: waecorp.com/legal/privacy-policy/<br/><br/>
                You also have the right to lodge a complaint with the Data Protection Board of India or other applicable supervisory authority.
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
