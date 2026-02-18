import React from "react";
import "./Contenido.css";
import Rutas from "../routes/Rutas";
import ProveedorProductos from "../contexts/ProveedorProductos";
import ProveedorListas from "../contexts/ProveedorListas";
import ProveedorListaProducto from "../contexts/ProveedorListaProducto";
import ProveedorPerfil from "../contexts/ProveedorPerfil";

// Este componente contiene el apartado principal de la aplicación (Lista de productos, formularios...)
const Contenido = () => {
  return (
    <div className="contenido">
      <>
        <ProveedorListas>
          <ProveedorProductos>
            <ProveedorListaProducto>
              <ProveedorPerfil>
                <Rutas />
              </ProveedorPerfil>
            </ProveedorListaProducto>
          </ProveedorProductos>
        </ProveedorListas>
      </>
    </div>
  );
};

export default Contenido;
