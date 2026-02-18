import React, { useContext } from "react";
import { listas } from "../contexts/ProveedorListas.jsx";

const useContextoLista = () => {
    /**
     * Hook personalizado para consumir el contexto de la sesión de forma segura.
     * Lanza un error si se intenta usar fuera de su proveedor.
     */
    const contexto = useContext(listas);

    if (!contexto) {
        throw new Error(
            "El hook useContextoLista debe ser utilizado dentro de <ProveedorListas.jsx>.",
        );
    }

    return contexto;
};

export default useContextoLista;
