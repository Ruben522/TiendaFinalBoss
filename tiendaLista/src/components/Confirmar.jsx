import React from "react";
import useNotificaciones from "../hooks/useNotificaciones";
import "./Confirmar.css";

// Componente para confirmar acciones.
// La idea es la que me comentaste, que fuese algo genérico.
// Juande me enseñó como lo hizo él y por eso se parece bastante.
const Confirmar = () => {
  const {
    confirmacion,
    mensajeConfirmacion,
    aceptarConfirmacion,
    cancelarConfirmacion,
  } = useNotificaciones();

  return (
    <>
      {confirmacion && (
        <div className="confirmacion">
          <div>
            <p>{mensajeConfirmacion}</p>

            <div className="acciones">
              <button className="si" onClick={aceptarConfirmacion}>
                Sí
              </button>

              <button className="no" onClick={cancelarConfirmacion}>
                No
              </button>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default Confirmar;
