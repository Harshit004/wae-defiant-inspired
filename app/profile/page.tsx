"use client"

import type { FC } from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Rocket, Lightbulb, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

// Shared container class for consistent margins and max-width: 24px on mobile, 7.5vw on desktop
const containerClass = "mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-[7.5vw]"

const DarkSectionButton = ({
    href,
    children,
    className = ""
}: {
    href: string
    children: React.ReactNode
    className?: string
}) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`transition-all duration-500 ease inline-flex items-center justify-center border border-white no-underline cursor-pointer ${className}`}
            style={{
                padding: '8px 16px',
                pointerEvents: "auto",
                gap: "6px",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontSize: "10px",
                lineHeight: "100%",
                backgroundColor: hovered ? "#fff" : "transparent",
                color: hovered ? "#000" : "#fff",
            }}
        >
            {children}
            <div className="relative inline-block w-[12px] h-[12px] ml-1 shrink-0">
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
                    style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.5s', filter: 'invert(1)' }}
                />
            </div>
        </a>
    );
};

const LinkedInButton = ({ href, className = "" }: { href: string; className?: string }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative inline-flex items-center justify-center w-[22px] h-[22px] md:w-[32px] md:h-[32px] opacity-70 hover:opacity-100 transition-opacity shrink-0 ${className}`}
        >
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/042c1bc2-c4d9-4047-a3a8-d4ccf1a59900/public"
                alt="LinkedIn"
                width={32}
                height={32}
                className="w-full h-full object-contain filter invert"
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
        <section className="w-full pt-[48px] md:pt-[92px] pb-0">
            <div className={containerClass}>
                <div className="w-full border-t border-white/20 mb-[36px] md:mb-[92px]"></div>
                <h2 className="font-['Manrope'] font-normal text-[26px] sm:text-[32px] md:text-[40px] leading-[110%] mb-[8px] md:mb-[20px]">
                    WAE Chronicle
                </h2>
                <p className="font-['Manrope'] font-normal text-[13px] md:text-[16px] leading-[110%] text-[#AEAEAE] mb-[36px] md:mb-[86px]">
                    From Intent to Impact
                </p>

                {/* Timeline Scrubber */}
                <div className="w-full relative mb-[36px] md:mb-[120px] px-1 md:px-0">
                    <div className="w-full h-[1px] bg-white/20 relative">
                        <div
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
                            style={{ width: `${(activeIndex / (timelineData.length - 1)) * 100}%` }}
                        ></div>
                        {timelineData.map((item, i) => {
                            const isActive = i <= activeIndex;
                            const isCurrent = i === activeIndex;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveIndex(i)}
                                    className="absolute top-1/2 flex flex-col items-center cursor-pointer p-0 bg-transparent border-0 outline-none"
                                    style={{ left: `${(i / (timelineData.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                                >
                                    <div className={`w-[7px] h-[7px] md:w-[8px] md:h-[8px] rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-[#AEAEAE99]'}`}></div>
                                    <span className={`absolute top-[14px] md:top-[20px] text-[10px] md:text-[12px] font-['Manrope'] whitespace-nowrap transition-colors duration-300 ${isCurrent ? 'text-white font-medium' : 'text-[#AEAEAE99]'}`}>
                                        {item.yearLabel}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-[4vw] items-start">
                    <div className="w-full md:w-[60%] relative aspect-[16/9]">
                        <Image src={activeData.image} alt={activeData.title} fill className="object-cover transition-opacity duration-500" />
                    </div>
                    <div className="w-full md:w-[40%] flex flex-col justify-between h-auto min-h-0 md:min-h-[300px]">
                        <div>
                            <h3 className="font-['Manrope'] font-normal text-[22px] md:text-[40px] leading-[110%] mb-[16px] md:mb-[24px]">
                                {activeData.title}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {activeData.items.map((text, idx) => (
                                    <p key={idx} className="font-['Manrope'] font-normal text-[13px] md:text-[14px] leading-[140%] md:leading-[130%] text-[#AEAEAE] flex gap-2">
                                        <span>•</span>
                                        <span>{text}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 md:gap-4 mt-6 md:mt-12 justify-end">
                            <button
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                aria-label="Previous timeline item"
                                className="w-9 h-9 md:w-10 md:h-10 border border-white/20 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white/70" strokeWidth={1.5} />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={activeIndex === timelineData.length - 1}
                                aria-label="Next timeline item"
                                className="w-9 h-9 md:w-10 md:h-10 border border-white/20 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                            >
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/70" strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const businessModelsData = [
    {
        icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4b160f1a-eedc-4e04-0a1f-58eee7f8ab00/public",
        title: "Single-use plastic is an institutional problem",
        titleDesktop: <>Single-use plastic is an<br />institutional problem</>,
        content: (
            <div className="font-['Manrope'] font-normal text-[13px] md:text-[12px] leading-[150%] text-[#AEAEAE]">
                <p className="mb-4 md:mb-6">
                    Most organisations have made sustainability commitments, but their water infrastructure contradicts them. Bottled water creates ongoing plastic waste, carbon cost from logistics, and reputational risk.
                </p>
                <p className="mb-4 md:mb-6">
                    The market has no shortage of hydration products. It has a shortage of credible, scalable alternatives designed for institutional environments, with material integrity and ESG traceability built in.
                </p>
                <p>
                    What's missing is not intent—but infrastructure intelligence. Organizations need systems that integrate purification at the point of use, eliminate dependency on external supply chains, and provide measurable impact data across water, carbon, and waste metrics. Without this shift, sustainability remains a reported ambition rather than an operational reality.
                </p>
            </div>
        )
    },
    {
        icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b5de6636-9ffb-43dd-adab-dae732151200/public",
        title: "The bottled gets replaced with infrastructure",
        titleDesktop: <>The bottled gets replaced with<br />infrastructure</>,
        content: (
            <div className="font-['Manrope'] font-normal text-[13px] md:text-[12px] leading-[150%] text-[#AEAEAE]">
                <p className="mb-4 md:mb-6">
                    WAE designs and deploys steel-first, point-of-use water systems for public institutions, corporate campuses, hospitality, and healthcare environments. Our systems connect directly to the water supply, eliminating plastic at the source, not the policy level.
                </p>
                <p className="mb-3 md:mb-4 text-white font-medium">Key differentiators:</p>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Steel-first material philosophy: no plastic contact with water</li>
                    <li>Designed for institutional scale, not consumer markets</li>
                    <li>ESG-traceable: aligned with UN SDG 6 (clean water and sanitation) and circular economy principles</li>
                    <li>End-to-end service model covering installation, maintenance, and impact reporting</li>
                </ul>
            </div>
        )
    },
    {
        icon: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/38c6f634-25c1-46cf-4e3f-703d0c08de00/public",
        title: "How the model works in practice",
        titleDesktop: <>How the model works in<br />practice</>,
        content: (
            <div className="font-['Manrope'] font-normal text-[13px] md:text-[12px] leading-[150%] text-[#AEAEAE]">
                <p className="mb-4 md:mb-6">
                    Site assessment: WAE audits the client's existing water usage, plastic footprint, and infrastructure
                </p>
                <ul className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <li><strong className="text-white font-medium">1. System design:</strong> Custom-configured point-of-use units specified for the environment</li>
                    <li><strong className="text-white font-medium">2. Installation:</strong> Steel-first systems installed directly into the water supply, zero plastic in the water path</li>
                    <li><strong className="text-white font-medium">3. Service & reporting:</strong> Ongoing maintenance with measurable plastic elimination data for ESG reporting</li>
                    <li><strong className="text-white font-medium">4. Scale:</strong> Systems are modular and replicable across sites, campuses, and geographies</li>
                </ul>
                <p>
                    From assessment to scale, WAE delivers a seamless transition to sustainable hydration infrastructure.
                </p>
            </div>
        )
    }
];

const BusinessModelSection = () => {
    // Mobile accordion state: null or index of open accordion (item 0 can be toggled)
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="w-full pt-[48px] md:pt-[92px] pb-0">
            <div className={containerClass}>
                <div className="w-full border-t border-white/20 mb-[36px] md:mb-[92px]"></div>
                <h2 className="font-['Manrope'] font-normal text-[26px] sm:text-[32px] md:text-[40px] leading-[110%] mb-[28px] md:mb-[78px]">
                    Our Business Model
                </h2>

                {/* DESKTOP 3-COLUMN VIEW */}
                <div className="hidden md:flex justify-between gap-[4.23vw]">
                    {businessModelsData.map((model, idx) => (
                        <div key={idx} className="w-[25.55vw] pl-[3vw] border-l border-white/20 flex flex-col">
                            <div className="mb-[32px]">
                                <img src={model.icon} className="w-[57px] h-[57px] object-contain" alt="Icon" />
                            </div>
                            <h3 className="font-['Manrope'] font-normal text-[28px] leading-[110%] mb-[24px]">
                                {model.titleDesktop}
                            </h3>
                            {model.content}
                        </div>
                    ))}
                </div>

                {/* MOBILE ACCORDION VIEW */}
                <div className="flex md:hidden flex-col border-t border-white/20">
                    {businessModelsData.map((model, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div key={idx} className="border-b border-white/20 flex flex-col transition-all">
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(idx)}
                                    className="w-full py-5 flex items-center justify-between gap-3 text-left bg-transparent border-0 cursor-pointer outline-none"
                                >
                                    <div className="flex items-center gap-3.5 pr-2">
                                        <img src={model.icon} className="w-[26px] h-[26px] object-contain shrink-0" alt="Icon" />
                                        <span className="font-['Manrope'] font-normal text-[15px] leading-[125%] text-white">
                                            {model.title}
                                        </span>
                                    </div>
                                    <div className="shrink-0 text-white/70">
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                                    </div>
                                </button>
                                {isOpen && (
                                    <div className="pb-6 pl-[39px] pr-2 transition-all">
                                        {model.content}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const awardsData = [
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
];

const AwardsSection = () => {
    const [activeAwardIndex, setActiveAwardIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const totalItems = awardsData.length;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll > 0) {
            const scrollRatio = scrollLeft / maxScroll;
            const index = Math.min(Math.round(scrollRatio * (totalItems - 1)), totalItems - 1);
            setActiveAwardIndex(index);
        }
    };

    const scrollToAward = (index: number) => {
        if (!scrollContainerRef.current) return;
        const totalItems = awardsData.length;
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll > 0) {
            const targetScroll = (index / (totalItems - 1)) * maxScroll;
            scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
            setActiveAwardIndex(index);
        }
    };

    return (
        <section className="w-full pt-[48px] md:pt-[92px] pb-[64px] md:pb-[124px]">
            <div className={containerClass}>
                <div className="w-full border-t border-white/20 mb-[36px] md:mb-[92px]"></div>
                <h2 className="font-['Manrope'] font-normal text-[26px] sm:text-[32px] md:text-[40px] leading-[110%] mb-[28px] md:mb-[78px]">
                    Awards & Recognition
                </h2>

                {/* DESKTOP 3-COL GRID */}
                <div className="hidden md:grid grid-cols-3">
                    {awardsData.map((award, index) => (
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

                {/* MOBILE SCROLL CAROUSEL */}
                <div className="block md:hidden">
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth pb-2 w-full"
                    >
                        {awardsData.map((award, index) => (
                            <div
                                key={index}
                                onClick={() => scrollToAward(index)}
                                className="w-[62vw] max-w-[240px] shrink-0 snap-start flex flex-col cursor-pointer"
                            >
                                <div className="w-full aspect-[340/407] relative mb-3 bg-black/40">
                                    <Image src={award.image} alt={award.title} fill className="object-cover" />
                                </div>
                                <p className="font-['Manrope'] font-normal text-[15px] leading-[125%] text-white">
                                    {award.title}<br />
                                    {award.year}
                                </p>
                            </div>
                        ))}
                        <div className="shrink-0 w-2" />
                    </div>

                    {/* Dots indicator matching screenshot */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {awardsData.map((_, index) => {
                            const isActive = index === activeAwardIndex;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => scrollToAward(index)}
                                    aria-label={`Slide ${index + 1}`}
                                    className={`transition-all duration-300 rounded-full h-[3px] border-0 p-0 cursor-pointer ${isActive ? 'w-6 bg-white' : 'w-2 bg-white/30'}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ThisIsUs: FC = () => {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/30 selection:text-white">
            <Header transparentBg />

            {/* HERO SECTION */}
            <section className="w-full pt-[120px] md:pt-[235px] pb-[40px] md:pb-[68px]">
                <div className={containerClass}>
                    <p className="font-['Manrope'] font-medium text-[13px] md:text-[20px] leading-[110%] text-[#AEAEAE99] mb-3 md:mb-[1em]">
                        WAE
                    </p>
                    <h1 className="font-['Manrope'] font-normal text-[32px] sm:text-[40px] md:text-[60px] leading-[115%] md:leading-[110%] mb-[32px] md:mb-[68px] max-w-full md:max-w-[80%]">
                        Designing the future of plastic-free hydration infrastructure.
                    </h1>

                    <div className="w-full aspect-[16/9] md:aspect-auto md:h-[500px] relative">
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
            <section className="w-full pt-4 md:pt-0">
                <div className={containerClass}>
                    <div className="flex flex-col md:flex-row">
                        {/* Left Col (SDG 6) */}
                        <div className="w-full md:w-[50%] md:pr-[4.65vw] md:border-r border-white/20 flex flex-col items-start justify-start pb-8 md:pb-0">
                            <h2 className="font-['Manrope'] font-normal text-[28px] sm:text-[34px] md:text-[55px] leading-[115%] md:leading-[105%] mb-5 md:mb-[60px] md:max-w-[41.8vw]">
                                Supporting SDG 6 through carbon-neutral water infrastructure solutions.
                            </h2>
                            <div>
                                <DarkSectionButton href="/sustainability" className="mt-2 md:mt-[-28px]">
                                    Know More
                                </DarkSectionButton>
                            </div>
                        </div>

                        {/* Right Col (Mission & Vision) */}
                        <div className="w-full md:w-[50%] md:pl-[3.47vw] flex flex-col pt-6 md:pt-0">
                            {/* Mission */}
                            <div className="pb-[36px] md:pb-[58px] border-b border-white/20">
                                <div className="flex items-start gap-3.5 md:gap-[1.65vw]">
                                    <div className="w-[20px] h-[20px] md:w-[21.44px] md:h-[21.44px] shrink-0 mt-1 md:mt-[6px]">
                                        <Rocket className="w-full h-full text-white/70" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-['Manrope'] font-medium text-[22px] md:text-[32px] leading-[110%] mb-3 md:mb-4">
                                            Mission
                                        </h3>
                                        <p className="font-['Manrope'] font-normal text-[13px] md:text-[14px] leading-[140%] md:leading-[130%] text-[#AEAEAE] mb-3 md:mb-4">
                                            WAE exists to make a meaningful, lasting contribution, protecting the environment and improving the quality of human life without compromising future generations. Our idea of leadership is not defined by scale, but by excellence: in green technologies, consumer value, customer service, and employee capability.
                                        </p>
                                        <p className="font-['Manrope'] font-normal text-[13px] md:text-[14px] leading-[140%] md:leading-[130%] text-[#AEAEAE]">
                                            We seek to reconcile social progress, professional fulfilment, quality-driven service, and economic development. Long-term value creation must remain balanced, responsible, and sustainable. Growth, for us, is not a number on a chart. It is the outcome of doing right by people, planet, and the communities we are built to serve.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Vision */}
                            <div className="pt-[36px] md:pt-[58px]">
                                <div className="flex items-start gap-3.5 md:gap-[1.65vw]">
                                    <div className="w-[20px] h-[20px] md:w-[21.44px] md:h-[21.44px] shrink-0 mt-1 md:mt-[6px]">
                                        <Lightbulb className="w-full h-full text-white/70" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-['Manrope'] font-medium text-[22px] md:text-[32px] leading-[110%] mb-3 md:mb-4">
                                            Vision
                                        </h3>
                                        <p className="font-['Manrope'] font-normal text-[13px] md:text-[14px] leading-[140%] md:leading-[130%] text-[#AEAEAE] mb-3 md:mb-4">
                                            WAE translates values into action through research-driven products and solutions that serve both the environment and human well-being. We operate as a technology-led organisation, guided by knowledge, science, and long-term thinking, not short-term market pressures. Accountability to employees, customers, partners, and societies is not optional.
                                        </p>
                                        <p className="font-['Manrope'] font-normal text-[13px] md:text-[14px] leading-[140%] md:leading-[130%] text-[#AEAEAE]">
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
            <BusinessModelSection />

            {/* ACTIVIST QUOTE */}
            <section className="w-full pt-[48px] md:pt-[92px] pb-0">
                <div className={containerClass}>
                    <div className="w-full border-t border-white/20 mb-[36px] md:mb-[92px]"></div>
                    <div className="w-full aspect-[16/9] md:aspect-[1227/548] relative mb-[28px] md:mb-[62px]">
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
                    <div className="flex flex-col w-full">
                        <p className="font-['Manrope'] font-medium text-[17px] sm:text-[22px] md:text-[40px] leading-[135%] md:leading-[120%] text-left md:text-right text-[#AEAEAE] mb-4 md:mb-8">
                            &ldquo;WAE was built as an activist <span className="text-white font-semibold">organisation</span>, not a product company. That origin shapes everything: material choices, partnerships, pricing philosophy, and where we deploy.
                        </p>
                        <p className="font-['Manrope'] font-medium text-[17px] sm:text-[22px] md:text-[40px] leading-[135%] md:leading-[120%] text-right text-[#AEAEAE]">
                            It is not <span className="text-white font-semibold">positioning</span>.<br />It is <span className="text-white font-semibold">structure</span>.&rdquo;
                        </p>
                    </div>
                </div>
            </section>

            {/* WAE CHRONICLE */}
            <TimelineSection />

            {/* THE TEAM */}
            <section className="w-full pt-[48px] md:pt-[92px] pb-0">
                <div className={containerClass}>
                    <div className="w-full border-t border-white/20 mb-[36px] md:mb-[92px]"></div>
                    
                    {/* Mobile Section Header */}
                    <div className="block md:hidden mb-8">
                        <h2 className="font-['Manrope'] font-normal text-[26px] leading-[110%] mb-4">The team behind WAE</h2>
                        <DarkSectionButton href="/careers">Know More</DarkSectionButton>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        {/* Desktop Sticky Left Bar */}
                        <div className="hidden md:block w-[25%] pr-[5.56vw] border-r border-white/20 relative">
                            <div className="sticky top-40">
                                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '40px', lineHeight: '100%', marginBottom: '60px' }}>
                                    The team<br />behind WAE
                                </h2>
                                <div className="mt-[-28px]">
                                    <DarkSectionButton href="/careers">Know More</DarkSectionButton>
                                </div>
                            </div>
                        </div>

                        {/* Team Content */}
                        <div className="w-full md:w-[75%] md:pl-[5.56vw] flex flex-col gap-6 md:gap-[4.86vw]">
                            {/* Founder CEO */}
                            <div className="flex w-full justify-between items-start md:gap-[3.75vw]">
                                <div className="w-[calc(50%-2.415%)] md:w-[calc(50%-1.875vw)] aspect-square md:aspect-[410/517] relative shrink-0">
                                    <Image
                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/945f5796-0664-44a9-b951-7759f4d39400/public"
                                        alt="A. Vikram Joshe"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-[calc(50%-2.415%)] md:w-full flex flex-col justify-between py-0.5 md:py-1">
                                    <div className="flex flex-col relative w-full">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-['Inter_Tight',sans-serif] font-normal text-[15px] sm:text-[18px] md:text-[2.22vw] leading-[110%]">
                                                    A. Vikram Joshe
                                                </h3>
                                                <p className="font-['Manrope',sans-serif] font-normal text-[11px] sm:text-[12px] md:text-[1.25vw] leading-[110%] text-[#AEAEAE] mt-1 md:mt-[1.38vw]">
                                                    Founder & CEO
                                                </p>
                                            </div>
                                            <div className="shrink-0 ml-2 md:absolute md:right-0 md:top-0">
                                                <LinkedInButton href="https://www.linkedin.com/in/avikramjoshie/" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-2 md:mt-0">
                                        <p className="font-['Inter_Tight',sans-serif] font-normal text-[10.5px] sm:text-[12px] md:text-[1.66vw] leading-[125%] md:leading-[100%] text-white">
                                            &ldquo;Water is one of the world’s most visible expressions of care, and the future of care must include care for the planet.&rdquo;
                                        </p>
                                        <p className="font-['Manrope',sans-serif] font-normal text-[9px] sm:text-[10.5px] md:text-[0.97vw] leading-[130%] text-[#AEAEAE] mt-2 md:mt-[3.125vw]">
                                            A sustainability entrepreneur with three decades of cross-sector experience, building a water-secure future by making sustainable water technologies accessible and mainstream through responsible, long-term solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Team Members: Desktop Rows vs Mobile 2-Col Grid */}
                            <div className="flex flex-wrap justify-between gap-y-6 sm:gap-y-8 md:flex md:flex-col md:gap-[4.86vw]">
                                {/* Row 1 Desktop / Grid Items 1 & 2 */}
                                <div className="contents md:flex md:gap-[3.75vw] md:w-full">
                                    {/* Member 1: Deepak Panwar */}
                                    <div className="w-[calc(50%-2.415%)] md:w-[calc(50%-1.875vw)] flex flex-col">
                                        <div className="w-full aspect-square md:aspect-[410/331] relative mb-2 md:mb-[2.22vw]">
                                            <Image
                                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6bc35551-9c5a-4161-328f-da4114280600/public"
                                                alt="Deepak Panwar"
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col relative w-full">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-['Inter_Tight',sans-serif] font-normal text-[13px] sm:text-[15px] md:text-[1.66vw] leading-[110%]">
                                                    Deepak Panwar
                                                </h3>
                                                <div className="shrink-0 ml-1 md:absolute md:right-0 md:top-0">
                                                    <LinkedInButton href="https://www.linkedin.com/in/deepak-panwar-a546561aa" />
                                                </div>
                                            </div>
                                            <p className="font-['Inter_Tight',sans-serif] font-normal text-[10px] sm:text-[11px] md:text-[1.11vw] leading-[110%] text-[#AEAEAE] md:text-white mt-1 md:mt-[0.83vw] mb-1.5 md:mb-[2.22vw]">
                                                CEO - Food & Beverage Division
                                            </p>
                                            <p className="font-['Manrope',sans-serif] font-normal text-[9px] sm:text-[10px] md:text-[0.97vw] leading-[130%] text-[#AEAEAE]">
                                                Leads WAE's Food & Beverage division, bringing senior leadership experience to drive strategic growth and expand the organisation's commercial footprint across food and hospitality sectors.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Member 2: Nayna Swati Dewesar */}
                                    <div className="w-[calc(50%-2.415%)] md:w-[calc(50%-1.875vw)] flex flex-col">
                                        <div className="w-full aspect-square md:aspect-[410/331] relative mb-2 md:mb-[2.22vw]">
                                            <Image
                                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4cedda8e-3f37-422a-920c-7c8241256400/public"
                                                alt="Nayna Swati Dewesar"
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col relative w-full">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-['Inter_Tight',sans-serif] font-normal text-[13px] sm:text-[15px] md:text-[1.66vw] leading-[110%]">
                                                    Nayna Swati Dewesar
                                                </h3>
                                                <div className="shrink-0 ml-1 md:absolute md:right-0 md:top-0">
                                                    <LinkedInButton href="https://www.linkedin.com/in/nayna-swati-dewesar-62414a35" />
                                                </div>
                                            </div>
                                            <p className="font-['Inter_Tight',sans-serif] font-normal text-[10px] sm:text-[11px] md:text-[1.11vw] leading-[110%] text-[#AEAEAE] md:text-white mt-1 md:mt-[0.83vw] mb-1.5 md:mb-[2.22vw]">
                                                Corporate Finance & Commercial
                                            </p>
                                            <p className="font-['Manrope',sans-serif] font-normal text-[9px] sm:text-[10px] md:text-[0.97vw] leading-[130%] text-[#AEAEAE]">
                                                A founding member of WAE, she leads corporate finance, procurement, and commercial projects, strengthening financial discipline, operational efficiency, and strategic execution across the wider organisation.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 Desktop / Grid Items 3 & 4 */}
                                <div className="contents md:flex md:gap-[3.75vw] md:w-full">
                                    {/* Member 3: Satinder Kaur */}
                                    <div className="w-[calc(50%-2.415%)] md:w-[calc(50%-1.875vw)] flex flex-col">
                                        <div className="w-full aspect-square md:aspect-[410/331] relative mb-2 md:mb-[2.22vw]">
                                            <Image
                                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b50e712a-a5aa-4ce7-31ae-9d624ef5f100/public"
                                                alt="Satinder Kaur"
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col relative w-full">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-['Inter_Tight',sans-serif] font-normal text-[13px] sm:text-[15px] md:text-[1.66vw] leading-[110%]">
                                                    Satinder Kaur
                                                </h3>
                                                <div className="shrink-0 ml-1 md:absolute md:right-0 md:top-0">
                                                    <LinkedInButton href="https://www.linkedin.com/in/ksatinder" />
                                                </div>
                                            </div>
                                            <p className="font-['Inter_Tight',sans-serif] font-normal text-[10px] sm:text-[11px] md:text-[1.11vw] leading-[110%] text-[#AEAEAE] md:text-white mt-1 md:mt-[0.83vw] mb-1.5 md:mb-[2.22vw]">
                                                Chief Revenue Officer
                                            </p>
                                            <p className="font-['Manrope',sans-serif] font-normal text-[9px] sm:text-[10px] md:text-[0.97vw] leading-[130%] text-[#AEAEAE]">
                                                Leads WAE's revenue strategy and overall commercial growth, overseeing sales operations, key account management, and strategic partnership development to drive consistent, scalable, long-term institutional revenue.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Member 4: Avnesh Sharma */}
                                    <div className="w-[calc(50%-2.415%)] md:w-[calc(50%-1.875vw)] flex flex-col">
                                        <div className="w-full aspect-square md:aspect-[410/331] relative mb-2 md:mb-[2.22vw]">
                                            <Image
                                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/469bb1e6-1c45-4f16-f7ea-6532aa9f5300/public"
                                                alt="Avnesh Sharma"
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col relative w-full">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-['Inter_Tight',sans-serif] font-normal text-[13px] sm:text-[15px] md:text-[1.66vw] leading-[110%]">
                                                    Avnesh Sharma
                                                </h3>
                                                <div className="shrink-0 ml-1 md:absolute md:right-0 md:top-0">
                                                    <LinkedInButton href="https://www.linkedin.com/in/avneshsharma" />
                                                </div>
                                            </div>
                                            <p className="font-['Inter_Tight',sans-serif] font-normal text-[10px] sm:text-[11px] md:text-[1.11vw] leading-[110%] text-[#AEAEAE] md:text-white mt-1 md:mt-[0.83vw] mb-1.5 md:mb-[2.22vw]">
                                                Director - Customer Value Management
                                            </p>
                                            <p className="font-['Manrope',sans-serif] font-normal text-[9px] sm:text-[10px] md:text-[0.97vw] leading-[130%] text-[#AEAEAE]">
                                                Drives customer value delivery and long-term retention across WAE's institutional client base, managing relationships and ensuring clients achieve measurable outcomes from their water infrastructure investments.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3 Desktop / Grid Items 5 & 6 */}
                                <div className="contents md:flex md:gap-[3.75vw] md:w-full">
                                    {/* Member 5: Meenakshi Bora */}
                                    <div className="w-[calc(50%-2.415%)] md:w-[calc(50%-1.875vw)] flex flex-col">
                                        <div className="w-full aspect-square md:aspect-[410/331] relative mb-2 md:mb-[2.22vw]">
                                            <Image
                                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4f88d5da-23ab-4e62-c172-f2d9b8581900/public"
                                                alt="Meenakshi Bora"
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col relative w-full">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-['Inter_Tight',sans-serif] font-normal text-[13px] sm:text-[15px] md:text-[1.66vw] leading-[110%]">
                                                    Meenakshi Bora
                                                </h3>
                                                <div className="shrink-0 ml-1 md:absolute md:right-0 md:top-0">
                                                    <LinkedInButton href="https://www.linkedin.com/in/meenakshi-bora-005909aa/" />
                                                </div>
                                            </div>
                                            <p className="font-['Inter_Tight',sans-serif] font-normal text-[10px] sm:text-[11px] md:text-[1.11vw] leading-[110%] text-[#AEAEAE] md:text-white mt-1 md:mt-[0.83vw] mb-1.5 md:mb-[2.22vw]">
                                                VP - Client Relations & Operations
                                            </p>
                                            <p className="font-['Manrope',sans-serif] font-normal text-[9px] sm:text-[10px] md:text-[0.97vw] leading-[130%] text-[#AEAEAE]">
                                                Aligns client relations and operations at WAE, enabling efficient, responsive service delivery and consistent client satisfaction through strong coordination, cross-functional execution, and operational excellence throughout.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Member 6: Rashmi Bhatia */}
                                    <div className="w-[calc(50%-2.415%)] md:w-[calc(50%-1.875vw)] flex flex-col">
                                        <div className="w-full aspect-square md:aspect-[410/331] relative mb-2 md:mb-[2.22vw]">
                                            <Image
                                                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/00e1155b-84f2-4db0-591e-6a99630fdf00/public"
                                                alt="Rashmi Bhatia"
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col relative w-full">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-['Inter_Tight',sans-serif] font-normal text-[13px] sm:text-[15px] md:text-[1.66vw] leading-[110%]">
                                                    Rashmi Bhatia
                                                </h3>
                                                <div className="shrink-0 ml-1 md:absolute md:right-0 md:top-0">
                                                    <LinkedInButton href="https://www.linkedin.com/in/rashmi-bhatia-6987695a/" />
                                                </div>
                                            </div>
                                            <p className="font-['Inter_Tight',sans-serif] font-normal text-[10px] sm:text-[11px] md:text-[1.11vw] leading-[110%] text-[#AEAEAE] md:text-white mt-1 md:mt-[0.83vw] mb-1.5 md:mb-[2.22vw]">
                                                Director - Finance & Accounts
                                            </p>
                                            <p className="font-['Manrope',sans-serif] font-normal text-[9px] sm:text-[10px] md:text-[0.97vw] leading-[130%] text-[#AEAEAE]">
                                                Brings over 14 years in corporate finance. Leads WAE's finance and accounts function, ensuring financial governance, accuracy, compliance, and sustainable fiscal management across the organisation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVING WITH PURPOSE */}
            <section className="w-full pt-[48px] md:pt-[92px] pb-0">
                <div className={containerClass}>
                    <div className="w-full border-t border-white/20 mb-[36px] md:mb-[92px]"></div>
                    <div className="flex flex-col-reverse md:flex-row items-start">
                        <div className="w-full md:w-[42%] md:pr-[4.72vw]">
                            <h2 className="font-['Manrope'] font-normal text-[26px] sm:text-[32px] md:text-[40px] leading-[110%] mb-4 md:mb-[78px]">
                                Serving<span className="hidden md:inline"><br /></span> with Purpose
                            </h2>
                            <p className="font-['Manrope'] font-normal text-[13px] md:text-[14px] leading-[140%] md:leading-[130%] text-[#AEAEAE] mb-6 md:mb-[40px]">
                                All CSR activities undertaken through the WAE Foundation follow structured processes and are supported by proper documentation. Each initiative is planned, executed, and recorded with clear accountability. Transparency and traceability are central to how we operate, ensuring that every contribution is meaningful, measurable, and aligned with responsible long-term growth.
                            </p>
                            <div>
                                <DarkSectionButton href="/sustainability" className="mt-0 md:mt-[-28px]">
                                    Know More
                                </DarkSectionButton>
                            </div>
                        </div>
                        <div className="w-full md:w-[58%] mb-6 md:mb-0">
                            <div className="w-full relative aspect-[16/9] md:aspect-[767/433]">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/09994f88-82ea-4103-7333-6c7f1bb6ab00/public"
                                    alt="Serving with Purpose"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AWARDS & RECOGNITION */}
            <AwardsSection />

            <Footer />
        </main>
    );
};

export default ThisIsUs;