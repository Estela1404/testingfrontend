import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, password }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Aquí capturamos message Y msg por si acaso
        throw new Error(data.message || data.msg || "Error en la respuesta del servidor");
      }

      const { token, user } = data;

      if (!token) {
        setError("No se recibió token de autenticación");
        return;
      }

      // Guardar datos en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("documentoidentidad", user.documentoidentidad);
      localStorage.setItem("correo", user.correo);

      // Redirigir según el rol
      if (user.rol === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      console.error("Error en fetch:", err);
    }
  };

  const verde = "#38bcb0";
  const fondo = "#1F2C3C";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #243447, #1F2C3C)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: fondo,
          padding: "2.5rem",
          borderRadius: "10px",
          width: "360px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          color: "#FFFFFF",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.6rem",
            marginBottom: "2rem",
            fontWeight: "400",
            letterSpacing: "0.05rem",
          }}
        >
          INICIAR SESIÓN
        </h2>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <div style={{ position: "relative" }}>
            <FiMail
              size={18}
              color={verde}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
              }}
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 10px 10px 38px",
                border: "none",
                borderBottom: "2px solid #3f4e5a",
                backgroundColor: "transparent",
                color: "#D1D5DB",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <FiLock
              size={18}
              color={verde}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
              }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 10px 10px 38px",
                border: "none",
                borderBottom: "2px solid #3f4e5a",
                backgroundColor: "transparent",
                color: "#D1D5DB",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#f87171",
                fontSize: "0.85rem",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: verde,
              border: "none",
              padding: "12px",
              borderRadius: "6px",
              fontWeight: "700",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: "0.5rem",
            }}
          >
            LOGIN
          </button>

          <Link
            to="/register"
            style={{
              marginTop: "0.3rem",
              border: `2px solid ${verde}`,
              padding: "10px",
              borderRadius: "6px",
              fontWeight: "700",
              color: verde,
              fontSize: "1rem",
              textAlign: "center",
              textDecoration: "none",
              display: "block",
            }}
          >
            REGISTRARSE
          </Link>
        </form>

        <Link
          to="/forgot-password"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.85rem",
            color: "#CBD5E1",
            textDecoration: "none",
          }}
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.9rem",
            color: "#B0B8BF",
            textDecoration: "none",
          }}
        >
          Regresar a la Página Principal
        </Link>
      </div>
    </div>
  );
};

export default Login;
