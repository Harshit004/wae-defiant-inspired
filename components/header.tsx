"use client"

import type { FC } from "react"
import { useRef, Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

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

const Header: FC<{ transparentBg?: boolean }> = ({ transparentBg = false }) => {
    const headerRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <div>
                <header ref={headerRef} className="w-full absolute top-0 left-0 z-50 pb-5 text-white" style={{ backgroundColor: transparentBg ? 'transparent' : '#0D0D0D' }}>
                    <div className={containerClass}>
                        <div className="grid grid-cols-[auto_minmax(0,10.17vw)_auto_minmax(0,10.21vw)_auto_minmax(0,10.21vw)_auto_minmax(0,9.03vw)_auto_minmax(0,8.13vw)_1fr] items-start pt-[30px]">
                            {/* Headings */}
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%", letterSpacing: "0.1em" }}>PERSONA</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%", letterSpacing: "0.1em" }}>ORIGIN</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ position: "relative", left: "-20px", fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%", letterSpacing: "0.1em" }}>OBJECTIVE</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%", letterSpacing: "0.1em" }}>INSIDE WAE</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%", letterSpacing: "0.1em" }}>RESPONSIBILITY</div>
                            <div></div>
                            <div className="uppercase pb-[10px] flex items-center" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%", letterSpacing: "0.1em" }}>ETCETERA</div>

                            {/* Divider */}
                            <div className="col-span-11 w-full h-px bg-white mb-[10px]" />

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
                                        letterSpacing: "0px",
                                        color: "white"
                                    }}>
                                        Six. The perfect number.<br/>
                                        Wholeness in form. Freedom in motion.<br/>
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
                                    letterSpacing: "0.1em",
                                    color: "#ffffff",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <div className="group-hover:opacity-0 transition-opacity duration-300">
                                    20.5937° N
                                    <br />
                                    78.9629° E
                                </div>
                                <div className="absolute top-1 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
                                    letterSpacing: "0.1em",
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
                                            letterSpacing: "0.1em",
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
                                            letterSpacing: "0.1em",
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
                                            letterSpacing: "0.1em",
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
                                    <div className="col-span-5 border-b border-white mb-2"></div>
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
