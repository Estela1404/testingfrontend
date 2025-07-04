import React, { useState } from 'react';

const Formulario = ({ onSubmit }) => {
  const [valor, setValor] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    onSubmit(valor);       // Llama a la función que recibe por props
    setValor('');          // Limpia el input
  };

  return (
    <form onSubmit={manejarEnvio}>
      <input
        data-testid="campo"           // 👉 Esto es clave para que el test funcione
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
