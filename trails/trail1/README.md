# Trail 1

**Category:** trails (misc)

Run: `docker build -t trail-1 . && docker run -p 1337:1337 trail-1`, then `nc localhost 1337`.

## Solution

The server prints a SHA256 hash and asks for the plaintext. It's a random word out of `app/rockyou.txt` (the first 1000 lines of rockyou), so any rockyou-based crack finds it instantly.

```
$ nc localhost 1337
SHA256: 07a0a3bd1783de63016f550da1c0e47c8225fea4b0fa040fe058af60c2d858c7
Enter plaintext:
```

```
hashcat -m 1400 hash.txt rockyou.txt
```

or just in Python while the connection is still open:

```python
import hashlib
h = '07a0a3bd...'
print(next(w for w in open('rockyou.txt', encoding='latin-1').read().split() if hashlib.sha256(w.encode()).hexdigest() == h))
```

Send the word back and you get the flag. `test/hash.txt` and `test/hash2.txt` are sample hashes from testing.

Flag is per-connection: `h7ctf{h@sh3s_ar3_m3@nt_t0_b3_crack3d_<uuid hex>}`
