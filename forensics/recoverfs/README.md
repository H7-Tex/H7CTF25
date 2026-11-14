# RecoverFS

**Category:** Forensics  **Author:** kAiz3n

> Eric came to me with a USB he thought was gone for good, now it's your turn to prove him wrong.

Handout: `recovery.7z` (a `recovery.img` disk image).

## Solution

`gdisk` shows a protective MBR and no GPT, so the partition table is gone and nothing mounts. TestDisk finds an NTFS partition at sector 32768 but complains the disk is too small: the image is a truncated copy, so it can't rebuild the table. PhotoRec carves nothing.

Skip the partition table and read NTFS directly with Sleuth Kit:

```
fls -o 32768 -r recovery.img        # secret/secret_is_here.png, inode 42
icat -o 32768 recovery.img 42 > secret.png
```

The PNG is broken. It starts with null bytes instead of the signature, and once that's fixed `pngcheck` still complains about the IHDR (garbage dimensions, invalid bit depth). Rebuild the signature and IHDR (1010x152, recompute the CRC) and the image opens.

Writeup from a player: https://ctftime.org/writeup/40457

Flag: `H7CTF{f1l3_syst3m_1s_v3ry_fun!!!_9a7}`
