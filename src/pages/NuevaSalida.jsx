import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import SalidaForm from "../components/forms/SalidaForm";

function NuevaSalida() {
    const [productos, setProductos] = useState([]);

    const cargarProductos = async () => {
        const { data, error } = await supabase
            .from("productos")
            .select("*")
            .eq("activo", true)
            .order("nombre", { ascending: true });

        if (error) {
            console.error("Error al cargar productos:", error);
            return;
        }

        setProductos(data || []);
    };

    const obtenerStockProducto = async (productoId) => {
        const { data, error } = await supabase
            .from("stock_actual")
            .select("*")
            .eq("id", productoId)
            .single();

        if (error) {
            console.error("Error al consultar stock:", error);
            return null;
        }

        return data;
    };

    const guardarSalida = async (salida) => {
        const stockInfo = await obtenerStockProducto(salida.producto_id);

        if (!stockInfo) {
            alert("No se pudo validar el stock del producto");
            return;
        }

        if (Number(salida.cantidad) > Number(stockInfo.stock)) {
            alert(
                `Stock insuficiente. Stock disponible: ${stockInfo.stock}, cantidad solicitada: ${salida.cantidad}`
            );
            return;
        }

        const { error } = await supabase.from("movimientos").insert([salida]);

        if (error) {
            console.error("Error al registrar salida:", error);
            alert("Error al registrar salida");
            return;
        }

        alert("Salida registrada correctamente");
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <SalidaForm productos={productos} onGuardar={guardarSalida} />
        </div>
    );
}

export default NuevaSalida;