import React from 'react'
import logo from "../assets/imgs/logo.png"
import { Link } from 'react-router-dom'
import "./Cabecera.css"
import useSupabaseSesion from '../hooks/useSupabaseSesion'
import useNotificaciones from '../hooks/useNotificaciones'
import { useNavigate } from "react-router-dom";

// Componente que contiene el logo de la web y las rutas para iniciar sesión o registrarse.
// Estas rutas serán sustituidas si estamos logeados, mostrando un botón para cerrar sesión.
const Cabecera = () => {
  const navegar = useNavigate();

  const { sesionIniciada, quitarSesion, usuario, esAdmin } = useSupabaseSesion();
  const { pedirConfirmacion } = useNotificaciones();

  return (
    <div className='cabecera'>
      <img src={logo} alt="logo" />
      <h1>Lista de la compra</h1>

      {/* Podría haber hecho una ternaria perfectamente, pero me gusta más así. */}
      {!sesionIniciada &&
        <>
          <Link to="/registro">Registrarse</Link>
          <Link to="/iniciar-sesion">Logearse</Link>
        </>
      }
      {sesionIniciada &&
        <>
          <p>Hola, {usuario.name}</p>
          <button
            onClick={() => {
              pedirConfirmacion(
                "¿Estás seguro de que quieres cerrar sesión?",
                () => quitarSesion()
              )
            }}
            className="quitar-sesion"
          >
            Quitar Sesión
          </button>
          <div className='perfil'>
            <button onClick={() => {
              navegar(`ver-perfil/${usuario.id}`);
            }}>
              Perfil
            </button>
          </div>
        </>
      }
      {esAdmin() && 
      <>
        <Link to="/administrador">Administrador de roles</Link>
        <Link to="/todas-las-listas">Ver listas</Link>
      </>
      }
    </div>
  )
}

export default Cabecera