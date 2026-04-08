import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Layout({ children }) {
  const location = useLocation();
  const { logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const menu = [
    { path: "/", label: "Dashboard" },
    { path: "/productos", label: "Productos" },
    { path: "/entradas", label: "Entradas" },
    { path: "/salidas", label: "Salidas" },
    { path: "/stock", label: "Stock" },
    { path: "/historial", label: "Historial" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header móvil */}
      <header className="flex items-center justify-between bg-gray-900 px-4 py-4 text-white md:hidden">
        <h1 className="text-lg font-bold">Control de Bodega</h1>

        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium"
        >
          {menuAbierto ? "Cerrar" : "Menú"}
        </button>
      </header>

      {/* Fondo oscuro móvil */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* Sidebar móvil */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-72 flex-col bg-gray-900 p-6 text-white shadow-xl transition-transform duration-300 md:hidden ${
          menuAbierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="mb-6 text-2xl font-bold">Control de Bodega</h2>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuAbierto(false)}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                location.pathname === item.path
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
          className="mt-auto rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Layout desktop */}
      <div className="md:flex">
        <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-72 md:flex-col md:bg-gray-900 md:p-6 md:text-white md:shadow-xl">
          <h2 className="mb-8 text-2xl font-bold">Control de Bodega</h2>

          <nav className="flex flex-col gap-2">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  location.pathname === item.path
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
            className="mt-auto rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </aside>

        <main className="w-full p-4 md:ml-72 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default Layout;