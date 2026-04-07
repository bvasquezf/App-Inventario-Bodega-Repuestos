import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { exportWorkbook } from "../utils/exportWorkbook";

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [stock, setStock] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarData = async () => {
    setLoading(true);

    const { data: productosData, error: productosError } = await supabase
      .from("productos")
      .select("*");

    const { data: stockData, error: stockError } = await supabase
      .from("stock_actual")
      .select("*");

    const { data: movimientosData, error: movimientosError } = await supabase
      .from("movimientos")
      .select(`
        id,
        tipo_movimiento,
        cantidad,
        precio_unitario,
        proveedor,
        numero_documento,
        solicitante,
        destino,
        observacion,
        fecha,
        productos (
          nombre,
          codigo
        )
      `)
      .order("id", { ascending: false });

    console.log("productosError:", productosError);
    console.log("stockError:", stockError);
    console.log("movimientosError:", movimientosError);

    setProductos(productosData || []);
    setStock(stockData || []);
    setMovimientos(movimientosData || []);
    setLoading(false);
  };

  useEffect(() => {
    cargarData();
  }, []);

  const totalProductos = productos.length;

  const stockBajo = stock.filter((item) => {
    const prod = productos.find((p) => p.id === item.id);
    return prod && item.stock <= prod.stock_minimo;
  });

  const valorInventario = stock.reduce((total, item) => {
    const prod = productos.find((p) => p.id === item.id);
    if (!prod) return total;
    return total + item.stock * (prod.precio_referencia || 0);
  }, 0);

  const exportarReporteMaestro = () => {
    const productosSheet = productos.map((producto) => ({
      ID: producto.id,
      Código: producto.codigo || "",
      Nombre: producto.nombre || "",
      Categoría: producto.categoria || "",
      Unidad: producto.unidad || "",
      "Stock mínimo": producto.stock_minimo || 0,
      "Precio referencia": producto.precio_referencia || 0,
      Estado: producto.activo ? "Activo" : "Inactivo",
    }));

    const stockSheet = stock.map((item) => ({
      ID: item.id,
      Código: item.codigo || "",
      Nombre: item.nombre || "",
      Stock: item.stock ?? 0,
    }));

    const historialSheet = movimientos.map((mov) => ({
      ID: mov.id,
      Fecha: mov.fecha || "",
      Tipo: mov.tipo_movimiento || "",
      Código: mov.productos?.codigo || "",
      Producto: mov.productos?.nombre || "",
      Cantidad: mov.cantidad ?? 0,
      "Precio unitario": mov.precio_unitario ?? 0,
      Proveedor: mov.proveedor || "",
      Documento: mov.numero_documento || "",
      Solicitante: mov.solicitante || "",
      Destino: mov.destino || "",
      Observación: mov.observacion || "",
    }));

    exportWorkbook(
      [
        { name: "Productos", data: productosSheet },
        { name: "Stock", data: stockSheet },
        { name: "Historial", data: historialSheet },
      ],
      "reporte_maestro_bodega"
    );
  };

  if (loading) {
    return <p className="p-6">Cargando dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={exportarReporteMaestro}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Exportar reporte
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total productos</p>
          <p className="text-2xl font-bold">{totalProductos}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Stock bajo mínimo</p>
          <p className="text-2xl font-bold text-red-600">
            {stockBajo.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Valor inventario</p>
          <p className="text-2xl font-bold text-green-600">
            ${valorInventario.toLocaleString("es-CL")}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Productos con stock bajo ⚠️
        </h2>

        {stockBajo.length === 0 ? (
          <p className="text-gray-500">Todo en orden 👍</p>
        ) : (
          stockBajo.map((item) => {
            const prod = productos.find((p) => p.id === item.id);

            return (
              <div key={item.id} className="border-b py-2">
                <p className="font-medium">{prod?.nombre}</p>
                <p className="text-sm text-gray-600">
                  Stock: {item.stock} / Mínimo: {prod?.stock_minimo}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Últimos movimientos
        </h2>

        {movimientos.length === 0 ? (
          <p className="text-gray-500">No hay movimientos visibles.</p>
        ) : (
          movimientos.slice(0, 5).map((mov) => (
            <div key={mov.id} className="border-b py-2">
              <p className="font-medium">{mov.productos?.nombre}</p>
              <p className="text-sm text-gray-600">
                {mov.tipo_movimiento} - Cantidad: {mov.cantidad}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;