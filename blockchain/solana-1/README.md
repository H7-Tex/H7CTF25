# H7CTF 2025 - Solana Security Challenges

Welcome to the Solana security challenges for H7CTF 2025! These challenges are designed to teach you about common vulnerabilities in Solana smart contracts through hands-on exploitation.

## 🎯 Challenges Overview

### Challenge 1: Token Vault (Easy)
**Port:** 5000  
**Points:** 100  
**Vulnerability:** Integer Underflow  
**Objective:** Steal ≥5 SOL from the vault

Learn about integer overflow/underflow vulnerabilities in Solana programs. Exploit a flawed fee mechanism to drain the vault.

📁 [Go to Challenge 1](./challenge1-token-vault/)

---

### Challenge 2: Staking Pool (Medium)
**Port:** 5001  
**Points:** 200  
**Vulnerability:** PDA Seed Collision  
**Objective:** Steal ≥50 SOL from admin pool

Discover how improper PDA seed handling can lead to unauthorized access. Exploit seed concatenation to access the admin staking pool.

📁 [Go to Challenge 2](./challenge2-staking-pool/)

---

## 🚀 Quick Start

### Prerequisites

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana (includes cargo build-sbf)
curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verify installations
rustc --version
solana --version
cargo build-sbf --version
docker --version
```

### Build All Challenges

```bash
chmod +x build-all.sh
./build-all.sh
```

### Run Challenges Locally

**Challenge 1:**
```bash
docker run --rm -p 5000:5000 h7ctf/token-vault:latest
```

**Challenge 2:**
```bash
docker run --rm -p 5001:5001 h7ctf/staking-pool:latest
```

### Connect to Challenges

```bash
# Challenge 1
nc localhost 5000

# Challenge 2
nc localhost 5001
```

---

## 🎮 How to Play

### 1. Connect to the Challenge

```bash
nc ctf.h7ctf.com <port>
```

You'll receive:
- **Private Key**: Full control of your wallet
- **Public Key**: Your wallet address  
- **Program ID**: The vulnerable smart contract
- **RPC URL**: For direct blockchain interaction
- **Initial Balance**: SOL to pay for transactions

### 2. Analyze the Vulnerability

Each challenge contains:
- `program/`: The vulnerable Solana program (Rust source code)
- `README.md`: Challenge description and hints
- `SOLUTION.md`: Complete walkthrough (spoilers!)

Study the source code to find the bug!

### 3. Write Your Exploit

```bash
cd challenge<N>/solve
# Edit src/lib.rs with your exploit
cargo build-sbf
cd ..
```

### 4. Test Locally

```bash
# Terminal 1: Run challenge
docker run --rm -p <port>:<port> h7ctf/challenge-name:latest

# Terminal 2: Submit exploit
python3 solve.py localhost <port>
```

### 5. Get the Flag!

When your exploit succeeds, the server will automatically detect the win condition and display the flag! 🎉

---

## 🧠 Learning Path

### Recommended Order

1. **Start with Challenge 1** (Integer Underflow)
   - Easier vulnerability
   - Introduction to Solana program structure
   - Learn about checked vs unchecked arithmetic

2. **Progress to Challenge 2** (PDA Seed Collision)
   - More complex exploit
   - Deep dive into PDA mechanics
   - Real-world security implications

### Key Concepts You'll Learn

- ✅ Solana program architecture
- ✅ Account model and PDAs
- ✅ Integer overflow/underflow vulnerabilities
- ✅ PDA derivation and seed collisions
- ✅ Secure coding practices for Solana
- ✅ Using `cargo build-sbf` and Solana CLI

---

## 📚 Challenge Structure

Each challenge follows this structure:

```
challenge<N>-name/
├── program/          # Vulnerable Solana program
│   ├── src/
│   │   ├── lib.rs
│   │   ├── entrypoint.rs
│   │   └── processor.rs
│   ├── Cargo.toml
│   └── Makefile
├── server/           # Challenge server (CTF infrastructure)
│   ├── src/main.rs
│   ├── Cargo.toml
│   └── Makefile
├── solve/            # Your exploit goes here
│   ├── src/lib.rs    # Template for your exploit
│   ├── Cargo.toml
│   └── Makefile
├── challenge/        # Docker deployment
│   ├── Dockerfile
│   └── flag.txt
├── build.sh          # Build script
├── solve.py          # Python script to submit exploit
├── README.md         # Challenge description
└── SOLUTION.md       # Complete solution (spoilers!)
```

---

## 🔧 Development Workflow

### Building Programs

```bash
cd program
cargo build-sbf   # Compiles to .so file
```

### Testing Exploits

```bash
cd solve
cargo build-sbf
cd ..
python3 solve.py localhost <port>
```

### Debugging

```bash
# Check program logs
solana logs

# View account data
solana account <address>

# Get balance
solana balance <address>
```

---

## 🌐 Connecting with Solana CLI

When you connect to a challenge, you get full credentials:

```bash
# Save your private key
echo '[1,2,3,...]' > ~/.config/solana/ctf-keypair.json

# Configure Solana CLI
solana config set --url http://localhost:8899
solana config set --keypair ~/.config/solana/ctf-keypair.json

# Check your balance
solana balance

# View program
solana program show <program-id>
```

---

## 🐳 Docker Deployment

### Build Images

```bash
# Individual challenges
cd challenge1-token-vault && ./build.sh
cd challenge2-staking-pool && ./build.sh

# Or build all at once
./build-all.sh
```

### Run Containers

```bash
# Challenge 1
docker run --rm -p 5000:5000 h7ctf/token-vault:latest

# Challenge 2  
docker run --rm -p 5001:5001 h7ctf/staking-pool:latest

# Run in background
docker run -d --name token-vault -p 5000:5000 h7ctf/token-vault:latest

# View logs
docker logs token-vault

# Stop
docker stop token-vault
```

---

## 🎓 Educational Resources

### Solana Basics
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Documentation](https://docs.solana.com/)
- [Anchor Book](https://book.anchor-lang.com/)

### Security
- [Sealevel Attacks](https://github.com/coral-xyz/sealevel-attacks)
- [Neodyme Security Workshop](https://workshop.neodyme.io/)
- [Soteria Security Blog](https://www.soteria.dev/blog)

### CTF & Practice
- [OtterSec sol-ctf-framework](https://github.com/otter-sec/sol-ctf-framework)
- [Paradigm CTF](https://ctf.paradigm.xyz/)

---

## 🏆 Scoring

| Challenge | Difficulty | Points | Vulnerability Type |
|-----------|------------|--------|-------------------|
| Token Vault | Easy | 100 | Integer Underflow |
| Staking Pool | Medium | 200 | PDA Seed Collision |

**Total Points:** 300

---

## ⚠️ Important Notes

### For Players

- ✅ All source code is provided for analysis
- ✅ Hints are available in each README
- ✅ Solutions are available (but try without peeking!)
- ✅ You have full control of your test wallet
- ✅ Each connection gets a fresh isolated environment

### For Organizers

- Challenges run in isolated Docker containers
- Each connection gets a unique keypair
- Background win detection monitors for flags
- No shared state between players
- Automatic flag delivery on exploit success

---

## 🛠️ Troubleshooting

### `cargo build-sbf` not found

```bash
# Solana CLI includes build-sbf
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
source ~/.bashrc
```

### Docker permission denied

```bash
sudo usermod -aG docker $USER
# Then logout and login
```

### Server not responding

```bash
# Check if container is running
docker ps

# View logs
docker logs <container-id>

# Restart
docker restart <container-id>
```

---

## 📬 Support

- **Discord:** #solana-challenges
- **Email:** ctf@h7ctf.com
- **Issues:** Open an issue on GitHub

---

## 🙏 Credits

**Challenge Author:** AbuCTF  
**Framework:** OtterSec's sol-ctf-framework  
**Sponsor:** OtterSec  
**Event:** H7CTF 2025

---

## 📜 License

These challenges are open source and provided for educational purposes.

---

**Happy Hacking! 🚀🔐**

*Remember: Always hack ethically and responsibly!*
