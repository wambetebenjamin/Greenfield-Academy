import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Storage helper.
 *
 * In production on Vercel the data lands in Vercel KV (Upstash Redis),
 * which is configured through KV_REST_API_URL and KV_REST_API_TOKEN.
 * When those variables are missing (local development, preview sandboxes)
 * we transparently fall back to a JSON file inside .data so that nothing
 * crashes and forms still work end to end.
 */

const KV_READY = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
);

const DATA_DIR = path.join(process.cwd(), '.data');

async function readLocal<T>(key: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${key}.json`), 'utf8');
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeLocal<T>(key: string, rows: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR, `${key}.json`),
    JSON.stringify(rows, null, 2),
    'utf8',
  );
}

async function kvClient() {
  const mod = await import('@vercel/kv');
  return mod.kv;
}

/** Push a record onto a list and keep a capped history. */
export async function pushRecord<T extends object>(
  key: string,
  record: T,
  cap = 500,
): Promise<void> {
  if (KV_READY) {
    const kv = await kvClient();
    await kv.lpush(key, JSON.stringify(record));
    await kv.ltrim(key, 0, cap - 1);
    return;
  }
  const rows = await readLocal<T>(key);
  rows.unshift(record);
  await writeLocal(key, rows.slice(0, cap));
}

/** Read a list of records, newest first. */
export async function listRecords<T>(key: string, limit = 100): Promise<T[]> {
  if (KV_READY) {
    const kv = await kvClient();
    const rows = (await kv.lrange(key, 0, limit - 1)) as unknown[];
    return rows.map((row) =>
      typeof row === 'string' ? (JSON.parse(row) as T) : (row as T),
    );
  }
  const rows = await readLocal<T>(key);
  return rows.slice(0, limit);
}

/** Add a unique member to a set, returns false when it already existed. */
export async function addUnique(key: string, member: string): Promise<boolean> {
  if (KV_READY) {
    const kv = await kvClient();
    const added = await kv.sadd(key, member);
    return added === 1;
  }
  const rows = await readLocal<string>(key);
  if (rows.includes(member)) return false;
  rows.unshift(member);
  await writeLocal(key, rows);
  return true;
}

export async function countKey(key: string): Promise<number> {
  if (KV_READY) {
    const kv = await kvClient();
    return (await kv.llen(key)) ?? 0;
  }
  const rows = await readLocal<unknown>(key);
  return rows.length;
}

export const storageMode = KV_READY ? 'vercel-kv' : 'local-file';

export const KEYS = {
  admissions: 'greenfield:admissions',
  contacts: 'greenfield:contacts',
  newsletter: 'greenfield:newsletter',
  posts: 'greenfield:posts',
} as const;
