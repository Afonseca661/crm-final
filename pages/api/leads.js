import { createClient } from '@supabase/supabase-js';

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function unauthorized(res) {
  res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
  return res.status(401).json({ error: 'Auth required' });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const body = req.body || {};
      if (!body.nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
      const { data, error } = await admin.from('leads_app').insert([body]).select();
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json({ ok: true, data });
    }

    if (req.method === 'GET') {
      const auth = req.headers.authorization || '';
      const [scheme, encoded] = auth.split(' ');
      if (scheme !== 'Basic' || !encoded) return unauthorized(res);

      let decoded;
      try { decoded = Buffer.from(encoded, 'base64').toString('utf8'); } catch { return unauthorized(res); }
      const [user, pass] = decoded.split(':');
      if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const limit = Math.min(parseInt(String(req.query.limit ?? '50'), 10) || 50, 200);
      const { data, error } = await admin
        .from('leads_app')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json({ data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Server error' });
  }
}
