import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documentoidentidad: "",
    nombre: "",
    correo: "",
    password: "",
    rol: "user",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{5,}$/.test(formData.documentoidentidad)) {
      setError("El documento debe contener al menos 5 dígitos y solo números.");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, formData);
      setSuccess("¡Cuenta creada exitosamente! Redirigiendo para iniciar sesión...");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear la cuenta.");
    }
  };

  const inputStyles = {
    base: {
      backgroundColor: 'transparent',
      color: '#FFFFFF',
      border: 'none',
      borderBottom: '1px solid #4A5568',
      paddingLeft: '2.25rem',
      paddingTop: '0.6rem',
      paddingBottom: '0.6rem',
      width: '100%',
      fontSize: '0.95rem',
      outline: 'none',
      transition: 'border-color 0.2s ease-in-out',
    },
    focus: '#2A9D8F',
    blur: '#4A5568'
  };

  return (
    <div style={{
      backgroundColor: '#212C3A',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <main style={{
        backgroundColor: '#2C3A47',
        padding: '2.5rem 2rem',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ color: '#FFFFFF' }} className="text-xl font-semibold text-center mb-8 uppercase tracking-wider">
          Crear Cuenta
        </h2>

        {error && (
          <p style={{
            backgroundColor: 'rgba(153, 27, 27, 0.2)',
            color: '#FCA5A5',
            border: '1px solid #F87171',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{
            backgroundColor: 'rgba(5, 102, 52, 0.2)',
            color: '#A7F3D0',
            border: '1px solid #6EE7B7',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Documento */}
          <div>
            <label style={{ color: '#B0B8C0', fontSize: '0.75rem' }}>Documento de Identidad</label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', color: '#7F8C9A' }} />
              <input
                type="text"
                name="documentoidentidad"
                value={formData.documentoidentidad}
                onChange={handleChange}
                required
                autoComplete="off"
                inputMode="numeric"
                style={inputStyles.base}
                onFocus={(e) => e.target.style.borderBottomColor = inputStyles.focus}
                onBlur={(e) => e.target.style.borderBottomColor = inputStyles.blur}
              />
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label style={{ color: '#B0B8C0', fontSize: '0.75rem' }}>Nombre</label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', color: '#7F8C9A' }} />
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                autoComplete="name"
                style={inputStyles.base}
                onFocus={(e) => e.target.style.borderBottomColor = inputStyles.focus}
                onBlur={(e) => e.target.style.borderBottomColor = inputStyles.blur}
              />
            </div>
          </div>

          {/* Correo */}
          <div>
            <label style={{ color: '#B0B8C0', fontSize: '0.75rem' }}>Correo Electrónico</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', color: '#7F8C9A' }} />
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                autoComplete="email"
                style={inputStyles.base}
                onFocus={(e) => e.target.style.borderBottomColor = inputStyles.focus}
                onBlur={(e) => e.target.style.borderBottomColor = inputStyles.blur}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label style={{ color: '#B0B8C0', fontSize: '0.75rem' }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', color: '#7F8C9A' }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                style={inputStyles.base}
                onFocus={(e) => e.target.style.borderBottomColor = inputStyles.focus}
                onBlur={(e) => e.target.style.borderBottomColor = inputStyles.blur}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#7F8C9A', marginTop: '0.5rem' }}>Mínimo 6 caracteres.</p>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#2A9D8F',
              color: '#FFFFFF',
              padding: '0.7rem',
              borderRadius: '5px',
              fontWeight: '600',
              textTransform: 'uppercase',
              fontSize: '0.875rem',
              width: '100%',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#25887D'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2A9D8F'}
          >
            Registrarse
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#B0B8C0' }}>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" style={{ color: '#2A9D8F', fontWeight: 'bold' }}>
              Inicia Sesión
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Register;
