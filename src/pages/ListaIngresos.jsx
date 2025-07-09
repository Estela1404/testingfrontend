import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const estilos = {
  pagina: {
    backgroundColor: '#2f394a',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contenedor: {
    backgroundColor: '#2f394a',
    borderRadius: '10px',
    padding: '15px',
    color: '#e1e8f0',
    maxHeight: '400px',
    overflowY: 'auto',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '20px'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: '25px',
    marginBottom: '12px',
    borderBottom: '1px solid #3f4a63',
    paddingBottom: '6px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #3f4a63',
    fontSize: '14px',
  },
  descripcionFecha: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    color: '#e1e8f0',
  },
  fecha: {
    fontSize: '12px',
    color: '#7d8599',
  },
  monto: {
    fontWeight: 'bold',
    color: '#62b2af',
  },
  mensaje: {
    textAlign: 'center',
    color: '#e1e8f0',
    marginTop: '20px',
  },
  botonVolver: {
    backgroundColor: '#5a6270',
    color: '#e1e8f0',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
    alignSelf: 'center'
  }
};

function ListaIngresos() {
  const navigate = useNavigate();
  const [ingresos, setIngresos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngresos = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError("No autenticado. Por favor, inicia sesión.");
        setIsLoading(false);
        navigate('/login');
        console.error("Error: No se encontró el token en localStorage.");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ingresos`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setIngresos(data);

      } catch (err) {
        setError(err.message);
        console.error("Error al obtener ingresos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngresos();
  }, [navigate]);

  const handleVolverDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div style={estilos.pagina}>
      <div style={estilos.contenedor}>
        <div style={estilos.titulo}>Lista de Ingresos</div>

        {isLoading && <div style={estilos.mensaje}>Cargando ingresos...</div>}

        {error && <div style={{ ...estilos.mensaje, color: 'red' }}>Error: {error}</div>}

        {!isLoading && !error && ingresos.length === 0 && (
          <div style={estilos.mensaje}>No hay ingresos registrados.</div>
        )}

        {!isLoading && !error && ingresos.length > 0 && (
          ingresos.map(ingreso => (
            <div key={ingreso._id} style={estilos.item}>
              <div style={estilos.descripcionFecha}>
                <span>{ingreso.descripcion}</span>
                <span style={estilos.fecha}>
                  {new Date(ingreso.fecha).toLocaleDateString()}
                </span>
              </div>
              <div style={estilos.monto}>
                ${typeof ingreso.monto === 'number'
                  ? ingreso.monto.toLocaleString('es-CO')
                  : '0'}
              </div>
            </div>
          ))
        )}
      </div>
      <button style={estilos.botonVolver} onClick={handleVolverDashboard}>
        Cerrar
      </button>
    </div>
  );
}

export default ListaIngresos;
