import React from 'react'
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";
import Usuario from '../components/Usuario.jsx';

const Administrador = () => {

    const { usuarios } = useSupabaseSesion();

  return (
    <div className='administrador'>
        <h1>Página de administrador</h1>
        <h4>Todos los usuarios</h4>

        {usuarios.map((user) => (
                <Usuario 
                  key={user.id}
                  id={user.id}
                  email={user.email}
                  rol={user.rol}
                />
            ))}
    </div>
  )
}

export default Administrador