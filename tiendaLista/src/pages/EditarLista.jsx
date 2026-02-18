import React from 'react'
import "./Formulario.css"
import useContextoLista from "../hooks/useContextoLista.js";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// Página para editar una lista.
const CrearLista = () => {
    const {
        lista,
        actualizarDato,
        enviarFormularioListaEditada,
        limpiarFormulario,
        cargarListaPorId,
    } = useContextoLista();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            cargarListaPorId(id);
        }
    }, [id]);

    return (
        <>
            <div className='formulario'>
                <h1>Editar Lista</h1>
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
                        value="Actualizar Lista"
                        onClick={() => {
                            enviarFormularioListaEditada();
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