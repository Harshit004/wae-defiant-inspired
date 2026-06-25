"use client"

import type { FC } from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import Header from "@/components/header"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]";

const LinkedInButton = ({ href }: { href: string }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative inline-block w-[32px] h-[32px]">
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/042c1bc2-c4d9-4047-a3a8-d4ccf1a59900/public"
                alt="LinkedIn" width={32} height={32}
                className="absolute top-0 left-0 transition-opacity duration-300"
                style={{ opacity: hovered ? 0 : 1, filter: "invert(1)" }}
            />
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5bfff22f-161f-41ff-bf68-61c7c5c56a00/public"
                alt="LinkedIn Hover" width={32} height={32}
                className="absolute top-0 left-0 transition-opacity duration-300"
                style={{ opacity: hovered ? 1 : 0 }}
            />
        </a>
    );
};

const DarkSectionButton = ({ href }: { href: string }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="transition-all duration-650 ease inline-flex items-center justify-center p-0 mt-8"
            style={{
                width: '135px',
                height: '35px',
                pointerEvents: "auto",
                gap: "6px",
                fontFamily: "'Inter Tight', sans-serif",
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
            Know More
            <div className="relative inline-block w-[12px] h-[12px] ml-1">
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                    alt="icon default"
                    className="w-full h-full object-contain absolute top-0 left-0 pt-[1px]"
                    style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.5s', filter: 'invert(1)' }}
                />
                <img
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                    alt="icon hover"
                    className="w-full h-full object-contain absolute top-0 left-0 pt-[1px]"
                    style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }}
                />
            </div>
        </a>
    );
};

const timelineData = [
    {
        navLabel: '2010-12',
        title: '2010- 2012',
        img: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f0f1f182-5459-4c89-447e-95c3599ea100/public',
        items: [
            'WAE incorporated, a company from water intake to water reuse'
        ]
    },
    {
        navLabel: '2013-14',
        title: '2013-2014',
        img: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c82bf51e-3df5-4c7f-8c54-3e9f4d7cbd00/public',
        items: [
            'Emergence of an activism: "say no to bottled water"',
            'Point-of-use water purification stations launched',
            'WAE Drinking Water Fountain range launched',
            'Installed at Indira Gandhi International Airport & Airport Metro',
            'Projects Business Unit started in Water & Wastewater management'
        ]
    },
    {
        navLabel: '2015-17',
        title: '2015- 2017',
        img: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8a5e3834-15ae-4d53-0721-e5bcb1f9c800/public',
        items: [
            'Completed installation of over 10 Sewage Treatment Plants in India',
            'First ETP of 500 KLD installed at Seemag Steel Plant, Orissa',
            'Installed 1 MLD Biological & MBR Hybrid Sewage Treatment Plant at Gangotri, Uttarakhand',
            'Signed master license agreement with HAWS Corporation, USA for hydration products'
        ]
    },
    {
        navLabel: '2018-19',
        title: '2018- 2019',
        img: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/44ca6a28-c6dc-41b7-e13a-47e7979f5a00/public',
        items: [
            'Research and Development team incubated'
        ]
    },
    {
        navLabel: '2020-21',
        title: '2020- 2021',
        img: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/df29575f-ecf9-477a-6eef-e060e0142700/public',
        items: [
            'Embarked on a transformative digital journey',
            'Completed a successful and innovative decade of Integrated Water Resource Management',
            'Launched touchless dispensing with LED UV protection'
        ]
    },
    {
        navLabel: '2022-23',
        title: '2022-2023',
        img: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bb151381-799d-4ed2-1416-aa9e5a712d00/public',
        items: [
            'Revolutionizing hygiene with electronically operated drinking water taps',
            'Innovative solutions tailored for the HoReCa segment'
        ]
    }
];

const TimelineSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="w-full bg-[#0F0F0F] px-[9.72%] py-[120px] font-['Inter_Tight'] text-white">
            <div className="max-w-[1440px] mx-auto w-full">
                <h2 className="text-[36px] md:text-[44px] font-medium leading-[110%] text-white tracking-tight mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>WAE Chronicle</h2>
                <p className="text-[16px] font-normal text-white mb-20">From Intent to Impact</p>

                {/* Timeline Nav Area */}
                <div className="relative w-full flex justify-between px-1 md:px-2">
                    {/* Background Line Container */}
                    <div className="absolute top-[3px] md:top-[5px] left-[4px] right-[4px] md:left-[8px] md:right-[8px] h-[1px] md:h-[2px] bg-[#333333] z-0">
                        {/* Active Line Fill */}
                        <div
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-in-out"
                            style={{ width: `${(activeIndex / (timelineData.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                    {/* Stops */}
                    {timelineData.map((data, index) => {
                        const isPastOrActive = index <= activeIndex;
                        return (
                            <div
                                key={index}
                                className="relative z-10 flex flex-col items-center cursor-pointer group"
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className={`w-[8px] h-[8px] md:w-[12px] md:h-[12px] rounded-full mb-4 transition-colors duration-500 ${isPastOrActive ? 'bg-white' : 'bg-[#333333] group-hover:bg-[#888]'}`}></div>
                                <span className={`text-[10px] md:text-[12px] font-medium absolute top-6 md:top-8 whitespace-nowrap transition-colors duration-500 ${isPastOrActive ? 'text-white' : 'text-[#AEAEAE] group-hover:text-[#ccc]'}`}>
                                    {data.navLabel}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="h-[40px] w-full"></div>

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch mt-8 w-full">
                    {/* Image Column */}
                    <div className="w-full mr-[4.3055vw] lg:w-[45%]">
                        <div className="relative w-full md:w-[579px] h-[239px] bg-black">
                            <Image
                                src={timelineData[activeIndex].img}
                                alt="Chronicle Image"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="w-full lg:w-[55%] flex flex-col justify-start relative min-h-[300px]">
                        <h3 className="text-[18px] md:text-[20px] font-medium text-white mb-6">{timelineData[activeIndex].title}</h3>

                        <ul className="list-disc pl-5 mb-auto space-y-3">
                            {timelineData[activeIndex].items.map((item, idx) => (
                                <li key={idx} className="text-[14px] font-normal leading-[140%] text-[#AEAEAE]">
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Arrows */}
                        <div className="absolute bottom-0 right-0 flex gap-4">
                            <button
                                onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                                disabled={activeIndex === 0}
                                className={`w-[32px] h-[32px] border rounded-none flex items-center justify-center transition-colors ${activeIndex === 0 ? 'border-[#333] text-[#333] cursor-not-allowed' : 'border-white text-white hover:bg-white hover:text-black'}`}
                            >
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setActiveIndex(Math.min(timelineData.length - 1, activeIndex + 1))}
                                disabled={activeIndex === timelineData.length - 1}
                                className={`w-[32px] h-[32px] border rounded-none flex items-center justify-center transition-colors ${activeIndex === timelineData.length - 1 ? 'border-[#333] text-[#333] cursor-not-allowed' : 'border-white text-white hover:bg-white hover:text-black'}`}
                            >
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default function Home() {
    return (
        <main className="relative bg-[#0F0F0F] text-white min-h-screen font-['Inter_Tight']">
            {/* Header */}
            <Header />

            {/* 1. Hero Section */}
            <section className="relative w-full pt-[230px] pb-[80px] px-[9.72%] max-w-[1440px] mx-auto">
                <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-medium leading-[105%] text-white max-w-[900px] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Designing the future of plastic-free hydration infrastructure.
                </h1>
            </section>

            {/* Video 1 */}
            <section className="w-full">
                <video
                    src="/Big Bang Theory_C.mp4"
                    className="w-full h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    Your browser does not support the video tag.
                </video>
            </section>

            {/* 2. Mission and Vision Section */}
            <section className="w-full bg-[#0F0F0F] px-[9.72%] py-[120px]">
                <div className="flex flex-col gap-[80px] max-w-[1440px] mx-auto">
                    {/* Mission */}
                    <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full md:w-[45%] flex flex-col mb-8 md:mb-0 pr-[40px]">
                            <h2 className="text-[32px] font-normal leading-[120%] text-white tracking-tight mb-[40px]">
                                Supporting SDG 6 through carbon-neutral water infrastructure solutions.
                            </h2>
                            <DarkSectionButton href="/sustainability" />
                        </div>
                        <div className="w-full md:w-[45%] flex flex-col">
                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/35121d4c-a399-4ab9-5c1f-8c5555a7fe00/public"
                                alt="Mission Icon"
                                width={28}
                                height={28}
                                className="mb-6 filter invert"
                            />
                            <h3 className="text-[24px] font-medium text-white mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>Our Mission</h3>
                            <p className="text-[14px] font-normal leading-[140%] text-[#AEAEAE] mb-[60px]">
                                WAE exists to make a meaningful, lasting contribution, protecting the environment and improving the quality of human life without compromising future generations. Our idea of leadership is not defined by scale, but by excellence: in green technologies, consumer value, customer service, and employee capability. We seek to reconcile social progress, professional fulfilment, quality-driven service, and economic development. Long-term value creation must remain balanced, responsible, and sustainable. Growth, for us, is not a number on a chart. It is the outcome of doing right by people, planet, and the communities we are built to serve.
                            </p>

                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c4f0f773-6fa5-4f11-1419-c2f553c40800/public"
                                alt="Vision Icon"
                                width={29}
                                height={28}
                                className="mb-6 filter invert"
                            />
                            <h3 className="text-[24px] font-medium text-white mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>Our Vision</h3>
                            <p className="text-[14px] font-normal leading-[140%] text-[#AEAEAE]">
                                WAE translates values into action through research-driven products and solutions that serve both the environment and human well-being. We operate as a technology-led organisation, guided by knowledge, science, and long-term thinking, not short-term market pressures. Accountability to employees, customers, partners, and societies is not optional. It is how we operate. We hold ourselves to the highest standards across products, services, relationships, and commitments. Profit is a strategic necessity, not the goal. It follows meaningful contribution, shared progress, and participative growth. That distinction shapes every decision we make, from the materials we choose to the partnerships we build.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Our Business Model Section */}
            <section className="w-full bg-[#0F0F0F] px-[9.72%] pt-[120px] pb-[80px]">
                <h2 className="text-[32px] md:text-[40px] font-medium leading-[110%] mb-16 text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Our Business Model
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[60px] relative items-start max-w-[1440px] mx-auto">
                    {/* Column 1 */}
                    <div className="flex flex-col items-start border-l border-[#FFFFFF33] pl-6 md:pl-8 h-full">
                        <h3 className="text-[20px] md:text-[24px] font-medium text-white mb-8 leading-[120%] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                            Single-use plastic is an<br />institutional problem
                        </h3>
                        <div className="text-[14px] font-normal leading-[140%] text-[#AEAEAE] space-y-6">
                            <p>Most organisations have made sustainability commitments, but their water infrastructure contradicts them. Bottled water creates ongoing plastic waste, carbon cost from logistics, and reputational risk.</p>
                            <p>The market has no shortage of hydration products. It has a shortage of credible, scalable alternatives designed for institutional environments, with material integrity and ESG traceability built in.</p>
                            <p>What's missing is not intent—but infrastructure intelligence. Organizations need systems that integrate purification at the point of use, eliminate dependency on external supply chains, and provide measurable impact data across water, carbon, and waste metrics. Without this shift, sustainability remains a reported ambition rather than an operational reality.</p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col items-start border-l border-[#FFFFFF33] pl-6 md:pl-8 h-full">
                        <h3 className="text-[20px] md:text-[24px] font-medium text-white mb-8 leading-[120%] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                            The bottle gets replaced<br />with infrastructure
                        </h3>
                        <div className="text-[14px] font-normal leading-[140%] text-[#AEAEAE] space-y-6">
                            <p>WAE designs and deploys steel-first, point-of-use water systems for public institutions, corporate campuses, hospitality, and healthcare environments. Our systems connect directly to the water supply, eliminating plastic at the source, not the policy level.</p>
                            <div>
                                <p className="mb-2">Key differentiators:</p>
                                <ul className="list-none space-y-2">
                                    <li className="relative pl-4"><span className="absolute left-0 top-0">•</span>Steel-first material philosophy: no plastic contact with water</li>
                                    <li className="relative pl-4"><span className="absolute left-0 top-0">•</span>Designed for institutional scale, not consumer markets</li>
                                    <li className="relative pl-4"><span className="absolute left-0 top-0">•</span>ESG-traceable: aligned with UN SDG 6 (clean water and sanitation) and circular economy principles</li>
                                    <li className="relative pl-4"><span className="absolute left-0 top-0">•</span>End-to-end service model covering installation, maintenance, and impact reporting</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col items-start border-l border-[#FFFFFF33] pl-6 md:pl-8 h-full">
                        <h3 className="text-[20px] md:text-[24px] font-medium text-white mb-8 leading-[120%] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                            How the model works in<br />practice
                        </h3>
                        <div className="text-[14px] font-normal leading-[140%] text-[#AEAEAE] space-y-6">
                            <p>Site assessment: WAE audits the client's existing water usage, plastic footprint, and infrastructure</p>
                            <ol className="list-none space-y-3">
                                <li><span className="font-semibold text-white">1. System design:</span> Custom-configured point-of-use units specified for the environment</li>
                                <li><span className="font-semibold text-white">2. Installation:</span> Steel-first systems installed directly into the water supply, zero plastic in the water path</li>
                                <li><span className="font-semibold text-white">3. Service & reporting:</span> Ongoing maintenance with measurable plastic elimination data for ESG reporting</li>
                                <li><span className="font-semibold text-white">4. Scale:</span> Systems are modular and replicable across sites, campuses, and geographies</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video 2 */}
            <section className="w-full">
                <video
                    src="/Production_Video.mp4"
                    className="w-full h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    Your browser does not support the video tag.
                </video>
            </section>

            {/* 4. Black Banner Context Section */}
            <section className="w-full bg-[#0F0F0F] py-[140px] px-[9.72%] flex justify-center">
                <div className="max-w-[900px] text-center">
                    <p className="text-[28px] md:text-[36px] font-normal leading-[120%] mb-0 text-[#FFFFFF99]">
                        WAE was built as an activist <span className="font-medium text-white">organisation</span>, not a product company. That origin shapes everything: material choices, partnerships, pricing philosophy, and where we deploy.
                        <br /><br />
                        It is not <span className="font-medium text-white">positioning</span>.<br />
                        It is <span className="font-medium text-white">structure</span>.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <TimelineSection />

            {/* 5. Team Section */}
            <section className="w-full bg-[#0F0F0F] px-[9.72%] py-[120px]">
                <h2 className="text-[40px] md:text-[48px] font-medium leading-[110%] mb-16 text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                    The team behind WAE
                </h2>

                {/* Founder Block */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-24 items-start max-w-[1440px] mx-auto">
                    {/* Image */}
                    <div className="shrink-0 mr-0 md:mr-[5.972%] mb-8 md:mb-0">
                        <div className="relative h-[426px] w-[350px] md:w-[480px]">
                            <Image
                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/33375025-0570-4253-56a7-580216923b00/public"
                                alt="A. Vikram Joshe"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    {/* Text */}
                    <div className="w-full md:w-[55%] flex flex-col justify-start">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-[28px] md:text-[40px] font-medium text-white">A. Vikram Joshe</h3>
                                <p className="text-[20px] font-medium text-white mt-1">Founder & CEO</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/avikramjoshie/" />
                        </div>
                        <div className="h-[60px]"></div>
                        <div>
                            <blockquote className="text-[24px] md:text-[32px] font-normal text-white leading-[120%] mb-8 tracking-tight">
                                "Water is one of the world's most visible expressions of care, and the future of care must include care for the planet."
                            </blockquote>
                            <p className="text-[14px] font-normal leading-[140%] text-[#AEAEAE]">
                                A sustainability entrepreneur with three decades of cross-sector experience, building a water-secure future by making sustainable water technologies accessible and mainstream through responsible, long-term solutions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 gap-y-16 max-w-[1440px] mx-auto">
                    {/* Deepak Panwar */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/5] w-full mb-6">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6bc35551-9c5a-4161-328f-da4114280600/public" alt="Deepak Panwar" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[24px] font-medium text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Deepak Panwar</h4>
                                <p className="text-[12px] font-medium text-[#AEAEAE] mt-1">CEO - Food & Beverage Division</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/deepak-panwar-a546561aa/" />
                        </div>
                        <p className="text-[12px] font-normal leading-[150%] text-[#AEAEAE]">
                            Leads WAE's Food & Beverage division, bringing senior leadership experience to drive strategic growth and expand the organisation's commercial footprint across food and hospitality sectors.
                        </p>
                    </div>

                    {/* Nayna Swati Dewesar */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/5] w-full mb-6">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4cedda8e-3f37-422a-920c-7c8241256400/public" alt="Nayna Swati Dewesar" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[24px] font-medium text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Nayna Swati Dewesar</h4>
                                <p className="text-[12px] font-medium text-[#AEAEAE] mt-1">Corporate Finance & Commercial</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/nayna-swati-dewesar-62414a35/" />
                        </div>
                        <p className="text-[12px] font-normal leading-[150%] text-[#AEAEAE]">
                            A founding member of WAE, she leads corporate finance, procurement, and commercial projects, strengthening financial discipline, operational efficiency, and strategic execution across the wider organisation.
                        </p>
                    </div>

                    {/* Satinder Kaur */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/5] w-full mb-6">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b50e712a-a5aa-4ce7-31ae-9d624ef5f100/public" alt="Satinder Kaur" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[24px] font-medium text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Satinder Kaur</h4>
                                <p className="text-[12px] font-medium text-[#AEAEAE] mt-1">Chief Revenue Officer</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/ksatinder/" />
                        </div>
                        <p className="text-[12px] font-normal leading-[150%] text-[#AEAEAE]">
                            Leads WAE's revenue strategy and overall commercial growth, overseeing sales operations, key account management, and strategic partnership development to drive consistent, scalable, long-term institutional revenue.
                        </p>
                    </div>

                    {/* Avnesh Sharma */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/5] w-full mb-6">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/469bb1e6-1c45-4f16-f7ea-6532aa9f5300/public" alt="Avnesh Sharma" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[24px] font-medium text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Avnesh Sharma</h4>
                                <p className="text-[12px] font-medium text-[#AEAEAE] mt-1">Director - Customer Value Management</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/avneshsharma/" />
                        </div>
                        <p className="text-[12px] font-normal leading-[150%] text-[#AEAEAE]">
                            Drives customer value delivery and long-term retention across WAE's institutional client base, managing relationships and ensuring clients achieve measurable outcomes from their water infrastructure investments.
                        </p>
                    </div>

                    {/* Meenakshi Bora */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/5] w-full mb-6">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4f88d5da-23ab-4e62-c172-f2d9b8581900/public" alt="Meenakshi Bora" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[24px] font-medium text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Meenakshi Bora</h4>
                                <p className="text-[12px] font-medium text-[#AEAEAE] mt-1">VP - Client Relations & Operations</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/meenakshi-bora-005909aa/?skipRedirect=true" />
                        </div>
                        <p className="text-[12px] font-normal leading-[150%] text-[#AEAEAE]">
                            Aligns client relations and operations at WAE, enabling efficient, responsive service delivery and consistent client satisfaction through strong coordination, cross-functional execution, and operational excellence throughout.
                        </p>
                    </div>

                    {/* Rashmi Bhatia */}
                    <div className="flex flex-col">
                        <div className="relative aspect-[4/5] w-full mb-6">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/00e1155b-84f2-4db0-591e-6a99630fdf00/public" alt="Rashmi Bhatia" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-[24px] font-medium text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Rashmi Bhatia</h4>
                                <p className="text-[12px] font-medium text-[#AEAEAE] mt-1">Director - Finance & Accounts</p>
                            </div>
                            <LinkedInButton href="https://www.linkedin.com/in/rashmi-bhatia-6987695a/" />
                        </div>
                        <p className="text-[12px] font-normal leading-[150%] text-[#AEAEAE]">
                            Brings over 14 years in corporate finance. Leads WAE's finance and accounts function, ensuring financial governance, accuracy, compliance, and sustainable fiscal management across the organisation.
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. Serving with Purpose Section */}
            <section className="w-full bg-[#0F0F0F] px-[9.72%] py-[120px]">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 max-w-[1440px] mx-auto w-full">
                    {/* Left Column */}
                    <div className="w-full md:w-[45%] flex flex-col">
                        <h2 className="text-[40px] font-medium leading-[110%] text-white tracking-tight mb-[40px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                            Serving with Purpose
                        </h2>
                        <div className="relative aspect-[16/9] w-[80%] mb-6 overflow-hidden">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/09994f88-82ea-4103-7333-6c7f1bb6ab00/public" alt="Serving with Purpose Truck" fill className="object-cover" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-[45%] flex flex-col items-start lg:pr-12">
                        <p className="text-[14px] font-normal leading-[150%] text-[#AEAEAE] mb-8">
                            All CSR activities undertaken through the WAE Foundation follow structured processes and are supported by proper documentation. Each initiative is planned, executed, and recorded with clear accountability. Transparency and traceability are central to how we operate, ensuring that every contribution is meaningful, measurable, and aligned with responsible long-term growth.
                        </p>
                        <DarkSectionButton href="/the-foundation" />
                    </div>
                </div>
            </section>

            {/* 7. Awards & Recognition Section */}
            <section className="w-full bg-[#0F0F0F] px-[9.72%] py-[120px]">
                <h2 className="text-[40px] md:text-[48px] font-medium leading-[110%] mb-16 text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Awards & Recognition
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] items-start max-w-[1440px] mx-auto">
                    <div className="flex flex-col">
                        <div className="relative aspect-[3/4] w-full">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5d38e4f6-adbf-48f6-66b3-cb2dcfff2700/public" alt="Awards Certificate" fill className="object-contain" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="relative aspect-[3/4] w-full">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5d38e4f6-adbf-48f6-66b3-cb2dcfff2700/public" alt="Awards Certificate" fill className="object-contain" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="relative aspect-[3/4] w-full">
                            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5d38e4f6-adbf-48f6-66b3-cb2dcfff2700/public" alt="Awards Certificate" fill className="object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Join Our Team Section */}
            <section className="w-full bg-[#0F0F0F] px-[9.72%] py-[120px]">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 max-w-[1440px] mx-auto w-full">
                    {/* Left Column */}
                    <div className="w-full md:w-[45%] flex items-start">
                        <h2 className="text-[40px] font-medium leading-[110%] text-white tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                            Join Our Team
                        </h2>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-[45%] flex flex-col items-start lg:pr-12">
                        <p className="text-[14px] font-normal leading-[150%] text-[#AEAEAE]">
                            Ready for what's next? We're proud to support our employees with opportunities to grow and thrive. We're looking for talented people like you from all across the globe.
                        </p>
                        <DarkSectionButton href="/careers" />
                    </div>
                </div>
            </section>

            {/* FOOTER SECTION */}
            <div style={{ position: "relative", zIndex: 10 }}>
                <Footer />
            </div>
            
            {/* Global Styles */}
            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #0F0F0F;
                }
            `}</style>
        </main>
    );
}