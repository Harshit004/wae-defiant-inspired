import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# Find the start of the section
start_idx = content.find('<section\n        className="bg-black text-white border-b border-[#FFFFFF4D]"\n        style={{\n          paddingBottom: \'123px\',\n          paddingLeft: \'7.5vw\',\n          paddingRight: \'7.5vw\'\n        }}\n      >')
if start_idx == -1:
    print("Could not find start of section")
    sys.exit(1)

# Find end of section
end_idx = content.find('</section>', start_idx) + len('</section>')

old_section = content[start_idx:end_idx]

# Desktop part is the content inside old_section but without the <section> tags
# Wait, the section tag also has inline styles for padding which we want to move to the desktop container.
desktop_content = old_section[old_section.find('>')+1:old_section.rfind('</section>')]

# Wait, we can just replace the whole section.
new_section = f"""<section className="bg-black text-white md:border-b-0">
        {{/* Desktop Layout */}}
        <div className="w-full hidden md:block border-b border-[#FFFFFF4D]" style={{{{ paddingBottom: '123px', paddingLeft: '7.5vw', paddingRight: '7.5vw' }}}}>
          {desktop_content}
        </div>

        {{/* Mobile Layout */}}
        <div className="w-full md:hidden flex flex-col py-[20.35vw] px-[6.1vw] border-b border-[#FFFFFF4D]">
          <h3 style={{{{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.58vw', lineHeight: '115%' }}}}>
            Sustainability
          </h3>
          <div style={{{{ height: '7.12vw' }}}} />
          <h2 style={{{{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: '7.12vw', lineHeight: '105%' }}}}>
            Carbon Neutral water from water intake to water reuse
          </h2>
          <div style={{{{ height: '5.59vw' }}}} />
          <p style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '100%', color: '#AEAEAE' }}}}>
            Carbon neutrality isn't an afterthought at WAE. It is built into every stage.
          </p>
          <div style={{{{ height: '19.84vw' }}}} />
          
          <div className="w-full relative" style={{{{ height: '42.74vw' }}}}>
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fd6e76cf-b35a-46af-de19-8caa2b168300/public"
              alt="Carbon Neutral Illustration"
              fill
              className="object-cover"
            />
          </div>

          <div style={{{{ height: '15.77vw' }}}} />

          {{/* 1. Carbon Neutrality by Design */}}
          <div className="flex flex-col">
            <h4 style={{{{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.07vw', lineHeight: '100%' }}}}>
              1. Carbon Neutrality by Design
            </h4>
            <div style={{{{ height: '3.05vw' }}}} />
            <p className="leading-normal" style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '120%', color: '#AEAEAE' }}}}>
              WAE engineers carbon neutrality across stages. From ZED Gold manufacturing to optimised distribution and point-of-use purification. Each verifiable installation helps reduce Scope 3 emissions by eliminating packaged water.
            </p>
            <div style={{{{ height: '9.41vw' }}}} />
            <div className="w-full h-px bg-[#FFFFFF4D]" />
            <div style={{{{ height: '9.41vw' }}}} />
          </div>

          {{/* 2. ESG Performance & Reporting */}}
          <div className="flex flex-col">
            <h4 style={{{{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.07vw', lineHeight: '100%' }}}}>
              2. ESG Performance & Reporting
            </h4>
            <div style={{{{ height: '3.05vw' }}}} />
            <p className="leading-normal" style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '120%', color: '#AEAEAE' }}}}>
              WAE solutions deliver measurable outcomes across ESG. They reduce plastic and carbon, enable hydration, and meet GRIHA, CE, and IWQA standards. With 20,000+ installations, WAE gives sustainability teams reportable data.
            </p>
            <div style={{{{ height: '9.41vw' }}}} />
            <div className="w-full h-px bg-[#FFFFFF4D]" />
            <div style={{{{ height: '9.41vw' }}}} />
          </div>

          {{/* 3. Water Stewardship */}}
          <div className="flex flex-col">
            <h4 style={{{{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.07vw', lineHeight: '100%' }}}}>
              3. Water Stewardship
            </h4>
            <div style={{{{ height: '3.05vw' }}}} />
            <p className="leading-normal" style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '120%', color: '#AEAEAE' }}}}>
              WAE manages the full water lifecycle. From multi-stage RO purification to IoT-monitored point-of-use dispensing. Every installation enables traceability, accountability, zero waste, and water stewardship.
            </p>
            <div style={{{{ height: '9.41vw' }}}} />
            <div className="w-full h-px bg-[#FFFFFF4D]" />
            <div style={{{{ height: '9.41vw' }}}} />
          </div>

          {{/* 4. Net Zero Alignment */}}
          <div className="flex flex-col">
            <h4 style={{{{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.07vw', lineHeight: '100%' }}}}>
              4. Net Zero Alignment
            </h4>
            <div style={{{{ height: '3.05vw' }}}} />
            <p className="leading-normal" style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '120%', color: '#AEAEAE' }}}}>
              WAE eliminates the emission chain of single-use plastic water. From production and transport to refrigeration and disposal. Each active system removes an estimated 20,000–30,000 bottles per year. It supports verified Scope 3 reductions aligned with SBTi and net zero goals.
            </p>
          </div>

        </div>
      </section>"""

content = content.replace(old_section, new_section)

with open("app/page.tsx", "w") as f:
    f.write(content)
print("Done")
