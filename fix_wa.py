import sys

with open("components/whatsapp-widget.tsx", "r") as f:
    content = f.read()

# Replace the styles block to enforce exact dimensions and remove hidden paddings
old_css = """          /* Hide the original SVG icon only when closed */
          .df-btn.df-closed .df-btn-text svg.df-svg-icon {
            display: none !important;
          }
          /* Remove background and shadow when closed */
          .df-btn.df-closed {
            background: transparent !important;
            box-shadow: none !important;
          }
          /* Remove text wrapper background when closed */
          .df-btn.df-closed .df-btn-text {
            background: transparent !important;
            padding: 0 !important;
          }
            /* Show custom icon only when closed */
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
            
            /* Ensure widget stays on screen on mobile */
            @media (max-width: 768px) {
              #df-btn-cont {
                position: fixed !important;
                right: 20px !important;
                bottom: 20px !important;
                transform: scale(0.85);
                transform-origin: bottom right;
                z-index: 999999 !important;
              }
              #wa-widget-tooltip {
                display: none !important;
              }
            }"""

new_css = """          /* Enforce exact container dimensions to fix bounding box issues */
          #df-btn-cont, .df-btn {
            width: 54px !important;
            height: 54px !important;
            min-width: 54px !important;
            min-height: 54px !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
          }

          /* Hide the original SVG icon only when closed */
          .df-btn.df-closed .df-btn-text svg.df-svg-icon {
            display: none !important;
          }
          /* Remove background and shadow when closed */
          .df-btn.df-closed {
            background: transparent !important;
            box-shadow: none !important;
          }
          /* Remove text wrapper background when closed */
          .df-btn.df-closed .df-btn-text {
            background: transparent !important;
            padding: 0 !important;
          }
            /* Show custom icon only when closed */
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
            
            /* Ensure widget stays on screen on mobile */
            @media (max-width: 768px) {
              #df-btn-cont {
                position: fixed !important;
                right: 20px !important;
                bottom: 20px !important;
                transform: scale(0.85);
                transform-origin: bottom right;
                z-index: 999999 !important;
              }
              #wa-widget-tooltip {
                display: none !important;
              }
            }"""

if old_css in content:
    content = content.replace(old_css, new_css)
    with open("components/whatsapp-widget.tsx", "w") as f:
        f.write(content)
    print("Fixed whatsapp-widget.tsx CSS")
else:
    print("Block not found in whatsapp-widget.tsx")
