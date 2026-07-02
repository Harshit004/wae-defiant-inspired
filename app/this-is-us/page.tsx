"use client"

import type { FC } from "react"
import { useState } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Rocket, Lightbulb, Droplets, Settings, GlassWater, ChevronLeft, ChevronRight } from "lucide-react"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

const DarkSectionButton = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="transition-all duration-500 ease inline-flex items-center justify-center  mt-8"
            style={{
                padding: '0.69vw 1.11vw',
                pointerEvents: "auto",
                gap: "0.55vw",
                fontFamily: "\'Manrope\', sans-serif",
                fontWeight: 500,
                fontSize: "10px",
                lineHeight: "100%",
                textDecoration: "none",
                backgroundColor: hovered ? "#fff" : "transparent",
                border: "1px solid #fff",
                cursor: "pointer",
                color: hovered ? "#000" : "#fff",
            }}
        >
            {children}
            <div className="relative inline-block w-[12px] h-[12px] ml-1">
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                    alt="icon default"
                    className="w-full h-full object-contain absolute to left-0 pt-[1px]"
                    style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.5s', filter: 'invert(1)' }}
                />
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                    alt="icon hover"
                    className="w-full h-full object-contain absolute to left-0 pt-[1px]"
                    style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.5s', filter: 'invert(1)' }}
                />
            </div>
        </a>
    );
};

const LinkedInButton = ({ href }: { href: string }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative inline-block w-[32px] h-[32px] opacity-70 hover:opacity-100 transition-opacity">
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/042c1bc2-c4d9-4047-a3a8-d4ccf1a59900/public"
                alt="LinkedIn" width={32} height={32}
                className="absolute to left-0 transition-opacity duration-300 filter invert"
            />
        </a>
    );
};

const timelineData = [
    {
        yearLabel: "2010-12",
        title: "2010 - 2012",
        items: [
            "WAE incorporated, a company from water intake to water reuse"
        ],
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e555203-dfe1-4a2a-d603-1cf72a9cf700/public"
    },
    {
        yearLabel: "2013-14",
        title: "2013-2014",
        items: [
            "Emergence of an activism: \"say no to bottled water\"",
            "Point-of-use water purification stations launched",
            "WAE Drinking Water Fountain range launched",
            "Installed at Indira Gandhi International Airport & Airport Metro",
            "Projects Business Unit started in Water & Wastewater management"
        ],
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/206a4c0f-a6fd-4802-3c4c-bb1ea555dd00/public"
    },
    {
        yearLabel: "2015-17",
        title: "2015- 2017",
        items: [
            "Completed installation of over 10 Sewage Treatment Plants in India",
            "First ETP of 500 KLD installed at Seemag Steel Plant, Orissa",
            "Installed 1 MLD Biological & MBR Hybrid Sewage Treatment Plant at Gangotri, Uttarakhand",
            "Signed master license agreement with HAWS Corporation, USA for hydration products"
        ],
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b602b016-735d-418a-ea65-b3deae43d400/public"
    },
    {
        yearLabel: "2018-19",
        title: "2018- 2019",
        items: [
            "Research and Development team incubated"
        ],
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c40eb086-3649-41fb-46c1-de8608ec2100/public"
    },
    {
        yearLabel: "2020-21",
        title: "2020- 2021",
        items: [
            "Introduced IoT integrated smart sustainable hydration products",
            "Launched WAE Purge range of air purification products",
            "Added Solid Waste Management stream",
            "Certified to ISO 14001, 9001 and 45001"
        ],
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f15af2e0-f109-477a-d786-20641f7ba200/public"
    },
    {
        yearLabel: "2022-23",
        title: "2022-2023",
        items: [
            "Initiated WAE Hydration for HoReCa (Hotels, Restaurants & Catering)",
            "Patents awarded for touchless dispensing with LED UV protection",
            "Patents awarded for electronically operated drinking water taps",
            "Incorporation of CSR arm: WAE Foundation"
        ],
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b7820598-dcd3-4078-2bc2-9b125f617700/public"
    }
];

const TimelineSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    };

    const handleNext = () => {
        if (activeIndex < timelineData.length - 1) setActiveIndex(activeIndex + 1);
    };

    const activeData = timelineData[activeIndex];

    return (
        <section className="w-full pt-[82px] pb-0">
            <div className={containerClass}>
                <div className="w-full border-t border-white/20 mb-[82px]"></div>
                <h2 style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '40px', lineHeight: '110%', marginBottom: '20px' }}>WAE Chronicle</h2>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '110%', color: '#AEAEAE', marginBottom: '86px' }}>From Intent to Impact</p>

                <div className="w-full relative mb-[120px]">
                    <div className="w-full h-[1px] bg-white/20 relative">
                        <div
                            className="absolute to left-0 h-full bg-white transition-all duration-300"
                            style={{ width: `${(activeIndex / (timelineData.length - 1)) * 100}%` }}
                        ></div>
                        {timelineData.map((item, i) => {
                            const isActive = i <= activeIndex;
                            const isCurrent = i === activeIndex;
                            return (
                                <div
                                    key={i}
                                    className="absolute top-1/2 flex flex-col items-center"
                                    style={{ left: `${(i / (timelineData.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                                >
                                    <div className={`w-[8px] h-[8px] rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-[#AEAEAE99]'}`}></div>
                                    <span className={`absolute top-[20px] text-[12px] font-['Manrope'] whitespace-nowrap transition-colors duration-300 ${isCurrent ? 'text-white' : 'text-[#AEAEAE99]'}`}>
                                        {item.yearLabel}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-[4vw] items-start">
                    <div className="w-[60%] relative aspect-[16/9]">
                        <Image src={activeData.image} alt={activeData.title} fill className="object-cover transition-opacity duration-500" />
                    </div>
                    <div className="w-[40%] flex flex-col justify-between h-auto min-h-[300px]">
                        <div>
                            <h3 style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '40px', lineHeight: '110%', marginBottom: '24px' }}>{activeData.title}</h3>
                            <div className="flex flex-col gap-2">
                                {activeData.items.map((text, idx) => (
                                    <p key={idx} style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '130%', color: '#AEAEAE' }} className="flex gap-2">
                                        <span>•</span>
                                        <span>{text}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-12 justify-end">
                            <button
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                className="w-10 h-10 border border-white/20 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                            >
                                <ChevronLeft className="w-5 h-5 text-white/50" strokeWidth={1} />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={activeIndex === timelineData.length - 1}
                                className="w-10 h-10 border border-white/20 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                            >
                                <ChevronRight className="w-5 h-5 text-white/50" strokeWidth={1} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ThisIsUs: FC = () => {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/30 selection:text-white">
            <Header />

            {/* HERO SECTION */}
            <section className="w-full pt-[235px] pb-[68px]">
                <div className={containerClass}>
                    <p style={{
                        fontFamily: "\'Manrope\', sans-serif",
                        fontWeight: 500,
                        fontSize: '20px',
                        lineHeight: '110%',
                        color: '#AEAEAE99',
                        marginBottom: '1em'
                    }}>WAE</p>
                    <h1 style={{
                        fontFamily: "\'Manrope\', sans-serif",
                        fontWeight: 400,
                        fontSize: '60px',
                        lineHeight: '110%',
                        marginBottom: '68px'
                    }} className="max-w-[80%]">
                        Designing the future of plastic-free hydration infrastructure.
                    </h1>

                    <div className="w-full h-[500px] relative">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="/Big Bang Theory_C.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </section>

            {/* SDG 6 MISSION VISION */}
            <section className="w-full">
                <div className={containerClass}>
                    <div className="flex">
                        <div className="w-[50%] pr-[4.65vw] border-r border-white/20 flex flex-col items-start justify-start">
                            <h2 style={{
                                fontFamily: "\'Manrope\', sans-serif",
                                fontWeight: 400,
                                fontSize: '55px',
                                lineHeight: '105%',
                                marginBottom: '60px',
                                maxWidth: '41.8vw'
                            }}>
                                Supporting SDG 6 through carbon-neutral water infrastructure solutions.
                            </h2>
                            <div className="mt-[-28px]">
                                <DarkSectionButton href="/sustainability">Know More</DarkSectionButton>
                            </div>
                        </div>
                        <div className="w-[50%] pl-[3.47vw] flex flex-col">
                            {/* Mission */}
                            <div className="pb-[58px] border-b border-white/20">
                                <div className="flex items-start gap-[1.65vw]">
                                    <div className="w-[21.44px] h-[21.44px] shrink-0 mt-[6px]">
                                        <Rocket className="w-full h-full text-white/70" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '32px', lineHeight: '110%' }} className="mb-4">Mission</h3>
                                        <p style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '130%', color: '#AEAEAE' }} className="mb-4">
                                            WAE exists to make a meaningful, lasting contribution, protecting the environment and improving the quality of human life without compromising future generations. Our idea of leadership is not defined by scale, but by excellence in green technologies, consumer value, customer service, and employee capability.
                                        </p>
                                        <p style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '130%', color: '#AEAEAE' }}>
                                            We seek to reconcile social progress, professional fulfilment, quality-driven service, and economic development. Long-term value creation must remain balanced, responsible, and sustainable. Growth, for us, is not a number on a chart. It is the outcome of doing right by people, planet, and the communities we are built to serve.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Vision */}
                            <div className="pt-[58px]">
                                <div className="flex items-start gap-[1.65vw]">
                                    <div className="w-[21.44px] h-[21.44px] shrink-0 mt-[6px]">
                                        <Lightbulb className="w-full h-full text-white/70" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '32px', lineHeight: '110%' }} className="mb-4">Vision</h3>
                                        <p style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '130%', color: '#AEAEAE' }} className="mb-4">
                                            WAE translates values into action through research-driven products and solutions that serve both the environment and human well-being. We operate as a technology-led organisation, guided by knowledge, science, and long-term thinking, not short-term market pressures. Accountability to employees, customers, partners, and societies is not optional.
                                        </p>
                                        <p style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '130%', color: '#AEAEAE' }}>
                                            It is how we operate. We hold ourselves to the highest standards across products, services, relationships, and commitments. Profit is a strategic necessity, not the goal. It follows meaningful contribution, shared progress, and participative growth. That distinction shapes every decision we make, from the materials we choose to the partnerships we build.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR BUSINESS MODEL */}
            <section className="w-full pt-[82px] pb-0">
                <div className={containerClass}>
                    <div className="w-full border-t border-white/20 mb-[82px]"></div>
                    <h2 style={{
                        fontFamily: "\'Manrope\', sans-serif",
                        fontWeight: 400,
                        fontSize: '40px',
                        lineHeight: '110%',
                        marginBottom: '78px'
                    }}>Our Business Model</h2>

                    <div className="flex justify-between gap-[4.23vw]">
                        <div className="w-[25.55vw] pl-[3vw] border-l border-white/20 flex flex-col">
                            <div className="mb-[32px]">
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4b160f1a-eedc-4e04-0a1f-58eee7f8ab00/public" className="w-[57px] h-[57px] object-contain" alt="Icon" />
                            </div>
                            <h3 style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '28px', lineHeight: '110%' }} className="mb-[24px]">Single-use plastic is an<br />institutional problem</h3>
                            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '150%', color: '#AEAEAE' }}>
                                <p className="mb-6">
                                    Most organisations have made sustainability commitments, but their water infrastructure contradicts them. Bottled water creates ongoing plastic waste, carbon cost from logistics, and reputational risk.
                                </p>
                                <p className="mb-6">
                                    The market has no shortage of hydration products. It has a shortage of credible, scalable alternatives designed for institutional environments, with material integrity and ESG traceability built in.
                                </p>
                                <p>
                                    What's missing is not intent—but infrastructure intelligence. Organizations need systems that integrate purification at the point of use, eliminate dependency on external supply chains, and provide measurable impact data across water, carbon, and waste metrics. Without this shift, sustainability remains a reported ambition rather than an operational reality.
                                </p>
                            </div>
                        </div>
                        <div className="w-[25.55vw] pl-[3vw] border-l border-white/20 flex flex-col">
                            <div className="mb-[32px]">
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b5de6636-9ffb-43dd-adab-dae732151200/public" className="w-[57px] h-[57px] object-contain" alt="Icon" />
                            </div>
                            <h3 style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '28px', lineHeight: '110%' }} className="mb-[24px]">The bottled gets replaced with<br />infrastructure</h3>
                            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '150%', color: '#AEAEAE' }}>
                                <p className="mb-6">
                                    WAE designs and deploys steel-first, point-of-use water systems for public institutions, corporate campuses, hospitality, and healthcare environments. Our systems connect directly to the water supply, eliminating plastic at the source, not the policy level.
                                </p>
                                <p className="mb-4">Key differentiators:</p>
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Steel-first material philosophy: no plastic contact with water</li>
                                    <li>Designed for institutional scale, not consumer markets</li>
                                    <li>ESG-traceable: aligned with UN SDG 6 (clean water and sanitation) and circular economy principles</li>
                                    <li>End-to-end service model covering installation, maintenance, and impact reporting</li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-[25.55vw] pl-[3vw] border-l border-white/20 flex flex-col">
                            <div className="mb-[32px]">
                                <img src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/38c6f634-25c1-46cf-4e3f-703d0c08de00/public" className="w-[57px] h-[57px] object-contain" alt="Icon" />
                            </div>
                            <h3 style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '28px', lineHeight: '110%' }} className="mb-[24px]">How the model works in<br />practice</h3>
                            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '150%', color: '#AEAEAE' }}>
                                <p className="mb-6">
                                    Site assessment: WAE audits the client's existing water usage, plastic footprint, and infrastructure
                                </p>
                                <ul className="space-y-4 mb-6">
                                    <li><strong>1. System design:</strong> Custom-configured point-of-use units specified for the environment</li>
                                    <li><strong>2. Installation:</strong> Steel-first systems installed directly into the water supply, zero plastic in the water path</li>
                                    <li><strong>3. Service & reporting:</strong> Ongoing maintenance with measurable plastic elimination data for ESG reporting</li>
                                    <li><strong>4. Scale:</strong> Systems are modular and replicable across sites, campuses, and geographies</li>
                                </ul>
                                <p>
                                    From assessment to scale, WAE delivers a seamless transition to sustainable hydration infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACTIVIST QUOTE */}
            <section className="w-full pt-[82px] pb-0">
                <div className={containerClass}>
                    <div className="w-full border-t border-white/20 mb-[82px]"></div>
                    <div className="w-full aspect-[1227/548] relative mb-[62px]">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="/Production_Video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="flex flex-col items-end w-full ml-auto">
                        <p style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 500, fontSize: '40px', lineHeight: '120%', textAlign: 'right', color: '#AEAEAE' }} className="mb-8">
                            "WAE was built as an activist <span className="text-white">organisation</span>, not a product company. That origin shapes everything: material choices, partnerships, pricing philosophy, and where we deploy.
                        </p>
                        <p style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 500, fontSize: '40px', lineHeight: '120%', textAlign: 'right', color: '#AEAEAE' }}>
                            It is not <span className="text-white">positioning</span>.<br />It is <span className="text-white">structure</span>."
                        </p>
                    </div>
                </div>
            </section>

            {/* WAE CHRONICLE */}
            <TimelineSection />

            {/* THE TEAM */}
            <section className="w-full pt-[82px] pb-0">
                <div className={containerClass}>
                    <div className="w-full border-t border-white/20 mb-[82px]"></div>
                    <div className="flex">
                        <div className="w-[25%] pr-[5.56vw] border-r border-white/20 relative">
                            <div className="sticky top-40">
                                <h2 style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '40px', lineHeight: '100%', marginBottom: '60px' }}>The team<br />behind WAE</h2>
                                <div className="mt-[-28px]">
                                    <DarkSectionButton href="/careers">Join Team</DarkSectionButton>
                                </div>
                            </div>
                        </div>
                        <div className="w-[75%] pl-[5.56vw] flex flex-col gap-[4.86vw]">
                            {/* Founder CEO */}
                            <div className="flex w-full gap-[3.75vw]">
                                <div className="w-[calc(50%-1.875vw)] aspect-[410/517] relative shrink-0">
                                    <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/945f5796-0664-44a9-b951-7759f4d39400/public" alt="A. Vikram Joshe" fill className="object-cover" />
                                </div>
                                <div className="flex flex-col justify-between w-full py-1">
                                    <div className="flex flex-col relative w-full">
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '2.22vw', lineHeight: '110%' }}>A. Vikram Joshe</h3>
                                        <div className="absolute right-0 top-0">
                                            <LinkedInButton href="#" />
                                        </div>
                                        <div className="mb-[1.38vw]"></div>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '1.25vw', lineHeight: '110%', color: '#AEAEAE' }}>Founder & CEO</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.66vw', lineHeight: '100%' }}>
                                            "Water is one of the world’s most visible expressions of care, and the future of care must include care for the planet."
                                        </p>
                                        <div className="mb-[3.125vw]"></div>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '0.97vw', lineHeight: '100%', color: '#AEAEAE' }}>
                                            A sustainability entrepreneur with three decades of cross-sector experience, building a water-secure future by making sustainable water technologies accessible and mainstream through responsible, long-term solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex gap-[3.75vw] w-full">
                                <div className="flex flex-col w-[calc(50%-1.875vw)]">
                                    <div className="w-full aspect-[410/331] relative mb-[2.22vw]">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6bc35551-9c5a-4161-328f-da4114280600/public" alt="Deepak Panwar" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex flex-col relative w-full">
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.66vw', lineHeight: '110%' }}>Deepak Panwar</h3>
                                        <div className="absolute right-0 top-0">
                                            <LinkedInButton href="#" />
                                        </div>
                                        <div className="mb-[0.83vw]"></div>
                                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.11vw', lineHeight: '110%' }}>CEO - Food & Beverage Division</p>
                                        <div className="mb-[2.22vw]"></div>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '0.97vw', lineHeight: '130%', color: '#AEAEAE' }}>
                                            Leads WAE's Food & Beverage division, bringing senior leadership experience to drive strategic growth and expand the organisation's commercial footprint across food and hospitality sectors.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[calc(50%-1.875vw)]">
                                    <div className="w-full aspect-[410/331] relative mb-[2.22vw]">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4cedda8e-3f37-422a-920c-7c8241256400/public" alt="Nayna Swati Dewesar" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex flex-col relative w-full">
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.66vw', lineHeight: '110%' }}>Nayna Swati Dewesar</h3>
                                        <div className="absolute right-0 top-0">
                                            <LinkedInButton href="#" />
                                        </div>
                                        <div className="mb-[0.83vw]"></div>
                                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.11vw', lineHeight: '110%' }}>Corporate Finance & Commercial</p>
                                        <div className="mb-[2.22vw]"></div>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '0.97vw', lineHeight: '130%', color: '#AEAEAE' }}>
                                            A founding member of WAE, she leads corporate finance, procurement, and commercial projects, strengthening financial discipline, operational efficiency, and strategic execution across the wider organisation.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="flex gap-[3.75vw] w-full">
                                <div className="flex flex-col w-[calc(50%-1.875vw)]">
                                    <div className="w-full aspect-[410/331] relative mb-[2.22vw]">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b50e712a-a5aa-4ce7-31ae-9d624ef5f100/public" alt="Satinder Kaur" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex flex-col relative w-full">
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.66vw', lineHeight: '110%' }}>Satinder Kaur</h3>
                                        <div className="absolute right-0 top-0">
                                            <LinkedInButton href="#" />
                                        </div>
                                        <div className="mb-[0.83vw]"></div>
                                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.11vw', lineHeight: '110%' }}>Chief Revenue Officer</p>
                                        <div className="mb-[2.22vw]"></div>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '0.97vw', lineHeight: '130%', color: '#AEAEAE' }}>
                                            Leads WAE's revenue strategy and overall commercial growth, overseeing sales operations, key account management, and strategic partnership development to drive consistent, scalable, long-term institutional revenue.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[calc(50%-1.875vw)]">
                                    <div className="w-full aspect-[410/331] relative mb-[2.22vw]">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/469bb1e6-1c45-4f16-f7ea-6532aa9f5300/public" alt="Avnesh Sharma" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex flex-col relative w-full">
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.66vw', lineHeight: '110%' }}>Avnesh Sharma</h3>
                                        <div className="absolute right-0 top-0">
                                            <LinkedInButton href="#" />
                                        </div>
                                        <div className="mb-[0.83vw]"></div>
                                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.11vw', lineHeight: '110%' }}>Director - Customer Value Management</p>
                                        <div className="mb-[2.22vw]"></div>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '0.97vw', lineHeight: '130%', color: '#AEAEAE' }}>
                                            Drives customer value delivery and long-term retention across WAE's institutional client base, managing relationships and ensuring clients achieve measurable outcomes from their water infrastructure investments.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="flex gap-[3.75vw] w-full">
                                <div className="flex flex-col w-[calc(50%-1.875vw)]">
                                    <div className="w-full aspect-[410/331] relative mb-[2.22vw]">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4f88d5da-23ab-4e62-c172-f2d9b8581900/public" alt="Meenakshi Bora" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex flex-col relative w-full">
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.66vw', lineHeight: '110%' }}>Meenakshi Bora</h3>
                                        <div className="absolute right-0 top-0">
                                            <LinkedInButton href="#" />
                                        </div>
                                        <div className="mb-[0.83vw]"></div>
                                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.11vw', lineHeight: '110%' }}>VP - Client Relations & Operations</p>
                                        <div className="mb-[2.22vw]"></div>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '0.97vw', lineHeight: '130%', color: '#AEAEAE' }}>
                                            Aligns client relations and operations at WAE, enabling efficient, responsive service delivery and consistent client satisfaction through strong coordination, cross-functional execution, and operational excellence throughout.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[calc(50%-1.875vw)]">
                                    <div className="w-full aspect-[410/331] relative mb-[2.22vw]">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/00e1155b-84f2-4db0-591e-6a99630fdf00/public" alt="Rashmi Bhatia" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex flex-col relative w-full">
                                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.66vw', lineHeight: '110%' }}>Rashmi Bhatia</h3>
                                        <div className="absolute right-0 top-0">
                                            <LinkedInButton href="#" />
                                        </div>
                                        <div className="mb-[0.83vw]"></div>
                                        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '1.11vw', lineHeight: '110%' }}>Director - Finance & Accounts</p>
                                        <div className="mb-[2.22vw]"></div>
                                        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '0.97vw', lineHeight: '130%', color: '#AEAEAE' }}>
                                            Brings over 14 years in corporate finance. Leads WAE's finance and accounts function, ensuring financial governance, accuracy, compliance, and sustainable fiscal management across the organisation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVING WITH PURPOSE */}
            <section className="w-full pt-[82px] pb-0">
                <div className={containerClass}>
                    <div className="w-full border-t border-white/20 mb-[82px]"></div>
                    <div className="flex">
                        <div className="w-[42%] pr-[4.72vw]">
                            <h2 style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '40px', lineHeight: '110%', marginBottom: '78px' }}>Serving<br />with Purpose</h2>
                            <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '130%', color: '#AEAEAE', marginBottom: '40px' }}>
                                All CSR activities undertaken through the WAE Foundation follow structured processes and are supported by proper documentation. Each initiative is planned, executed, and recorded with clear accountability. Transparency and traceability are central to how we operate, ensuring that every contribution is meaningful, measurable, and aligned with responsible long-term growth.
                            </p>
                            <div className="mt-[-28px]">
                                <DarkSectionButton href="/sustainability">Know More</DarkSectionButton>
                            </div>
                        </div>
                        <div className="w-[58%]">
                            <div className="w-full relative aspect-[767/433]">
                                <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/09994f88-82ea-4103-7333-6c7f1bb6ab00/public" alt="Serving with Purpose" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AWARDS & RECOGNITION */}
            <section className="w-full pt-[82px] pb-[124px]">
                <div className={containerClass}>
                    <div className="w-full border-t border-white/20 mb-[82px]"></div>
                    <h2 style={{ fontFamily: "\'Manrope\', sans-serif", fontWeight: 400, fontSize: '40px', lineHeight: '110%', marginBottom: '78px' }}>Awards & Recognition</h2>
                    <div className="grid grid-cols-3">
                        {[
                            {
                                title: "Brand Disruption Award",
                                year: "2026",
                                image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/27c5ee91-c5fb-4218-da79-ca72831f8300/public"
                            },
                            {
                                title: "Design & Creativity",
                                year: "2026",
                                image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ef384b0c-e715-4d9b-1e40-32c79b5d9600/public"
                            },
                            {
                                title: "Design Excellence Award",
                                year: "2025",
                                image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c22cf192-4c90-4f5c-68f9-12db08666e00/public"
                            }
                        ].map((award, index) => (
                            <div key={index} className="flex flex-col border-l border-white/20 pl-[2.01vw]">
                                <div className="w-full aspect-[340/407] relative mb-[35px] max-w-[340px]">
                                    <Image src={award.image} alt={award.title} fill className="object-cover" />
                                </div>
                                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '24px', lineHeight: '130%', color: '#fff' }} className="pr-4">
                                    {award.title}<br />
                                    {award.year}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default ThisIsUs