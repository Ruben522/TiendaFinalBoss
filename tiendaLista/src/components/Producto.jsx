import React from "react";
import borrar from "../assets/imgs/borrar.png";
import editar from "../assets/imgs/editar.png";
import restar from "../assets/imgs/restar.png";
import sumar from "../assets/imgs/sumar.png";
import useSupabaseProductos from "../hooks/useSupabaseProductos.js";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";
import useNotificaciones from "../hooks/useNotificaciones.js";
import useContextoListaProducto from "../hooks/useContextoListaProducto.js";
import "./Producto.css";
import { useNavigate } from "react-router-dom";
import { sonKilos, numeroACastellano } from "../library/validar.js";

const Producto = ({ id, name, price, weight, image, description }) => {
  const navegar = useNavigate();
  const { pedirConfirmacion } = useNotificaciones();
  const { borrarProducto } = useSupabaseProductos();
  const { sesionIniciada, esAdmin } = useSupabaseSesion();
  const { listaId, obtenerCantidad, sumarProducto, restarProducto } =
    useContextoListaProducto();

  const cantidad = obtenerCantidad(id);

  return (
    <>
      <div className="producto">
        {esAdmin() && (
          <>
            {sesionIniciada && (
              <>
                <div className="borrar">
                  <img
                    src={borrar}
                    alt="borrar"
                    onClick={() =>
                      pedirConfirmacion(
                        "¿Estás seguro de que quieres eliminar este producto?",
                        () => borrarProducto(id)
                      )
                    }
                  />
                </div>

                <div className="editar">
                  <img
                    src={editar}
                    alt="editar"
                    onClick={() =>
                      pedirConfirmacion(
                        "¿Estás seguro de que quieres editar este producto?",
                        () => navegar(`/editar-producto/${id}`)
                      )
                    }
                  />
                </div>
              </>
            )}
          </>
        )}

        <h2>{name}</h2>
        <p>
          <strong>Precio: {numeroACastellano(price)}€</strong>
        </p>
        <p>Peso: {sonKilos(weight)}</p>
        <p>{description}</p>

        <div className="imagen-producto">
          <img src={image} alt={name} />
        </div>

        {listaId && !esAdmin() && (
          <>
            {cantidad > 0 && (
              <div className="restar">
                <img
                  src={restar}
                  alt="restar"
                  onClick={() => restarProducto(id)}
                />
              </div>
            )}

            <p>{cantidad}</p>

            <div className="sumar">
              <img src={sumar} alt="sumar" onClick={() => sumarProducto(id)} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Producto;
