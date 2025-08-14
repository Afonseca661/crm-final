import Head from 'next/head';
import { useState, ChangeEvent, FormEvent } from 'react';

type FormType = {
  nombre: string;
  telefono: string;
  email: string;
  estado: string;
  tipo: string;
  direccion: string;
  mc: string;
  dot: string;
  negocio: string;
};

export default function Home() {
  const [form, setForm] = useState<FormType>({
    nombre: '',
    telefono: '',
    email: '',
    estado: '',
    tipo: '',
    direccion: '',
    mc: '',
    dot: '',
    negocio: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'No se pudo guardar');
      setMsg({ type: 'ok', text: '¡Lead guardado con éxito!' });
      setForm({
        nombre: '',
        telefono: '',
        email: '',
        estado: '',
        tipo: '',
        direccion: '',
        mc: '',
        dot: '',
        negocio: '',
      });
    } catch (err: any) {
      setMsg({ type: 'err', text: err?.message || 'Error inesperado' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30';

  return (
    <>
      <Head>
        <title>Seguro con Fonseca — Cotiza y te llamamos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Cotiza tu seguro en minutos. Déjanos tus datos y un asesor te contacta rápido."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-indigo-600" />
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                Seguro<span className="text-indigo-600">Fonseca</span>
              </span>
            </div>
            <a
              className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 md:inline-block"
              href="#cotizar"
            >
              Cotizar
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-4 md:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
                Seguros bien cotizados.
                <br />
                <span className="text-indigo-600">Asesoría rápida y clara.</span>
              </h1>
              <p className="mt-4 text-slate-600 md:text-lg">
                Déjanos tus datos y te contactamos para darte la mejor opción según tu necesidad:
                auto, comercial, transporte y más.
              </p>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                  ✅ Atención en menos de 1 hora
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                  🔒 Datos seguros
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                  ⭐️ Clientes satisfechos
                </span>
              </div>
            </div>

            {/* Form Card */}
            <div id="cotizar">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md md:p-6">
                <h2 className="text-xl font-semibold text-slate-900">Captura de Leads</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Completa el formulario y un asesor te contactará.
                </p>

                {msg && (
                  <div
                    className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                      msg.type === 'ok'
                        ? 'border border-green-200 bg-green-50 text-green-800'
                        : 'border border-rose-200 bg-rose-50 text-rose-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="nombre">
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      placeholder="Ej. Juan Pérez"
                      value={form.nombre}
                      onChange={onChange}
                      className={inputClass}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="telefono">
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      placeholder="Ej. +1 469 210 1711"
                      value={form.telefono}
                      onChange={onChange}
                      className={inputClass}
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      placeholder="correo@dominio.com"
                      value={form.email}
                      onChange={onChange}
                      className={inputClass}
                      type="email"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="estado">
                      Estado
                    </label>
                    <input
                      id="estado"
                      name="estado"
                      placeholder="Ej. TX"
                      value={form.estado}
                      onChange={onChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="tipo">
                      Tipo de seguro
                    </label>
                    <input
                      id="tipo"
                      name="tipo"
                      placeholder="Auto / Comercial / Transporte…"
                      value={form.tipo}
                      onChange={onChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="direccion">
                      Dirección
                    </label>
                    <input
                      id="direccion"
                      name="direccion"
                      placeholder="Ciudad, calle, etc."
                      value={form.direccion}
                      onChange={onChange}
                      className={inputClass}
                      autoComplete="street-address"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="mc">
                      MC
                    </label>
                    <input
                      id="mc"
                      name="mc"
                      placeholder="Número MC (opcional)"
                      value={form.mc}
                      onChange={onChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="dot">
                      DOT
                    </label>
                    <input
                      id="dot"
                      name="dot"
                      placeholder="Número DOT (opcional)"
                      value={form.dot}
                      onChange={onChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="negocio">
                      Negocio
                    </label>
                    <input
                      id="negocio"
                      name="negocio"
                      placeholder="Nombre del negocio (opcional)"
                      value={form.negocio}
                      onChange={onChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? 'Enviando…' : 'Guardar lead'}
                    </button>
                  </div>
                </form>

                <p className="mt-3 text-center text-xs text-slate-500">
                  Al enviar aceptas ser contactado por nuestros asesores. Tus datos no serán compartidos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Ventajas */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: 'Atención rápida', d: 'Te contactamos en menos de 1 hora hábil.' },
              { t: 'Opciones a medida', d: 'Cotizamos lo que realmente necesitas.' },
              { t: 'Acompañamiento', d: 'Te guiamos en siniestros y renovaciones.' },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">{f.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200/70 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-600 md:flex-row">
            <span>© {new Date().getFullYear()} SeguroFonseca. Todos los derechos reservados.</span>
            <a className="hover:text-slate-900" href="#cotizar">Quiero cotizar</a>
          </div>
        </footer>

        {/* WhatsApp flotante (reemplaza TU_NUMERO con tu número en formato internacional, sin +) */}
        {/* <a
          href="https://wa.me/TU_NUMERO?text=Hola%20quiero%20cotizar%20un%20seguro"
          className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
          aria-label="WhatsApp"
        >
          WA
        </a> */}
      </div>
    </>
  );
}
