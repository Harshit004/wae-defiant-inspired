#!/bin/bash

# This script updates all logo links to point to the root path ("/") in all relevant files

# Find all files containing the logo image URL and update the Link href attributes
find /Users/harshit/Desktop/WAE\ new/app -type f -name "*.tsx" -exec sed -i '' -E 's/<Link href="[^"]*">[[:space:]]*<Image[[:space:]]+src="https:\/\/imagedelivery\.net\/R9aLuI8McL_Ccm6jM8FkvA\/34074342-7005-4a25-9763-86933d6e7700\/public"/<Link href="\/">\n                  <Image src="https:\/\/imagedelivery.net\/R9aLuI8McL_Ccm6jM8FkvA\/34074342-7005-4a25-9763-86933d6e7700\/public"/g' {} \;

echo "Logo links have been updated to point to the root path ('/') in all relevant files."
