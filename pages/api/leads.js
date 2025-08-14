import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function isBasicOK(req) {
  const auth = req.headers.authorization || '';
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) return false;
  const expected = Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString('base64');
  return encoded === expected;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const row = {
        nombre: body.nombre || '',
        telefono: body.telefono || '',
        email: body.email || '',
        estado: body.estado || '',
        tipo: body.tipo || '',
        direccion: body.direccion || '',
        mc: body.mc || '',
        dot: body.dot || '',
        negocio: body.negocio || '',
      };
      const { error } = await supabase.from('leads_app').insert([row]);
      if (error) return res.status(400).json({ error: error.message });
      return res.status(201).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  if (req.method === 'GET') {
    if (!isBasicOK(req)) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { data, error } = await supabase
      .from('leads_app')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ data });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
