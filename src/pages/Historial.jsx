import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { exportToExcel } from "../utils/exportToExcel";

function Historial() {
    const [movimientos, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarMovimientos = async () => {
        setLoading(true);

        const { data, error } = await supabase
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

        if (error) {
            console.error("Error al cargar historial:", error);
            setLoading(false);
            return;
        }

        setMovimientos(data || []);
        setLoading(false);
    };

    const exportarHistorial = () => {
        const dataExport = movimientos.map((mov) => ({
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

        exportToExcel(dataExport, "historial_movimientos_bodega", "Historial");
    };

    useEffect(() => {
        cargarMovimientos();
    }, []);

    const getTipoClase = (tipo) => {
        if (tipo === "entrada") return "bg-green-100 text-green-700";
        if (tipo === "salida") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");

    const movimientosFiltrados = movimientos.filter((mov) => {
        const fechaMov = mov.fecha;

        const cumpleDesde = fechaDesde ? fechaMov >= fechaDesde : true;
        const cumpleHasta = fechaHasta ? fechaMov <= fechaHasta : true;

        return cumpleDesde && cumpleHasta;
    });

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    Historial de movimientos
                </h1>

                <button
                    onClick={exportarHistorial}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                    Exportar Excel
                </button>
            </div>

            <div className="mb-4 flex flex-col gap-3 md:flex-row">
                <div>
                    <label className="mb-1 block text-sm text-gray-700">Desde</label>
                    <input
                        type="date"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                        className="rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-700">Hasta</label>
                    <input
                        type="date"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                        className="rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                {loading ? (
                    <p className="text-gray-600">Cargando historial...</p>
                ) : movimientosFiltrados.length === 0 ? (
                    <p className="text-gray-600">No hay movimientos registrados.</p>
                ) : (
                    <div className="grid gap-4">
                        {movimientosFiltrados.map((mov) => (
                            <div key={mov.id} className="rounded-xl border border-gray-200 p-4">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${getTipoClase(
                                            mov.tipo_movimiento
                                        )}`}
                                    >
                                        {mov.tipo_movimiento.toUpperCase()}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        Fecha: {mov.fecha}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-800">
                                    {mov.productos?.nombre || "Producto sin nombre"}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Código: {mov.productos?.codigo || "Sin código"}
                                </p>

                                <p className="mt-2 text-sm text-gray-700">
                                    Cantidad: <strong>{mov.cantidad}</strong>
                                </p>

                                {mov.precio_unitario ? (
                                    <p className="text-sm text-gray-700">
                                        Precio unitario: $
                                        {Number(mov.precio_unitario).toLocaleString("es-CL")}
                                    </p>
                                ) : null}

                                {mov.proveedor && (
                                    <p className="text-sm text-gray-700">
                                        Proveedor: {mov.proveedor}
                                    </p>
                                )}

                                {mov.numero_documento && (
                                    <p className="text-sm text-gray-700">
                                        Documento: {mov.numero_documento}
                                    </p>
                                )}

                                {mov.solicitante && (
                                    <p className="text-sm text-gray-700">
                                        Solicitante: {mov.solicitante}
                                    </p>
                                )}

                                {mov.destino && (
                                    <p className="text-sm text-gray-700">
                                        Destino: {mov.destino}
                                    </p>
                                )}

                                {mov.observacion && (
                                    <p className="text-sm text-gray-700">
                                        Observación: {mov.observacion}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Historial;