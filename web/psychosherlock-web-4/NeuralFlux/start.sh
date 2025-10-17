#!/bin/sh

# Start Flask backend with Gunicorn (production WSGI server)
cd /app/backend
gunicorn --bind 127.0.0.1:5000 \
         --workers 1 \
         --threads 2 \
         --worker-class gthread \
         --worker-tmp-dir /dev/shm \
         --max-requests 1000 \
         --max-requests-jitter 50 \
         --timeout 30 \
         --keep-alive 5 \
         --limit-request-line 4096 \
         --limit-request-fields 50 \
         --limit-request-field_size 8190 \
         --access-logfile - \
         --error-logfile - \
         --log-level error \
         app:app &

# Wait for Gunicorn to start
sleep 2

# Start nginx in foreground (it serves static files directly)
exec nginx -g 'daemon off;'
