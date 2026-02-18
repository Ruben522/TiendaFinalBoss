import React from 'react';
import Producto from './Producto';
import "./Lista.css";
// Componente que recorre la lista de productos.

/* He aprovechado que usamos supabase para usar su función storage para
crear una carpeta productos, guardar ahí las imágenes
y obtener la URL de la imagen desde allí */
const Lista = ({ fecha, name, productos }) => {

    return (
        <div className='lista'>
            <h6>{fecha}</h6>
            <h2>{name}</h2>
            <div className='productos'>

                {productos.map((prod) => (
                    <Producto
                        key={prod.id}
                        id={prod.id}
                        name={prod.name}
                        price={prod.price}
                        weight={prod.weight}
                        description={prod.description}
                        image={prod.image_url}
                    />
                ))}
            </div>
        </div>
    )
};

export default Lista;