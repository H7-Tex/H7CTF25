#!/bin/bash
# Prepare player distribution package

set -e

echo "[*] Preparing player distribution package..."

DIST_DIR="player-dist"
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR/staking-pool/src"

# Copy lib.rs without helper function comments
sed '/^\/\/ Helper functions/d; /^\/\/ Helper to derive/d' \
    program/src/lib.rs > "$DIST_DIR/staking-pool/src/lib.rs"

# Copy entrypoint as-is
cp program/src/entrypoint.rs "$DIST_DIR/staking-pool/src/"

# Create processor.rs without vulnerability comments
sed '/VULNERABILITY:/d; /PDA seed collision/d; /Problem:/d; /This allows unauthorized/d; /^\/\/ Security Note:/d; /^    \/\/ Seeds:/d' \
    program/src/processor.rs > "$DIST_DIR/staking-pool/src/processor.rs"

# Copy Cargo.toml
cp program/Cargo.toml "$DIST_DIR/staking-pool/"

# Create tarball
cd "$DIST_DIR"
tar -czf ../staking-pool-player.tar.gz staking-pool/
cd ..

echo "[+] Player distribution ready: staking-pool-player.tar.gz"
echo "[+] Package contains only source code (no README)"
echo "[+] Upload to CTFd and put challenge description in CTFd interface"
