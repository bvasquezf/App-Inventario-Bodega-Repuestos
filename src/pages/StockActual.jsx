import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { exportToExcel } from "../utils/exportToExcel";

function StockActual() {
  const [stock, setStock] = useState([]);

  const cargarStock = async () => {
    const { data, error } = await supabase
      .from("stock_actual")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) {
      console.error("Error al cargar stock:", error);
      return;
    }

    setStock(data || []);
  };

  const exportarStock = () => {
    const dataExport = stock.map((item) => ({
      ID: item.id,
      Código: item.codigo || "",
      Nombre: item.nombre || "",
      Stock: item.stock ?? 0,
    }));

    exportToExcel(dataExport, "stock_actual_bodega", "Stock");
  };

  useEffect(() => {
    cargarStock();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Stock actual</h1>

        <button
          onClick={exportarStock}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Exportar Excel
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stock.map((item) => (
          <div key={item.id} className="border p-4 rounded-xl bg-white">
            <h3 className="font-bold">{item.nombre}</h3>
            <p>Código: {item.codigo}</p>
            <p className="text-lg font-semibold">Stock: {item.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockActual;