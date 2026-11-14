# rotRSA

**Category:** Crypto  **Author:** exposedapi

Handout: `chall.py`, `output.txt`. The challenge needs Sage and a `secret.py` that isn't in the repo.

## Solution

No author solve was kept for this one, and the flag isn't recorded anywhere in the repo. These are the notes I have.

The "rotation" matrix `[[a-b, -(a+b)], [a+b, a-b]]` is really complex multiplication by `w = (a-b) + i(a+b)`, a rotation scaled by `sqrt(2)`. Write `X = x1 + i*x2` and `Y = y1 + i*y2`. Then `vx = w*X` and `vy = w*Y`, and `theta` cancels out of anything that only uses lengths and angles:

```
|vx|^2 / 2           = x1^2 + x2^2
|vy|^2 / 2           = y1^2 + y2^2
(vx . vy) / 2        = x1*y1 + x2*y2
(vx x vy) / 2        = x1*y2 - x2*y1
vx / vy  (complex)   = X / Y
```

At 1337 bits of precision, `y1^2 + y2^2` rounds to an exact integer. The x side (around 768 bits each) only comes out approximately. The next step is recovering the four integers (a lattice on `X/Y`), then using the relation to `N` from `secret.py` to factor it and undo `M = flag + (x1+y1+x2+y2)`.
