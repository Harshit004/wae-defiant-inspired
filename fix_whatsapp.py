import sys

with open("components/whatsapp-widget.tsx", "r") as f:
    content = f.read()

# Replace the media query block to add position: fixed !important and z-index: 999999 !important
old_block = """            @media (max-width: 768px) {
              #df-btn-cont {
                right: 20px !important;
                bottom: 20px !important;
                transform: scale(0.85);
                transform-origin: bottom right;
              }"""

new_block = """            @media (max-width: 768px) {
              #df-btn-cont {
                position: fixed !important;
                right: 20px !important;
                bottom: 20px !important;
                transform: scale(0.85);
                transform-origin: bottom right;
                z-index: 999999 !important;
              }"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open("components/whatsapp-widget.tsx", "w") as f:
        f.write(content)
    print("Fixed whatsapp-widget.tsx")
else:
    print("Block not found in whatsapp-widget.tsx")
