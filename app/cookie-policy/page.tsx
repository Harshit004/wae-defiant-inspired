"use client";

import type React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]";

export default function CookiePolicy() {
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
          Cookie Policy
        </h1>
        <p className="font-['Manrope'] font-normal text-[12px] leading-none text-[#AEAEAE] mb-[40px]">
          Effective Date: 1 January 2026 &nbsp;|&nbsp; Last Updated: April 2026
        </p>

        {/* Intro Text */}
        <div className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE] text-justify space-y-[24px] mb-[63px]">
          <p className="leading-normal">
            WAE Ltd. uses cookies and similar tracking technologies on its website to ensure functionality, measure performance, and — with your consent — deliver targeted advertising. Cookies are small text files placed on your device; they do not carry viruses or access local files.
          </p>
          <p className="leading-normal">
            The website deploys four categories of cookies: (1) Strictly Necessary cookies, which keep core functions like session management and security working and cannot be switched off; (2) Performance & Analytics cookies, which use Google Analytics to measure visitor traffic in anonymized, aggregated form; (3) Functional cookies, which remember language or region preferences; and (4) Marketing & Targeting cookies, including LinkedIn Insight Tag and Meta Pixel, used to reach professional audiences and measure campaign effectiveness. Marketing cookies are only placed with your explicit consent.
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
                { id: "what-are-cookies", heading: "1. What Are Cookies?", subheadings: [{ id: "why-we-use", title: "Why We Use Cookies" }] },
                { id: "types-of-cookies", heading: "2. Types of Cookies We Use", subheadings: [
                  { id: "strictly-necessary", title: "Strictly Necessary Cookies" },
                  { id: "performance", title: "Performance & Analytics Cookies" },
                  { id: "functional", title: "Functional Cookies" },
                  { id: "marketing", title: "Marketing & Targeting Cookies" }
                ]},
                { id: "our-inventory", heading: "3. Our Cookie Inventory", subheadings: [
                  { id: "first-party", title: "3.1 First-Party Cookies (set directly by WAE)" },
                  { id: "third-party", title: "3.2 Third-Party Cookies" }
                ]},
                { id: "choices", heading: "4. Your Cookie Choices", subheadings: [
                  { id: "consent-banner", title: "Cookie Consent Banner" },
                  { id: "browser-controls", title: "Browser-Level Controls" },
                  { id: "opt-out-links", title: "Third-Party Opt-Out Links" }
                ]},
                { id: "impact", heading: "5. Impact of Disabling Cookies", subheadings: [] },
                { id: "updates", heading: "6. Policy Updates", subheadings: [] },
                { id: "contact", heading: "7. Contact Us", subheadings: [] }
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
              paddingLeft: '3.33vw'
            }}
          >

            {/* Section 1 */}
            <div id="what-are-cookies" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">1. What Are Cookies?</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                Cookies are small text files placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites function efficiently, to remember your preferences, and to provide website owners with analytical information about how their sites are used. Cookies are not programmes and cannot carry viruses or access files on your device.
              </p>

              <h3 id="why-we-use" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Why We Use Cookies</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                WAE uses cookies and similar tracking technologies to: ensure the Website functions correctly; understand how visitors interact with our Website so we can improve it; remember your preferences and settings; and, with your consent, to deliver relevant advertising and measure the effectiveness of our marketing campaigns. We are committed to cookie transparency and do not deploy cookies without your knowledge.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 2 */}
            <div id="types-of-cookies" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">2. Types of Cookies We Use</h2>

              <h3 id="strictly-necessary" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Strictly Necessary Cookies</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                These cookies are essential for the Website to function and cannot be switched off. They are typically set in response to actions you take such as setting your privacy preferences, completing contact forms, or logging into our partner portal. These cookies do not store personally identifiable information and do not require your consent under applicable law. Examples include: session management cookies; security and anti-fraud cookies; and load-balancing cookies.
              </p>

              <h3 id="performance" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Performance & Analytics Cookies</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                These cookies allow us to measure visits and traffic sources to understand how our Website performs and to identify areas for improvement. All information collected by these cookies is aggregated and anonymised. We use Google Analytics for this purpose. These cookies are only set with your consent.
              </p>

              <h3 id="functional" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Functional Cookies</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                Functional cookies enable enhanced functionality and personalisation, such as remembering your region or language preference, and ensuring you do not see repeated pop-ups. If these cookies are disabled, some features of the Website may not function correctly.
              </p>

              <h3 id="marketing" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Marketing & Targeting Cookies</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                Marketing cookies track your browsing activity across websites to build a profile of your interests and display relevant advertisements. WAE uses LinkedIn Insight Tag and Meta Pixel to reach professional audiences and measure campaign performance. These cookies are only set with your explicit consent and can be withdrawn at any time.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 3 */}
            <div id="our-inventory" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">3. Our Cookie Inventory</h2>

              <h3 id="first-party" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">First-Party Cookies (set directly by WAE)</h3>
              
              <div className="mb-[40px] space-y-[24px]">
                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  Cookie Name / Category<br/>
                  Purpose & Duration
                </p>

                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  _wa_session (Strictly Necessary)<br/>
                  Maintains user session. Duration: Session (deleted on browser close)
                </p>

                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  _wa_consent (Strictly Necessary)<br/>
                  Stores your cookie consent preferences. Duration: 12 months
                </p>

                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  _wa_lang (Functional)<br/>
                  Remembers your language/region preference. Duration: 12 months
                </p>

                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  _wa_pref (Functional)<br/>
                  Remembers your product filter preferences. Duration: 6 months
                </p>
              </div>

              <h3 id="third-party" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Third-Party Cookies</h3>
              
              <div className="mb-[40px] space-y-[24px]">
                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  Third Party<br/>
                  Cookie Purpose & Opt-Out
                </p>

                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  Google Analytics (_ga, _gid, _gat)<br/>
                  Website traffic analytics and performance measurement. Opt out: tools.google.com/dlpage/gaoptout
                </p>

                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  LinkedIn Insight Tag (li_fat_id, AnalyticsSyncHistory)<br/>
                  B2B audience analytics and LinkedIn ad performance. Opt out: linkedin.com/psettings/
                </p>

                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  Meta / Facebook Pixel (_fbp, fr)<br/>
                  Marketing campaign performance and retargeting. Opt out: facebook.com/settings/?tab=ads
                </p>

                <p className="font-['Manrope'] font-normal text-[14px] text-[#AEAEAE]">
                  Google Ads (NID, DSID)<br/>
                  Conversion tracking for search advertising. Opt out: adssettings.google.com
                </p>
              </div>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 4 */}
            <div id="choices" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">4. Your Cookie Choices</h2>

              <h3 id="consent-banner" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Cookie Consent Banner</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                On your first visit to our Website, you will see a cookie consent banner that allows you to accept all cookies, reject non-essential cookies, or customise your preferences by category. Your choice will be remembered for 12 months. You can change your preferences at any time by clicking “Cookie Settings” in the website footer.
              </p>

              <h3 id="browser-controls" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Browser-Level Controls</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                Most web browsers allow you to manage cookies through browser settings. You can set your browser to block all cookies, block third-party cookies only, or delete existing cookies. Please note that blocking strictly necessary cookies will impair Website functionality. For guidance on cookie management in your specific browser, visit your browser's help centre.
              </p>

              <h3 id="opt-out-links" className="font-['Inter_Tight'] font-normal text-[14px] leading-[105%] text-white mb-[24px]">Third-Party Opt-Out Links</h3>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                For analytics and advertising cookies, you can opt out directly through the third-party providers listed in Section 3.2 above. Industry opt-out tools are also available at: Your Online Choices (youronlinechoices.eu) and the Network Advertising Initiative (optout.networkadvertising.org).
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 5 */}
            <div id="impact" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">5. Impact of Disabling Cookies</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                If you choose to disable or block certain categories of cookies, some Website features may not function as intended. Strictly necessary cookies cannot be disabled without affecting Website functionality. Disabling analytics cookies means we cannot measure or improve your experience. Disabling marketing cookies means you may see less relevant advertising from WAE on third-party platforms.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 6 */}
            <div id="updates" className="mb-[40px]">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">6. Policy Updates</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-justify text-[#AEAEAE] mb-[40px]">
                We may update this Cookie Policy from time to time to reflect changes in the cookies we use, changes to applicable law, or updates to our marketing tools. We will update the "Last Updated" date above when we make material changes. Where required by law, we will seek fresh consent after material changes to our cookie practices.
              </p>

              <hr className="border-t border-[#FFFFFF33]" />
            </div>

            {/* Section 7 */}
            <div id="contact">
              <h2 className="font-['Manrope'] font-normal text-[20px] leading-none text-white mb-[24px]">7. Contact Us</h2>
              <p className="font-['Manrope'] font-normal text-[14px] leading-normal text-[#AEAEAE] mb-[40px]">
                For questions about this Cookie Policy or to request a full cookie audit report, please contact: Digital Marketing & Data Privacy Team | WAE Limited | Email: legal@waecorp.com
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
