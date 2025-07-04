
# 💰 CashOptimize - Plataforma de Finanzas Personales

CashOptimize es una aplicación web diseñada para ayudar a los usuarios a gestionar sus finanzas personales de forma simple, segura y visualmente atractiva. El proyecto está construido con el stack **MERN**: **MongoDB, Express.js, React.js y Node.js**.

---

## 🚀 ¿Qué estoy construyendo?

Una plataforma con autenticación segura, gestión de usuarios y administración de datos financieros. Ideal tanto para usuarios comunes como para administradores.

---

## 🧰 Tecnologías Usadas

### Frontend - React + Vite

- **React.js** para la construcción de interfaces dinámicas.
- **Vite** como empaquetador moderno para una carga rápida.
- **React Router** para la navegación entre páginas.
- **Axios** para comunicación con el backend.

#### Páginas del Frontend

- `🏠 Home`: Vista de inicio con enlaces a login, registro y resumen.
- `🔐 Login`: Inicio de sesión de usuarios registrados.
- `📝 Register`: Registro de nuevos usuarios.
- `📊 Dashboard`: Panel para que el usuario administre su información financiera.
- `🛠️ AdminDashboard`: Vista de administración para gestión global.
- `👥 UserList`: Lista de usuarios para admins (filtrado por roles).

#### Comandos y Funciones Clave

- `useState`: Manejo de estado en componentes.
- `useNavigate`: Navegación entre páginas.
- `handleSubmit`: Gestión de formularios.
- `fetch / axios`: Envío de datos al backend.
- `JSON.stringify`: Conversión de objetos para la API.
- `e.preventDefault()`: Prevención de recarga del formulario.

---

### Backend - Node.js + Express + MongoDB

- **Node.js + Express.js** para el servidor y rutas API REST.
- **MongoDB** como base de datos NoSQL.
- Controladores:
  - `AuthController`: Inicio de sesión y autenticación.
  - `RegisterController`: Registro de nuevos usuarios.
  - `AdminController`: Funciones exclusivas del administrador.
- Modelos:
  - `User.js`: Esquema de datos del usuario en MongoDB.

---

## ✅ Funcionalidades Implementadas

- **Autenticación Completa**
  - Validación de datos en login y registro.
  - Acceso seguro según rol del usuario.

- **Gestión de Usuarios y Roles**
  - Rol `admin`: Acceso a `UserList` y panel de control.
  - Rol `user`: Acceso limitado a su propia información.

- **API REST**
  - Comunicación clara y estructurada entre frontend y backend.
  - Escalable y mantenible.

---

## 📂 Estructura de Carpetas (sugerida)

```
cash-optimize/
├── client/          # Frontend con React + Vite
│   ├── src/
│   └── public/
├── server/          # Backend con Express.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
```

---

## 📦 Instalación y Ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/tu_usuario/cash-optimize.git
cd cash-optimize
```

2. Instalar dependencias del backend:

```bash
cd server
npm install
```

3. Instalar dependencias del frontend:

```bash
cd ../client
npm install
```

4. Ejecutar ambos servidores (concurrently recomendado o en terminales separadas):

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

---

## 🙋‍♀️ Autora

**Luz Estela Alegría Molano**

---

## 📌 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.
