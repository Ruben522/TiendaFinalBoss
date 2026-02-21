import React from 'react'
import "./Inicio.css";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";
// Página de inicio de la aplicación a la que reedigiremos a un usuario que recien se logea.
const Inicio = () => {
  const { usuario } = useSupabaseSesion();

  return (
    <div className="inicio">
      <h2>Esta es la página de inicio</h2>
      {usuario.name && (
        <p>¿Cómo va tu día {usuario.name}?</p>
      )}
    </div>
  )
}

export default Inicio