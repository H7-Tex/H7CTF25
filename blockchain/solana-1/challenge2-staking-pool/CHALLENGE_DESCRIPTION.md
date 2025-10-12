# H7Corp Staking Pool

**Category:** Blockchain  
**Difficulty:** Medium  
**Points:** 500

## Scenario

H7Corp operates an internal employee staking pool on Solana. Employees can create pools using their organization name and employee ID to stake SOL.

The admin has initialized a pool with 100 SOL:
- Organization: `H7Corp`
- Employee ID: `admin`

## Objective

Drain at least 50 SOL from the admin's pool.

## Connection

Connect to your challenge instance. You will receive:
- User account with 10 SOL
- Program ID
- Admin pool address

## Files Provided

Download `staking-pool-player.tar.gz` containing the program source code.

Build with:
```bash
cargo build-sbf
```

## Submission

Write a Solana program that exploits the vulnerability. Submit your compiled `.so` file when prompted by the server.

## Flag Format

`H7CTF{...}`
