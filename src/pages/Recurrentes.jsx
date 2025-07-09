// src/pages/recurrentes/Recurrente.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recurrente = () => {
  const [gastos, setGastos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/recurrentes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Error al obtener los gastos");
        }

        const data = await response.json();
        setGastos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGastos();
  }, []);

  const estilos = {
    container: {
      backgroundColor: "#1b263b", // Azul oscuro de fondo
      minHeight: "100vh",
      padding: "2rem",
      color: "#e1e8f0",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      fontSize: "1.6rem",
      marginBottom: "1.5rem",
      fontWeight: "bold",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#252f3f", // Gris azulado oscuro
      padding: "1.2rem",
      borderRadius: "10px",
      width: "100%",
      maxWidth: "400px",
      marginBottom: "1rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      transition: "transform 0.2s",
    },
    cardHover: {
      transform: "scale(1.02)",
    },
    gastoId: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: "0.5rem",
    },
    gastoInfo: {
      margin: "0.3rem 0",
      color: "#cbd5e1",
    },
    button: {
      backgroundColor: "#38bcb0", // Botón turquesa
      color: "#fff",
      border: "none",
      padding: "12px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "2rem",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#2ea79d",
    },
    error: {
      color: "#f87171",
      textAlign: "center",
      marginBottom: "1rem",
    },
    noData: {
      textAlign: "center",
      color: "#94a3b8",
    },
  };

  return (
    <div style={estilos.container}>
      <h2 style={estilos.header}>Gastos Más Recurrentes</h2>

      {error && <p style={estilos.error}>{error}</p>}

      {gastos.length === 0 && !error && (
        <p style={estilos.noData}>No hay datos para mostrar.</p>
      )}

      {gastos.map((gasto, index) => (
        <div
          key={index}
          style={estilos.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3 style={estilos.gastoId}>{gasto._id}</h3>
          <p style={estilos.gastoInfo}>
            Veces registrado: <strong>{gasto.cantidad}</strong>
          </p>
          <p style={estilos.gastoInfo}>
            Total gastado:{" "}
            <strong>${Number(gasto.totalGastado).toLocaleString()}</strong>
          </p>
        </div>
      ))}

      <button
        style={estilos.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2ea79d")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#38bcb0")}
        onClick={() => navigate("/dashboard")}
      >
        Volver
      </button>
    </div>
  );
};

export default Recurrente;
