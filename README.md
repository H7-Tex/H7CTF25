`H7CTF 2025`

- **blockchain**
  - [H7Corp Token Vault](blockchain/solana/tokenvault) `Abu`, [Staking Pool](blockchain/solana/staking) `Abu`, [Vault Heist](blockchain/solana/heist) `Abu`
  - `blockchain/solana/sol-ctf-framework` is vendored from upstream, shared by the solana challenges
- **boot2root**
  - [Moby Dock](boot2root/mobydock) `Abu`
- **crypto**
  - [Kakashi's Secret Jutsu](crypto/jutsu) `0xkakashi`, [OAEPsy](crypto/oaepsy) `exposedapi`, [rotRSA](crypto/rotrsa) `exposedapi`
- **forensics**
  - [BackDoor](forensics/backdoor) `kAiz3n`, [RecoverFS](forensics/recoverfs) `kAiz3n`, [KGF 1.0](forensics/kgf1) `Abu`, [KGF 2.0](forensics/kgf2) `Abu`
- **osint**
  - [abu-1](osint/abu) `Abu`
- **pwn**
  - [Seccomp Jail](pwn/seccomp) `cachegrim`, [0x0f05](pwn/0x0f05) `cachegrim`, [Secure Bytecode Executor](pwn/bytecode) `Solvz`, [Quantum Memory](pwn/quantum) `Solvz`, [Imperial Archive](pwn/solvz/imperial) `Solvz`
- **rev**
  - [AppleMeowMeow](rev/applemeowmeow) `nukoneZ`
- **trails**
  - [Trail 1](trails/trail1), [Trail 2](trails/trail2), [Trail 3](trails/trail3)
- **web**
  - [Chamber of Secrets](web/chamber) `PsychoSherlock`, [NeuralFlux](web/neuralflux) `PsychoSherlock`, [Copy Ninja](web/copyninja) `0xkakashi`, [H7Tex](web/h7tex) `Owatron`

each challenge is `<category>/<slug>/` with a `README.md` (description, how to run it, solution) next to the source we deployed, the handout and a solve script where we had one

remote ones have a `Dockerfile` or `docker-compose.yml` at the top, so spinning one up is just

```
cd web/chamber && docker build -t chamber . && docker run --rm -p 8080:8080 chamber
```

`boot2root/mobydock` is a Vagrant box (`Vagrantfile`), not Docker
