import { useState, useEffect } from "react";

function Balance() {
  const [totalIngresos, setTotalIngresos] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Asegúrate que guardaste el token en el login

    fetch("http://localhost:5000/api/ingresos/total", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fallo al obtener ingresos");
        return res.json();
      })
      .then((data) => {
        setTotalIngresos(data.total || 0);
      })
      .catch((error) => console.error("Error al obtener ingresos:", error));
  }, []);

  return (
    <div style={{ background: "#1e293b", color: "white", padding: "1rem", borderRadius: "8px", width: "300px" }}>
      <h2>Total: <strong>${totalIngresos}</strong></h2>
      <p style={{ color: "#94a3b8" }}>Ingresos: ${totalIngresos}</p>
      {/* <p style={{ color: "#94a3b8" }}>Gastos: $0</p> si aún no tienes gastos, puedes eliminarlo */}
    </div>
  );
}

export default Balance;
