import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);

  // Estado para la fecha actual del mes
  const [currentDate, setCurrentDate] = useState(new Date());

  // Paleta de colores y fuente
  const pageBackgroundColor = '#212C3A';
  const containerBackgroundColor = '#1A202C';
  const cardBackgroundColor = '#2D3748';
  const accentColor = '#38B2AC';
  const headingColor = '#E2E8F0';
  const primaryTextColor = '#FFFFFF';
  const secondaryTextColor = '#A0AEC0';
  const iconColorInButtons = accentColor;
  const buttonTextColor = '#FFFFFF';
  const fontFamily = "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";

  const overallPageStyle = {
    backgroundColor: pageBackgroundColor,
    fontFamily: fontFamily,
    minHeight: '100vh',
  };

  // Cambiar mes
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // Nombres de meses
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const startDate = new Date(year, currentDate.getMonth(), 1);
  const endDate = new Date(year, currentDate.getMonth() + 1, 0);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al parsear los datos del usuario desde localStorage:", error);
        localStorage.removeItem("user");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Obtener ingresos
    fetch(`${import.meta.env.VITE_API_BASE_URL}/ingresos/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fallo al obtener ingresos");
        return res.json();
      })
      .then((data) => {
        setTotalIngresos(data.total || 0);
      })
      .catch((error) => console.error("Error al obtener ingresos:", error));

    // Obtener gastos
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gasto/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fallo al obtener gastos");
        return res.json();
      })
      .then((data) => {
        setTotalGastos(data.total || 0);
      })
      .catch((error) => console.error("Error al obtener gastos:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={overallPageStyle}>
        <p style={{ color: primaryTextColor, fontSize: '1.25rem' }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-6 sm:pt-8 pb-8 px-4" style={overallPageStyle}>
      <div className="p-4 sm:p-5 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm" style={{ backgroundColor: containerBackgroundColor }}>
        {/* Bienvenida */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: headingColor }}>
            Bienvenido
          </h1>
          <p style={{ color: primaryTextColor, fontSize: '1.1rem' }}>
            Hola, <strong>{user.nombre}</strong>
          </p>
          <p style={{ color: secondaryTextColor, fontSize: '0.95rem' }}>
            C.C: <strong>{user.documentoidentidad}</strong>
          </p>
        </div>

        {/* Navegador de fechas */}
        <div className="mb-6 text-center">
          <div className="flex justify-between items-center mb-1.5 px-2">
            <span
              className="text-2xl cursor-pointer"
              style={{ color: accentColor }}
              onClick={() => changeMonth(-1)}
            >
              &lt;
            </span>
            <span className="font-semibold text-lg" style={{ color: headingColor }}>
              {monthName} {year}
            </span>
            <span
              className="text-2xl cursor-pointer"
              style={{ color: accentColor }}
              onClick={() => changeMonth(1)}
            >
              &gt;
            </span>
          </div>
          <p className="text-xs" style={{ color: secondaryTextColor }}>
            {formatDate(startDate)} hasta {formatDate(endDate)}
          </p>
        </div>

        {/* Tarjeta de Balance */}
        <div className="p-4 rounded-lg shadow-lg mb-6" style={{ backgroundColor: cardBackgroundColor }}>
          <h2 className="text-sm font-semibold text-center mb-3 py-1.5 rounded-sm" style={{ color: headingColor, backgroundColor: 'rgba(0,0,0,0.15)' }}>
            BALANCE MENSUAL
          </h2>
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="font-bold text-xl" style={{ color: primaryTextColor }}>Total</span>
            <span className="font-bold text-xl" style={{ color: primaryTextColor }}>
              ${(totalIngresos - totalGastos).toLocaleString('es-ES')}
            </span>
          </div>
          <div className="flex justify-between items-center mb-1 px-2">
            <span className="text-sm" style={{ color: secondaryTextColor }}>Ingresos</span>
            <span className="text-sm" style={{ color: secondaryTextColor }}>
              ${totalIngresos.toLocaleString('es-ES')}
            </span>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-sm" style={{ color: secondaryTextColor }}>Gastos</span>
            <span className="text-sm" style={{ color: secondaryTextColor }}>
              -${totalGastos.toLocaleString('es-ES')}
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div className="p-3 rounded-lg shadow-lg space-y-2.5 mb-8" style={{ backgroundColor: cardBackgroundColor }}>
          <ActionButton icon="−" label="Nuevo Ingreso" onClick={() => navigate('/agregar-ingreso')} />
          <ActionButton icon="+" label="Nuevo Gasto" onClick={() => navigate('/agregar-gasto')} />
          <ActionButton icon="⇄" label="Transferencia" onClick={() => navigate('/transferencia')} />
          <ActionButton icon="↻" label="Recurrente" onClick={() => navigate('/recurrente')} />
          <ActionButton icon="📋" label="Lista de Ingresos" onClick={() => navigate('/lista-ingresos')} />
          <ActionButton icon="💸" label="Lista de Gastos" onClick={() => navigate('/lista-gastos')} />
        </div>

        {/* Cerrar Sesión */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-8 py-2.5 rounded-md transition-colors duration-200 ease-in-out font-semibold shadow-md text-sm"
            style={{ backgroundColor: accentColor, color: buttonTextColor }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2C7A7B'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = accentColor}
          >
            CERRAR SESIÓN
          </button>
        </div>
      </div>
    </div>
  );

  function ActionButton({ icon, label, onClick }) {
    return (
      <button
        onClick={onClick}
        className="flex items-center w-full text-left p-3.5 rounded-md transition-colors duration-150 ease-in-out"
        style={{
          color: headingColor,
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'}
      >
        <span className="text-lg mr-3.5" style={{ color: iconColorInButtons }}>{icon}</span>
        {label}
      </button>
    );
  }
};

export default Dashboard;
