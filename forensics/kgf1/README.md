# KGF 1.0

**Category:** Forensics  **Difficulty:** Medium  **Author:** Abu

> A compromised Ubuntu container has been recovered from a cryptomining incident. Your mission is to analyze the container filesystem and uncover the malware's command-and-control infrastructure, persistence mechanisms, and cryptocurrency mining operations.

Handout: `compromised.tar` (container snapshot, not in the repo). The answer form runs with `docker build -t kgf1 . && docker run -p 3000:3000 kgf1`. KGF 2.0 (`../kgf2`) uses the same snapshot.

## Solution

It's a Kinsing cryptominer infection. Extract the tar and start with persistence:

```
tar -xf compromised.tar -C fs && cd fs
cat var/spool/cron/crontabs/root
stat var/spool/cron/crontabs/root etc/kinsing tmp/kdevtmpfsi
strings etc/kinsing | grep -E '([0-9]{1,3}\.){3}[0-9]{1,3}|Chrome/'
```

The root crontab pulls `http://80.64.16.241/d.sh` with wget. That gives the C2 and the URL. The crontab's mtime is `07:42:05 -0400` on 2025-07-09, which the form wants in IST.

`strings` on `etc/kinsing` shows four more C2 IPs besides the primary, plus a fake Chrome User-Agent. `kdevtmpfsi` is the XMRig-based miner, so Monero. For the day count, take the `Modify` times of `etc/kinsing` (2023-07-28 17:17:09) and `tmp/kdevtmpfsi` (2025-07-09 07:39:09): 710 days and change, rounded up.

```
q1 80.64.16.241
q2 http://80.64.16.241/d.sh
q3 4
q4 2025-07-09 17:12:05
q5 XMR
q6 711
q7 99.0.4844.51
q8 firewire
```

All eight have to be right in one submit.

Flag: dynamic per container, `H7CTF{n0w_y0u_und3rst4nd_where_th3_n4me_0f_th3_ch4llenge_c0mes_fr0m_<uuid>}`
