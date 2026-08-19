"use client"

import type { FC } from "react"
import { useRef, Fragment, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

// Menu data
const productsItems = [
    { text: "Profile", href: "/profile" },
    { text: "Portfolio", href: "/portfolio" },
    { text: "Reimagine Work", href: "/careers" },
]
const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "Activism", href: "/activism" },
    { text: "Compliances", href: "/compliance" },
]
const etceteraItems = [
    { text: "Perspectives", href: "/perspectives" },
    { text: "Mentioned", href: "/news-and-updates" },
    { text: "Contact", href: "/contact-us" },
]

const mobileMenuSections = [
    {
        category: "INSIDE WAE",
        items: [
            { text: "Profile", href: "/profile" },
            { text: "Portfolio", href: "/portfolio" },
            { text: "Reimagine Work", href: "/careers" },
        ],
    },
    {
        category: "RESPONSIBILITY",
        items: [
            { text: "Sustainability", href: "/sustainability" },
            { text: "Activism", href: "/activism" },
            { text: "Compliances", href: "/compliance" },
        ],
    },
    {
        category: "ETCETERA",
        items: [
            { text: "Perspectives", href: "/perspectives" },
            { text: "Mentioned", href: "/news-and-updates" },
            { text: "Contact", href: "/contact-us" },
        ],
    },
    {
        category: "POLICIES",
        items: [
            { text: "Terms of Use", href: "/terms-of-use" },
            { text: "Cookie Policy", href: "/cookie-policy" },
            { text: "Data Privacy Policy", href: "/data-privacy-policy" },
        ],
    },
]

const Header: FC<{ transparentBg?: boolean }> = ({ transparentBg = false }) => {
    const headerRef = useRef<HTMLDivElement>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [mobileMenuOpen])

    return (
        <>
            <div>
                <header ref={headerRef} className="w-full absolute top-0 left-0 z-50 pb-5 text-white" style={{ backgroundColor: transparentBg ? 'transparent' : '#0D0D0D' }}>
                    <div className={containerClass}>
                        {/* Mobile Header */}
                        <div className="md:hidden flex justify-between items-center pt-[20px] pb-[16px]">
                            <Link href="/">
                                <Image
                                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
                                    alt="WAE Logo"
                                    width={37}
                                    height={40}
                                    priority
                                    className="w-[37px] h-[40px]"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-white p-2 focus:outline-none cursor-pointer"
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {mobileMenuOpen ? (
                                    <X size={24} strokeWidth={1.5} className="text-white" />
                                ) : (
                                    <svg width="21.5" height="19.5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.5H20.5M1 9.5H20.5M1 17.5H20.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        {/* Mobile Header Full-Width Divider */}
                        <div className="md:hidden absolute top-[76px] left-0 right-0 border-b border-[#FFFFFF4D]" />

                        {/* Mobile Slide-In Full-Screen Menu */}
                        <div
                            className={`md:hidden fixed inset-0 z-[100] bg-[#000000] text-white overflow-y-auto px-[24px] transition-transform duration-300 ease-in-out ${
                                mobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
                            }`}
                        >
                            {/* Header Row inside Menu */}
                            <div className="flex justify-between items-center pt-[20px] pb-[16px]">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    <Image
                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
                                        alt="WAE Logo"
                                        width={37}
                                        height={40}
                                        priority
                                        className="w-[37px] h-[40px]"
                                    />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-white p-2 focus:outline-none cursor-pointer"
                                    aria-label="Close menu"
                                >
                                    <X size={24} strokeWidth={1.5} className="text-white" />
                                </button>
                            </div>

                            {/* 21px gap under the header */}
                            <div className="mt-[21px] flex justify-between items-start w-full">
                                {/* Left Column: ORIGIN */}
                                <div className="flex flex-col">
                                    <span
                                        className="uppercase"
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 400,
                                            fontSize: "10px",
                                            lineHeight: "105%",
                                            letterSpacing: "0%",
                                            color: "#AEAEAE",
                                        }}
                                    >
                                        ORIGIN
                                    </span>
                                    <div
                                        className="mt-[8px]"
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            lineHeight: "120%",
                                            letterSpacing: "0%",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        20.5937° N<br />78.9629° E
                                    </div>
                                </div>

                                {/* Right Column: OBJECTIVE */}
                                <div className="flex flex-col items-start" style={{ width: "29.227vw", minWidth: "120px" }}>
                                    <span
                                        className="uppercase"
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 400,
                                            fontSize: "10px",
                                            lineHeight: "105%",
                                            letterSpacing: "0%",
                                            color: "#AEAEAE",
                                        }}
                                    >
                                        OBJECTIVE
                                    </span>
                                    <div
                                        className="mt-[8px]"
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            lineHeight: "120%",
                                            letterSpacing: "0%",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        To lead the way in sustainability ahead of the rest
                                    </div>
                                </div>
                            </div>

                            {/* 47px gap before INSIDE WAE */}
                            <div className="mt-[47px]">
                                {mobileMenuSections.map((sec, secIdx) => (
                                    <div key={secIdx} className="mb-[30px]">
                                        {/* Section Header */}
                                        <span
                                            className="uppercase block"
                                            style={{
                                                fontFamily: "'Inter Tight', sans-serif",
                                                fontWeight: 400,
                                                fontSize: "10px",
                                                lineHeight: "105%",
                                                letterSpacing: "0%",
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {sec.category}
                                        </span>

                                        {/* 12px gap, horizontal divider, 12px gap */}
                                        <div className="mt-[12px] mb-[12px] w-full h-[1px] bg-white/20" />

                                        {/* Menu Items with 6px gap */}
                                        <div className="flex flex-col gap-[6px]">
                                            {sec.items.map((item, itemIdx) => (
                                                <Link
                                                    key={itemIdx}
                                                    href={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    style={{
                                                        fontFamily: "'Inter Tight', sans-serif",
                                                        fontWeight: 400,
                                                        fontSize: "20px",
                                                        lineHeight: "105%",
                                                        letterSpacing: "0%",
                                                        color: "#FFFFFF",
                                                    }}
                                                    className="transition-colors hover:text-white/70"
                                                >
                                                    {item.text}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom extra padding */}
                            <div className="pb-[40px]" />
                        </div>

                        {/* Desktop Header */}
                        <div className="hidden md:grid grid-cols-[auto_minmax(0,10.17vw)_auto_minmax(0,10.21vw)_auto_minmax(0,10.21vw)_auto_minmax(0,9.03vw)_auto_minmax(0,8.13vw)_1fr] items-start pt-[30px]">
                            {/* Headings */}
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%" }}>PERSONA</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%" }}>ORIGIN</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ position: "relative", left: "-20px", fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%" }}>OBJECTIVE</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%" }}>INSIDE WAE</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%" }}>RESPONSIBILITY</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%" }}>ETCETERA</div>

                            {/* Divider */}
                            <div className="col-span-11 w-full h-px bg-[#FFFFFF4D] mb-[10px]" />

                            {/* Logo */}
                            <div className="row-span-6 flex flex-col justify-start pt-1 w-[64px] relative group z-20">
                                <Link href="/">
                                    <Image
                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
                                        alt="WAE Logo"
                                        width={64}
                                        height={67}
                                        priority
                                    />
                                </Link>
                                <div className="absolute left-[32px] top-[85px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center h-[50px] pointer-events-none w-[240px]">
                                    <div className="w-[1px] bg-[#666666] h-[45px]"></div>
                                    <div className="ml-[10px] w-[201px]" style={{
                                        fontFamily: "'Manrope', sans-serif",
                                        fontWeight: 500,
                                        fontSize: "10px",
                                        lineHeight: "130%",
                                        color: "white"
                                    }}>
                                        Six. The perfect number.<br />
                                        Wholeness in form. Freedom in motion.<br />
                                        Balance by design.
                                    </div>
                                </div>
                            </div>
                            <div className="row-span-6"></div>

                            {/* Coordinates */}
                            <div
                                className="row-span-6 mr-1 pt-1 relative group w-max"
                                style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "11px",
                                    lineHeight: "130%",
                                    color: "#ffffff",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <div className="group-hover:opacity-0 transition-opacity duration-300">
                                    20.5937° N
                                    <br />
                                    78.9629° E
                                </div>
                                <div className="absolute top-1 left-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">
                                    <Image src="/image-571.png" alt="India Flag" width={38} height={25} className="object-cover rounded-sm" />
                                </div>
                            </div>
                            <div className="row-span-6"></div>

                            {/* Tagline */}
                            <div
                                className="row-span-6 mr-1 pt-1"
                                style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "11px",
                                    lineHeight: "130%",
                                    color: "#ffffff",
                                    position: "relative",
                                    left: "-20px",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                To lead the way in<br />sustainability ahead of the<br />rest
                            </div>
                            <div className="row-span-6"></div>

                            {/* Menu Items Flattened */}
                            {[0, 1, 2].map((i) => (
                                <Fragment key={i}>
                                    {/* Inside WAE Item */}
                                    <div
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
                                        }}
                                    >
                                        {productsItems[i] ? (
                                            <Link href={productsItems[i].href || "#"} className="contents">
                                                <div className="c--anim-btn pb-2">
                                                    <div className="text-container">
                                                        <span className="c-anim-btn">{productsItems[i].text}</span>
                                                        <span className="block">{productsItems[i].text}</span>
                                                    </div>
                                                    <span className="menu-arrow blueprint-arrow">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <line x1="5" y1="12" x2="19" y2="12" />
                                                            <polyline points="12 5 19 12 12 19" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Link>
                                        ) : null}
                                    </div>
                                    <div></div>

                                    {/* RESPONSIBILITY Item */}
                                    <div
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
                                        }}
                                    >
                                        {blueprintItems[i] ? (
                                            <Link href={blueprintItems[i].href || "#"} className="contents">
                                                <div className="c--anim-btn pb-2">
                                                    <div className="text-container">
                                                        <span className="c-anim-btn">{blueprintItems[i].text}</span>
                                                        <span className="block">{blueprintItems[i].text}</span>
                                                    </div>
                                                    <span className="menu-arrow blueprint-arrow">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <line x1="5" y1="12" x2="19" y2="12" />
                                                            <polyline points="12 5 19 12 12 19" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Link>
                                        ) : null}
                                    </div>
                                    <div></div>

                                    {/* ETCETERA Item */}
                                    <div
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
                                        }}
                                    >
                                        {etceteraItems[i] ? (
                                            <Link href={etceteraItems[i].href || "#"} className="contents">
                                                <div className="c--anim-btn pb-2">
                                                    <div className="text-container">
                                                        <span className="c-anim-btn">{etceteraItems[i].text}</span>
                                                        <span className="block">{etceteraItems[i].text}</span>
                                                    </div>
                                                    <span className="menu-arrow blueprint-arrow">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <line x1="5" y1="12" x2="19" y2="12" />
                                                            <polyline points="12 5 19 12 12 19" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Link>
                                        ) : null}
                                    </div>

                                    {/* Spanning border */}
                                    <div className="col-span-5 border-b border-[#FFFFFF4D] mb-2"></div>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </header>
            </div>

            {/* Header animation styles */}
            <style jsx>{`
                .c--anim-btn {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .text-container {
                    height: 12px;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .c-anim-btn {
                    display: block;
                    margin-top: 0;
                    transition: margin-top 0.5s;
                }
                .c--anim-btn:hover .c-anim-btn {
                    margin-top: -12px;
                }
                .menu-arrow {
                    display: inline-block;
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: transform 0.5s ease, opacity 0.5s ease;
                }
                .c--anim-btn:hover .menu-arrow {
                    transform: translateX(0);
                    opacity: 1;
                }
                .blueprint-arrow {
                    transform: rotate(-45deg) translateX(-10px);
                }
                .c--anim-btn:hover .blueprint-arrow {
                    transform: rotate(-45deg) translateX(0);
                    opacity: 1;
                }
            `}</style>
        </>
    )
}

export default Header
