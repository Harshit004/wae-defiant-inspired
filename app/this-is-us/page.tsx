"use client"

import type { FC } from "react"
import { useState } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Rocket, Lightbulb, Droplets, Settings, GlassWater } from "lucide-react"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

const DarkSectionButton = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="transition-all duration-500 ease inline-flex items-center justify-center p-0 mt-8"
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
            {children}
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

const LinkedInButton = ({ href }: { href: string }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative inline-block w-[24px] h-[24px] opacity-70 hover:opacity-100 transition-opacity">
            <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/042c1bc2-c4d9-4047-a3a8-d4ccf1a59900/public"
                alt="LinkedIn" width={24} height={24}
                className="absolute top-0 left-0 transition-opacity duration-300 filter invert"
            />
        </a>
    );
};

const ThisIsUs: FC = () => {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/30 selection:text-white">
            <Header />

            {/* HERO SECTION */}
            <section className="w-full pt-[200px] pb-[80px]">
                <div className={containerClass}>
                    <p className="text-[#AEAEAE] uppercase text-sm mb-4 tracking-wide font-['Inter_Tight'] font-medium">WAE</p>
                    <h1 className="text-[4vw] leading-[1.05] font-['Inter_Tight'] mb-12 max-w-[80%] font-normal">
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
            <section className="w-full pb-[100px]">
                <div className={containerClass}>
                    <div className="flex border-t border-white/20 pt-[60px]">
                        <div className="w-1/2 pr-12 border-r border-white/20">
                            <h2 className="text-[44px] leading-[1.1] font-['Inter_Tight'] max-w-[90%]">
                                Supporting SDG 6 through carbon-neutral water infrastructure solutions.
                            </h2>
                            <DarkSectionButton href="/sustainability">Know More</DarkSectionButton>
                        </div>
                        <div className="w-1/2 pl-12 flex flex-col">
                            {/* Mission */}
                            <div className="pb-10 border-b border-white/20">
                                <div className="flex items-center gap-4 mb-6">
                                    <Rocket className="w-6 h-6 text-white/70" />
                                    <h3 className="text-2xl font-['Inter_Tight'] font-normal">Mission</h3>
                                </div>
                                <p className="text-[13px] leading-[1.6] text-white/80 font-['Inter_Tight'] mb-4">
                                    WAE exists to make a meaningful, lasting contribution, protecting the environment and improving the quality of human life without compromising future generations. Our idea of leadership is not defined by scale, but by excellence in green technologies, consumer value, customer service, and employee capability.
                                </p>
                                <p className="text-[13px] leading-[1.6] text-white/80 font-['Inter_Tight']">
                                    We seek to reconcile social progress, professional fulfilment, quality-driven service, and economic development. Long-term value creation must remain balanced, responsible, and sustainable. Growth, for us, is not a number on a chart. It is the outcome of doing right by people, planet, and the communities we are built to serve.
                                </p>
                            </div>
                            {/* Vision */}
                            <div className="pt-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <Lightbulb className="w-6 h-6 text-white/70" />
                                    <h3 className="text-2xl font-['Inter_Tight'] font-normal">Vision</h3>
                                </div>
                                <p className="text-[13px] leading-[1.6] text-white/80 font-['Inter_Tight'] mb-4">
                                    WAE translates values into action through research-driven products and solutions that serve both the environment and human well-being. We operate as a technology-led organisation, guided by knowledge, science, and long-term thinking, not short-term market pressures. Accountability to employees, customers, partners, and societies is not optional.
                                </p>
                                <p className="text-[13px] leading-[1.6] text-white/80 font-['Inter_Tight']">
                                    It is how we operate. We hold ourselves to the highest standards across products, services, relationships, and commitments. Profit is a strategic necessity, not the goal. It follows meaningful contribution, shared progress, and participative growth. That distinction shapes every decision we make, from the materials we choose to the partnerships we build.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR BUSINESS MODEL */}
            <section className="w-full py-[100px] border-t border-white/20">
                <div className={containerClass}>
                    <h2 className="text-3xl font-['Inter_Tight'] font-normal mb-16">Our Business Model</h2>
                    
                    <div className="flex">
                        <div className="w-1/3 pr-10 border-r border-white/20">
                            <div className="mb-6"><GlassWater className="w-10 h-10 stroke-1" /></div>
                            <h3 className="text-xl font-['Inter_Tight'] mb-6 w-3/4">Single-use plastic is an institutional problem</h3>
                            <p className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight'] mb-4">
                                Most organisations have made sustainability commitments, but their water infrastructure contradicts them. Bottled water creates ongoing plastic waste, carbon cost from logistics, and reputational risk.
                            </p>
                            <p className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight'] mb-4">
                                The market has no shortage of hydration products. It has a shortage of credible, scalable alternatives designed for institutional environments, with material integrity and ESG traceability built in.
                            </p>
                            <p className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight']">
                                What's missing is not intent—but infrastructure intelligence. Organizations need systems that integrate purification at the point of use, eliminate dependency on external supply chains, and provide measurable impact data across water, carbon, and waste metrics. Without this shift, sustainability remains a reported ambition rather than an operational reality.
                            </p>
                        </div>
                        <div className="w-1/3 px-10 border-r border-white/20">
                            <div className="mb-6"><Droplets className="w-10 h-10 stroke-1" /></div>
                            <h3 className="text-xl font-['Inter_Tight'] mb-6 w-3/4">The bottled gets replaced with infrastructure</h3>
                            <p className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight'] mb-6">
                                WAE designs and deploys steel-first, point-of-use water systems for public institutions, corporate campuses, hospitality, and healthcare environments. Our systems connect directly to the water supply, eliminating plastic at the source, not the policy level.
                            </p>
                            <p className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight'] mb-4">Key differentiators:</p>
                            <ul className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight'] list-disc pl-4 space-y-2">
                                <li>Steel-first material philosophy: no plastic contact with water.</li>
                                <li>Designed for institutional scale, not consumer markets.</li>
                                <li>ESG-traceable: aligned with UN SDG-6 (clean water and sanitation) and circular economy principles.</li>
                                <li>End-to-end service model covering installation, maintenance, and impact reporting.</li>
                            </ul>
                        </div>
                        <div className="w-1/3 pl-10">
                            <div className="mb-6"><Settings className="w-10 h-10 stroke-1" /></div>
                            <h3 className="text-xl font-['Inter_Tight'] mb-6 w-3/4">How the model works in practice</h3>
                            <p className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight'] mb-6">
                                Site assessment: WAE audits the client's existing water usage, plastic footprint, and infrastructure.
                            </p>
                            <ul className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight'] space-y-4 mb-6">
                                <li><strong>1. System design:</strong> Custom-configured point-of-use units specified for the environment.</li>
                                <li><strong>2. Installation:</strong> Steel-first systems installed directly into the water supply, zero plastic in the water path.</li>
                                <li><strong>3. Service & reporting:</strong> Ongoing maintenance with measurable plastic elimination data for ESG reporting.</li>
                                <li><strong>4. Scale:</strong> Systems are modular and replicable across sites, campuses, and geographies.</li>
                            </ul>
                            <p className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight']">
                                From assessment to scale, WAE delivers a seamless transition to sustainable hydration infrastructure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACTIVIST QUOTE */}
            <section className="w-full pb-[120px]">
                <div className={containerClass}>
                    <div className="w-full h-[600px] relative mb-16">
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
                    <div className="flex flex-col items-end max-w-[90%] ml-auto">
                        <p className="text-[32px] leading-[1.2] font-['Inter_Tight'] font-normal text-right text-white/60 mb-8">
                            "WAE was built as an activist <span className="text-white">organisation</span>, not a product company. That origin shapes everything: material choices, partnerships, pricing philosophy, and where we deploy.
                        </p>
                        <p className="text-[28px] leading-[1.2] font-['Inter_Tight'] font-normal text-right text-white/60">
                            It is not <span className="text-white">positioning</span>.<br/>It is <span className="text-white">structure</span>."
                        </p>
                    </div>
                </div>
            </section>

            {/* THE TEAM */}
            <section className="w-full py-[100px] border-t border-white/20">
                <div className={containerClass}>
                    <div className="flex">
                        <div className="w-1/4 pr-10 border-r border-white/20 relative">
                            <div className="sticky top-40">
                                <h2 className="text-[32px] leading-[1.1] font-['Inter_Tight'] mb-6">The team<br/>behind WAE</h2>
                                <DarkSectionButton href="/careers">Join Team</DarkSectionButton>
                            </div>
                        </div>
                        <div className="w-3/4 pl-12 flex flex-col gap-12">
                            {/* Founder CEO */}
                            <div className="flex flex-col w-full pb-12 border-b border-white/20">
                                <div className="w-full h-[600px] relative mb-8">
                                    <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/33375025-0570-4253-56a7-580216923b00/public" alt="A. Vikram Joshe" fill className="object-cover" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-['Inter_Tight'] mb-1">A. Vikram Joshe</h3>
                                        <p className="text-[11px] text-white/60 uppercase tracking-widest font-['Inter_Tight'] mb-8">Founder & CEO</p>
                                        <p className="text-[15px] leading-[1.4] max-w-[80%] font-['Inter_Tight'] mb-6">"Water is one of the world's most visible expressions of care, and the future of care must include care for the planet."</p>
                                        <p className="text-[12px] leading-[1.6] text-white/70 max-w-[80%] font-['Inter_Tight']">A sustainability entrepreneur with three decades of cross-sector experience, building a water-secure future by making sustainable water technologies accessible and mainstream through responsible, long-term solutions.</p>
                                    </div>
                                    <LinkedInButton href="#" />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex gap-10 pb-12 border-b border-white/20">
                                <div className="w-1/2 flex flex-col">
                                    <div className="w-full aspect-[4/3] relative mb-6">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6bc35551-9c5a-4161-328f-da4114280600/public" alt="Deepak Panwar" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-['Inter_Tight'] mb-1">Deepak Panwar</h3>
                                            <p className="text-[10px] text-white/60 uppercase tracking-widest font-['Inter_Tight'] mb-4">CEO - Food & Beverage Division</p>
                                            <p className="text-[11px] leading-[1.6] text-white/70 font-['Inter_Tight'] pr-4">Leads WAE's Food & Beverage division, bringing senior leadership experience to drive strategic growth and expand the organisation's commercial footprint across food and hospitality sectors.</p>
                                        </div>
                                        <LinkedInButton href="#" />
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    <div className="w-full aspect-[4/3] relative mb-6">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4cedda8e-3f37-422a-920c-7c8241256400/public" alt="Nayna Swati Dewesar" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-['Inter_Tight'] mb-1">Nayna Swati Dewesar</h3>
                                            <p className="text-[10px] text-white/60 uppercase tracking-widest font-['Inter_Tight'] mb-4">Corporate Finance & Commercial</p>
                                            <p className="text-[11px] leading-[1.6] text-white/70 font-['Inter_Tight'] pr-4">A founding member of WAE, she leads corporate finance, procurement, and commercial projects, strengthening financial discipline, operational efficiency, and strategic execution across the wider organisation.</p>
                                        </div>
                                        <LinkedInButton href="#" />
                                    </div>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="flex gap-10 pb-12 border-b border-white/20">
                                <div className="w-1/2 flex flex-col">
                                    <div className="w-full aspect-[4/3] relative mb-6">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b50e712a-a5aa-4ce7-31ae-9d624ef5f100/public" alt="Satinder Kaur" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-['Inter_Tight'] mb-1">Satinder Kaur</h3>
                                            <p className="text-[10px] text-white/60 uppercase tracking-widest font-['Inter_Tight'] mb-4">Chief Revenue Officer</p>
                                            <p className="text-[11px] leading-[1.6] text-white/70 font-['Inter_Tight'] pr-4">Leads WAE's revenue strategy and overall commercial growth, overseeing sales operations, key account management, and strategic partnership development to drive consistent, scalable, long-term institutional revenue.</p>
                                        </div>
                                        <LinkedInButton href="#" />
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    <div className="w-full aspect-[4/3] relative mb-6">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/469bb1e6-1c45-4f16-f7ea-6532aa9f5300/public" alt="Avnesh Sharma" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-['Inter_Tight'] mb-1">Avnesh Sharma</h3>
                                            <p className="text-[10px] text-white/60 uppercase tracking-widest font-['Inter_Tight'] mb-4">Director - Customer Value Management</p>
                                            <p className="text-[11px] leading-[1.6] text-white/70 font-['Inter_Tight'] pr-4">Drives customer value delivery and long-term retention across WAE's institutional client base, managing relationships and ensuring clients achieve measurable outcomes from their water infrastructure investments.</p>
                                        </div>
                                        <LinkedInButton href="#" />
                                    </div>
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="flex gap-10">
                                <div className="w-1/2 flex flex-col">
                                    <div className="w-full aspect-[4/3] relative mb-6">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4f88d5da-23ab-4e62-c172-f2d9b8581900/public" alt="Meenakshi Bora" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-['Inter_Tight'] mb-1">Meenakshi Bora</h3>
                                            <p className="text-[10px] text-white/60 uppercase tracking-widest font-['Inter_Tight'] mb-4">VP - Client Relations & Operations</p>
                                            <p className="text-[11px] leading-[1.6] text-white/70 font-['Inter_Tight'] pr-4">Aligns client relations and operations at WAE, enabling efficient, responsive service delivery and consistent client satisfaction through strong coordination, cross-functional execution, and operational excellence throughout.</p>
                                        </div>
                                        <LinkedInButton href="#" />
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    <div className="w-full aspect-[4/3] relative mb-6">
                                        <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/00e1155b-84f2-4db0-591e-6a99630fdf00/public" alt="Rashmi Bhatia" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-['Inter_Tight'] mb-1">Rashmi Bhatia</h3>
                                            <p className="text-[10px] text-white/60 uppercase tracking-widest font-['Inter_Tight'] mb-4">Director - Finance & Accounts</p>
                                            <p className="text-[11px] leading-[1.6] text-white/70 font-['Inter_Tight'] pr-4">Brings over 14 years in corporate finance. Leads WAE's finance and accounts function, ensuring financial governance, accuracy, compliance, and sustainable fiscal management across the organisation.</p>
                                        </div>
                                        <LinkedInButton href="#" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVING WITH PURPOSE */}
            <section className="w-full py-[100px] border-t border-white/20">
                <div className={containerClass}>
                    <div className="flex justify-between">
                        <div className="w-1/3">
                            <h2 className="text-3xl font-['Inter_Tight'] font-normal mb-10">Serving<br/>with Purpose</h2>
                            <p className="text-[12px] leading-[1.6] text-white/70 font-['Inter_Tight'] mb-10 pr-6">
                                All CSR activities undertaken through the WAE Foundation follow structured processes and are supported by proper documentation. Each initiative is planned, executed, and recorded with clear accountability. Transparency and traceability are central to how we operate, ensuring that every contribution is meaningful, measurable, and aligned with responsible long-term growth.
                            </p>
                            <DarkSectionButton href="/sustainability">Know More</DarkSectionButton>
                        </div>
                        <div className="w-7/12">
                            <div className="w-full aspect-[16/10] relative">
                                <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/09994f88-82ea-4103-7333-6c7f1bb6ab00/public" alt="Serving with Purpose" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AWARDS & RECOGNITION */}
            <section className="w-full py-[100px] border-t border-white/20">
                <div className={containerClass}>
                    <h2 className="text-3xl font-['Inter_Tight'] font-normal mb-12">Awards & Recognition</h2>
                    <div className="grid grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex flex-col pr-8">
                                <div className="w-full aspect-square relative mb-6">
                                    <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5d38e4f6-adbf-48f6-66b3-cb2dcfff2700/public" alt="Awards Certificate" fill className="object-contain" />
                                </div>
                                <p className="text-[14px] leading-[1.5] font-['Inter_Tight'] text-white/80 pr-4">
                                    The competition has never been fiercer. ET MSME Awards 2025 nominee!
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