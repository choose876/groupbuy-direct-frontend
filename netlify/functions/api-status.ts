import type { Context } from '@netlify/functions'

const API_URL = 'https://groupbuy-direct-one.onrender.com'

export default async (_req: Request, _context: Context) => {
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) {
      return Response.json({ online: false, message: 'API returned an error' })
    }
    const data = await res.json().catch(() => ({}))
    return Response.json({ online: true, message: data.message ?? 'API online' })
  } catch {
    return Response.json({ online: false, message: 'API offline - wake it up by visiting the URL' })
  }
}
