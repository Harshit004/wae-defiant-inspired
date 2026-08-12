const fs = require('fs');

function fixFile(path) {
    let content = fs.readFileSync(path, 'utf8');

    // H2s
    content = content.replace(/text-\[20px\] leading-none text-white mb-\[24px\]/g, 'text-[16px] lg:text-[20px] leading-none text-white mb-[24px]');
    
    // H3s
    content = content.replace(/text-\[14px\] leading-\[105%\] text-white mb-\[24px\]/g, 'text-[12px] lg:text-[14px] leading-[105%] text-white mb-[12px] lg:mb-[24px] ml-[35px] lg:ml-0');
    
    // P tags text sizing
    content = content.replace(/text-\[14px\] leading-normal text-justify text-\[#AEAEAE\]/g, 'text-[12px] lg:text-[14px] leading-[120%] lg:leading-normal text-justify text-[#AEAEAE]');
    content = content.replace(/text-\[14px\] leading-normal text-\[#AEAEAE\]/g, 'text-[12px] lg:text-[14px] leading-[120%] lg:leading-normal text-[#AEAEAE]');

    let lines = content.split('\n');
    let inSubpoint = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<h3')) {
            inSubpoint = true;
        } else if (lines[i].includes('<h2')) {
            inSubpoint = false;
        }
        
        if (inSubpoint && (lines[i].includes('<p ') || lines[i].includes('<div className="font-[\'Manrope\']') || lines[i].includes('<ul '))) {
            if (!lines[i].includes('ml-[35px]')) {
                lines[i] = lines[i].replace('mb-[40px]', 'mb-[28px] lg:mb-[40px] ml-[35px] lg:ml-0');
            }
        } else if (!inSubpoint && (lines[i].includes('<p ') || lines[i].includes('<div className="font-[\'Manrope\']'))) {
            let isFollowedByH3 = false;
            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].trim() === '' || lines[j].includes('</p>') || lines[j].includes('<br />') || lines[j].includes('<br/>')) continue;
                if (lines[j].includes('<h3')) {
                    isFollowedByH3 = true;
                    break;
                }
                if (lines[j].includes('<hr') || lines[j].includes('<h2') || lines[j].includes('</div>')) {
                    break;
                }
            }
            if (isFollowedByH3) {
                lines[i] = lines[i].replace('mb-[40px]', 'mb-[28px] lg:mb-[40px]');
            }
        }
    }
    
    fs.writeFileSync(path, lines.join('\n'));
}

fixFile('/Users/harshit/Desktop/WAE new/app/data-privacy-policy/page.tsx');
fixFile('/Users/harshit/Desktop/WAE new/app/terms-of-use/page.tsx');
