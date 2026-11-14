# BackDoor

**Category:** Forensics  **Difficulty:** Medium  **Author:** kAiz3n

> While casually browsing the internet, I suddenly received a strange authentication prompt from my browser. I ignored it at first, but a few hours later, I noticed that several important files and personal data had disappeared from my system. I suspect that my computer may have been compromised.
>
> Conduct a full forensic investigation to identify what happened, trace the attacker's actions, and answer all the provided questions based on your findings.

Evidence: https://drive.google.com/file/d/1bxIF4afBKLShP1DTk5ENfAK-QwOQuRX-/view (archive password `H7CTF`). It's too big for the repo.

Run the quiz: `docker build -t backdoor . && docker run -p 3000:3000 backdoor`, then `nc localhost 3000`.

## Solution

The evidence isn't in the repo, so this only covers what the checker in `answer.py` wants. Seven questions, three tries each:

```
1) attacker's domain                    verify.google.ads
2) malicious file on attacker server    http://192.168.23.1:8080/verify.exe
3) user:password the attacker created   KAiZ3nThong:P@ssw0rd123@
4) persistence (registry:file)          HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\UserInit:helper.exe
5) config key value                     ForensicCase01@
6) session key (hex)                    8380ac9a0a2c3f0ef0e6a02ea542b46a25f13256bb138b8a5379341524ea7311
7) exfiltrated secret                   H7Tex{s3cr3t_pr0ject}
```

Put together: the "authentication prompt" comes from `verify.google.ads`, which serves `verify.exe`. The implant adds a local user, persists through the Winlogon `UserInit` value, and talks to its operator over Discord (hence the flag).

Flag: dynamic per container, `H7CTF{D1sc0rd_1s_p0w3rfull_t0_s1mul@t3_C2_<uuid>}`
