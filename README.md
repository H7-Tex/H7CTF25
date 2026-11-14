# H7CTF 2025

Challenges from H7CTF 2025, the international CTF we (team H7Tex, SRMIST) run every year. Source, deployment files and writeups for everything we could put out.

## Challenges

| Category | Challenge | Folder | Author |
| --- | --- | --- | --- |
| web | Chamber of Secrets | `web/chamber` | PsychoSherlock |
| web | NeuralFlux | `web/neuralflux` | PsychoSherlock |
| web | Copy Ninja | `web/copyninja` | 0xkakashi |
| web | H7Tex | `web/h7tex` | Owatron |
| crypto | Kakashi's Secret Jutsu | `crypto/jutsu` | 0xkakashi |
| crypto | OAEPsy | `crypto/oaepsy` | exposedapi |
| crypto | rotRSA | `crypto/rotrsa` | exposedapi |
| pwn | Seccomp Jail | `pwn/seccomp` | cachegrim |
| pwn | 0x0f05 | `pwn/0x0f05` | cachegrim |
| pwn | Secure Bytecode Executor | `pwn/bytecode` | Solvz |
| pwn | Quantum Memory | `pwn/quantum` | Solvz |
| pwn | Imperial Archive | `pwn/solvz/imperial` | Solvz |
| rev | AppleMeowMeow | `rev/applemeowmeow` | nukoneZ |
| forensics | BackDoor | `forensics/backdoor` | kAiz3n |
| forensics | RecoverFS | `forensics/recoverfs` | kAiz3n |
| forensics | KGF 1.0 | `forensics/kgf1` | Abu |
| forensics | KGF 2.0 | `forensics/kgf2` | Abu |
| osint | abu-1 | `osint/abu` | Abu |
| blockchain | H7Corp Token Vault | `blockchain/solana/tokenvault` | Abu |
| blockchain | Staking Pool | `blockchain/solana/staking` | Abu |
| blockchain | Vault Heist | `blockchain/solana/heist` | Abu |
| boot2root | Moby Dock | `boot2root/mobydock` | Abu |
| trails | Trail 1, 2, 3 | `trails/trail*` | |

## Layout

Each challenge folder has a `README.md` with the description, how to run it and the solution. Next to it is whatever we deployed (source, `Dockerfile` or `docker-compose.yml`, Vagrant files for the boot2root) plus the handout players got and a solve script where we had one.

The Solana challenges share `blockchain/solana/sol-ctf-framework`, which is vendored from upstream.

Thanks to everyone who wrote challenges, tested and played.
