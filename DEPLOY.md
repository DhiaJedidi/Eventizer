# Deploying Eventizer to Vercel

Stack in production: **Next.js (serverless)** + **Payload CMS** on **Turso (libSQL)** + **Vercel Blob** for media.

> The app already supports this — the only config difference from local is the
> database URL/token and the Blob token (set as environment variables). Schema
> push is automatically disabled in production (`NODE_ENV=production`), so the
> Turso schema must be created once by seeding (Step 2).

---

## 1. Create the production database (Turso)

```bash
# Install the CLI (once): https://docs.turso.tech/cli/installation
turso auth signup            # or: turso auth login

turso db create eventizer
turso db show eventizer --url          # -> libsql://eventizer-<org>.turso.io   (DATABASE_URI)
turso db tokens create eventizer       # -> long token                          (DATABASE_AUTH_TOKEN)
```

Keep the URL and token.

## 2. Seed the Turso database (once, from your machine)

Temporarily point your local `.env` at Turso, then seed. Seeding runs with schema
push enabled, so it **creates every table and all content** on the empty Turso DB.

```bash
# In .env (temporarily):
# DATABASE_URI=libsql://eventizer-<org>.turso.io
# DATABASE_AUTH_TOKEN=<token from step 1>

npm run seed
```

When it prints `✓ Seed complete.`, restore your local `.env` back to
`DATABASE_URI=file:./eventizer.db` (so local dev keeps using the local file).

> No admin user is seeded — you create the first one on the live site (Step 6).

## 3. Push the code to GitHub

```bash
git remote add origin https://github.com/<you>/eventizer.git
git push -u origin main
```

## 4. Import into Vercel

1. Vercel → **Add New → Project** → import the GitHub repo. Framework auto-detects
   as **Next.js**. Leave build/output settings at their defaults.
2. **Storage → Create → Blob** store, and connect it to this project. Vercel adds
   `BLOB_READ_WRITE_TOKEN` automatically (this is what stores uploaded media).
3. **Settings → Environment Variables** — add these for **Production** (and Preview):

   | Variable | Value |
   |---|---|
   | `PAYLOAD_SECRET` | a long random string (`openssl rand -base64 32`) |
   | `DATABASE_URI` | `libsql://eventizer-<org>.turso.io` |
   | `DATABASE_AUTH_TOKEN` | the Turso token |
   | `BLOB_READ_WRITE_TOKEN` | (added automatically by the Blob store) |
   | `NEXT_PUBLIC_SITE_URL` | `https://www.eventizer.tn` (your domain) |
   | `RESEND_API_KEY` | _(optional)_ enables contact-form emails |
   | `CONTACT_FROM_EMAIL` | _(optional)_ e.g. `Eventizer <contact@eventizer.tn>` |
   | `CONTACT_TO_EMAIL` | _(optional)_ where leads are sent |
   | `NEXT_PUBLIC_GA_ID` | _(optional)_ Google Analytics ID |

4. **Deploy**.

## 5. Custom domain

Vercel → **Settings → Domains** → add `eventizer.tn` / `www.eventizer.tn` and set
the DNS records Vercel shows at your registrar.

## 6. Create the first admin

Open `https://<your-domain>/admin` → Payload shows a "create first user" screen →
create your admin account. You can now edit every section, the blog, etc.

---

## Day-to-day notes

- **Content edits show after a rebuild.** Pages are statically generated and
  revalidated hourly (`revalidate = 3600`). To publish an edit immediately, trigger
  a redeploy in Vercel (or wait up to an hour).
- **Schema changes** (new collections/fields in code): after deploying the code,
  re-run `npm run seed` against Turso once to push the new schema (push is off in
  production at runtime by design).
- **Local dev is unchanged** — it keeps using `file:./eventizer.db`.
