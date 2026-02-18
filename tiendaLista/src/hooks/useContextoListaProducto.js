import React, { useContext } from "react";
import { listaProducto } from "../contexts/ProveedorListaProducto.jsx";

const useContextoListaProducto = () => {
    /**
     * Hook personalizado para consumir el contexto de la sesión de forma segura.
     * Lanza un error si se intenta usar fuera de su proveedor.
     */
    const contexto = useContext(listaProducto);

    if (!contexto) {
        throw new Error(
            "El hook useContextoListaProducto debe ser utilizado dentro de <ProveedorProductos>.",
        );
    }

    return contexto;
};

export default useContextoListaProducto;
