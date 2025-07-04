import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AgregarTransferencia = () => {
  const [fecha, setFecha] = useState(new Date());

  return (
    <div className="min-h-screen bg-[#0e1a2b] flex items-center justify-center">
      <div className="bg-[#1c2c3c] w-[90%] max-w-md p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center mb-4">Nueva Transferencia</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Cuenta origen</label>
            <select className="w-full p-2 rounded-md bg-[#2b3a4c] text-white focus:outline-none">
              <option>Cuenta Ahorros</option>
              <option>Cuenta Corriente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Cuenta destino</label>
            <select className="w-full p-2 rounded-md bg-[#2b3a4c] text-white focus:outline-none">
              <option>Tarjeta Crédito</option>
              <option>Cuenta Inversiones</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Monto</label>
            <input
              type="number"
              placeholder="$0.00"
              className="w-full p-2 rounded-md bg-[#2b3a4c] text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Fecha</label>
            <DatePicker
              selected={fecha}
              onChange={(date) => setFecha(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 rounded-md bg-[#2b3a4c] text-white focus:outline-none"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#38b2ac] hover:bg-[#2f9e9a] text-white font-bold py-2 px-4 rounded-md mt-2"
          >
            Guardar Transferencia
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgregarTransferencia;
