import { useState } from "react";

function EntradaForm({ productos, onGuardar }) {
  const [formData, setFormData] = useState({
    producto_id: "",
    cantidad: "",
    precio_unitario: "",
    proveedor: "",
    numero_documento: "",
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
      alert("Debes seleccionar un producto");
      return;
    }

    if (!formData.cantidad || Number(formData.cantidad) <= 0) {
      alert("Cantidad inválida");
      return;
    }

    setLoading(true);

    const nuevaEntrada = {
      producto_id: Number(formData.producto_id),
      tipo_movimiento: "entrada",
      cantidad: Number(formData.cantidad),
      precio_unitario: formData.precio_unitario
        ? Number(formData.precio_unitario)
        : 0,
      proveedor: formData.proveedor || null,
      numero_documento: formData.numero_documento || null,
      observacion: formData.observacion || null,
    };

    await onGuardar(nuevaEntrada);

    setFormData({
      producto_id: "",
      cantidad: "",
      precio_unitario: "",
      proveedor: "",
      numero_documento: "",
      observacion: "",
    });

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Registrar entrada
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-gray-700">Producto *</label>
          <select
            name="producto_id"
            value={formData.producto_id}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          >
            <option value="">Seleccionar producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-700">Cantidad *</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Precio unitario(Segun Factura)</label>
          <input
            type="number"
            name="precio_unitario"
            value={formData.precio_unitario}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Proveedor</label>
          <input
            type="text"
            name="proveedor"
            value={formData.proveedor}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">N° Documento</label>
          <input
            type="text"
            name="numero_documento"
            value={formData.numero_documento}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-700">Observación</label>
          <textarea
            name="observacion"
            value={formData.observacion}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>
      </div>

      <button className="mt-4 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors">
        {loading ? "Guardando..." : "Guardar entrada"}
      </button>
    </form>
  );
}

export default EntradaForm;