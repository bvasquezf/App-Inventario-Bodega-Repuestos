import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (isRegister) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }

    if (response.error) {
      alert(response.error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? "Registro" : "Login"}
        </h2>

        <input
          type="email"
          placeholder="Correo"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          {isRegister ? "Registrarse" : "Ingresar"}
        </button>

        <p
          className="text-sm text-center mt-4 cursor-pointer text-blue-600"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </p>
      </form>
    </div>
  );
}

export default Login;