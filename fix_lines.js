const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const startStr = '{/* Inside WAE Menu Items */}';
    const startIndex = content.indexOf(startStr);
    
    if (startIndex !== -1) {
        const etceteraStr = '{/* ETCETERA Menu Items */}';
        const etceteraIndex = content.indexOf(etceteraStr, startIndex);
        
        if (etceteraIndex !== -1) {
            // Find the closing </div> of the etcetera block
            const blockEndIndex = content.indexOf('</div>', content.indexOf('))}', etceteraIndex)) + 6;
            
            if (blockEndIndex > 6) {
                const match = content.substring(startIndex, blockEndIndex);
                
                // Extract border class
                const borderMatch = match.match(/className="(pb-2 border-b[^"]*)"/);
                const borderClass = borderMatch ? borderMatch[1].trim() : 'pb-2 border-b border-white';
                
                // Extract style properties
                const fontMatch = match.match(/fontFamily:\s*([^,]+),/);
                const fontFamily = fontMatch ? fontMatch[1].trim() : '"\'Inter Tight\', sans-serif"';
                
                const fontSizeMatch = match.match(/fontSize:\s*([^,]+),/);
                const fontSize = fontSizeMatch ? fontSizeMatch[1].trim() : '"11px"';
                
                const lineHeightMatch = match.match(/lineHeight:\s*([^,]+),?/);
                const lineHeight = lineHeightMatch ? lineHeightMatch[1].trim() : '"110%"';

                const svgCode = `<svg
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
                                                    </svg>`;

                const newBlock = `{/* Menu Items spanning 3 columns */}
                            <div className="col-span-3 flex flex-col space-y-2">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="grid grid-cols-3 gap-4 ${borderClass}">
                                        {/* Inside WAE Item */}
                                        <div
                                            style={{
                                                fontFamily: ${fontFamily},
                                                fontWeight: 500,
                                                fontSize: ${fontSize},
                                                lineHeight: ${lineHeight},
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
                                                        ${svgCode}
                                                    </span>
                                                </div>
                                            </Link>
                                            ) : null}
                                        </div>

                                        {/* RESPONSIBILITY Item */}
                                        <div
                                            style={{
                                                fontFamily: ${fontFamily},
                                                fontWeight: 500,
                                                fontSize: ${fontSize},
                                                lineHeight: ${lineHeight},
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
                                                        ${svgCode}
                                                    </span>
                                                </div>
                                            </Link>
                                            ) : null}
                                        </div>

                                        {/* ETCETERA Item */}
                                        <div
                                            style={{
                                                fontFamily: ${fontFamily},
                                                fontWeight: 500,
                                                fontSize: ${fontSize},
                                                lineHeight: ${lineHeight},
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
                                                        ${svgCode}
                                                    </span>
                                                </div>
                                            </Link>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>`;
                            
                content = content.substring(0, startIndex) + newBlock + content.substring(blockEndIndex);
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log('Updated: ' + filePath);
            }
        }
    }
}

processDir('components');
processDir('app');
