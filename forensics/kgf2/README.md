# KGF 2.0

**Category:** Forensics  **Difficulty:** Hard  **Author:** Abu

> This is the advanced continuation of KGF 1.0. Having uncovered the surface-level infrastructure, you must now dive deeper into the malware's cryptographic operations, mining pool configurations, and compilation artifacts.

Handout: the same `compromised.tar` as KGF 1.0. Run the form with `docker build -t kgf2 . && docker run -p 3001:3000 kgf2`.

## Solution

Most of this lives in the miner, and it's UPX packed, so unpack it first:

```
upx -d tmp/kdevtmpfsi -o kdevtmpfsi.unpacked
strings kdevtmpfsi.unpacked | grep -iE 'nanopool|stratum'
strings kdevtmpfsi.unpacked | grep -E '^4[0-9A-Za-z]{94}$'
strings kdevtmpfsi.unpacked | grep -E '^[A-Za-z0-9+/]{100,}=*$' | base64 -d
```

- The primary pool is `xmr-eu1.nanopool.org`. Three more backup pools are configured by domain name; the IP-only ones don't count.
- The pool protocol is stratum (`stratum+tcp` is accepted too).
- The primary wallet sits in the strings in plain text. The alternative one is base64 encoded.

The scanner part is in the shell script the crontab pulls down. It checks the downloaded scanner against an MD5 and greps `/etc/os-release` for a distro name. For the build date, the Go module versions in `etc/kinsing` carry a timestamp:

```
strings etc/kinsing | grep 'golang.org/x/sys'      # v0.0.0-20220319...
```

```
q9  45a7ef83238f5244738bb5e7e3dd6299
q10 4
q11 xmr-eu1.nanopool.org
q12 46V5WXwS3gXfsgR7fgXeGP4KAXtQTXJfkicBoRSHXwGbhVzj1JXZRJRhbMrvhxvXvgbJuyV3GGWzD6JvVMuQwAXxLZmTWkb
q13 3
q14 stratum
q15 44MtPEErzyDNHfggtup49m4zwGm7zjYp5jWKWRc3go6LN5fxetsHtVhdEetL9jhZedNAwG7YGLpR1azK5Ch69cdGPgVj5wA
q16 2022-03-19
```

Flag: dynamic per container, `H7CTF{w3ll_w3ll_w3ll_s0meone_h4s_4_g00dy_2_eyes_<uuid>}`
