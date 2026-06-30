"use client"

import type { FC } from "react"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

// Menu data
const productsItems = [
    { text: "This is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
]
const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs" },
]
const etceteraItems = [
    { text: "Contact", href: "/contact" },
    { text: "Compliance", href: "/compliance" },
    { text: "Mentioned", href: "/mentioned" },
]

const Header: FC = () => {
    const headerRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <div>
                <header ref={headerRef} className="w-full absolute top-0 left-0 z-50 pb-5 bg-transparent text-white">
                    <div className={containerClass}>
                        {/* Top Row: Navigation */}
                        <div
                            className="grid grid-cols-6 gap-4 items-center pt-[30px] pb-[10px] uppercase"
                            style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 500,
                                fontSize: "12px",
                                lineHeight: "100%",
                                letterSpacing: "0px",
                            }}
                        >
                            <div>IDENTITY</div>
                            <div>ORIGIN</div>
                            <div style={{ position: "relative", left: "-20px" }}>OBJECTIVE</div>
                            <div>INSIDE WAE</div>
                            <div>RESPONSIBILITY</div>
                            <div>ETCETERA</div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white mb-[10px]" />

                        {/* Bottom Row: Logo, Tagline and Menu Items */}
                        <div className="grid grid-cols-6 gap-4 items-start">
                            {/* Logo */}
                            <div className="flex flex-col justify-center w-[77px] h-[82px]">
                                <Link href="/">
                                    <Image
                                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
                                        alt="WAE Logo"
                                        width={77}
                                        height={82}
                                    />
                                </Link>
                            </div>

                            {/* Coordinates */}
                            <div
                                className="flex flex-col justify-center inline-block mr-1"
                                style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "11px",
                                    lineHeight: "100%",
                                    color: "#ffffff",
                                }}
                            >
                                20.5937° N
                                <br />
                                78.9629° E
                            </div>

                            {/* Tagline */}
                            <div
                                className="flex flex-col justify-center inline-block mr-1"
                                style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "11px",
                                    lineHeight: "100%",
                                    color: "#ffffff",
                                    position: "relative",
                                    left: "-20px",
                                }}
                            >
                                To lead the way in<br />sustainability ahead of the<br />rest
                            </div>

                            {/* Menu Items spanning 3 columns */}
                            <div className="col-span-3 flex flex-col space-y-2">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="grid grid-cols-3 gap-4 pb-2 border-b border-white">
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
                                                <div className="c--anim-btn">
                                                    <div className="text-container">
                                                        <span className="c-anim-btn">{productsItems[i].text}</span>
                                                        <span className="block">{productsItems[i].text}</span>
                                                    </div>
                                                    <span className="menu-arrow">
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
                                                <div className="c--anim-btn">
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
                                                <div className="c--anim-btn">
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
                                    </div>
                                ))}
                            </div>
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
