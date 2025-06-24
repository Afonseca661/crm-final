nano pages/cotizar.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Cotizar() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    tipo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.correo || !form.tipo) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const { data, error } = await supabase.from('leads').insert([
      {
        nombre: form.nombre,
        correo: form.correo,
        tipo_seguro: form.tipo,
        fuente: 'cotizar_web',
        fecha: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error:', error.message);
      alert('Hubo un error al guardar tus datos.');
      return;
    }

    const mensaje = `Hola, soy ${form.nombre} y quiero cotizar un seguro de ${form.tipo}.`;
    const whatsappUrl = `https://wa.me/1XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cotiza tu seguro</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={form.correo}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo de seguro"
          value={form.tipo}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
