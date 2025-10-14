# ===== Base image =====
FROM python:3.10-slim

# ===== system dependencies =====
RUN apt-get update && apt-get install -y --no-install-recommends \
    socat \
    && rm -rf /var/lib/apt/lists/*

# =====  challenge directory =====
WORKDIR /app

# =====  challenge files =====
COPY . /app

# ===== Python dependencies =====

RUN pip install --no-cache-dir pycryptodome gmpy2

# ===== Create unprivileged user =====
RUN useradd -m ctf
USER ctf

# ===== Expose challenge port =====
EXPOSE 10000

# ===== Run the service =====
CMD ["python3", "server.py"]
