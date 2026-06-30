const fs = require('fs');
const path = require('path');

const correctProductsItems = `const productsItems = [
    { text: "This is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ]`;
  
const correctProductsItems2 = `const productsItems = [
    { text: "This Is Us", href: "/this-is-us" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ]`;

const correctBlueprintItems = `const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs" },
  ]`;

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

    // Check if productsItems is an array of strings
    if (content.match(/const productsItems\s*=\s*\[\s*"This is Us",\s*"Our Portfolio",\s*"Reimagine Work",?\s*\]/)) {
        content = content.replace(/const productsItems\s*=\s*\[\s*"This is Us",\s*"Our Portfolio",\s*"Reimagine Work",?\s*\]/, correctProductsItems);
        changed = true;
    }
    if (content.match(/const productsItems\s*=\s*\[\s*"This Is Us",\s*"Our Portfolio",\s*"Reimagine Work",?\s*\]/)) {
        content = content.replace(/const productsItems\s*=\s*\[\s*"This Is Us",\s*"Our Portfolio",\s*"Reimagine Work",?\s*\]/, correctProductsItems2);
        changed = true;
    }

    // Check if blueprintItems is an array of strings
    if (content.match(/const blueprintItems\s*=\s*\[\s*"Sustainability",\s*"The Activist Co\.",\s*"Blog",?\s*\]/)) {
        content = content.replace(/const blueprintItems\s*=\s*\[\s*"Sustainability",\s*"The Activist Co\.",\s*"Blog",?\s*\]/, correctBlueprintItems);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Fixed arrays in ' + filePath);
    }
}

processDir('app');
