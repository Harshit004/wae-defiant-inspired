import os
import re

files_to_update = [
    "app/careers/page.tsx",
    "app/join-wae/page.tsx"
]

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r") as f:
        content = f.read()
        
    # Replace the fixed w/h classes with the new padding
    new_content = re.sub(
        r'w-\[6\.87vw\] h-\[2\.43vw\] min-w-\[99px\] min-h-\[35px\]',
        'px-[16px] py-[10.5px] w-fit',
        content
    )
    
    if new_content != content:
        with open(file_path, "w") as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No match found in {file_path}")

