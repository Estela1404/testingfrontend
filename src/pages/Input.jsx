import { useState } from 'react';

function Input({ label }) {
  const [value, setValue] = useState('');

  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe algo"
      />
      <p data-testid="valor-mostrado">Valor actual: {value}</p>
    </div>
  );
}

export default Input;
