import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistorialIngresos = () => {
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/ingresos`);
        setIngresos(response.data);
      } catch (error) {
        console.error('Error al obtener los ingresos', error);
      }
    };
    fetchIngresos();
  }, []);

  return (
    <div>
      <h2>Historial de Ingresos</h2>
      <ul>
        {ingresos.map((ingreso) => (
          <li key={ingreso._id}>
            {ingreso.concepto} - {ingreso.cantidad} - {ingreso.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialIngresos;
