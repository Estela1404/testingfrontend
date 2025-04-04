import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-700 to-purple-900 p-5">
      
      <div className="max-w-md bg-white/20 shadow-lg rounded-lg p-6 text-center backdrop-blur-md">
        <h1 className="text-xl mb-2 font-bold text-white">Login CashOptimi$e</h1>
        <p className="mb-6 text-white">
          ¡Ordena tus finanzas y toma el control de tu dinero!
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            to="/login" 
            className="bg-white text-[#03BAE3] font-semibold py-2 px-6 rounded-full hover:bg-[#03BAE3] hover:text-white transition-all duration-300"
          >
            Iniciar Sesión
          </Link>
          <Link 
            to="/register" 
            className="bg-white text-[#03BAE3] font-semibold py-2 px-6 rounded-full hover:bg-[#03BAE3] hover:text-white transition-all duration-300"
          >
            Registrarse
          </Link>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white text-3xl cursor-pointer hover:text-blue-500 transition duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white text-3xl cursor-pointer hover:text-pink-500 transition duration-300" />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-white text-3xl cursor-pointer hover:text-green-500 transition duration-300" />
          </a>
        </div>

      </div>

    </div>
  );
};

export default Home;

