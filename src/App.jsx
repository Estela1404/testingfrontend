import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AgregarIngreso from './pages/AgregarIngreso';
import AgregarGasto from './pages/AgregarGasto';
import AgregarTransferencia from './pages/AgregarTransferencia';
import Transferencia from './pages/Transferencia';
import HistorialIngresos from './pages/HistorialIngresos';
import ProtectedRoute from './pages/ProtectedRoute';
import ListaIngresos from './pages/ListaIngresos';
import ListaGastos from './pages/ListaGastos';
import Recuperar from './pages/Recuperar';
import Reestablecer from './pages/Reestablecer';
import Recurrente from './pages/Recurrentes'; // ✅ Aquí corregido

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<Recuperar />} />
        <Route path='/reestablecer/:token' element={<Reestablecer />} />

        {/* Rutas protegidas */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin-dashboard'
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/agregar-ingreso'
          element={
            <ProtectedRoute>
              <AgregarIngreso />
            </ProtectedRoute>
          }
        />
        <Route
          path='/agregar-gasto'
          element={
            <ProtectedRoute>
              <AgregarGasto />
            </ProtectedRoute>
          }
        />
        <Route
          path='/agregar-transferencia'
          element={
            <ProtectedRoute>
              <AgregarTransferencia />
            </ProtectedRoute>
          }
        />
        <Route
          path='/transferencia'
          element={
            <ProtectedRoute>
              <Transferencia />
            </ProtectedRoute>
          }
        />
        <Route
          path='/recurrente'
          element={
            <ProtectedRoute>
              <Recurrente />
            </ProtectedRoute>
          }
        />
        <Route
          path='/historial-ingresos'
          element={
            <ProtectedRoute>
              <HistorialIngresos />
            </ProtectedRoute>
          }
        />
        <Route
          path='/lista-ingresos'
          element={
            <ProtectedRoute>
              <ListaIngresos />
            </ProtectedRoute>
          }
        />
        <Route
          path='/lista-gastos'
          element={
            <ProtectedRoute>
              <ListaGastos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
