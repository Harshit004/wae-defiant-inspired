import sys

with open("components/whatsapp-widget.tsx", "r") as f:
    content = f.read()

# Add an ID to the tooltip so we can style it via CSS
old_tooltip = """        const tooltip = document.createElement("div");
        tooltip.innerText = "Chat With Us";"""
new_tooltip = """        const tooltip = document.createElement("div");
        tooltip.id = "wa-widget-tooltip";
        tooltip.innerText = "Chat With Us";"""

# Add media query to hide tooltip on mobile
old_css = """            @media (max-width: 768px) {
              #df-btn-cont {
                right: 20px !important;
                bottom: 20px !important;
                transform: scale(0.85);
                transform-origin: bottom right;
              }
            }"""
new_css = """            @media (max-width: 768px) {
              #df-btn-cont {
                right: 20px !important;
                bottom: 20px !important;
                transform: scale(0.85);
                transform-origin: bottom right;
              }
              #wa-widget-tooltip {
                display: none !important;
              }
            }"""

content = content.replace(old_tooltip, new_tooltip)
content = content.replace(old_css, new_css)

with open("components/whatsapp-widget.tsx", "w") as f:
    f.write(content)

print("Fixed whatsapp tooltip")
