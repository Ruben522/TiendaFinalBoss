import React from 'react'
import "./Formulario.css"
import useContextoLista from "../hooks/useContextoLista.js";

// Página para crear editar un producto.
const CrearLista = () => {
    const {
        lista,
        actualizarDato,
        enviarFormularioLista,
        limpiarFormulario,
    } = useContextoLista();

    return (
        <>
            <div className='formulario'>
                <h1>Crear Lista</h1>
                <form id="formulario">
                    <label htmlFor="name">Nombre de la lista</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Lista habitual..."
                        value={lista.name}
                        onChange={(evento) => actualizarDato(evento)}
                    />
                    <input
                        type="button"
                        value="Crear Lista"
                        onClick={() => {
                            enviarFormularioLista();
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
            </div>
        </>
    )
}

export default CrearLista