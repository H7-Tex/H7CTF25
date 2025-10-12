#!/bin/bash
# Prepare deployment package for remote server

set -e

echo "[*] Preparing Staking Pool challenge for deployment..."

# Create deployment directory structure
DEPLOY_DIR="deploy"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

echo "[*] Copying deployment files..."

# Copy Dockerfile
cp challenge/Dockerfile.new "$DEPLOY_DIR/Dockerfile"

# Copy entrypoint
cp challenge/entrypoint.sh "$DEPLOY_DIR/"
chmod +x "$DEPLOY_DIR/entrypoint.sh"

# Copy docker-compose
cp challenge/docker-compose.yml "$DEPLOY_DIR/"

# Copy program source
mkdir -p "$DEPLOY_DIR/program"
cp -r program/src "$DEPLOY_DIR/program/"
cp program/Cargo.toml "$DEPLOY_DIR/program/"
cp program/Cargo.lock "$DEPLOY_DIR/program/"

# Copy server source
mkdir -p "$DEPLOY_DIR/server"
cp -r server/src "$DEPLOY_DIR/server/"
cp server/Cargo.toml "$DEPLOY_DIR/server/"
cp server/Cargo.lock "$DEPLOY_DIR/server/"

echo "[*] Creating tarball..."
tar -czf staking-pool-deploy.tar.gz "$DEPLOY_DIR"

echo "[+] Deployment package ready: staking-pool-deploy.tar.gz"
echo ""
echo "To transfer to remote server:"
echo "scp -i ~/.ssh/id_ed25519 staking-pool-deploy.tar.gz abu@34.47.248.248:~/Challenges/web3-2/"
echo ""
echo "Then on the server:"
echo "cd ~/Challenges/web3-2"
echo "tar -xzf staking-pool-deploy.tar.gz"
echo "cd deploy"
echo "docker build -t h7ctf/staking-pool:latest ."
