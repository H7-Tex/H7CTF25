#!/bin/sh

# This runs as root before the main command
# Write FLAG to /.dockerenv (Docker creates it empty, so we need to append at runtime)
if [ -f /tmp/flag_content.txt ]; then
    cat /tmp/flag_content.txt > /.dockerenv
    chmod 644 /.dockerenv
fi

# Execute the main command (start.sh)
exec "$@"
