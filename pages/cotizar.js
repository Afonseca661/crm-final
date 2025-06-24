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

    const { error } = await supabase.from('leads').insert([
      {
        nombre: form.nombre,
        email: form.correo,
        mensaje: form.tipo,
      },
    ]);

    if (error) {
      alert('Hubo un error al guardar el lead.');
      console.error(error);
    } else {
      alert('¡Lead enviado con éxito!');
      // Redirigir a WhatsApp automáticamente (ajusta el número si lo deseas)
      const mensaje = `Hola, soy ${form.nombre} y estoy interesado en un seguro de tipo: ${form.tipo}`;
      window.location.href = `https://wa.me/1XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    }

    setForm({ nombre: '', correo: '', tipo: '' });
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h1>Cotiza tu seguro</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />

        <label>Correo electrónico</label>
        <input type="email" name="correo" value={form.correo} onChange={handleChange} required />

        <label>Tipo de seguro</label>
        <select name="tipo" value={form.tipo} onChange={handleChange} required>
          <option value="">Selecciona uno</option>
          <option value="auto">Auto</option>
          <option value="salud">Salud</option>
          <option value="vida">Vida</option>
          <option value="hogar">Hogar</option>
          <option value="comercial">Comercial</option>
        </select>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
