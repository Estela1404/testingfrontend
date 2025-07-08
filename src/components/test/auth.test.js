// Login.jsx
import React from 'react';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="correo">Correo:</label>
        <input id="correo" type="email" />
        <label htmlFor="password">Contraseña:</label>
        <input id="password" type="password" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
