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

    if (content.includes(`fontFamily: "'Inter Tight',`)) {
        content = content.replace(/fontFamily:\s*"'Inter Tight',/g, `fontFamily: "'Inter Tight', sans-serif",`);
        changed = true;
    }
    if (content.includes(`fontFamily: "'Manrope',`)) {
        content = content.replace(/fontFamily:\s*"'Manrope',/g, `fontFamily: "'Manrope', sans-serif",`);
        changed = true;
    }
    if (content.includes(`fontFamily: "\\"'Manrope\\'",`)) { // Just in case
        content = content.replace(/fontFamily:\s*"\\'Manrope\\'",/g, `fontFamily: "'Manrope', sans-serif",`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Fixed ' + filePath);
    }
}

processDir('components');
processDir('app');
