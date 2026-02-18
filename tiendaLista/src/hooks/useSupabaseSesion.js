import React, { useContext } from "react";
import { sesion } from "../contexts/ProveedorSesion.jsx";

const useSupabaseSesion = () => {
    /**
     * Hook personalizado para consumir el contexto de la sesión de forma segura.
     * Lanza un error si se intenta usar fuera de su proveedor.
     */
    const contexto = useContext(sesion);

    if (!contexto) {
        throw new Error(
            "El hook useSupabase debe ser utilizado dentro de <ProveedorSesion>.",
        );
    }

    return contexto;
};

export default useSupabaseSesion;
