import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Layout({ children }) {
    const location = useLocation();

    const menu = [
        { path: "/", label: "Dashboard" },
        { path: "/productos", label: "Productos" },
        { path: "/entradas", label: "Entradas" },
        { path: "/salidas", label: "Salidas" },
        { path: "/stock", label: "Stock" },
        { path: "/historial", label: "Historial" },
    ];

    const { logout } = useAuth();

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6">
                <h2 className="text-xl font-bold mb-6">
                    Control de Bodega
                </h2>

                <nav className="flex flex-col gap-2">
                    {menu.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`rounded-lg px-3 py-2 text-sm transition ${location.pathname === item.path
                                ? "bg-gray-700"
                                : "hover:bg-gray-800"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <button
                    onClick={logout}
                    className="mt-6 bg-red-600 px-3 py-2 rounded text-sm"
                >
                    Cerrar sesión
                </button>
            </aside>

            {/* Contenido */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}

export default Layout;