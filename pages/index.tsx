import Head from 'next/head';
import Image from 'next/image';
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
    nombre: '', telefono: '', email: '', estado: '', tipo: '',
    direccion: '', mc: '', dot: '', negocio: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const categories = ['Auto personal','Comercial','Transporte / Trucking','Rideshare','Hogar','Inquilinos','General Liability','Workers Comp','Vida','Flotillas'];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setMsg(null); setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'No se pudo enviar la solicitud');
      setMsg({ type: 'ok', text: 'Gracias. Un asesor te contactará en breve.' });
      setForm({ nombre:'', telefono:'', email:'', estado:'', tipo:'', direccion:'', mc:'', dot:'', negocio:'' });
    } catch (err: any) {
      setMsg({ type: 'err', text: err?.message || 'Ocurrió un error. Intenta nuevamente.' });
    } finally { setLoading(false); }
  };

  const inputClass = 'block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30';

  const jsonLd = {
    '@context': 'https://schema.org','@type':'InsuranceAgency',
    name:'Del Toro Insurance — Irving (Franquicia)', url:'https://www.seguroconfonseca.com/',
    image:'/del-toro-logo.png', telephone:'+1 469 210 1711',
    address:{'@type':'PostalAddress',streetAddress:'555 W Airport Fwy, Suite 106',addressLocality:'Irving',addressRegion:'TX',postalCode:'75062',addressCountry:'US'},
    areaServed:['Irving, TX','Dallas, TX','Fort Worth, TX','Dallas–Fort Worth Metroplex'],
  };

  return (
    <>
      <Head>
        <title>Del Toro Insurance Irving | Cotiza en el Metroplex (Dallas–Fort Worth)</title>
        <meta name="description" content="Franquicia de Del Toro Insurance en Irving. Cotiza tu seguro (auto, comercial, transporte y más). Atención rápida para Irving, Dallas y Fort Worth." />
        <meta property="og:title" content="Del Toro Insurance Irving — Cotiza en minutos" />
        <meta property="og:description" content="Atendemos Irving, Dallas y Fort Worth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.seguroconfonseca.com/" />
        <meta property="og:image" content="/del-toro-logo.png" />
        <link rel="icon" href="/del-toro-logo.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Image src="/del-toro-logo.png" alt="Del Toro Insurance — Irving" width={36} height={36} className="h-9 w-9 rounded-full object-contain ring-1 ring-slate-200" priority />
              <span className="text-lg font-semibold tracking-tight text-slate-900">Del Toro Insurance <span className="text-indigo-600">Irving</span></span>
              <span className="ml-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
                <span className="hidden sm:inline">Metroplex</span>
                <span className="relative hidden overflow-hidden sm:inline-block">
                  <Image src="/seguro-fonseca.png" alt="Marca local Metroplex" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://wa.me/14694556391?text=Hola%20Del%20Toro%20Insurance%20Irving,%20quiero%20una%20cotizaci%C3%B3n." target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 rounded-full border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50" aria-label="Contactar por WhatsApp">
                <img src="/whatsapp.svg" alt="" width={16} height={16} /> WhatsApp
              </a>
              <a href="#cotizar" className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 md:inline-block">Cotizar</a>
              <a href="tel:+14692101711" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">(469) 210-1711</a>
            </div>
          </div>
        </header>

        <section className="relative mx-auto max-w-6xl px-4 pt-6 pb-4 md:pt-10">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-5">
            <Image src="/del-toro-logo.png" alt="" fill sizes="100vw" className="object-contain object-right-top" priority />
          </div>

          <div className="grid items-start gap-10 md:grid-cols-2">
            <div id="cotizar" className="order-1 md:order-2 md:sticky md:top-24">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md md:p-6">
                <h2 className="text-xl font-semibold text-slate-900">Solicita tu asesoría</h2>
                <p className="mt-1 text-sm text-slate-600">Completa el formulario y un asesor te contactará.</p>

                {msg && (
                  <div className={`mt-4 rounded-xl px-4 py-3 text-sm ${msg?.type === 'ok' ? 'border border-green-200 bg-green-50 text-green-800' : 'border border-rose-200 bg-rose-50 text-rose-800'}`} role={msg?.type === 'err' ? 'alert' : undefined}>
                    {msg?.text ?? ''}
                  </div>
                )}

                <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="nombre">Nombre *</label>
                    <input id="nombre" name="nombre" placeholder="Ej. Juan Pérez" value={form.nombre} onChange={onChange} className={inputClass} required autoComplete="name" />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="telefono">Teléfono</label>
                      <input id="telefono" name="telefono" placeholder="(469) 210-1711" value={form.telefono} onChange={onChange} className={inputClass} inputMode="tel" autoComplete="tel" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                      <input id="email" name="email" placeholder="correo@dominio.com" value={form.email} onChange={onChange} className={inputClass} type="email" autoComplete="email" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="estado">Estado</label>
                      <input id="estado" name="estado" placeholder="Ej. TX" value={form.estado} onChange={onChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="tipo">Tipo de seguro</label>
                      <input id="tipo" name="tipo" placeholder="Auto / Comercial / Transporte…" value={form.tipo} onChange={onChange} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="direccion">Dirección</label>
                    <input id="direccion" name="direccion" placeholder="Ciudad, calle, etc." value={form.direccion} onChange={onChange} className={inputClass} autoComplete="street-address" />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="mc">MC (opcional)</label>
                      <input id="mc" name="mc" placeholder="Número MC" value={form.mc} onChange={onChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="dot">DOT (opcional)</label>
                      <input id="dot" name="dot" placeholder="Número DOT" value={form.dot} onChange={onChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="negocio">Negocio (opcional)</label>
                      <input id="negocio" name="negocio" placeholder="Nombre del negocio" value={form.negocio} onChange={onChange} className={inputClass} />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70">
                    {loading ? 'Enviando…' : 'Quiero mi cotización'}
                  </button>

                  <p className="mt-2 text-center text-xs text-slate-500">Al enviar aceptas ser contactado por nuestros asesores. Tus datos no serán compartidos.</p>
                </form>
              </div>
            </div>

            <div className="order-2 md:order-1">
              <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
                Seguros bien cotizados en <span className="text-indigo-600">Irving</span>.<br /> Metroplex: Dallas — Fort Worth.
              </h1>
              <p className="mt-4 text-slate-600 md:text-lg">Somos franquicia de Del Toro Insurance en Irving. Déjanos tus datos y te contactamos para ofrecer opciones claras y adecuadas en auto, comercial, transporte y más.</p>
              <ul className="mt-6 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <li className="rounded-full border border-slate-200 bg-white px-3 py-2">Atención en menos de 1 hora</li>
                <li className="rounded-full border border-slate-200 bg-white px-3 py-2">Irving • Dallas • Fort Worth</li>
                <li className="rounded-full border border-slate-200 bg-white px-3 py-2">Datos protegidos</li>
                <li className="rounded-full border border-slate-200 bg-white px-3 py-2">Acompañamiento en renovaciones</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <h2 className="text-lg font-semibold text-slate-900">Coberturas que trabajamos</h2>
          <div className="no-scrollbar mt-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-3 snap-x snap-mandatory">
              {categories.map((c) => (
                <div key={c} className="snap-start shrink-0 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-800 shadow-sm hover:border-indigo-300">{c}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: 'Atención rápida', d: 'Te contactamos en menos de 1 hora hábil.' },
              { t: 'Opciones a medida', d: 'Cotizamos lo que realmente necesitas.' },
              { t: 'Cobertura local', d: 'Irving, Dallas y Fort Worth (Metroplex).' },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{f.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Contacto y ubicación</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-slate-600">Teléfono</div>
                <a href="tel:+14692101711" className="mt-1 inline-block text-base font-semibold text-indigo-700 hover:text-indigo-800">(469) 210-1711</a>
              </div>
              <div>
                <div className="text-sm text-slate-600">Dirección</div>
                <a className="mt-1 inline-block text-base font-semibold text-indigo-700 hover:text-indigo-800" href={encodeURI('https://www.google.com/maps/search/?api=1&query=555 W Airport Fwy Suite 106, Irving, TX 75062')} target="_blank" rel="noreferrer noopener">
                  555 W Airport Fwy, Suite 106, Irving, TX 75062
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200/70 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-600 md:flex-row">
            <span>© {new Date().getFullYear()} Del Toro Insurance — Irving. Todos los derechos reservados.</span>
            <a className="hover:text-slate-900" href="#cotizar">Quiero cotizar</a>
          </div>
        </footer>
      </div>

      <a href="https://wa.me/14694556391?text=Hola%20Del%20Toro%20Insurance%20Irving,%20me%20gustar%C3%ADa%20cotizar." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700">
        <img src="/whatsapp.svg" alt="" width={28} height={28} />
      </a>

      <style jsx global>{`.no-scrollbar::-webkit-scrollbar{display:none;}`}</style>
    </>
  );
}
