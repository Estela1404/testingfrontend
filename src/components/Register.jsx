import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl px-8 pt-6 pb-8 text-white">
        
        <h2 className="text-3xl font-bold mb-6 text-center">Crear Cuenta</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input 
              type="text" 
              className="mt-1 w-full px-4 py-2 border border-purple-300 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/70" 
              placeholder="Tu nombre" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Correo electrónico</label>
            <input 
              type="email" 
              className="mt-1 w-full px-4 py-2 border border-purple-300 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/70" 
              placeholder="@gmail.com" 
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
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/90">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-300 font-bold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
