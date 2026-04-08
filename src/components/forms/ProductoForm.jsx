import { useEffect, useState } from "react";

function ProductoForm({ onGuardar, productoEditar, onCancelarEdicion }) {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    unidad: "",
    stock_minimo: "",
    precio_referencia: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productoEditar) {
      setFormData({
        codigo: productoEditar.codigo || "",
        nombre: productoEditar.nombre || "",
        categoria: productoEditar.categoria || "",
        unidad: productoEditar.unidad || "",
        stock_minimo: productoEditar.stock_minimo ?? "",
        precio_referencia: productoEditar.precio_referencia ?? "",
      });
    } else {
      setFormData({
        codigo: "",
        nombre: "",
        categoria: "",
        unidad: "",
        stock_minimo: "",
        precio_referencia: "",
      });
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      alert("El nombre del producto es obligatorio");
      return;
    }

    setLoading(true);

    const productoData = {
      codigo: formData.codigo.trim() || null,
      nombre: formData.nombre.trim(),
      categoria: formData.categoria.trim() || null,
      unidad: formData.unidad.trim() || null,
      stock_minimo: formData.stock_minimo ? Number(formData.stock_minimo) : 0,
      precio_referencia: formData.precio_referencia
        ? Number(formData.precio_referencia)
        : null,
    };

    await onGuardar(productoData);

    if (!productoEditar) {
      setFormData({
        codigo: "",
        nombre: "",
        categoria: "",
        unidad: "",
        stock_minimo: "",
        precio_referencia: "",
      });
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {productoEditar ? "Editar producto" : "Agregar producto"}
        </h2>

        {productoEditar && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar edición
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Código
          </label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Ej: TOR-001"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Ej: Tornillo 1/2 zincado"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Ej: Pernos"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Unidad
          </label>
          <input
            type="text"
            name="unidad"
            value={formData.unidad}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Ej: unidad, caja, litro"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Stock mínimo
          </label>
          <input
            type="number"
            name="stock_minimo"
            value={formData.stock_minimo}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Ej: 10"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Precio referencia(Opcional)
          </label>
          <input
            type="number"
            name="precio_referencia"
            value={formData.precio_referencia}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Ej: 2500 o dejar vacio"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition hover:bg-gray-900 disabled:opacity-50"
      >
        {loading
          ? productoEditar
            ? "Actualizando..."
            : "Guardando..."
          : productoEditar
          ? "Actualizar producto"
          : "Guardar producto"}
      </button>
    </form>
  );
}

export default ProductoForm;