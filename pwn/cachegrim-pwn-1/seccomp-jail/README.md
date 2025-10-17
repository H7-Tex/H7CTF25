# Seccomp Jail - PWN Challenge

## Challenge Description

A classic ROP challenge with a twist: seccomp filters restrict your syscalls! Can you break out of this prison using only read, mprotect, and exit_group?

**Difficulty:** Hard  
**Category:** Binary Exploitation  
**Port:** 1337

## Challenge Overview

This challenge features:
- Buffer overflow vulnerability (256 bytes read into 64-byte buffer)
- Seccomp filtering (only read, mprotect, exit_group allowed)
- Flag loaded into stack memory
- Multiple ROP gadgets provided
- No PIE, no stack canary

## Vulnerability

The `vuln()` function reads 256 bytes into a 64-byte buffer, allowing stack overflow:

```c
char buffer[64];
read(0, buffer, 256);  // Overflow!
```

The flag is read from `/flag` and stored on the stack. The address of the flag pointer is leaked to help players.

## Exploitation Approach

1. **ROP Chain:** Use buffer overflow to build ROP chain
2. **mprotect:** Make stack executable
3. **Shellcode:** Read shellcode to stack
4. **Stack Pivot:** Pivot execution to shellcode
5. **Side-Channel:** Use timing-based side channel to leak flag bit-by-bit

### Key Insight

Since most syscalls are blocked, players must use creative techniques like:
- Infinite loops vs immediate exits to leak information
- Bit-by-bit flag extraction
- Timing-based side channels

## Deployment

### Build and Run

```bash
docker build -t seccomp-jail .
docker run -d -p 1337:1337 --name seccomp-jail-challenge seccomp-jail
```

### Connect

```bash
nc localhost 1337
```

## Flag Format

```
H7CTF{pr1s0n_bre4k_r0p_3dition_<UUID>}
```

### CTFd Regex

```regex
H7CTF\{pr1s0n_bre4k_r0p_3dition_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\}
```

## Files

- `test.c` - Vulnerable source code
- `chal` - Compiled binary (given to players)
- `Dockerfile` - Container setup with dynamic flags
- `docker-entrypoint.sh` - Generates UUID and creates flag file
- `solve.py` - Reference solution (DO NOT distribute)

## Technical Details

- **Architecture:** x86-64
- **Protections:** No PIE, No canary
- **Seccomp:** Whitelist mode (read, mprotect, exit_group only)
- **Compiler:** GCC with `-no-pie -fno-stack-protector -lseccomp -O0`

## Gadgets Available

The binary includes these ROP gadgets:
- `pop rdi; ret`
- `pop rsi; ret`
- `pop rdx; ret`
- `pop rax; ret`
- `syscall; ret`
- `xchg rdi, rsp; ret`
- `add rsp, 0x20; ret`

## Learning Outcomes

- Buffer overflow exploitation
- ROP chain construction
- Seccomp bypass techniques
- Shellcode development under constraints
- Side-channel attacks (timing-based)
- Stack pivoting techniques

## Distribution Package

Give players:
- `chal` - The compiled binary
- `Dockerfile` - For local testing (without flag)
- This README (without solution details)

DO NOT distribute:
- `test.c` - Source code
- `solve.py` - Solution script
- `/flag` file contents
