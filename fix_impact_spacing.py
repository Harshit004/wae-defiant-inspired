import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# Replace the outer padding
content = content.replace(
    'className="w-full md:hidden flex flex-col relative z-10 py-[20.35vw] px-[6.1vw]"',
    'className="w-full md:hidden flex flex-col relative z-10 py-[13.74vw] px-[6.1vw]"'
)

# Replace "Impact" text style
content = content.replace(
    '''<h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '8.14vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Impact
          </h2>''',
    '''<h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '7.12vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Impact
          </h2>'''
)

# 10px gap is already 2.54vw (I had it as 2.54vw previously!)
# Wait, let's check what I had.
content = content.replace(
    '''<div style={{ height: '2.54vw' }} />
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.58vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Real numbers. Real results.
          </p>''',
    '''<div style={{ height: '2.54vw' }} />
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '3.56vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Real numbers. Real results.
          </p>'''
)

content = content.replace(
    '''<p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.58vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Real numbers. Real results.
          </p>''',
    '''<p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '3.56vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Real numbers. Real results.
          </p>'''
)

# 24px gap = 6.1vw (was 8.14vw)
content = content.replace(
    '''<p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '3.56vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Real numbers. Real results.
          </p>
          <div style={{ height: '8.14vw' }} />''',
    '''<p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '3.56vw', lineHeight: '110%', color: '#FFFFFF' }}>
            Real numbers. Real results.
          </p>
          <div style={{ height: '6.1vw' }} />'''
)


# Measured outcomes
content = content.replace(
    '''<p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.56vw', lineHeight: '130%', color: '#AEAEAE' }}>
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>''',
    '''<p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '100%', color: '#AEAEAE' }}>
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>'''
)

# 48px gap (12.21vw)
content = content.replace(
    '''<p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '100%', color: '#AEAEAE' }}>
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>
          <div style={{ height: '8.14vw' }} />''',
    '''<p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '100%', color: '#AEAEAE' }}>
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>
          <div style={{ height: '12.21vw' }} />'''
)

# 177px gap below button
content = content.replace(
    '''</HoverButton>
          </Link>

          <div style={{ height: '100vw' }} />''',
    '''</HoverButton>
          </Link>

          <div style={{ height: '45.03vw' }} />'''
)

with open("app/page.tsx", "w") as f:
    f.write(content)
print("Impact spacing updated")
