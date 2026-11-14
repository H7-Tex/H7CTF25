# Kakashi's Secret Jutsu

**Category:** Crypto  **Difficulty:** Medium  **Author:** 0xkakashi

> Kakashi sensei has hidden his secret jutsu behind a cryptographic challenge. Can you use your Sharingan to see through his encryption and recover the hidden secret?

Run: `docker build -t kakashi . && docker run -p 10000:10000 kakashi`, then `nc localhost 10000`.

## Solution

After a 4-character sha256 proof of work, the server picks a random 48-byte secret, a key and an IV, and prints the IV. Option 1 returns `AES-CBC(pad(your_input + secret))`. Option 2 takes one guess at the secret and hangs up either way.

The bug is that the same `AES.new(..., MODE_CBC, iv=IV)` object is reused for every request. pycryptodome keeps the CBC state between calls, so the IV for each new encryption is just the last ciphertext block of the previous one. We know it before we send anything.

That turns it into the usual byte-at-a-time attack:

1. Send a prefix of `15 - (i % 16)` bytes so secret byte `i` lands at the end of a block. Save that ciphertext block `C_t` and the block before it, `C_prev`.
2. For each guess `g`, build the 16-byte plaintext block `P = known_15_bytes + g` and send `P ^ C_prev ^ IV_now` as the first block, where `IV_now` is the last block of the previous response.
3. The first block of the reply equals `C_t` exactly when `g` is right.

That's at most 256 queries per byte and 48 bytes, well inside the 20 minute alarm. Send the recovered secret with option 2.

A wrong guess prints `H7CTF{Wrong_Guess!}`, which is not the flag.

Flag: dynamic per container, `H7CTF{K4K4SH1_5H4R1NG4N_$33_411_<uuid>}`
