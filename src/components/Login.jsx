import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 p-4">
      
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl px-10 pt-8 pb-10 text-white">
        
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Correo Electrónico</label>
            <input 
              type="email" 
              className="mt-1 w-full px-4 py-2 border border-purple-300 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/70" 
              placeholder="CO@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full px-4 py-2 border border-purple-300 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/70" 
              placeholder="******"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 bg-purple-500 hover:bg-purple-700 transition rounded-md font-semibold"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-blue-300 font-bold hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <p className="mt-4 text-center text-sm text-white/90">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-300 font-bold hover:underline">
            Regístrate
          </Link>
        </p>

        <p className="mt-4 text-center text-sm">
          <Link to="/" className="text-orange-300 font-bold hover:underline">
            Volver al inicio
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
