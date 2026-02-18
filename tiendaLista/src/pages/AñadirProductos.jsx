import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useContextoListaProducto from "../hooks/useContextoListaProducto";
import TodosLosProductos from "./TodosLosProductos";
import ListaActual from "./ListaActual";

// Componente que activa la lista según el id de la URL.
// Tambíen hace que muestren los dos componentes para facilitar el añadido de productos.
const AñadirProductos = () => {
  const { id } = useParams();
  const { activarLista } = useContextoListaProducto();

  useEffect(() => {
    activarLista(id);
  }, [id]);

  return (
    <div className="añadir-productos">
      <TodosLosProductos />
      <ListaActual />
    </div>
  );
};

export default AñadirProductos;
