export default function CotizarPage() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cotiza tu seguro</h1>

      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Nombre completo" className="border p-2 rounded" required />
        <input type="email" placeholder="Correo electrónico" className="border p-2 rounded" required />
        <input type="tel" placeholder="Teléfono" className="border p-2 rounded" required />
        <select className="border p-2 rounded" required>
          <option value="">Tipo de seguro</option>
          <option value="auto">Auto</option>
          <option value="casa">Casa</option>
          <option value="comercial">Comercial</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </main>
  );
}
