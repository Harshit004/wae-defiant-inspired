const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    if (filePath.includes('node_modules') || filePath.includes('.next') || filePath.includes('.git') || filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.js')) {
        return;
    }
    try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            const files = fs.readdirSync(filePath);
            files.forEach(file => replaceInFile(path.join(filePath, file)));
        } else if (stats.isFile()) {
            const content = fs.readFileSync(filePath, 'utf8');
            let newContent = content.replace(/\/product-description-page\?product=/g, '/product-description-page/');
            newContent = newContent.replace(/\/product-listing\?category=/g, '/product-listing/');
            if (newContent !== content) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated ${filePath}`);
            }
        }
    } catch (err) {
        // ignore
    }
}

replaceInFile(path.join(__dirname, '../app'));
replaceInFile(path.join(__dirname, '../components'));
replaceInFile(path.join(__dirname, '../data'));
