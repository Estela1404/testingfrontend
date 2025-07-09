// src/pages/Transferencia.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Transferencia = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cuentaOrigen: "",
    cuentaDestino: "",
    monto: "",
    descripcion: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !form.cuentaOrigen ||
      !form.cuentaDestino ||
      !form.monto ||
      parseFloat(form.monto) <= 0
    ) {
      setError("Todos los campos son obligatorios y el monto debe ser positivo.");
      return;
    }

    if (form.cuentaOrigen === form.cuentaDestino) {
      setError("La cuenta origen y destino no pueden ser iguales.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transferencias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al realizar la transferencia");
      }

      setSuccess("Transferencia realizada correctamente.");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const estilos = {
    container: {
      backgroundColor: "#2f394a",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
    },
    form: {
      backgroundColor: "#1f2c3c",
      padding: "2rem",
      borderRadius: "8px",
      width: "100%",
      maxWidth: "400px",
      color: "#e1e8f0",
      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      fontFamily: "Segoe UI, sans-serif",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "1rem",
      backgroundColor: "transparent",
      border: "1px solid #3f4a63",
      borderRadius: "4px",
      color: "#e1e8f0",
      fontSize: "0.9rem",
    },
    button: {
      backgroundColor: "#38bcb0",
      color: "#fff",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      width: "100%",
      fontWeight: "bold",
      cursor: "pointer",
    },
    message: {
      textAlign: "center",
      marginBottom: "1rem",
      fontSize: "0.85rem",
    },
  };

  return (
    <div style={estilos.container}>
      <form style={estilos.form} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Nueva Transferencia
        </h2>

        {error && <div style={{ ...estilos.message, color: "#f87171" }}>{error}</div>}
        {success && <div style={{ ...estilos.message, color: "#4ade80" }}>{success}</div>}

        <label>Cuenta Origen</label>
        <select
          name="cuentaOrigen"
          value={form.cuentaOrigen}
          onChange={handleChange}
          style={estilos.input}
          required
        >
          <option value="">Seleccionar cuenta</option>
          <option value="Ahorros">Ahorros</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Gastos Fijos">Gastos Fijos</option>
        </select>

        <label>Cuenta Destino</label>
        <select
          name="cuentaDestino"
          value={form.cuentaDestino}
          onChange={handleChange}
          style={estilos.input}
          required
        >
          <option value="">Seleccionar cuenta</option>
          <option value="Ahorros">Ahorros</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Gastos Fijos">Gastos Fijos</option>
        </select>

        <label>Monto</label>
        <input
          type="number"
          name="monto"
          value={form.monto}
          onChange={handleChange}
          style={estilos.input}
          min="1"
          required
        />

        <label>Descripción</label>
        <input
          type="text"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          style={estilos.input}
        />

        <button type="submit" style={estilos.button}>
          Realizar Transferencia
        </button>

        <button
          type="button"
          style={{ ...estilos.button, backgroundColor: "#5a6270", marginTop: "0.5rem" }}
          onClick={() => navigate("/dashboard")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default Transferencia;
