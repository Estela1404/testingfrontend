import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Obtener usuarios
  const fetchUsuarios = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setUsuarios(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setLoading(false);
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`);
        setUsuarios(usuarios.filter((u) => u._id !== id));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  // Abrir modal de edición
  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Guardar cambios
  const handleSaveChanges = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${selectedUser._id}`,
        selectedUser
      );

      const updatedUser = res.data.user;

      setUsuarios((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );

      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  if (loading) return <p className="text-center">Cargando usuarios...</p>;

  return (
    <div className="overflow-x-auto w-full mt-6">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-red-200 text-red-800 font-semibold">
          <tr>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-left">Correo</th>
            <th className="px-4 py-3 text-left">Rol</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u._id} className="border-t hover:bg-red-50">
              <td className="px-4 py-2">{u.nombre}</td>
              <td className="px-4 py-2">{u.correo}</td>
              <td className="px-4 py-2 capitalize">{u.rol}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => openEditModal(u)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarUsuario(u._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Editar Usuario</h2>

            <div className="space-y-4">
              <input
                type="text"
                value={selectedUser.nombre}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, nombre: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Nombre"
              />
              <input
                type="email"
                value={selectedUser.correo}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, correo: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Correo"
              />
              <select
                value={selectedUser.rol}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, rol: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;