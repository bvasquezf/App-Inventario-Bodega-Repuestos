import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import EntradaForm from "../components/forms/EntradaForm";

function NuevaEntrada() {
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

    const guardarEntrada = async (entrada) => {
        const { error } = await supabase
            .from("movimientos")
            .insert([entrada]);

        if (error) {
            console.error(error);
            alert("Error al guardar entrada");
            return;
        }

        alert("Entrada registrada correctamente");
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h1 className="mb-6 text-2xl font-bold">Registrar Entrada</h1>

            <EntradaForm productos={productos} onGuardar={guardarEntrada} />
        </div>
    );
}

export default NuevaEntrada;