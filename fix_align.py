import sys

with open("components/whatsapp-widget.tsx", "r") as f:
    content = f.read()

# Add a desktop media query block or default styles for #df-btn-cont
old_block = """            /* Show custom icon only when closed */
            .df-btn.df-closed .df-btn-text::before {
              content: "";
              display: inline-block;
              width: 54px;
              height: 54px;
              background-image: url('https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/948bd474-7dce-4e82-edf0-be31f6620e00/public') !important;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            }
            
            /* Ensure widget stays on screen on mobile */"""

new_block = """            /* Show custom icon only when closed */
            .df-btn.df-closed .df-btn-text::before {
              content: "";
              display: inline-block;
              width: 54px;
              height: 54px;
              background-image: url('https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/948bd474-7dce-4e82-edf0-be31f6620e00/public') !important;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            }
            
            /* Force widget alignment on desktop */
            @media (min-width: 769px) {
              #df-btn-cont {
                position: fixed !important;
                right: 24px !important;
                bottom: 24px !important;
                z-index: 999999 !important;
              }
            }
            
            /* Ensure widget stays on screen on mobile */"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open("components/whatsapp-widget.tsx", "w") as f:
        f.write(content)
    print("Fixed whatsapp-widget.tsx desktop alignment")
else:
    print("Block not found in whatsapp-widget.tsx")
