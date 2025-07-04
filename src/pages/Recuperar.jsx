import React, { useState } from "react";

const Recuperar = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/recuperar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje("Por favor valida tu correo.");
      } else {
        setError(data.msg || "Error al procesar la solicitud.");
      }
    } catch (err) {
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
          Recuperar Contraseña
        </h2>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[#243447] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-full font-semibold"
        >
          Enviar enlace
        </button>
        {mensaje && (
          <p className="text-green-400 mt-4 text-center">{mensaje}</p>
        )}
        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}
        <p className="text-gray-400 mt-6 text-center text-sm">
          Recibirás un enlace para restablecer tu contraseña.
        </p>
      </form>
    </div>
  );
};

export default Recuperar;
