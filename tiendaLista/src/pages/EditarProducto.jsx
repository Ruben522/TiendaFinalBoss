import React from 'react'
import "./Formulario.css"
import useSupabaseProductos from "../hooks/useSupabaseProductos.js";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// Página para editar un producto mediante su id.
const EditarProducto = () => {
    const {
        actualizarDato,
        enviarFormularioProductoEditado,
        limpiarFormulario,
        producto,
        cargarProductoPorId,
    } = useSupabaseProductos();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            cargarProductoPorId(id);
        }
    }, [id]);

    return (
        <div className='formulario'>
            <h1>Editar Producto</h1>
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
                <img src={producto.image_url} alt={producto.name} />
                <input
                    type="button"
                    value="Limpiar"
                    onClick={() => {
                        limpiarFormulario();
                    }}
                />
                <input
                    type="button"
                    value="Editar Producto"
                    onClick={() => {
                        enviarFormularioProductoEditado();
                    }}
                />
            </form>
        </div>
    )
}

export default EditarProducto