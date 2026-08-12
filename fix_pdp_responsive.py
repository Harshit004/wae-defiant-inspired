import re
import sys

def main():
    file_path = "app/product-description-page/ClientPage.tsx"
    with open(file_path, "r") as f:
        content = f.read()

    # 1. Inject isMobile hook
    if "const [isMobile, setIsMobile]" not in content:
        hook_code = """    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
"""
        # Find start of ProductDescriptionPageContent
        func_start = content.find("function ProductDescriptionPageContent() {")
        if func_start != -1:
            # Find the first line after function declaration
            first_line_end = content.find("\n", func_start)
            content = content[:first_line_end+1] + hook_code + content[first_line_end+1:]
        
    # 2. Find and replace hardcoded px values in style objects
    # Pattern to match: property: "123px" or property: '123px'
    # We want to replace it with: property: isMobile ? "60px" : "123px"
    
    def replacer(match):
        full_match = match.group(0)
        prop = match.group(1)
        quote = match.group(2)
        val_str = match.group(3)
        val = float(val_str)
        
        # Don't scale small values (<= 8px)
        if val <= 8:
            return full_match
            
        # Calculate mobile value (scale down, but clamp to sensible minimums)
        # Font sizes: scale by 0.6
        # Margins/Paddings: scale by 0.4
        # Width/Height: scale by 0.5
        if "font" in prop.lower():
            mobile_val = max(12, int(val * 0.6))
        elif "margin" in prop.lower() or "padding" in prop.lower():
            mobile_val = max(10, int(val * 0.4))
        else:
            mobile_val = max(10, int(val * 0.5))
            
        return f'{prop}: isMobile ? "{mobile_val}px" : {quote}{val_str}px{quote}'

    # Regex to match key: "valuepx" or key: 'valuepx'
    pattern = r'([a-zA-Z]+)\s*:\s*(["\'])([0-9]+(?:\.[0-9]+)?)px\2'
    
    new_content = re.sub(pattern, replacer, content)

    # 3. Inject useEffect import if missing
    if "useEffect" not in content[:200]:
        new_content = new_content.replace('import { useState, Suspense }', 'import { useState, useEffect, Suspense }')

    with open(file_path, "w") as f:
        f.write(new_content)
        
    print("Done converting px values to responsive")

if __name__ == "__main__":
    main()
