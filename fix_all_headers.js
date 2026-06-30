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
    let changed = false;

    // 1. Add etceteraItems if productsItems is defined but etceteraItems is not
    if (content.includes('const productsItems =') && !content.includes('const etceteraItems =')) {
        const blueprintItemsRegex = /const blueprintItems\s*=\s*\[[\s\S]*?\]\n?/;
        content = content.replace(blueprintItemsRegex, (match) => {
            return match + `const etceteraItems = [
    { text: "Contact", href: "/contact" },
    { text: "Compliance", href: "/compliance" },
    { text: "Mentioned", href: "/mentioned" },
]
`;
        });
        changed = true;
    }

    // 2. Change top row grid-cols-5 to grid-cols-6 gap-4
    if (content.includes('grid-cols-5') && content.includes('<div>IDENTITY</div>')) {
        content = content.replace(/className="grid grid-cols-5 items-center/g, 'className="grid grid-cols-6 gap-4 items-center');
        
        // Add RESPONSIBILITY to headings
        const headingsRegex = /<div>INSIDE WAE<\/div>\s*<div>ETCETERA<\/div>/;
        content = content.replace(headingsRegex, '<div>INSIDE WAE</div>\n              <div>RESPONSIBILITY</div>\n              <div>ETCETERA</div>');

        // Change bottom row grid-cols-5 to grid-cols-6 gap-4
        content = content.replace(/className="grid grid-cols-5 items-start"/g, 'className="grid grid-cols-6 gap-4 items-start"');

        // Remove last:border-0
        content = content.replace(/last:border-0/g, '');

        // Add RESPONSIBILITY column and fix ETCETERA column
        // We find the ETCETERA Menu Items block and replace it
        const etceteraBlockRegex = /\{\/\*\s*ETCETERA Menu Items\s*\*\/\}[\s\S]*?\{blueprintItems\.map\([\s\S]*?\)\s*\}\s*<\/div>/;
        
        if (content.match(etceteraBlockRegex)) {
            // we will replace blueprintItems with etceteraItems for the etcetera block, 
            // and insert the RESPONSIBILITY block using blueprintItems before it.
            const match = content.match(etceteraBlockRegex)[0];
            
            // Extract the font style from the match to preserve it
            const fontMatch = match.match(/fontFamily:\s*["']([^"']+)["']/);
            const fontFamily = fontMatch ? fontMatch[1] : "'Inter Tight', sans-serif";
            const sizeMatch = match.match(/fontSize:\s*["']([^"']+)["']/);
            const fontSize = sizeMatch ? sizeMatch[1] : "11px";
            const borderClassMatch = match.match(/className="pb-2 border-b[^"]*"/);
            const borderClass = borderClassMatch ? borderClassMatch[0] : 'className="pb-2 border-b border-white "';
            
            const newColumns = `{/* RESPONSIBILITY Menu Items */}
              <div className="flex flex-col justify-center space-y-2 pr-4">
                {blueprintItems.map((item, i) => (
                  <div
                    key={i}
                    ${borderClass}
                    style={{
                      fontFamily: "${fontFamily}",
                      fontWeight: 500,
                      fontSize: "${fontSize}",
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
                    ${borderClass}
                    style={{
                      fontFamily: "${fontFamily}",
                      fontWeight: 500,
                      fontSize: "${fontSize}",
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
              
            content = content.replace(etceteraBlockRegex, newColumns);
        }
        
        // Add pr-4 to Inside WAE Menu Items
        const waeBlockRegex = /\{\/\*\s*Inside WAE Menu Items\s*\*\/}\s*<div className="flex flex-col justify-center space-y-2">/;
        content = content.replace(waeBlockRegex, '{/* Inside WAE Menu Items */}\n              <div className="flex flex-col justify-center space-y-2 pr-4">');

        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Updated: ' + filePath);
    }
}

processDir('app');
