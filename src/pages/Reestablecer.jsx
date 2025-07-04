import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Reestablecer = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reestablecer/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.msg);
      } else {
        setError(data.msg || "Error al restablecer la contraseña.");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b2a38]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e2d3d] p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Restablecer Contraseña
        </h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[#243447] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-full font-semibold"
        >
          Cambiar contraseña
        </button>
        {mensaje && (
          <p className="text-green-400 mt-4 text-center">{mensaje}</p>
        )}
        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}
        <p className="text-gray-400 mt-6 text-center text-sm">
          Usa una contraseña segura que recuerdes fácilmente.
        </p>
      </form>
    </div>
  );
};

export default Reestablecer;
