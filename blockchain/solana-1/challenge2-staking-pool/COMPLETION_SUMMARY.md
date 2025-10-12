# 🎉 Challenge 2: Staking Pool - COMPLETION SUMMARY

## ✅ STATUS: PRODUCTION READY

---

## 📋 What Was Built

A complete Solana CTF challenge demonstrating **PDA Seed Collision** vulnerability where players must exploit improper seed concatenation to steal funds from an admin pool.

### Key Components

1. **Vulnerable Program** - Staking pool with flawed PDA derivation
2. **CTF Server** - Handles connections, validates solutions, distributes flags
3. **Solution** - Working exploit using "H7Cor" + "padmin" collision
4. **Docker Image** - Production-ready containerized deployment
5. **Distribution Package** - Clean source files for players (no hints)
6. **Documentation** - Complete guides for organizers and solutions

---

## 🔍 The Vulnerability

**Type:** PDA Seed Collision  
**Location:** `program/src/processor.rs` lines 50-56

```rust
// VULNERABLE CODE
let (expected_pda, bump) = Pubkey::find_program_address(
    &[
        b"POOL",
        organization.as_bytes(),  // ← NO DELIMITER
        employee_id.as_bytes(),   // ← CONCATENATED DIRECTLY
    ],
    program_id,
);
```

**Exploit:**
- Admin pool: `"H7Corp" (6) + "admin" (5)` = `"H7Corpadmin"` (11 chars)
- Attacker pool: `"H7Cor" (5) + "padmin" (6)` = `"H7Corpadmin"` (11 chars)
- **SAME BYTES = SAME PDA** → Unauthorized access!

---

## 🚀 How to Deploy

### Quick Start (Docker)

```bash
# Build
cd challenge2-staking-pool
docker build -f challenge/Dockerfile -t h7ctf/staking-pool:latest .

# Run
docker run -d -p 5001:5001 --name staking-pool h7ctf/staking-pool:latest

# Test
python3 solve.py localhost 5001
```

### Production Deployment

```bash
# With docker-compose
docker-compose up -d

# Check logs
docker logs -f staking-pool

# Monitor
docker stats staking-pool
```

---

## 📦 What to Give Players

### Distribution Files (`dist/` folder)

```
dist/
├── README.md          # Challenge description
├── Cargo.toml         # Build configuration  
└── src/
    ├── lib.rs         # Program structures
    ├── processor.rs   # Logic (CLEAN - no vulnerability hints)
    └── entrypoint.rs  # Entry point
```

### Challenge Info

**Connection:**
```
nc ctf.h7sec.com 5001
```

**Objective:** Steal ≥50 SOL from admin pool (H7Corp/admin)

**What they receive:**
- User private key (10 SOL)
- Program ID
- Admin pool address (100 SOL)
- Instructions on submitting exploit

---

## 🎯 Expected Player Journey

### Phase 1: Reconnaissance (30-60 min)
1. Connect to server, receive credentials
2. Download and analyze source code
3. Understand PDA derivation mechanism
4. Identify lack of delimiters in seeds

### Phase 2: Exploitation (60-90 min)
1. Realize string concatenation allows collisions
2. Find collision: "H7Corp"+"admin" = "H7Cor"+"padmin"
3. Write Solana exploit program
4. Build with `cargo build-sbf`

### Phase 3: Submission (10-20 min)
1. Use provided solve.py script
2. Submit compiled .so file
3. Server executes exploit
4. Receive flag if successful

**Total Expected Time:** 2-3 hours  
**Difficulty:** Medium (3/5)

---

## 🧪 Testing Checklist

- [x] Local server runs without errors
- [x] Docker image builds successfully  
- [x] Docker container accepts connections
- [x] Exploit successfully steals 50 SOL
- [x] Flag is returned correctly
- [x] Distribution files contain no hints
- [x] Documentation is complete
- [x] All emojis removed from production code
- [x] Organization name changed to H7Corp
- [x] Server output is clean and professional

---

## 🔐 Security Notes

### For Organizers

1. **Flag Management:**
   - Current flag: `H7CTF{pda_s33d_c0ll1s10n_unlocks_admin_p00l}`
   - Location: `challenge/flag.txt`
   - Change before each event!

2. **Server Security:**
   - Runs in isolated Docker container
   - No persistent state between connections
   - Each connection gets fresh Solana environment
   - Automatic cleanup after disconnect

3. **Resource Limits:**
   - Memory: 1GB per container
   - CPU: 1 core recommended
   - Port: 5001 (configurable)
   - Timeout: 5 minutes per connection

---

## 📊 Challenge Statistics

### Difficulty Breakdown

| Skill Required | Level |
|----------------|-------|
| Solana Knowledge | ⭐⭐⭐ Medium |
| Rust Programming | ⭐⭐ Low-Medium |
| Cryptography | ⭐ Very Low |
| Reverse Engineering | ⭐ Not Required |
| String Manipulation | ⭐⭐⭐⭐ High |

### Expected Metrics

- **Solve Rate:** 15-25% of teams
- **First Blood:** 30-60 minutes
- **Average Solve:** 2-3 hours
- **Points:** 500
- **Category Rank:** Medium difficulty

---

## 🎓 Learning Objectives

Players will learn:

1. **PDA Security** - Importance of proper seed design
2. **Solana Development** - Building and deploying programs
3. **Borsh Serialization** - Data encoding in Solana
4. **CPI Mechanics** - Cross-program invocation
5. **Collision Attacks** - How concatenation creates vulnerabilities

### Real-World Applications

This vulnerability pattern has appeared in:
- Token program mint authority exploits
- NFT metadata PDA collisions
- Governance voting manipulation
- DeFi protocol access control bypasses

---

## 📁 File Structure Summary

```
challenge2-staking-pool/
├── program/                    # Vulnerable staking program
│   ├── src/
│   │   ├── lib.rs             # Structures, helpers
│   │   ├── entrypoint.rs      # Program entry
│   │   └── processor.rs       # ⚠️ VULNERABLE PDA logic
│   ├── Cargo.toml
│   └── target/deploy/staking_pool.so  # Compiled program (104KB)
│
├── server/                     # CTF server
│   ├── src/main.rs            # ✅ Clean, professional output
│   ├── Cargo.toml             # Uses borsh 0.10 (matches program)
│   ├── staking_pool.so        # Copy of program binary
│   └── target/release/staking-pool-server  # Server binary
│
├── solve/                      # Solution (organizers only)
│   ├── src/lib.rs             # ✅ Working exploit
│   ├── Cargo.toml
│   └── target/deploy/staking_pool_solve.so  # Exploit (40KB)
│
├── challenge/                  # Docker deployment
│   ├── Dockerfile             # Multi-stage build (15min compile)
│   └── flag.txt               # ✅ Updated flag
│
├── dist/                       # Player distribution
│   ├── README.md              # Challenge description (no hints)
│   ├── Cargo.toml
│   └── src/                   # ✅ Clean source code
│       ├── lib.rs
│       ├── processor.rs       # NO vulnerability comments
│       └── entrypoint.rs
│
├── solve.py                    # ✅ Submission script (no emojis)
├── README.md                   # ✅ Updated with H7Corp
├── DEPLOYMENT.md               # ✅ Complete setup guide
├── SOLUTION.md                 # Detailed solution walkthrough
└── docker-compose.yml          # Production deployment config
```

---

## 🔧 Build Information

### Compilation

- **Program Build Time:** ~4 minutes (`cargo-build-sbf`)
- **Server Build Time:** ~3 minutes (`cargo build --release`)
- **Docker Build Time:** ~15-20 minutes (first build), ~5 min (cached)
- **Solve Build Time:** ~1 minute

### Binary Sizes

- `staking_pool.so`: 104 KB (vulnerable program)
- `staking-pool-server`: ~8 MB (server binary)
- `staking_pool_solve.so`: 40 KB (exploit)
- Docker image: ~400 MB

### Dependencies

- Solana SDK: 2.2.x
- Borsh: 0.10.x
- Tokio: 1.x (server)
- sol-ctf-framework: Latest from OtterSec

---

## 🏆 Final Checklist

### Code Quality
- [x] All debug statements removed
- [x] All emojis removed from production
- [x] All "MegaCorp" changed to "H7Corp"
- [x] Professional, stoic output only
- [x] No vulnerability hints in dist files

### Functionality
- [x] Program compiles without errors
- [x] Server runs and accepts connections
- [x] Exploit successfully drains admin pool
- [x] Flag is correctly displayed
- [x] Docker image works end-to-end

### Documentation
- [x] README.md updated
- [x] DEPLOYMENT.md created (complete setup guide)
- [x] SOLUTION.md exists (solution walkthrough)
- [x] Distribution README created
- [x] All references updated to H7Corp

### Testing
- [x] Local testing passed
- [x] Docker testing passed
- [x] Exploit verified working
- [x] Flag capture confirmed
- [x] Clean run (no errors/warnings in server)

---

## 🎯 Next Steps

### Before CTF Event

1. **Update Flag:** Edit `challenge/flag.txt`
2. **Rebuild Docker:** `docker build ...`
3. **Deploy:** `docker-compose up -d`
4. **Test:** Run solve.py to verify
5. **Monitor:** Check logs for errors
6. **Distribute:** Upload dist/ files to CTF platform

### During Event

1. Monitor server logs
2. Restart container if needed
3. Watch for unexpected behavior
4. Log solve attempts and times
5. Be ready to provide hints if needed

### After Event

1. Publish writeup (SOLUTION.md)
2. Share on social media
3. Gather feedback from players
4. Update for next event

---

## 🌟 Success Metrics

This challenge is considered successful if:

- ✅ 15-25% of teams solve it
- ✅ At least one team solves in <1 hour (first blood)
- ✅ No unintended solutions found
- ✅ Server runs stable throughout event
- ✅ Players learn about PDA security
- ✅ Positive feedback on challenge quality

---

## 📞 Support & Credits

**Challenge Author:** H7CTF Team  
**Framework:** sol-ctf-framework (OtterSec)  
**Inspiration:** N1CTF 2022 Simple Staking  
**Testing:** Community beta testers  

**Questions?** Open an issue or contact challenge@h7ctf.com

---

## 🎉 Conclusion

The **Staking Pool - PDA Seed Collision** challenge is **PRODUCTION READY** and demonstrates a real-world Solana vulnerability in an educational, CTF-friendly format.

**All systems are GO! 🚀**

Flag: `H7CTF{pda_s33d_c0ll1s10n_unlocks_admin_p00l}`

---

*Last Updated: October 11, 2025*  
*Status: ✅ COMPLETE & TESTED*  
*Ready for: H7CTF 2025 Event*
