export default function Cotizar() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cotiza tu seguro</h1>
      <form className="space-y-4">
        <input className="block w-full border p-2 rounded" type="text" placeholder="Nombre completo" />
        <input className="block w-full border p-2 rounded" type="email" placeholder="Correo electrónico" />
        <input className="block w-full border p-2 rounded" type="tel" placeholder="Teléfono" />
        <select className="block w-full border p-2 rounded">
          <option>Tipo de seguro</option>
          <option>Auto</option>
          <option>Vida</option>
          <option>Salud</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </main>
  );
}
