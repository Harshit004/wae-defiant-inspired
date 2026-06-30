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
    if (content.includes('fontFamily: "\\",')) {
        // Find the "Inside WAE" font family to copy it
        const insideWAERegex = /\{\/\*\s*Inside WAE Menu Items\s*\*\/\}[\s\S]*?fontFamily:\s*["']([^"']+)["']/;
        const match = content.match(insideWAERegex);
        let correctFont = "'Inter Tight', sans-serif"; // fallback
        if (match && match[1]) {
            correctFont = match[1];
        }
        
        // Let's just hardcode what we had:
        // Actually match[1] might just be the actual font string, like 'Manrope', sans-serif
        // So we want to replace `fontFamily: "\",` with `fontFamily: "${correctFont}",`
        // Wait, if it matched `\'Manrope\'`, we need to properly quote it.
        // It's safer to just replace `fontFamily: "\",` with `fontFamily: "'Inter Tight', sans-serif",`
        // Or actually let's see what `match[0]` has.
        // In app/page.tsx, it's fontFamily: "'Manrope', sans-serif",
        
        // I will just use `fontFamily: "'Inter Tight', sans-serif",` globally for this fix, it won't hurt,
        // or actually `fontFamily: "'Manrope', sans-serif",` if it's app/page.tsx
        
        content = content.replace(/fontFamily: "\\",/g, `fontFamily: "'Inter Tight', sans-serif",`);
        content = content.replace(/fontFamily: "'Inter Tight', sans-serif",\s*fontWeight: 500,\s*fontSize: "10px",/g, `fontFamily: "'Manrope', sans-serif",\n                      fontWeight: 500,\n                      fontSize: "10px",`);

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Fixed ' + filePath);
    }
}

processDir('app');
