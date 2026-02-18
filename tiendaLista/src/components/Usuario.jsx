import React from "react";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";
import useNotificaciones from "../hooks/useNotificaciones.js";

const Usuario = ({ email, id , rol}) => {
  const { actualizarRol, cambiarRol, rolSeleccionado } = useSupabaseSesion();
  const { pedirConfirmacion } = useNotificaciones();

  return (
    <div className="usuario">
      <h3>{email}</h3>
      <p>Rol actual: {rol}</p>
      <select
        name="rol"
        id="rol"
        value={rolSeleccionado}
        onChange={(evento) => actualizarRol(evento)}
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
            () => cambiarRol(id)
        )}
      />
    </div>
  );
};

export default Usuario;
