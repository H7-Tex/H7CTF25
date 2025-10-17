#!/bin/bash
set -e

# Generate dynamic UUID for flag (use first 8 chars only for faster extraction)
UUID=$(uuidgen | cut -c1-8)

# Create flag file with dynamic UUID (shorter static text for faster solve)
echo "H7CTF{r0p_j41l_${UUID}}" > /flag

echo "Starting seccomp-jail challenge on port 1337..."

# Run with socat for TCP access
exec socat TCP-LISTEN:1337,reuseaddr,fork EXEC:"/app/chal",su=ctfuser
