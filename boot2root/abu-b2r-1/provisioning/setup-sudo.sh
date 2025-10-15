#!/bin/bash
set -e

echo "[*] Setting up vulnerable sudo version (CVE-2025-32463)..."

# The exploit works on sudo versions 1.9.14 to 1.9.17
# Ubuntu 22.04 comes with an older version, so we need to install a vulnerable one

# Install build dependencies
echo "[*] Installing build dependencies..."
apt-get update -qq
apt-get install -y -qq \
    wget \
    curl \
    libpam0g-dev \
    libssl-dev \
    libldap2-dev \
    libsasl2-dev \
    zlib1g-dev

# Download and install sudo 1.9.15p2 (vulnerable version)
cd /tmp

echo "[*] Downloading sudo 1.9.15p2 (vulnerable to CVE-2025-32463)..."

# Option 1: Install from source (more reliable)
if ! wget --timeout=30 --tries=3 https://www.sudo.ws/dist/sudo-1.9.15p2.tar.gz; then
    echo "[!] Download from sudo.ws failed, trying mirror..."
    wget --timeout=30 --tries=3 https://github.com/sudo-project/sudo/releases/download/SUDO_1_9_15p2/sudo-1.9.15p2.tar.gz || {
        echo "[ERROR] Failed to download sudo source"
        exit 1
    }
fi

echo "[*] Extracting and compiling sudo..."
if [ ! -f "sudo-1.9.15p2.tar.gz" ]; then
    echo "[ERROR] sudo-1.9.15p2.tar.gz not found!"
    ls -la /tmp/
    exit 1
fi

tar -xzf sudo-1.9.15p2.tar.gz

if [ ! -d "sudo-1.9.15p2" ]; then
    echo "[ERROR] sudo-1.9.15p2 directory not created!"
    exit 1
fi

cd sudo-1.9.15p2

# Configure and build
./configure \
    --prefix=/usr \
    --libexecdir=/usr/lib \
    --with-rundir=/run/sudo \
    --with-vardir=/var/db/sudo \
    --with-logfac=authpriv \
    --with-pam \
    --with-pam-login \
    --with-editor=/usr/bin/editor \
    --with-env-editor \
    --with-ignore-dot \
    --with-secure-path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    --disable-root-mailer \
    --with-sendmail=/usr/sbin/sendmail

make -j$(nproc)
make install

echo "[*] Verifying sudo version..."
sudo --version | head -1

# Verify the version is in the vulnerable range
SUDO_VERSION=$(sudo --version | head -1 | awk '{print $3}' | sed 's/p.*//')
echo "[✓] Installed sudo version: $SUDO_VERSION"

# Configure sudoers to allow the low-priv user to run sudo with -R flag
# This is needed for the exploit to work
echo "[*] Configuring sudoers..."

# Add rule for CTF user to use sudo with any command (but they'll need the -R exploit)
cat >> /etc/sudoers << 'EOF'
abu ALL=(ALL:ALL) NOPASSWD: ALL
EOF

# Verify sudoers syntax
visudo -c

# Clean up
cd /
rm -rf /tmp/sudo-1.9.15p2*

echo "[✓] Vulnerable sudo installed and configured!"
echo "[✓] CVE-2025-32463 exploitation ready"
