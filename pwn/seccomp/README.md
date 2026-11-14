# Seccomp Jail

**Category:** pwn  **Difficulty:** Hard  **Author:** cachegrim

> Trapped in a restricted environment. The binary gives you a hint... use it wisely.

Source and Docker setup are in `challenge/`. Players got the `chal` binary. Run: `docker build -t seccomp-jail challenge && docker run -p 1337:1337 seccomp-jail`

## Solution

`vuln()` reads the flag from `/flag` into a stack buffer, prints the address of a stack local (`&fp`) and then does `read(0, buffer, 256)` into a 64 byte buffer. No PIE, no canary, and the binary ships its own gadgets (`pop rdi/rsi/rdx/rax; ret`, `syscall; ret`).

The intended version installs a seccomp filter that only allows `read`, `mprotect` and `exit_group`. So no `write`, no `execve`. The flag is already in memory though, we just can't print it.

The plan:

1. Use the leak to work out where the stack page and the flag are.
2. ROP into `mprotect(leak & ~0xfff, 0x2000, 7)` to make the stack RWX.
3. Return into shellcode placed right after the chain.
4. The shellcode tests one bit of the flag. If it's set, `exit_group`; if not, spin forever.

From the client side a closed connection means 1 and a hanging one means 0. 7 connections per character, so it's slow but it works.

```python
payload  = b'A' * 0x48
payload += p64(pop_rdi) + p64(leak & ~0xfff)
payload += p64(pop_rsi) + p64(0x2000)
payload += p64(pop_rdx) + p64(7)
payload += p64(pop_rax) + p64(10)        # mprotect
payload += p64(syscall) + p64(leak + 288)
payload += shellcode                     # test bit j of flag[i], exit or loop
```

`solve.py` does the whole loop against the remote; `healthcheck.py` is the local single-shot version (it still checks for the old `IITMBIN{...}` test flag).

Note: in `test.c`, which is what the Dockerfile builds, the `setup_seccomp()` call is commented out. So on the deployed instance a plain `execve("/bin/sh")` chain with the same gadgets also works.

Flag is per-instance: `H7CTF{r0p_j41l_<8 hex>}`
