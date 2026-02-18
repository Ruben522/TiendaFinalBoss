import React from 'react'
import { useState } from "react";
import useSupabaseSesion from "../hooks/useSupabaseSesion";
import useSupabaseProductos from "../hooks/useSupabaseProductos";
import Lista from "../components/Lista";
import "./TodosLosProductos.css"

// Página que muestra todos los productos disponibles en la tienda (base de datos).
const TodosLosProductos = () => {
  const { sesionIniciada } = useSupabaseSesion();
  const {
    listaFiltrada,
    filtrarPorNombre,
    filtrarPorPeso,
    filtrarPorPrecio,
    limpiarFiltro,
    productosTotales,
    precioMedio,
    ordenarPorNombre,
    ordenarPorPrecio,
    ordenarPorPeso,
  } = useSupabaseProductos();

  const [textoFiltro, setTextoFiltro] = useState("");

  return (
    <div className="lista">
      <h1>Todos nuestros productos</h1>

      {sesionIniciada && (
        <>
          <h3>Filtros</h3>

          <div className="filtros">
            <input
              type="text"
              placeholder="Huevos, 100g, 2€..."
              value={textoFiltro}
              onChange={(e) => setTextoFiltro(e.target.value)}
            />
            <div className="clasificar">
              <button onClick={() => filtrarPorNombre(textoFiltro)}>
                Nombre
              </button>
              <button onClick={() => filtrarPorPeso(textoFiltro)}>
                Peso
              </button>
              <button onClick={() => filtrarPorPrecio(textoFiltro)}>
                Precio
              </button>
            </div>

            <div className="ordenar">
              <button onClick={ordenarPorNombre}>
                Ordenar por Nombre
              </button>
              <button onClick={ordenarPorPrecio}>
                Ordenar por Precio
              </button>
              <button onClick={ordenarPorPeso}>
                Ordenar por Peso
              </button>
            </div>

            <button
              className="limpiar"
              onClick={() => {
                setTextoFiltro("");
                limpiarFiltro();
              }}
            >
              Limpiar Filtro
            </button>
          </div>
        </>
      )}
      <Lista productos={listaFiltrada} />
      <p>{`Numero de productos: ${productosTotales()}`}</p>
      <p>{`Precio medio: ${precioMedio()}€`}</p>
    </div>
  );
};

export default TodosLosProductos