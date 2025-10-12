#!/bin/sh

# Generate unique flag with UUID each time container starts
FLAG_VALUE=$(echo "H7CTF{al0ha_m1ddl3ware_m1ddl3ware_m1ddl3ware_$(uuidgen)}" | base64 | base64 | tr -d '\n')
echo "New Data: $FLAG_VALUE"

# Replace the flag in the source file BEFORE building
perl -i -pe "s/\"FLAG_HERE\"/\"$FLAG_VALUE\"/g" /app/app/forbidden/chamber-of-secrets/page.tsx

echo "Flag updated with new UUID, now building..."

# Build the Next.js application with the new flag
pnpm run build

echo "Build complete, starting server..."

# Start the Next.js server
exec pnpm start -p 8080
