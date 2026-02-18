import React, {
    createContext,
    useEffect,
    useState,
} from "react";
import usePeticiones from "../hooks/usePeticiones.js";
import useNotificaciones from "../hooks/useNotificaciones.js";
import { validarProducto, numeroACastellano, redondearADosDecimales } from "../library/validar.js";
import { useNavigate } from "react-router-dom";

/* Proveedor de productos */
const productos = createContext();

const ProveedorProductos = ({ children }) => {

    const productoInicial = {
        name: "",
        price: Number(""),
        weight: Number(""),
        description: "",
        image_url: "",
    };
    const productosIniciales = [];
    const mensajeInicial = "";
    const errorInicial = "";
    let resultadoFiltro = "";
    let ordenada = [];

    const [producto, setProducto] = useState(productoInicial);
    const [listaProductos, setListaProductos] = useState(productosIniciales);
    const [listaFiltrada, setListaFiltrada] = useState(productosIniciales)
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [error, setError] = useState(errorInicial);

    const { listarTodo,
        crear,
        editarPorId,
        eliminar } = usePeticiones("productos");

    const { notificar } = useNotificaciones()
    const navegar = useNavigate();

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await listarTodo();
                setListaProductos(respuesta);
                setListaFiltrada(respuesta);
            } catch (error) {
                notificar("Error al cargar los productos.", "error");
            }
        };
        obtenerProductos();
    }, []);

    const crearNuevoProducto = async (datos) => {
        try {
            const respuesta = await crear(datos);
            const nuevosProductos = await listarTodo();
            setListaProductos(nuevosProductos);
            setListaFiltrada(nuevosProductos);
            notificar("Producto creado correctamente", "exito");
        } catch (error) {
            notificar("Error al crear el producto.", "error");
        }
    };
    const editarProductos = async (datos) => {
        try {
            const respuesta = await editarPorId(datos);
            const nuevosDatos = await listarTodo();
            setListaProductos(nuevosDatos);
            setListaFiltrada(nuevosDatos);
            notificar("Producto editado correctamente", "exito");
            navegar("/todos-los-productos")

        } catch (error) {
            notificar("Error al editar el producto.", "error");
        }
    };

    const borrarProducto = async (id) => {
        try {
            const respuesta = await eliminar(id);
            const datos = await listarTodo();
            setListaProductos(datos);
            setListaFiltrada(datos);
            notificar("Producto eliminado correctamente", "exito");

        } catch (error) {
            notificar("Error al eliminar el producto.", "error");
        }
    };

    const actualizarDato = (evento) => {
        const { name, value } = evento.target;
        setProducto((producto) => ({
            ...producto,
            [name]: value,
        }));
    };

    const filtrarPorNombre = (nombre) => {
        setMensaje("");
        resultadoFiltro = listaProductos.filter((producto) =>
            producto.name
                .toLowerCase()
                .includes(nombre.toLowerCase()),
        );
        if (resultadoFiltro.length === 0) {
            notificar("No se encontraron productos con ese nombre", "error");
        }
        setListaFiltrada(resultadoFiltro);
    }

    const filtrarPorPeso = (peso) => {
        setMensaje("");
        resultadoFiltro = listaProductos.filter((producto) =>
            producto.weight <= Number(peso)
        );
        if (resultadoFiltro.length === 0) {
            notificar("No se encontraron productos con ese peso.", "error");
        }
        setListaFiltrada(resultadoFiltro);
    }

    const filtrarPorPrecio = (precio) => {
        setMensaje("");
        resultadoFiltro = listaProductos.filter((producto) =>
            producto.price <= Number(precio)
        );
        if (resultadoFiltro.length === 0) {
            notificar("No se encontraron productos con ese precio.", "error");
        }
        setListaFiltrada(resultadoFiltro);
    }

    const limpiarFiltro = () => {
        setListaFiltrada(listaProductos);
        setMensaje("");
        setError("");
    }

    const precioMedio = () => {
        let precioTotal = 0;
        listaFiltrada.forEach((producto) => {
            precioTotal += producto.price;
        });
        if (listaFiltrada.length === 0) {
            return 0
        }
        const redondeado = redondearADosDecimales(precioTotal / listaFiltrada.length);
        return numeroACastellano(redondeado);
    }

    const productosTotales = () => {
        return listaFiltrada.length;
    }

    const ordenarPorNombre = () => {
        ordenada = [...listaFiltrada].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setListaFiltrada(ordenada);
    };

    const ordenarPorPrecio = () => {
        ordenada = [...listaFiltrada].sort(
            (a, b) => a.price - b.price
        );
        setListaFiltrada(ordenada);
    };

    const ordenarPorPeso = () => {
        ordenada = [...listaFiltrada].sort(
            (a, b) => a.weight - b.weight
        );
        setListaFiltrada(ordenada);
    };

    const limpiarFormulario = () => {
        setProducto(productoInicial);
        setMensaje("");
        setError("");
    };

    const enviarFormularioProducto = async () => {
        setError("");
        setMensaje("");
        const errores = validarProducto(producto);

        if (errores.length > 0) {
            notificar(errores.join(" "), "error");
            return;
        }
        try {
            await crearNuevoProducto(producto);
            limpiarFormulario();
        } catch (error) {
        }
    };

    const enviarFormularioProductoEditado = async () => {
        setError("");
        setMensaje("");
        const errores = validarProducto(producto);

        if (errores.length > 0) {
            setError(errores.join(" "));
            return;
        }
        try {
            await editarProductos(producto);
            limpiarFormulario();
        } catch (error) {
        }
    };

    const cargarProductoPorId = (id) => {
        const productoEncontrado = listaProductos.find((prod) => prod.id === (id));
        if (productoEncontrado) {
            setProducto(productoEncontrado);
        }
    }

    const exportar = {
        listaProductos,
        listaFiltrada,
        filtrarPorNombre,
        filtrarPorPeso,
        filtrarPorPrecio,
        limpiarFiltro,
        ordenarPorNombre,
        ordenarPorPrecio,
        ordenarPorPeso,
        productosTotales,
        precioMedio,
        crearNuevoProducto,
        editarProductos,
        borrarProducto,
        producto,
        actualizarDato,
        enviarFormularioProducto,
        limpiarFormulario,
        cargarProductoPorId,
        enviarFormularioProductoEditado,
        mensaje,
        error,
    };

    return (
        <productos.Provider value={exportar}>
            {children}
        </productos.Provider>
    );
};

export default ProveedorProductos;
export { productos };
