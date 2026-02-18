import React, { useContext } from "react";
import { productos } from "../contexts/ProveedorProductos.jsx";

const useSupabaseProductos = () => {
    /**
     * Hook personalizado para consumir el contexto de la sesión de forma segura.
     * Lanza un error si se intenta usar fuera de su proveedor.
     */
    const contexto = useContext(productos);

    if (!contexto) {
        throw new Error(
            "El hook useSupabaseProductos debe ser utilizado dentro de <ProveedorProductos>.",
        );
    }

    return contexto;
};

export default useSupabaseProductos;
