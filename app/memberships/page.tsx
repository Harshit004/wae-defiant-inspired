"use client"

import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MembershipsPage() {
    const pathname = usePathname()

    // Helper to chunk array into rows
    const chunkArray = (arr: any[], size: number) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const memberships = [
        {
            title: "Great Place To Work® – Certified (2025–26)",
            description: "WAE is recognized as a Great Place To Work® certified organization, reflecting a culture built on trust, transparency, and employee empowerment. This certification reinforces our commitment to talent excellence, ethical practices, and fostering an environment where innovation thrives. It signals a workplace dedicated to continuous improvement and people-first values.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/30e04c80-a35b-4898-bae8-c067d0d34400/public"
        },
        {
            title: "India Water Quality Association (IWQA)",
            description: "As a member of IWQA, WAE aligns with India's leading water treatment standards and industry benchmarks. This membership ensures our products consistently uphold high-quality purification, safety, and performance norms. It strengthens our capability to deliver reliable and nationally compliant drinking water solutions.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/642b8ce4-eaac-4bc7-c73e-071de0595700/public"
        },
        {
            title: "The International Water Association (IWA)",
            description: "Membership with IWA connects WAE to a global network of water experts, innovators, and sustainable technology leaders. It enables us to adopt international best practices in water treatment, circular systems, and resource-efficient solutions, ensuring our technologies remain globally competitive.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5c2c9f26-1e04-446a-7e8d-6065d386c300/public"
        },
        {
            title: "Indian Green Building Council (IGBC) – Member",
            description: "As an IGBC member, WAE supports India's green building movement by promoting sustainable water infrastructure within commercial and institutional environments. This reinforces our commitment to eco-friendly engineering, reduced environmental footprint, and enabling organizations to achieve higher green building rating compliance.",
            image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/efbe5ee0-e398-428a-7042-3256c56f2000/public"
        }
    ]

    const membershipRows = chunkArray(memberships, 3);

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
                            className="px-6 border transition-colors flex items-center justify-center border-white/30 text-white hover:border-white w-[161px] lg:w-auto h-[35px] lg:h-[41px]"
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
                            className="px-6 border transition-colors flex items-center justify-center border-white text-black bg-white w-[161px] lg:w-auto h-[35px] lg:h-[41px]"
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
                            Memberships
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
                            Explore the latest stories from WAE. From product innovations and sustainability initiatives to industry insights, partnerships, and company milestones, browse through the updates below to discover what's shaping our journey and the future of water
                        </p>
                    </div>
                </div>

                {/* Memberships Grid */}
                <div className="flex flex-col">
                    {membershipRows.map((row, rowIndex) => (
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
                            {rowIndex < membershipRows.length - 1 && (
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
