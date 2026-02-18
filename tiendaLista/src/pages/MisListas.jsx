import React from "react";
import useContextoLista from "../hooks/useContextoLista";
import useNotificaciones from "../hooks/useNotificaciones";
import borrar from "../assets/imgs/papelera.png";
import añadir from "../assets/imgs/añadir.png";
import editar from "../assets/imgs/editar.png";
import { useNavigate } from "react-router-dom";
import "./MisListas.css";

// Página que muestra las listas del usuario con funciones de eliminar, editar nombre y eliminar si no contiene elementos.
const MisListas = () => {
  const navegar = useNavigate();
  const { todasLasListas, borrarLista, modificarLista } = useContextoLista();
  const { pedirConfirmacion } = useNotificaciones();

  return (
    <>
      <div className="mis-listas">
        {todasLasListas.length === 0 ? (
          <p>No hay listas creadas</p>
        ) : (
          <>
            <h2>Tus listas</h2>
            <div className="contenedor-listas">
              {todasLasListas.map((lista) => (
                <div key={lista.id} className="botones-lista">
                  <p>{lista.name}</p>
                  <img
                    src={borrar}
                    alt="borrar"
                    onClick={() =>
                      pedirConfirmacion(
                        "¿Eliminar lista?",
                        () => borrarLista(lista.id)
                      )
                    }
                  />
                  <img
                    src={añadir}
                    alt="añadir"
                    onClick={() =>
                      pedirConfirmacion(
                        "¿Añadir articulos a la lista?",
                        () => modificarLista(lista.id)
                      )
                    }
                  />
                  <img
                    src={editar}
                    alt="editar"
                    onClick={() =>
                      pedirConfirmacion(
                        "¿Editar lista?",
                        () => navegar(`/editar-lista/${lista.id}`),
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MisListas;