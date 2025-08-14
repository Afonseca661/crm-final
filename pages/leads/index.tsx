import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

type Lead = {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string | null;
  email: string | null;
  estado: string | null;
  tipo: string | null;
  direccion: string | null;
  mc: string | null;
  dot: string | null;
  negocio: string | null;
};

type Props = { data: Lead[] };

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
  const auth = req.headers['authorization'] || '';
  const [scheme, encoded] = String(auth).split(' ');
  const expected = Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString('base64');

  if (scheme !== 'Basic' || encoded !== expected) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Leads"');
    res.end('Auth required');
    return { props: { data: [] } };
  }

  const { data, error } = await supabaseAdmin
    .from('leads_app')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    res.statusCode = 500;
    res.end('DB error');
    return { props: { data: [] } };
  }

  return { props: { data: data ?? [] } };
};

export default function LeadsPage({ data }: Props) {
  return (
    <>
      <Head><title>Leads | Del Toro Insurance — Irving</title></Head>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Leads</h1>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Teléfono</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Dirección</th>
                <th className="px-3 py-2">MC</th>
                <th className="px-3 py-2">DOT</th>
                <th className="px-3 py-2">Negocio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2">{r.nombre}</td>
                  <td className="px-3 py-2">{r.telefono || ''}</td>
                  <td className="px-3 py-2">{r.email || ''}</td>
                  <td className="px-3 py-2">{r.estado || ''}</td>
                  <td className="px-3 py-2">{r.tipo || ''}</td>
                  <td className="px-3 py-2">{r.direccion || ''}</td>
                  <td className="px-3 py-2">{r.mc || ''}</td>
                  <td className="px-3 py-2">{r.dot || ''}</td>
                  <td className="px-3 py-2">{r.negocio || ''}</td>
                </tr>
              ))}
              {!data.length && (
                <tr><td className="px-3 py-6 text-slate-500" colSpan={10}>Sin registros</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
