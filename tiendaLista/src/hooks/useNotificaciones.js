import { useContext } from "react";
import { notificaciones } from "../contexts/ProveedorNotificaciones.jsx";

const useNotificaciones = () => {
  const contexto = useContext(notificaciones);
  /**
    * Hook personalizado para consumir el contexto de la sesión de forma segura.
    * Lanza un error si se intenta usar fuera de su proveedor.
    */
  if (!contexto) {
    throw new Error(
      "El hook useNotificaciones debe usarse dentro de <ProveedorNotificaciones>."
    );
  }

  return contexto;
};

export default useNotificaciones;
