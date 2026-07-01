"use client"

import type { FC } from "react"
import { useRef, Fragment } from "react"
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
    { text: "Contact", href: "/contact-us" },
    { text: "Compliance", href: "/compliance" },
    { text: "Mentioned", href: "/news-and-updates" },
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
                            className="grid grid-cols-[auto_10.17vw_auto_10.21vw_auto_10.21vw_auto_9.03vw_auto_8.13vw_1fr] items-center pt-[30px] pb-[10px] uppercase"
                            style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 500,
                                fontSize: "12px",
                                lineHeight: "100%",
                                letterSpacing: "0px",
                            }}
                        >
                            <div>IDENTITY</div>
                            <div></div>
                            <div>ORIGIN</div>
                            <div></div>
                            <div style={{ position: "relative", left: "-20px" }}>OBJECTIVE</div>
                            <div></div>
                            <div>INSIDE WAE</div>
                            <div></div>
                            <div>RESPONSIBILITY</div>
                            <div></div>
                            <div>ETCETERA</div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white mb-[10px]" />

                        {/* Bottom Row: Logo, Tagline and Menu Items */}
                        <div className="grid grid-cols-[auto_10.17vw_auto_10.21vw_auto_10.21vw_auto_9.03vw_auto_8.13vw_1fr] items-start">
                            {/* Logo */}
                            <div className="row-span-6 flex flex-col justify-start pt-1 w-[77px]">
                                <Link href="/">
                                    <Image
                                        src="/wae-logo.svg"
                                        alt="WAE Logo"
                                        width={77}
                                        height={82}
                                        priority
                                    />
                                </Link>
                            </div>
                            <div className="row-span-6"></div>

                            {/* Coordinates */}
                            <div
                                className="row-span-6 mr-1 pt-1"
                                style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "11px",
                                    lineHeight: "130%",
                                    color: "#ffffff",
                                }}
                            >
                                20.5937° N
                                <br />
                                78.9629° E
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
