# H7CTF 2025 - Staking Pool Challenge - Complete Setup Guide

## 📦 Challenge Summary

**Name:** Staking Pool - PDA Seed Collision  
**Category:** Blockchain Security / Solana  
**Difficulty:** Medium  
**Points:** 500  
**Flag:** `H7CTF{pda_s33d_c0ll1s10n_unlocks_admin_p00l}`

### Vulnerability Type
**PDA (Program Derived Address) Seed Collision** - The program concatenates organization name and employee ID without delimiters, allowing string manipulation to create hash collisions and gain unauthorized access to admin pools.

---

## 🏗️ Challenge Architecture

```
challenge2-staking-pool/
├── program/              # Vulnerable staking program
│   ├── src/
│   │   ├── lib.rs       # Program structures and helpers
│   │   ├── entrypoint.rs # Entry point
│   │   └── processor.rs  # VULNERABLE: PDA derivation without delimiters
│   └── Cargo.toml
├── server/               # CTF server (handles connections)
│   ├── src/
│   │   └── main.rs      # Socket server, challenge setup, validation
│   └── Cargo.toml
├── solve/                # Solution (organizer use only)
│   ├── src/
│   │   └── lib.rs       # Exploit: uses "H7Cor" + "padmin" collision
│   └── Cargo.toml
├── challenge/            # Docker deployment
│   ├── Dockerfile       # Multi-stage build
│   └── flag.txt         # The flag
├── dist/                 # Files to distribute to players
│   ├── README.md        # Challenge description
│   ├── Cargo.toml
│   └── src/             # Clean source WITHOUT vulnerability hints
├── solve.py              # Python script to submit exploit
└── README.md             # This file

```

---

## 🚀 Quick Start (For Organizers)

### Option 1: Docker (Recommended)

```bash
# Build image
cd challenge2-staking-pool
docker build -f challenge/Dockerfile -t h7ctf/staking-pool:latest .

# Run challenge
docker run -d -p 5001:5001 --name staking-pool h7ctf/staking-pool:latest

# Test
python3 solve.py localhost 5001
```

### Option 2: Local Development

```bash
# Build program
cd program
cargo-build-sbf

# Build server
cd ../server
cargo build --release
cp ../program/target/deploy/staking_pool.so .

# Run server
./target/release/staking-pool-server
```

---

## 🎯 How Players Solve It

### Step 1: Connect and Receive Info
```bash
nc ctf.h7sec.com 5001
```

Players receive:
- User private key (10 SOL)
- Staking program ID
- Admin pool PDA (H7Corp/admin, 100 SOL)
- Objective: Steal ≥50 SOL

### Step 2: Analyze Source Code

Players download `dist/` files and find vulnerable PDA derivation:

```rust
// In processor.rs
let (expected_pda, bump) = Pubkey::find_program_address(
    &[
        b"POOL",
        organization.as_bytes(),  // NO DELIMITER!
        employee_id.as_bytes(),   // NO DELIMITER!
    ],
    program_id,
);
```

### Step 3: Discover Collision

Realize:
- `"H7Corp" + "admin"` = `"H7Corpadmin"` (11 bytes after POOL prefix)
- `"H7Cor" + "padmin"` = `"H7Corpadmin"` (11 bytes after POOL prefix)
- **SAME PDA!**

### Step 4: Write Exploit

Create Solana program that:
1. Uses collision strings (`"H7Cor"`, `"padmin"`)
2. Calls Withdraw instruction
3. Transfers 50 SOL from admin pool

### Step 5: Submit and Get Flag

```bash
cargo build-sbf
python3 solve.py <host> <port>
```

**Result:**
```
Success! Flag: H7CTF{pda_s33d_c0ll1s10n_unlocks_admin_p00l}
```

---

## 🔧 Technical Details

### Program Instructions

| Instruction | Variant | Parameters | Description |
|-------------|---------|------------|-------------|
| Initialize | 0 | `organization: String, employee_id: String` | Create new staking pool |
| Stake | 1 | `amount: u64` | Deposit SOL to pool |
| Withdraw | 2 | `amount: u64` | Withdraw SOL from pool |

### PDA Derivation

**Current (Vulnerable):**
```rust
seeds: [b"POOL", org_bytes, emp_bytes]
// "H7Corp" + "admin" = "H7Corpadmin"
// "H7Cor" + "padmin" = "H7Corpadmin" <- COLLISION!
```

**Secure Fix:**
```rust
seeds: [b"POOL", b"|", org_bytes, b"|", emp_bytes]
// "H7Corp" + "|" + "admin" != "H7Cor" + "|" + "padmin"
```

### Server Flow

1. Accept TCP connection
2. Create user account (10 SOL)
3. Initialize admin pool (H7Corp/admin, 100 SOL)
4. Display credentials
5. Receive solve program from player
6. Read instruction details
7. Execute player's program
8. Check if user has ≥60 SOL
9. Send flag if successful

---

## 📦 Distribution Package

### Files in `dist/` (Give to Players)

```
dist/
├── README.md          # Challenge description, no hints
├── Cargo.toml         # Build configuration
└── src/
    ├── lib.rs         # Program structures (clean)
    ├── processor.rs   # Logic (NO COMMENTS about vulnerability)
    └── entrypoint.rs  # Entry point
```

### What NOT to Include

- ❌ `solve/` directory (solution code)
- ❌ `server/` directory (server code)
- ❌ `SOLUTION.md` (this file)
- ❌ `solve.py` (submission script)
- ❌ Vulnerability comments in source

---

## 🧪 Testing

### Test Docker Image
```bash
# Start container
docker run --rm -p 5002:5001 --name test h7ctf/staking-pool:latest &

# Run exploit
python3 solve.py localhost 5002

# Cleanup
docker stop test
```

### Test Local Build
```bash
# Terminal 1: Server
cd server
./target/release/staking-pool-server

# Terminal 2: Exploit
cd ..
python3 solve.py localhost 5001
```

### Expected Output
```
[*] Loaded exploit: 40480 bytes
[*] Connecting to localhost:5001...
...
Results:
  Your balance: 59 SOL

Success! Flag: H7CTF{pda_s33d_c0ll1s10n_unlocks_admin_p00l}

[+] Done!
```

---

## 🎓 Educational Value

### Security Lessons

1. **PDA Security:** Always use delimiters in seed concatenation
2. **Input Validation:** Validate not just individual inputs but their combinations
3. **Collision Attacks:** Understand how string concatenation can create collisions
4. **Borsh Serialization:** Learn Solana's data encoding format
5. **Cross-Program Invocation:** How to interact with other Solana programs

### Real-World Impact

Similar vulnerabilities have appeared in:
- Token mint authority collisions
- NFT metadata PDA exploits
- Governance vote manipulation
- DeFi vault access control bypass

### Recommended Resources

- Solana Cookbook: https://solanacookbook.com/
- Anchor Security: https://book.anchor-lang.com/
- Neodyme Security Workshop: https://workshop.neodyme.io/
- Sealevel Attacks: https://github.com/coral-xyz/sealevel-attacks

---

## 🔐 Security Notes

### For Organizers

1. **Flag Rotation:** Change flag for each CTF event
2. **Rate Limiting:** Implement connection limits if needed
3. **Monitoring:** Log all connections and exploit attempts
4. **Isolation:** Use Docker for security isolation
5. **Cleanup:** Restart containers between events

### Production Deployment

```yaml
# docker-compose.yml
version: '3.8'
services:
  staking-pool:
    image: h7ctf/staking-pool:latest
    ports:
      - "5001:5001"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Server fails to start
```bash
# Check if port is in use
lsof -i :5001
# Kill conflicting process
pkill -f staking-pool-server
```

**Issue:** Exploit fails with "Invalid instruction data"
- Check Borsh serialization format
- Verify instruction variant number (Withdraw = 2)
- Ensure account order matches processor expectations

**Issue:** Program build fails
```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
# Rebuild
cargo-build-sbf
```

---

## 📊 Challenge Statistics (Expected)

- **Average Solve Time:** 2-3 hours
- **First Blood Time:** 30-60 minutes (experienced players)
- **Solve Rate:** 15-25% of teams
- **Difficulty Ranking:** Medium (3/5)

### Skills Required

- ✅ Basic Solana/Rust knowledge
- ✅ Understanding of PDAs
- ✅ String manipulation awareness
- ✅ Borsh serialization
- ⭐ Advanced cryptography (NOT required)
- ⭐ Reverse engineering (NOT required)

---

## 📝 Challenge Variants

### Increase Difficulty

1. **Longer Strings:** Use 20+ character org names
2. **Multiple Admins:** Create 5+ admin pools, only one vulnerable
3. **Time Pressure:** Add execution timeout
4. **Obfuscation:** Compile program to BPF without source

### Decrease Difficulty

1. **Hints:** Add comments about PDA derivation
2. **Example:** Provide collision string example
3. **Skeleton:** Give partial exploit code
4. **Walkthrough:** Publish video tutorial after event

---

## 🏆 Credits

**Challenge Author:** H7CTF Team  
**Category:** Blockchain Security  
**Framework:** sol-ctf-framework by OtterSec  
**Inspiration:** N1CTF 2022 Simple Staking  

---

## 📄 License

This challenge is released for educational purposes. Feel free to use, modify, and distribute for CTF events and security training.

---

**Flag:** `H7CTF{pda_s33d_c0ll1s10n_unlocks_admin_p00l}`

**Good luck, and happy hacking!** 🚀🔐
