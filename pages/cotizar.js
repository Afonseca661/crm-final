
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Cotizar() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('leads').insert([form]);
    if (error) {
      alert('Error al guardar el lead');
      console.error(error);
      return;
    }

    const msg = `Hola, soy ${form.nombre}. Quiero cotizar un seguro de tipo: ${form.tipo}.
Teléfono: ${form.telefono}
Email: ${form.email}
Estado: ${form.estado}
${form.tipo === 'camiones' ? `MC: ${form.mc} | DOT: ${form.dot}` : ''}
${form.tipo === 'comercial' ? `Negocio: ${form.negocio}` : ''}
${['casa', 'inquilinos'].includes(form.tipo) ? `Dirección: ${form.direccion}` : ''}`;

    const whatsappURL = `https://wa.me/14692101711?text=${encodeURIComponent(msg)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cotiza tu Seguro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" onChange={handleChange} required placeholder="Nombre" className="w-full border px-4 py-2" />
        <input name="telefono" onChange={handleChange} required placeholder="Teléfono" className="w-full border px-4 py-2" />
        <input name="email" onChange={handleChange} required placeholder="Correo electrónico" className="w-full border px-4 py-2" />
        <input name="estado" onChange={handleChange} required placeholder="Estado" className="w-full border px-4 py-2" />

        <select name="tipo" onChange={handleChange} required className="w-full border px-4 py-2">
          <option value="">Selecciona tipo de seguro</option>
          <option value="auto">Auto</option>
          <option value="camiones">Camiones</option>
          <option value="comercial">Comercial</option>
          <option value="casa">Casa</option>
          <option value="inquilinos">Inquilinos</option>
        </select>

        {form.tipo === 'camiones' && (
          <>
            <input name="mc" onChange={handleChange} placeholder="MC Number" className="w-full border px-4 py-2" />
            <input name="dot" onChange={handleChange} placeholder="DOT Number" className="w-full border px-4 py-2" />
          </>
        )}

        {form.tipo === 'comercial' && (
          <input name="negocio" onChange={handleChange} placeholder="Tipo de Negocio" className="w-full border px-4 py-2" />
        )}

        {(form.tipo === 'casa' || form.tipo === 'inquilinos') && (
          <input name="direccion" onChange={handleChange} placeholder="Dirección del inmueble" className="w-full border px-4 py-2" />
        )}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
      </form>
    </div>
  );
}
