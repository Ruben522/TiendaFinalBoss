import React from 'react'
import "./Formulario.css"
import useSupabaseProductos from "../hooks/useSupabaseProductos.js";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";
import { useNavigate } from "react-router-dom";

// Página para crear un nuevo producto.
const CrearProducto = () => {
    const navegar = useNavigate();
    const {
        actualizarDato,
        enviarFormularioProducto,
        limpiarFormulario,
        producto,
    } = useSupabaseProductos();
  const { esAdmin } = useSupabaseSesion();

    return (
        <div className='formulario'>
            <>
            {!esAdmin() && (navegar("/"))}
            </>
            <h1>Crear Producto</h1>
            <form id="formulario">
                <label htmlFor="name">Nombre del Producto</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre del producto"
                    value={producto.name}
                    onChange={(evento) => actualizarDato(evento)}
                />
                <label htmlFor="price">Precio</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Precio del producto"
                    value={producto.price}
                    onChange={(evento) => actualizarDato(evento)}
                />
                <label htmlFor="weight">Peso</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder="Peso del producto"
                    value={producto.weight}
                    onChange={(evento) => actualizarDato(evento)}
                />
                <label htmlFor="description">Descripción</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Descripción del producto"
                    value={producto.description}
                    onChange={(evento) => actualizarDato(evento)}
                />
                <label htmlFor="image_url">URL de la Imagen</label>
                <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    placeholder="URL de la imagen del producto"
                    value={producto.image_url}
                    onChange={(evento) => actualizarDato(evento)}
                />
                <input
                    type="button"
                    value="Limpiar"
                    onClick={() => {
                        limpiarFormulario();
                    }}
                />
                <input
                    type="button"
                    value="Crear Producto"
                    onClick={() => {
                        enviarFormularioProducto();
                    }}
                />
            </form>
        </div>
    )
}

export default CrearProducto