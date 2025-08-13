import { useState } from 'react';

export default function IndexPage() {
  const [form, setForm] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    if (!res.ok) return alert('Error: ' + json.error);
    alert('✅ Lead guardado con éxito');
    setForm({ nombre:'', telefono:'', email:'', estado:'', tipo:'', direccion:'', mc:'', dot:'', negocio:'' });
  };

  return (
    <main style={{ padding: 24, maxWidth: 520, fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: 12 }}>Captura de Leads (leads_app)</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" />
        <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo de seguro" />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
        <input name="mc" value={form.mc} onChange={handleChange} placeholder="MC" />
        <input name="dot" value={form.dot} onChange={handleChange} placeholder="DOT" />
        <input name="negocio" value={form.negocio} onChange={handleChange} placeholder="Negocio" />
        <button type="submit">Guardar lead</button>
      </form>
    </main>
  );
}


