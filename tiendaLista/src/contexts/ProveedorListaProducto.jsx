import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import usePeticiones from "../hooks/usePeticiones.js";
import useNotificaciones from "../hooks/useNotificaciones.js";
import {
  numeroACastellano,
  redondearADosDecimales,
  redondearATresDecimales,
} from "../library/validar.js";

const listaProducto = createContext();

/* Proveedor de listas con productos de un usuario */
const ProveedorListaProducto = ({ children }) => {
  const { notificar } = useNotificaciones();
  const {
    crear,
    editarPorId,
    eliminar,
    traerTodoMultitabla,
  } = usePeticiones("lista_productos");

  const [listaId, setListaId] = useState(null);
  const [productosLista, setProductosLista] = useState(
    [],
  );

  const consulta = `
        id, lista_id, productos_id, cantidad, 
        productos (id, name, weight, price, image_url, description)
    `;

  /* Cada vez que cambia la lista activa, cargamos los productos */
  useEffect(() => {
    if (listaId) {
      cargarProductos();
    } else {
      setProductosLista([]);
    }
  }, [listaId]);

  const cargarProductos = async () => {
    try {
      const datos = await traerTodoMultitabla(
        consulta,
        "lista_id",
        listaId,
      );
      setProductosLista(datos);
    } catch (error) {
      notificar(
        "Error al cargar los productos de la lista.",
        "error",
      );
    }
  };

  const cargarTodosLosProductos = async () => {
    try {
      const datos = await traerTodoMultitabla(
        consulta,
        "lista_id",
        listaId,
      );
      setProductosLista(datos);
    } catch (error) {
      notificar(
        "Error al cargar los productos de la lista.",
        "error",
      );
    }
  };

  const sumarProducto = async (idProducto) => {
    try {
      const productoExistente =
        productoSeleccionado(idProducto);

      if (productoExistente) {
        const respuesta = await editarPorId({
          id: productoExistente.id,
          cantidad:
            productoExistente.cantidad + 1,
        });
      } else {
        const respuesta = await crear({
          lista_id: listaId,
          productos_id: idProducto,
          cantidad: 1,
        });
      }

      /* Siempre cargamos los productos por si acaso. */
      const respuesta = await cargarProductos();
      notificar("Producto añadido", "exito");
    } catch (error) {
      notificar("Error al añadir producto.", "error");
    }
  };

  const restarProducto = async (idProducto) => {
    try {
      const productoExistente =
        productoSeleccionado(idProducto);

      if (productoExistente.cantidad > 1) {
        const respuesta = await editarPorId({
          id: productoExistente.id,
          cantidad:
            productoExistente.cantidad - 1,
        });
      } else {
        const respuesta = await eliminar(
          productoExistente.id,
        );
      }

      /* Siempre cargamos los productos por si acaso. */
      const respuesta = await cargarProductos();
      notificar("Producto restado", "exito");
    } catch (error) {
      notificar("Error al restar producto.", "error");
    }
  };

  const productoSeleccionado = (idProducto) => {
    return productosLista.find(
      (producto) =>
        producto.productos.id === idProducto,
    );
  };

  const obtenerCantidad = (idProducto) => {
    const producto = productosLista.find(
      (p) => p.productos.id === idProducto,
    );
    return producto ? producto.cantidad : 0;
  };

  /* Plantilla del producto que hay en la lista */
  const productosEnLaLista = productosLista.map(
    (producto) => ({
      id: producto.productos.id,
      name: producto.productos.name,
      price: producto.productos.price,
      weight: producto.productos.weight,
      description: producto.productos.description,
      image_url: producto.productos.image_url,
    }),
  );

  const activarLista = (id) => {
    setListaId(id);
  };

  const calcularPesoTotal = () => {
    let total = 0;
    productosLista.forEach((producto) => {
      const peso = Number(producto.productos.weight);
      const cantidad = Number(producto.cantidad);
      total += (peso * cantidad) / 1000;
    });
    const formateado = redondearATresDecimales(total);
    return formateado;
  };

  const calcularPrecioTotal = () => {
    let total = 0;
    productosLista.forEach((producto) => {
      const precio = Number(producto.productos.price);
      const cantidad = Number(producto.cantidad);
      total += precio * cantidad;
    });
    const formateado = numeroACastellano(
      redondearADosDecimales(total),
    );
    return formateado;
  };

  const necesitaCoche = () => {
    return calcularPesoTotal() > 10;
  };

  const exportar = {
    productosLista,
    listaId,
    sumarProducto,
    restarProducto,
    obtenerCantidad,
    productosEnLaLista,
    activarLista,
    calcularPrecioTotal,
    calcularPesoTotal,
    necesitaCoche,
  };

  return (
    <listaProducto.Provider value={exportar}>
      {children}
    </listaProducto.Provider>
  );
};

export default ProveedorListaProducto;
export { listaProducto };
