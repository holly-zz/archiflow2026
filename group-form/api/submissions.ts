import { kv } from '@vercel/kv'

const KEY = 'submissions'

interface Submission {
  id: string
  [key: string]: unknown
}

async function readSubs(): Promise<Submission[]> {
  return (await kv.get<Submission[]>(KEY)) ?? []
}

export default async function handler(req: Request): Promise<Response> {
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })

  try {
    if (req.method === 'GET') {
      return json(await readSubs())
    }
    if (req.method === 'POST') {
      const item = (await req.json()) as Submission
      if (!item?.id) return json({ ok: false, error: '缺少 id' }, 400)
      const subs = await readSubs()
      const idx = subs.findIndex((s) => s.id === item.id)
      if (idx >= 0) subs[idx] = item
      else subs.push(item)
      await kv.set(KEY, subs)
      return json({ ok: true, id: item.id })
    }
    if (req.method === 'DELETE') {
      const id = new URL(req.url).searchParams.get('id')
      const subs = await readSubs()
      await kv.set(KEY, id ? subs.filter((s) => s.id !== id) : [])
      return json({ ok: true })
    }
    return json({ ok: false, error: 'Method not allowed' }, 405)
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500)
  }
}

export const config = {
  runtime: 'edge',
}
