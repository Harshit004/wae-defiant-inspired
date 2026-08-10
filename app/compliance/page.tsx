"use client"

import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CompliancePage() {
    const pathname = usePathname()

    // Helper to chunk array into rows
    const chunkArray = (arr: any[], size: number) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const compliances = [
        {
            title: "ZED GOLD – MSME (Zero Defect Zero Effect)",
            description: "WAE holds the prestigious ZED GOLD certification, signifying zero defect manufacturing, minimum environmental impact conscious production processes. This compliance reflects our commitment to resource efficiency, sustainable manufacturing, and high-quality output, making our standard safe for ecological responsibilities.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f72be33-0072-4771-16f2-1568c1bae700/public"
        },
        {
            title: "CE Certification",
            description: "The CE marking ensures WAE products comply with essential European health, safety and environmental protection standards. This certification demonstrates that our systems are rigorously tested for safety, performance, and reliability, meeting strict EU compliance norms.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/af34d413-57eb-40f9-1c3b-a06d1c557800/public"
        },
        {
            title: "GRIHA – Certified Green Products",
            description: "WAE products are recognised under GRIHA (Green Product Rating), validating our environmental performance, energy efficiency, and reduced resource consumption. This assures customers that our solutions contribute to sustainable building practices and national green goals.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f4782005-d0c3-4b85-9b95-7d774c93e500/public"
        },
        {
            title: "ISO 9001:2015 – Quality Management System",
            description: "WAE follows a robust Quality Management System ensuring consistent delivery of superior products and services. Our adherence to ISO 9001:2015 guarantees systematic processes, continuous improvement, and the highest level of customer satisfaction in every solution we provide.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/89c52456-58ba-412d-1a07-d94220acde00/public"
        },
        {
            title: "ISO 45001:2018 – Occupational Health & Safety",
            description: "We prioritise a safe and healthy work environment. By complying with ISO 45001:2018, WAE proactively manages workplace risks, prevents occupational injuries, and promotes the well-being of our workforce, fostering a secure culture across all operations.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b0ee382d-6ac6-4ba7-3f52-776bfb6bc200/public"
        },
        {
            title: "ISO 14001:2015 – Environmental Management System",
            description: "WAE upholds globally recognized environmental management protocols. This certifies institutional commitment to pollution prevention, resource optimization and eco-conscious operational practices that reduce ecological impacts.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3503a558-d34c-40da-e2bf-41e75da2f100/public"
        }
    ]

    const complianceRows = chunkArray(compliances, 3);

    return (
        <main className="relative min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden">
            {/* Top gradient matching dark theme */}
            <div
                className="absolute top-0 left-0 w-full pointer-events-none z-0"
                style={{
                    background: "linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)",
                    height: "clamp(500px, 80vh, 875px)",
                }}
            />

            <div>
                <Header transparentBg />
            </div>

            {/* Main Content Area */}
            <section className="relative z-10 w-full px-[24px] lg:px-[7.5vw] pt-[120px] lg:pt-[clamp(180px,17.7vw,255px)] pb-[100px]">

                {/* Toggle Buttons */}
                <div className="flex gap-4 mb-[40px] lg:mb-[75px]">
                    <Link href="/compliance">
                        <button
                            className="px-6 border transition-colors flex items-center justify-center border-white text-black bg-white w-[161px] lg:w-auto h-[35px] lg:h-[41px]"
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '100%'
                            }}
                        >
                            Compliances
                        </button>
                    </Link>
                    <Link href="/memberships">
                        <button
                            className="px-6 border transition-colors flex items-center justify-center border-white/30 text-white hover:border-white w-[161px] lg:w-auto h-[35px] lg:h-[41px]"
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '100%'
                            }}
                        >
                            Memberships
                        </button>
                    </Link>
                </div>

                {/* Horizontal Divider */}
                <div className="w-full h-px bg-white/20 mb-[40px] lg:mb-[56px]" />

                {/* Hero Text */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-[38px] lg:mb-[92px]">
                    <div className="w-full lg:w-[clamp(260px,28.2vw,407px)] shrink-0 mb-[27px] lg:mb-0">
                        <h1 className="text-[28px] lg:text-[clamp(40px,4.16vw,60px)]" style={{
                            fontFamily: 'Inter Tight',
                            fontWeight: 400,
                            lineHeight: '100%',
                            letterSpacing: '0px',
                        }}>
                            Compliances
                        </h1>
                    </div>

                    <div className="w-full lg:w-[clamp(260px,28vw,403px)] shrink-0">
                        <p className="text-[12px] lg:text-[16px] leading-[120%] lg:leading-[130%]" style={{
                            fontFamily: 'Manrope',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            color: '#AEAEAE',
                            letterSpacing: '0px',
                            verticalAlign: 'middle'
                        }}>
                            Explore the latest stories from WAE. From product innovations and sustainability initiatives to industry insights, partnerships, and company milestones, browse through the updates below to discover what's shaping our journey and the future of water.
                        </p>
                    </div>
                </div>

                {/* Compliances Grid */}
                <div className="flex flex-col">
                    {complianceRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-0 lg:gap-y-0">
                                {row.map((item, colIndex) => (
                                    <React.Fragment key={colIndex}>
                                        {colIndex > 0 && (
                                            <div className="col-span-1 block md:hidden my-[40px] w-full h-px bg-white/20" />
                                        )}
                                        <div className="flex flex-col border-none pl-0 lg:border-l lg:border-solid lg:border-white/20 lg:pl-6 h-full">
                                            <div className="flex items-center justify-start mb-[10px] lg:mb-[38px] h-[64px] lg:h-[154px]">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="max-h-full max-w-[64px] lg:max-w-[150px] object-contain object-left"
                                                />
                                            </div>
                                            <h3
                                                className="text-[16px] lg:text-[24px] leading-[120%] lg:leading-[130%] mb-[10px] lg:mb-[32px] min-h-0 lg:min-h-[70px]"
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 400,
                                                    fontStyle: 'normal',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                }}
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className="text-[12px] lg:text-[14px] leading-[120%] lg:leading-[130%]"
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 400,
                                                    fontStyle: 'normal',
                                                    color: '#AEAEAE',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                }}
                                            >
                                                {item.title.startsWith("ISO 9001") || item.title.startsWith("ISO 45001") || item.title.startsWith("ISO 14001") ? (
                                                    <>
                                                        {item.description}
                                                    </>
                                                ) : (
                                                    item.description
                                                )}
                                            </p>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Horizontal divider after every row */}
                            {rowIndex < complianceRows.length - 1 && (
                                <div className="my-[40px] lg:my-[92px] w-full h-px bg-white/20" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <div style={{ position: "relative", zIndex: 1200 }}>
                <Footer />
            </div>
        </main>
    )
}
