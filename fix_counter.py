import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# Replace the Counter declaration
old_decl = 'const Counter: FC<{ value: number; suffix?: string; trigger?: boolean }> = ({ value, suffix = "", trigger = true }) => {'
new_decl = 'const Counter: FC<{ value: number; suffix?: string; trigger?: boolean; className?: string; style?: React.CSSProperties }> = ({ value, suffix = "", trigger = true, className, style }) => {'

if old_decl in content:
    content = content.replace(old_decl, new_decl)
    
    # Also update the return statement in Counter
    old_ret = """  return (
    <h3
      ref={nodeRef}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
        fontSize: '40px',
        lineHeight: '200%',
        color: '#FFFFFF',
        textTransform: 'uppercase'
      }}
    >"""
    new_ret = """  return (
    <h3
      ref={nodeRef}
      className={className}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
        fontSize: '40px',
        lineHeight: '200%',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        ...style
      }}
    >"""
    
    content = content.replace(old_ret, new_ret)
    
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("Counter updated successfully")
else:
    print("Counter declaration not found")
