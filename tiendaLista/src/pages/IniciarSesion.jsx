import React from 'react'
import "./Formulario.css"
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";
import Errores from "../pages/Errores.jsx";

// Página para iniciar sesión. Se requiere correo y contraseña.
const IniciarSesion = () => {

  const {
    actualizarDato,
    enviarFormularioSesion,
    limpiarFormulario,
    mensaje,
    error,
    datosSesion,
  } = useSupabaseSesion();

  return (
    <div className='formulario'>
      <h1>Iniciar Sesion</h1>
      <form id="formulario">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="ejemplo@gmail.com"
          value={datosSesion.email}
          onChange={(evento) => actualizarDato(evento)}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mínimo 8 caracteres"
          value={datosSesion.password}
          onChange={(evento) => actualizarDato(evento)}
        />

        <input
          type="button"
          value="Iniciar Sesión"
          onClick={() => {
            enviarFormularioSesion();
          }}
        />
        <input
          type="button"
          value="Limpiar"
          onClick={() => {
            limpiarFormulario();
          }}
        />
      </form>
      <Errores error={error} mensaje={mensaje} />
    </div>
  )
}

export default IniciarSesion