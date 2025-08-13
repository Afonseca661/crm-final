import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // solo servidor
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = req.body ?? {};
    if (!body.nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const { data, error } = await admin.from('leads_app').insert([body]).select();
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ ok: true, data });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? 'Server error' });
  }
}
