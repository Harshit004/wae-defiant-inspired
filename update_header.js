const fs = require('fs');
let content = fs.readFileSync('components/header.tsx', 'utf-8');

// Update menu data
const menuDataOld = `const productsItems = [
    { text: "This is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
]
const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs" },
]`;

const menuDataNew = `const productsItems = [
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
]`;

content = content.replace(menuDataOld, menuDataNew);

// Update grid cols for top row
const topRowOld = `className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"`;
const topRowNew = `className="grid grid-cols-6 gap-4 items-center pt-[30px] pb-[10px] uppercase"`;
content = content.replace(topRowOld, topRowNew);

// Update headings
const headingsOld = `<div>IDENTITY</div>
                            <div>ORIGIN</div>
                            <div style={{ position: "relative", left: "-20px" }}>OBJECTIVE</div>
                            <div>INSIDE WAE</div>
                            <div>ETCETERA</div>`;

const headingsNew = `<div>IDENTITY</div>
                            <div>ORIGIN</div>
                            <div style={{ position: "relative", left: "-20px" }}>OBJECTIVE</div>
                            <div>INSIDE WAE</div>
                            <div>RESPONSIBILITY</div>
                            <div>ETCETERA</div>`;
content = content.replace(headingsOld, headingsNew);

// Update grid cols for bottom row
const bottomRowOld = `className="grid grid-cols-5 items-start"`;
const bottomRowNew = `className="grid grid-cols-6 gap-4 items-start"`;
content = content.replace(bottomRowOld, bottomRowNew);

// Remove last:border-0 to match screenshot where lines exist under all items
content = content.replace(/last:border-0/g, '');

// Update ETCETERA section mapping and add RESPONSIBILITY
const etceteraOld = `{/* ETCETERA Menu Items */}
                            <div className="flex flex-col justify-center space-y-2">
                                {blueprintItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="pb-2 border-b border-white "
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
                                        }}
                                    >
                                        <Link href={item.href} className="contents">
                                            <div className="c--anim-btn">
                                                <div className="text-container">
                                                    <span className="c-anim-btn">{item.text}</span>
                                                    <span className="block">{item.text}</span>
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
                                    </div>
                                ))}
                            </div>`;

const extraSectionsNew = `{/* RESPONSIBILITY Menu Items */}
                            <div className="flex flex-col justify-center space-y-2 pr-4">
                                {blueprintItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="pb-2 border-b border-white "
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
                                        }}
                                    >
                                        <Link href={item.href} className="contents">
                                            <div className="c--anim-btn">
                                                <div className="text-container">
                                                    <span className="c-anim-btn">{item.text}</span>
                                                    <span className="block">{item.text}</span>
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
                                    </div>
                                ))}
                            </div>

                            {/* ETCETERA Menu Items */}
                            <div className="flex flex-col justify-center space-y-2 pr-4">
                                {etceteraItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="pb-2 border-b border-white "
                                        style={{
                                            fontFamily: "'Inter Tight', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "11px",
                                            lineHeight: "110%",
                                        }}
                                    >
                                        <Link href={item.href} className="contents">
                                            <div className="c--anim-btn">
                                                <div className="text-container">
                                                    <span className="c-anim-btn">{item.text}</span>
                                                    <span className="block">{item.text}</span>
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
                                    </div>
                                ))}
                            </div>`;

content = content.replace(etceteraOld, extraSectionsNew);

// Add pr-4 to Inside WAE Menu Items to give the border-b a slight padding so it doesn't touch the next column, mimicking screenshot
content = content.replace('<div className="flex flex-col justify-center space-y-2">', '<div className="flex flex-col justify-center space-y-2 pr-4">');

fs.writeFileSync('components/header.tsx', content);
console.log('Update finished!');
