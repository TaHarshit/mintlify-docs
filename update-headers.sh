#!/bin/bash

# Update all MDX files to use X-API-Token header format from Postman collection

FILES=(
  "api-reference/user/forgot-password.mdx"
  "api-reference/user/qrcode-signin.mdx"
  "api-reference/user/reset-password.mdx"
  "api-reference/user/signin.mdx"
  "api-reference/user/signup.mdx"
  "api-reference/user/update-password.mdx"
  "api-reference/overview.mdx"
)

for file in "${FILES[@]}"; do
  echo "Updating $file..."
  
  # Replace old header format with new X-API-Token format in cURL examples
  sed -i "s/--header 'platform: WEB' \\\\/--header 'X-API-Token: YOUR_API_TOKEN' \\\\/g" "$file"
  sed -i "s/--header 'api-key: FSS2023' \\\\/--header 'Content-Type: application\/json'/g" "$file"
  sed -i "/--header 'Authorization: Bearer YOUR_TOKEN_HERE'/d" "$file"
  sed -i "/--header 'Content-Type: application\/json'/d" "$file"
  sed -i "/--header 'Accept: application\/json'/d" "$file"
  
done

echo "All files updated!"
