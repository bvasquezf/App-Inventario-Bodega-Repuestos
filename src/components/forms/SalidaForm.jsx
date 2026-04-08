import { useState } from "react";

function SalidaForm({ productos, onGuardar }) {
  const [formData, setFormData] = useState({
    producto_id: "",
    cantidad: "",
    solicitante: "",
    destino: "",
    observacion: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.producto_id) {
      alert("Selecciona un producto");
      return;
    }

    if (!formData.cantidad || Number(formData.cantidad) <= 0) {
      alert("Cantidad inválida");
      return;
    }

    setLoading(true);

    const salida = {
      producto_id: Number(formData.producto_id),
      tipo_movimiento: "salida",
      cantidad: Number(formData.cantidad),
      solicitante: formData.solicitante || null,
      destino: formData.destino || null,
      observacion: formData.observacion || null,
    };

    await onGuardar(salida);

    setFormData({
      producto_id: "",
      cantidad: "",
      solicitante: "",
      destino: "",
      observacion: "",
    });

    setLoading(false);
  };

  return (
    <form className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Registrar salida</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <select
          name="producto_id"
          value={formData.producto_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccionar producto</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="solicitante"
          placeholder="Solicitante"
          value={formData.solicitante}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="destino"
          placeholder="Destino"
          value={formData.destino}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="observacion"
          placeholder="Observación"
          value={formData.observacion}
          onChange={handleChange}
          className="border p-2 rounded md:col-span-2"
        />
      </div>

      <button className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors">
        {loading ? "Guardando..." : "Registrar salida"}
      </button>
    </form>
  );
}

export default SalidaForm;