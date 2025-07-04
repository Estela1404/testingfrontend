import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgregarGasto = () => {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState('Compra de mercado');
  const [monto, setMonto] = useState('');
  const [cuenta, setCuenta] = useState('Nequi');
  const [categoria, setCategoria] = useState('Alimentación');
  const [fecha, setFecha] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const documentoidentidad = localStorage.getItem('documentoidentidad');

  const opcionesCuentas = ['Nequi', 'Daviplata', 'Bancolombia', 'Banco de Bogotá', 'BBVA', 'Nu', 'Banco de Occidente', 'Davivienda', 'Efectivo', 'Otro'];
  const opcionesCategorias = ['Alimentación', 'Transporte', 'Servicios', 'Renta', 'Salud', 'Educación', 'Entretenimiento', 'Compras', 'Otro Gasto'];

  const colores = {
    fondo: '#1E293B',
    tarjeta: '#334155',
    textoClaro: '#F1F5F9',
    placeholder: '#94A3B8',
    boton: '#EF4444',
    botonHover: '#DC2626',
    sombra: '0 10px 20px rgba(0,0,0,0.3)',
    bordeCampo: '#475569'
  };

  const estiloCampo = {
    backgroundColor: '#293548',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
    border: `1px solid ${colores.bordeCampo}`
  };

  const estiloLabel = {
    fontSize: '0.9rem',
    color: colores.placeholder,
    marginBottom: '0.5rem',
    display: 'block'
  };

  const estiloInput = {
    width: '100%',
    fontSize: '1rem',
    background: 'transparent',
    color: colores.textoClaro,
    border: 'none',
    outline: 'none',
    padding: '0.25rem 0'
  };

  const estiloSelect = {
    ...estiloInput,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23${colores.placeholder.substring(1)}' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1em',
    paddingRight: '2.5rem',
    appearance: 'none'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token || token === "null" || token === "undefined") {
      alert('No estás autenticado o el token no es válido.');
      return;
    }

    const parsedMonto = parseFloat(monto);
    if (isNaN(parsedMonto)) {
      alert("El monto debe ser un número válido.");
      return;
    }

    if (!documentoidentidad) {
      alert("No se encontró el documento de identidad en el almacenamiento.");
      return;
    }

    const nuevoGasto = {
      descripcion,
      monto: parsedMonto,
      cuenta,
      categoria,
      fecha,
      tipo: 'gasto',
      documentoidentidad
    };

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      console.log("✅ Payload que se enviará al backend:", nuevoGasto);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gasto`, nuevoGasto, config);
      console.log("✅ Respuesta del backend:", response.data);
      alert('Gasto registrado exitosamente');
      setMonto('');
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Error al registrar gasto:', error);
      if (error.response) {
        console.error('❌ Respuesta del servidor:', error.response.data);
        alert(`Error del servidor: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error('❌ Error desconocido:', error);
        alert('Ocurrió un error desconocido.');
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colores.fondo,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: colores.tarjeta,
        padding: '2rem',
        borderRadius: '15px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: colores.sombra,
        color: colores.textoClaro
      }}>
        <h2 style={{
          color: colores.textoClaro,
          textAlign: 'center',
          marginBottom: '2rem',
          fontWeight: '600'
        }}>AGREGAR GASTO</h2>

        <div style={estiloCampo}>
          <label htmlFor="monto" style={estiloLabel}>Cantidad</label>
          <input
            id="monto"
            type="number"
            value={monto}
            onChange={e => setMonto(e.target.value)}
            style={estiloInput}
            placeholder="Ej: 120000"
            required
            min="0.01"
            step="any"
          />
        </div>

        <div style={estiloCampo}>
          <label htmlFor="cuenta" style={estiloLabel}>Entidad Bancaria / Cuenta</label>
          <select
            id="cuenta"
            value={cuenta}
            onChange={e => setCuenta(e.target.value)}
            style={estiloSelect}
            required
          >
            {opcionesCuentas.map(opcion => (
              <option
                key={opcion}
                value={opcion}
                style={{ backgroundColor: colores.tarjeta, color: colores.textoClaro }}
              >
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div style={estiloCampo}>
          <label htmlFor="categoria" style={estiloLabel}>Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            style={estiloSelect}
            required
          >
            {opcionesCategorias.map(opcion => (
              <option
                key={opcion}
                value={opcion}
                style={{ backgroundColor: colores.tarjeta, color: colores.textoClaro }}
              >
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div style={estiloCampo}>
          <label htmlFor="descripcion" style={estiloLabel}>Descripción</label>
          <input
            id="descripcion"
            type="text"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            style={estiloInput}
            placeholder="Ej: Compra en supermercado"
          />
        </div>

        <div style={estiloCampo}>
          <label htmlFor="fecha" style={estiloLabel}>Fecha</label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            style={estiloInput}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: colores.boton,
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '1.5rem',
            boxShadow: `0 4px 10px rgba(0,0,0,0.2), 0 0 0 2px ${colores.botonHover} inset`,
            transition: 'background-color 0.2s ease, transform 0.1s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = colores.botonHover}
          onMouseOut={e => e.currentTarget.style.backgroundColor = colores.boton}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          GUARDAR GASTO
        </button>
      </form>
    </div>
  );
};

export default AgregarGasto;
