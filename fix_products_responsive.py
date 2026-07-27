with open("app/page.tsx", "r") as f:
    content = f.read()

products_mobile_start = content.find('<MobileCarousel>\n            {/* Aurela */}')
products_mobile_end = content.find('</MobileCarousel>', products_mobile_start)

if products_mobile_start != -1:
    products_inner = content[products_mobile_start:products_mobile_end]
    products_inner = products_inner.replace('p-8', 'p-[8vw]')
    content = content[:products_mobile_start] + products_inner + content[products_mobile_end:]

with open("app/page.tsx", "w") as f:
    f.write(content)
print("done")
