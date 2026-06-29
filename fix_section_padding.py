import re

with open('app/sustainability/page.tsx', 'r') as f:
    content = f.read()

# Replace all section paddings to be consistent (4.72vw which is 68px)
# We have variations like:
# pt-[100px] pb-[100px]
# pt-[120px] pb-[120px]
# pt-[4.72vw] pb-[6.94vw]

content = re.sub(r'pt-\[100px\] pb-\[100px\]', 'pt-[4.72vw] pb-[4.72vw]', content)
content = re.sub(r'pt-\[120px\] pb-\[120px\]', 'pt-[4.72vw] pb-[4.72vw]', content)
content = re.sub(r'pt-\[4\.72vw\] pb-\[6\.94vw\]', 'pt-[4.72vw] pb-[4.72vw]', content)
content = re.sub(r'pt-\[80px\] pb-\[80px\]', 'pt-[4.72vw] pb-[4.72vw]', content)

with open('app/sustainability/page.tsx', 'w') as f:
    f.write(content)
