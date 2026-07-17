/**
 * Schema-only push — syncs the database schema to match the Payload config
 * (e.g. ALTER TABLE to add newly-added fields) WITHOUT writing any content.
 *
 * Why this exists: the SQLite adapter runs with `push: true` only when
 * NODE_ENV !== 'production' (see config.ts), so Vercel never mutates the Turso
 * schema. After adding a field to a collection/global, production reads of that
 * global start failing (the SELECT references a column that doesn't exist) until
 * the schema is synced. `npm run seed` would also sync it, but it rewrites every
 * global from the content files — this script only touches the schema.
 *
 * Run against production (do NOT set NODE_ENV=production, or push is disabled):
 *
 *   DATABASE_URI="libsql://<db>.turso.io" DATABASE_AUTH_TOKEN="<token>" npm run db:push
 *
 * Booting Payload is enough: the adapter performs the schema push on connect.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const target = process.env.DATABASE_URI || 'file:./eventizer.db'
const redacted = target.replace(/(libsql:\/\/)([^.]*)/, '$1<db>')
payload.logger.info(`✓ Schema push complete against ${redacted} — no content was modified.`)
