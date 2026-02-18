import React from "react";
import { useParams } from "react-router-dom";
import useContextoListaProducto from "../hooks/useContextoListaProducto";
import useContextoLista from "../hooks/useContextoLista";
import Lista from "../components/Lista";
import "./ListaActual.css";

// Página que contiene la lista actual en la que está añadiendo los productos.
const ListaActual = () => {

    const { id } = useParams();

    const {
        productosEnLaLista,
        calcularPesoTotal,
        calcularPrecioTotal,
        necesitaCoche
    } = useContextoListaProducto();

    const {
        nombreLista,
        fechaListaFormateada
    } = useContextoLista();

    return (
        <div className="lista-actual-container">

            {productosEnLaLista.length === 0 ? (
                <h3 className="lista-vacia">
                    La lista está vacía.
                </h3>
            ) : (
                <>
                    <h2>{nombreLista(id)}</h2>
                    <p>Creada el: {fechaListaFormateada(id)}</p>

                    <Lista
                        name="Productos en la lista"
                        productos={productosEnLaLista}
                    />

                    <div className="resumen-lista">
                        <p>
                            Peso total: {calcularPesoTotal()} kg
                        </p>

                        {necesitaCoche() && (
                            <p>
                                Necesitarás el coche para hacer la compra.
                            </p>
                        )}

                        <p>
                            <strong>
                                TOTAL: {calcularPrecioTotal()} €
                            </strong>
                        </p>
                    </div>
                </>
            )}

        </div>
    );
};

export default ListaActual;
