import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = isRegister ? await register(email, password) : await login(email, password);
    if (response.error) alert(response.error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Control de Bodega</h1>
          <p className="mt-1 text-sm text-slate-400">{isRegister ? "Crea tu cuenta" : "Inicia sesión para continuar"}</p>
        </div>

        <form className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Correo</label>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
            {isRegister ? "Registrarse" : "Ingresar"}
          </button>

          <p
            className="mt-4 text-center text-xs text-indigo-500 cursor-pointer hover:text-indigo-700"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;