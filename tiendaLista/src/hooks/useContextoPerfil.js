import React, { useContext } from "react";
import { perfil } from "../contexts/ProveedorPerfil.jsx";

const useSupabaseSesion = () => {
    /**
     * Hook personalizado para consumir el contexto de la sesión de forma segura.
     * Lanza un error si se intenta usar fuera de su proveedor.
     */
    const contexto = useContext(perfil);

    if (!contexto) {
        throw new Error(
            "El hook useSupabase debe ser utilizado dentro de <ProveedorPerfil>.",
        );
    }

    return contexto;
};

export default useSupabaseSesion;
