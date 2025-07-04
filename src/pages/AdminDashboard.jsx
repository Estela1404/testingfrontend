import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList"; 
// 1. Importa la imagen de fondo
import miFondo from '../assets/images/DASHB.JPG';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const overlayColor1 = 'rgba(10, 37, 64, 0.90)';
  const overlayColor2 = 'rgba(38, 70, 83, 0.90)';
  const accentColor = '#2A9D8F'; 
  const containerBackgroundColor = '#1F2937';
  const sectionBackgroundColor = '#374151'; 
  const borderColor = '#4B5563'; 
  const headingColor = '#E5E7EB'; 
  const textColorLight = '#D1D5DB'; 
  const textColorMedium = '#9CA3AF'; 
  

  
  const backgroundStyle = {
    background: `linear-gradient(to bottom right, ${overlayColor1}, ${overlayColor2}), url(${miFondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser.id);
    
    if (!storedUser || storedUser.rol !== "admin") {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center" style={backgroundStyle}><p className="text-white text-xl">Cargando...</p></div>;
  }

  return (
    <div
      className="min-h-screen p-4 sm:p-6" 
      style={backgroundStyle}
    >
      <div
        className="max-w-5xl mx-auto p-4 sm:p-6 rounded-lg shadow-xl"
        style={{ backgroundColor: containerBackgroundColor }}
      >
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3"> 
             <div>
               <h1 className="text-xl sm:text-2xl font-bold" style={{ color: headingColor }}>
                 Panel de Administración
               </h1>
               <p className="text-sm font-medium" style={{ color: textColorLight }}>
                 Bienvenido, {user.nombre}
               </p>
             </div>
          </div>
      
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-md hover:opacity-90 transition duration-200 font-semibold shadow-md w-full sm:w-auto justify-center" // Ajustado para responsive
            style={{ backgroundColor: accentColor }}
          >
             Cerrar Sesión
          </button>
        </div>

        <div className="border-b mb-6" style={{ borderColor: borderColor }}></div>

        <div
          className="rounded-lg p-4 sm:p-6 shadow-md"
          style={{ backgroundColor: sectionBackgroundColor }}
        >
           <h2 className="text-lg font-semibold mb-4" style={{ color: headingColor }}>
             Lista de Usuarios
           </h2>

           <UserList />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;