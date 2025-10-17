# Use Alpine for smaller base image (5x smaller than slim)
FROM python:3.11-alpine AS builder

# Install build dependencies
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    libxml2-dev \
    libxslt-dev

WORKDIR /install
COPY NeuralFluxBackend/requirements.txt .

# Install Python packages to a specific directory
RUN pip install --no-cache-dir --prefix=/install --no-warn-script-location -r requirements.txt && \
    # Strip debug symbols and remove unnecessary files
    find /install -type d -name '__pycache__' -exec rm -rf {} + 2>/dev/null || true && \
    find /install -type d -name 'tests' -exec rm -rf {} + 2>/dev/null || true && \
    find /install -type d -name '*.dist-info' -exec rm -rf {}/RECORD {} + 2>/dev/null || true && \
    find /install -name '*.pyc' -delete && \
    find /install -name '*.pyo' -delete

# Final stage - minimal runtime image
FROM python:3.11-alpine

# Install only runtime dependencies
RUN apk add --no-cache \
    nginx \
    libxml2 \
    libxslt \
    util-linux && \
    # Remove unnecessary packages and files to save space
    rm -rf /usr/share/man/* /tmp/* /var/cache/apk/* && \
    # Optimize Python by removing unused stdlib modules
    cd /usr/local/lib/python3.11 && \
    rm -rf test/ ensurepip/ idlelib/ tkinter/ turtledemo/

# Copy installed Python packages from builder
COPY --from=builder /install /usr/local

# Create non-root user for security
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser

# Create necessary directories
RUN mkdir -p /app/backend /app/web /var/log/nginx /var/lib/nginx /run/nginx && \
    chown -R appuser:appuser /app /var/log/nginx /var/lib/nginx /run/nginx

WORKDIR /app/backend

# Copy only necessary backend files (excludes env/, .git/, etc.)
COPY --chown=appuser:appuser NeuralFluxBackend/*.py NeuralFluxBackend/*.json NeuralFluxBackend/*.txt ./
COPY --chown=appuser:appuser NeuralFluxBackend/.env ./
COPY --chown=appuser:appuser NeuralFluxBackend/clientSide ./clientSide
COPY --chown=appuser:appuser NeuralFluxBackend/uploads ./uploads

# Copy web files (only prod branch if possible)
WORKDIR /app/web
COPY --chown=appuser:appuser NeuralFluxWeb .

# Configure Nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/sites-enabled/default

# Copy optimized startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create FLAG content during build (will be written to /.dockerenv at runtime by entrypoint)
RUN echo "FLAG=H7CTF{FR0m_m1sc0nfigs_4ND_API_ATT4CK5_T0_XX3_1nj3ctioN_$(uuidgen)}" > /tmp/flag_content.txt && \
    chmod 644 /tmp/flag_content.txt

EXPOSE 80

# Use entrypoint to write flag to /.dockerenv as root, then execute start.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["/app/start.sh"]
