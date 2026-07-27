with open("app/page.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'className="md:hidden absolute inset-0 w-full h-full opacity-95"',
    'className="md:hidden absolute top-[118px] bottom-0 left-0 right-0 w-full opacity-95"'
)

with open("app/page.tsx", "w") as f:
    f.write(content)
print("done")
