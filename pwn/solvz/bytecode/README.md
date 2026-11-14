# Secure Bytecode Executor

**Category:** pwn  **Author:** Solvz

Archived copy of the same challenge as `../../bytecode` (also zipped as `../Bytecode_Executor.zip`). The only difference is that `deploy/docker-compose.yml` here does not set `seccomp:unconfined`.

The writeup is in [`../../bytecode/README.md`](../../bytecode/README.md): the verifier checks `st_size` bytes but the whole page gets executed, so the compiler leaves shellcode in the page cache past the end of a one byte `nop` file.

Flag is per-instance: `H7CTF{m3m0ry_m4pp1ng_bug5_4r3_tr1cky_70_f1nd_<uuid>}`
