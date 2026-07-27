import os
import re

files_to_update = [
    "app/product-listing/ClientPage.tsx",
    "app/thank-you/page.tsx",
    "app/2026-outlook/page.tsx",
    "app/careers/page.tsx",
    "app/join-wae/[id]/page.tsx",
    "app/join-wae/page.tsx",
    "app/sustainability/page.tsx",
    "app/portfolio/page.tsx",
    "app/page.tsx",
    "components/related-card.tsx"
]

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r") as f:
        content = f.read()
        
    # Replace the padding inside the style object
    # It might be `padding: "0.69vw 1.11vw"` or `padding: "10px 16px"` etc.
    # A regex might be better, or we can just replace specifically what's there
    
    # We can look for `gap: "0.55vw"` because they seem copied
    new_content = re.sub(r'padding:\s*["\'].*?["\']', 'padding: "10.5px 16px"', content)
    
    if new_content != content:
        with open(file_path, "w") as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No match found in {file_path}")

