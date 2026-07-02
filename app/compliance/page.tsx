"use client"

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
                <Header />
            </div>

            {/* Main Content Area */}
            <section className="relative z-10 w-full px-[7.5vw]" style={{ paddingTop: "clamp(180px, 17.7vw, 255px)", paddingBottom: "100px" }}>

                {/* Toggle Buttons */}
                <div className="flex gap-4" style={{ marginBottom: '75px' }}>
                    <Link href="/compliance">
                        <button
                            className="px-6 border transition-colors flex items-center justify-center border-white text-black bg-white"
                            style={{
                                height: '41px',
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
                            className="px-6 border transition-colors flex items-center justify-center border-white/30 text-white hover:border-white"
                            style={{
                                height: '41px',
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
                <div className="w-full h-px bg-white/20" style={{ marginBottom: '56px' }} />

                {/* Hero Text */}
                <div className="flex flex-row justify-between items-start" style={{ marginBottom: '92px' }}>
                    <div style={{ width: "clamp(260px, 28.2vw, 407px)", flexShrink: 0 }}>
                        <h1 style={{
                            fontFamily: 'Inter Tight',
                            fontWeight: 400,
                            fontSize: 'clamp(40px, 4.16vw, 60px)',
                            lineHeight: '100%',
                            letterSpacing: '0px',
                        }}>
                            Compliances
                        </h1>
                    </div>

                    <div style={{ width: "clamp(260px, 28vw, 403px)", flexShrink: 0 }}>
                        <p style={{
                            fontFamily: 'Manrope',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '130%',
                            color: '#AEAEAE',
                            letterSpacing: '0px',
                            verticalAlign: 'middle'
                        }}>
                            Explore the latest stories from WAE. From product innovations and sustainability initiatives to industry insights, partnerships, and company milestones, browse through the updates below to discover what's shaping our journey and the future of water
                        </p>
                    </div>
                </div>

                {/* Compliances Grid */}
                <div className="flex flex-col">
                    {complianceRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px]">
                                {row.map((item, colIndex) => (
                                    <div key={colIndex} className="flex flex-col border-l border-white/20 pl-6 h-full">
                                        <div className="flex items-center justify-start" style={{ height: '154px', marginBottom: '38px' }}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="max-h-full max-w-[150px] object-contain object-left"
                                            />
                                        </div>
                                        <h3
                                            style={{
                                                fontFamily: 'Manrope',
                                                fontWeight: 400,
                                                fontStyle: 'normal',
                                                fontSize: '24px',
                                                lineHeight: '130%',
                                                letterSpacing: '0px',
                                                verticalAlign: 'middle',
                                                marginBottom: '32px',
                                                minHeight: '70px'
                                            }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontFamily: 'Manrope',
                                                fontWeight: 400,
                                                fontStyle: 'normal',
                                                fontSize: '14px',
                                                lineHeight: '130%',
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
                                ))}
                            </div>

                            {/* Horizontal divider after every row */}
                            {rowIndex < complianceRows.length - 1 && (
                                <div style={{ marginTop: '92px', marginBottom: '92px', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
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
