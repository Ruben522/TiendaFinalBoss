import React from 'react'
import useContextoLista from "../hooks/useContextoLista";
import useNotificaciones from "../hooks/useNotificaciones";
import ver from "../assets/imgs/ver.png";

// Página de administrador para ver todas las listas creadas por los usuariios.
const TodasLasListas = () => {

  const { verLista, todasLasListas } = useContextoLista();
  const { pedirConfirmacion } = useNotificaciones();

  return (
    <div>
      <h1>Todas las listas</h1>
      {todasLasListas.length === 0 ? (
        <p>No hay listas creadas</p>
      ) : (
        <>
          <div className="contenedor-listas">
            {todasLasListas.map((lista) => (
              <div key={lista.id} className="botones-lista">
                <p>{lista.name}</p>
                <img
                  src={ver}
                  alt="ver"
                  onClick={() =>
                    pedirConfirmacion(
                      "¿Quieres ver sus productos?",
                      () => verLista(lista.id)
                    )
                  }
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default TodasLasListas