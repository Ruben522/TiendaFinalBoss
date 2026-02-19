import React, { useState } from "react";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";
import useNotificaciones from "../hooks/useNotificaciones.js";
import "./Usuario.css"

const Usuario = ({ email, id, rol }) => {
  const { cambiarRol } = useSupabaseSesion();
  const { pedirConfirmacion } = useNotificaciones();

  const [rolSeleccionado, setRolSeleccionado] = useState(rol);

  return (
    <div className="usuario">
      <h3>{email}</h3>
      <p>Rol actual: {rol}</p>

      <select
        value={rolSeleccionado}
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
            () => cambiarRol(id, rolSeleccionado),
          )
        }
      />
    </div>
  );
};

export default Usuario;
