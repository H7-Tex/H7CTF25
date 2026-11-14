# OAEPsy

**Category:** Crypto  **Author:** exposedapi

Run: `docker build -t oaepsy . && docker run -p 6137:6137 oaepsy`. Source: `chall.py`. `secret.py` is a local placeholder; the entrypoint rewrites it with a per-container flag.

## Solution

`GET /pub` gives `n`, `e` and an RSA-OAEP ciphertext of the flag. `POST /oracle` takes any ciphertext, decrypts it to `m` and tells you whether `R * m mod n >= B`, where `B = 2^(8(k-1))`. That's almost Manger's oracle ("is the top byte zero?"), just with a multiplier `R` in the way.

`R` is not secret. It comes from `sha256(str(n))`, so we can compute `derive_r(n)` ourselves. To ask the oracle about `f * m`, send

```
c' = c * (f * R^-1 mod n)^e mod n
```

The server decrypts that to `f * R^-1 * m`, multiplies by `R`, and compares `f * m mod n` against `B`. Now it's a plain Manger oracle.

From there it's the attack from the paper: find `f1` where `f1 * m` crosses `B`, then `f2` where it crosses `n`, then binary search the interval. For 2048-bit RSA this takes a couple of thousand queries, well under the 20000 cap. Once `m` is known, strip the OAEP padding locally (MGF1 with SHA-1, the pycryptodome default); no private key is needed.

The flag is a link to the paper:

Flag: dynamic per container, `H7CTF{https://archiv.infsec.ethz.ch/education/fs08/secsem/manger01.pdf-<uuid>}`
