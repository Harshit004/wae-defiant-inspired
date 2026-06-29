import re

with open('app/sustainability/page.tsx', 'r') as f:
    content = f.read()

start_transform = content.find('TRANSFORMATIONS SECTION')
end_transform = content.find('EARTH SECTION')

if start_transform != -1 and end_transform != -1:
    block = content[start_transform:end_transform]
    
    # Left Column
    block = re.sub(
        r'<div className="w-\[30\%\] border-r border-white/20 pr-\[40px\]">.*?</div>',
        '''<div className="w-[30%] border-r border-white/20 pr-[5.97vw]">
              <h2 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "2.77vw",
                color: "#FFFFFF",
                lineHeight: "110%",
                verticalAlign: "middle",
                marginBottom: "1.94vw"
              }}>Transformations</h2>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.97vw",
                color: "#AEAEAE",
                lineHeight: "100%",
                verticalAlign: "middle"
              }}>The success stories that changed what sustainable hydration looks like.</p>
            </div>''',
        block, flags=re.DOTALL
    )
    
    # Right Column wrapper
    block = block.replace('<div className="w-[70%] flex flex-col pl-[40px]">', '<div className="w-[70%] flex flex-col pl-[3.47vw]">\n              <div className="grid grid-cols-2 gap-x-[6.38vw] gap-y-[4.51vw]">')
    
    # Remove the inner flex wrappers (Top Row, Bottom Row)
    block = re.sub(r'<!-- Top Row: .*? -->', '', block)
    block = re.sub(r'<!-- Bottom Row: .*? -->', '', block)
    block = block.replace('<div className="flex border-b border-white/20 pb-[40px] mb-[40px]">', '')
    block = block.replace('<div className="flex">', '')
    block = block.replace('<div className="w-1/2 pr-[40px]">', '<div>')
    block = block.replace('<div className="w-1/2 pl-[40px]">', '<div>')
    block = block.replace('<div className="w-1/2 border-r border-white/20 pr-[40px]">', '<div>')
    # Actually wait, replacing those wrappers will leave hanging </div>s.
    
    content = content[:start_transform] + block + content[end_transform:]

with open('app/sustainability/page.tsx', 'w') as f:
    f.write(content)
