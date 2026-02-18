import React from 'react'
import { Link } from 'react-router-dom'
import "./Menu.css";
import useSupabaseSesion from '../hooks/useSupabaseSesion.js';
// Componente que contiene los links a las partes de la aplicación.
const Menu = () => {
  const { sesionIniciada, esAdmin } = useSupabaseSesion();

  return (
    <div className='menu-links'>
      <Link className="inicio" to="/">Inicio</Link>
      <Link className="todos-los-productos" to="/todos-los-productos">Todos los productos</Link>

      {sesionIniciada && (
        <>
          <Link className="mis-listas" to="/mis-listas">Mis listas</Link>
          <Link className="crear-lista" to="/crear-lista">Crear lista</Link>
        </>
      )}
      {esAdmin() && (
        <>
          <Link className="crear-producto" to="/crear-producto">Crear producto</Link>
        </>
      )}
    </div>
  )
}

export default Menu