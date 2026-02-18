import React from "react";

// Componente para mostrar errores y mensajes.
const Errores = ({ error, mensaje }) => {
  return (
    <>
      <p>{error}{mensaje}</p>
    </>
  );
};

export default Errores;
