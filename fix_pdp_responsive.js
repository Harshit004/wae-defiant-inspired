const fs = require('fs');

function main() {
    const filePath = 'app/product-description-page/ClientPage.tsx';
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Inject isMobile hook
    if (!content.includes('const [isMobile, setIsMobile]')) {
        const hookCode = `    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])\n`;
        const funcStart = content.indexOf('function ProductDescriptionPageContent() {');
        if (funcStart !== -1) {
            const firstLineEnd = content.indexOf('\n', funcStart);
            content = content.slice(0, firstLineEnd + 1) + hookCode + content.slice(firstLineEnd + 1);
        }
    }

    // 2. Regex replace inline px styles
    const pattern = /([a-zA-Z]+)\s*:\s*(["'])([0-9]+(?:\.[0-9]+)?)px\2/g;
    content = content.replace(pattern, (match, prop, quote, valStr) => {
        const val = parseFloat(valStr);
        if (val <= 8) return match;

        let mobileVal;
        const lowerProp = prop.toLowerCase();
        if (lowerProp.includes('font')) {
            mobileVal = Math.max(12, Math.floor(val * 0.6));
        } else if (lowerProp.includes('margin') || lowerProp.includes('padding')) {
            mobileVal = Math.max(10, Math.floor(val * 0.4));
        } else {
            mobileVal = Math.max(10, Math.floor(val * 0.5));
        }
        return `${prop}: isMobile ? "${mobileVal}px" : ${quote}${valStr}px${quote}`;
    });

    // 3. Ensure useEffect is imported
    if (!content.slice(0, 200).includes('useEffect')) {
        content = content.replace('import { useState, Suspense }', 'import { useState, useEffect, Suspense }');
        // also check if it's imported as `import { useState }`
        content = content.replace('import { useState }', 'import { useState, useEffect }');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Done converting px values to responsive');
}

main();
