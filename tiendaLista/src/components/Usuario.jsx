import React, { useState } from "react";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";
import useNotificaciones from "../hooks/useNotificaciones.js";
import "./Usuario.css"

// Componente que muestra su usuario. Un administrador puede cambiar el rol del usuario.
const Usuario = ({ email, id, rol, id_rol }) => {
  const { cambiarRol } = useSupabaseSesion();
  const { pedirConfirmacion } = useNotificaciones();

  const [rolSeleccionado, setRolSeleccionado] = useState(rol);

  return (
    <div className="usuario">
      <h3>{email}</h3>
      <p>Rol actual: {rol}</p>

      <select
        value={rolSeleccionado || rol}
        onChange={(evento) => setRolSeleccionado(evento.target.value)}
      >
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
      </select>

      <input
        type="button"
        value="Cambiar"
        onClick={() =>
          pedirConfirmacion(
            "¿Estás seguro de que quieres cambiar el rol?",
            () => cambiarRol(id, id_rol, rolSeleccionado),
          )
        }
      />
    </div>
  );
};

export default Usuario;
