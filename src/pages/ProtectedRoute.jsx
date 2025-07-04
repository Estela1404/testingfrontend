import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Obtenemos el token almacenado en localStorage
  const token = localStorage.getItem('token');

  // Si no hay token, redirigimos al usuario a la página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si sí hay token, mostramos el componente hijo (la página protegida)
  return children;
}

export default ProtectedRoute;
