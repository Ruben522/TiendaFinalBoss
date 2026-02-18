import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePeticiones from "../hooks/usePeticiones.js";
import useNotificaciones from "../hooks/useNotificaciones.js";
import { validarLista, fechaACastellano } from "../library/validar.js";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";

/* Proveedor de la sesión de usuarios */
const listas = createContext();

const ProveedorListas = ({ children }) => {
  const { notificar } = useNotificaciones();
  const navegar = useNavigate();

  const { usuario } = useSupabaseSesion();

  const listaInicial = {
    name: "",
    userId: null,
  };
  const todasLasListasInicial = [];
  const mensajeInicial = "";
  const errorInicial = "";

  const [lista, setLista] = useState(listaInicial);
  const [todasLasListas, setTodasLasListas] = useState(todasLasListasInicial);
  const [esAdmin, setEsAdmin] = useState(false);
  const [mensaje, setMensaje] = useState(mensajeInicial);
  const [error, setError] = useState(errorInicial);
  
  const { crear, editarPorId, eliminar, traerPorCampo, listarTodo } =
    usePeticiones("lista");
  const { traerPorCampo: traerProductosDeLista } =
    usePeticiones("lista_productos");
  const { traerUnoPorCampo: traerRolUsuario } = usePeticiones("roles");

  /* Si el usuario cambia, traemos sus listas. */
  useEffect(() => {
    if (usuario?.id) {
      cargarListas();
    } else {
      setTodasLasListas([]);
    }
  }, [usuario]);

  const cargarListas = async () => {
    try {
      const datos = await listarTodo();
      setTodasLasListas(datos);
      const datosRol = await traerRolUsuario("id_rol", usuario.id);
      setEsAdmin(datosRol?.rol === "administrador");
    } catch (error) {
      console.log(error)
      notificar("Error cargando listas", "error");
    }
  };

  const borrarLista = async (id) => {
    try {
      const productos = await traerProductosDeLista("lista_id", id);

      if (productos.length > 0) {
        notificar("No puedes eliminar una lista con productos.", "error");
        return;
      }

      const respuesta = await eliminar(id);

      await cargarListas();

      notificar("Lista eliminada correctamente", "exito");
    } catch (error) {
      notificar("Error al eliminar la lista", "error");
    }
  };

  const crearNuevaLista = async (datos) => {
    try {
      const respuesta = await crear(datos);
      await cargarListas();
      notificar("Lista creada correctamente", "exito");
    } catch (error) {
      notificar("Error al crear la lista.", "error");
    }
  };

  const traerListasUsuario = async (id) => {
    try {
      const datos = await traerPorCampo("users", id);
      setTodasLasListas(datos);
    } catch (error) {
      notificar("Error al cargar tus listas", "error");
    }
  };

  const editarLista = async (datos) => {
    try {
      const respuesta = await editarPorId(datos);
      await cargarListas()
      notificar("Nombre actualizado correctamente", "exito");
      navegar("/mis-listas");
    } catch (error) {
      notificar("Error al actualizar la lista", "error");
    }
  };

  const enviarFormularioLista = async () => {
    setError("");
    setMensaje("");
    const errores = validarLista(lista);
    if (errores.length > 0) {
      notificar(errores.join(" "), "error");
      return;
    }
    try {
      const listaGuardar = {
        name: lista.name,
        users: usuario.id,
      };

      const respuesta = await crearNuevaLista(listaGuardar);
      limpiarFormulario();
    } catch (error) {}
  };

  const enviarFormularioListaEditada = async () => {
    setError("");
    setMensaje("");
    const errores = validarLista(lista);

    if (errores.length > 0) {
      notificar(errores.join(" "), "error");
      return;
    }
    try {
      const listaGuardar = {
        id: lista.id,
        name: lista.name,
        users: usuario.id,
      };
      const respuesta = await editarLista(listaGuardar);
      limpiarFormulario();
    } catch (error) {}
  };

  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setLista((lista) => ({
      ...lista,
      [name]: value,
    }));
  };

  const limpiarFormulario = () => {
    setLista(listaInicial);
    setMensaje("");
    setError("");
  };

  /* Setea el estado con la lista actual */
  const cargarListaPorId = (id) => {
    const listaEncontrada = todasLasListas.find((lista) => lista.id === id);
    if (listaEncontrada) {
      setLista(listaEncontrada);
    }
  };

  const modificarLista = (listaId) => {
    navegar(`/añadir-productos/${listaId}`);
  };

  const verLista = (listaId) => {
    navegar(`/añadir-productos/${listaId}`);
  };

  const obtenerListaPorId = (id) => {
    return todasLasListas.find((lista) => lista.id === id);
  };

  const nombreLista = (id) => {
    const lista = obtenerListaPorId(id);
    return lista.name;
  };

  const fechaListaFormateada = (id) => {
    const lista = obtenerListaPorId(id);
    return fechaACastellano(lista.created_at);
  };

  const exportar = {
    lista,
    actualizarDato,
    enviarFormularioLista,
    limpiarFormulario,
    traerListasUsuario,
    todasLasListas,
    borrarLista,
    modificarLista,
    editarLista,
    enviarFormularioListaEditada,
    cargarListaPorId,
    obtenerListaPorId,
    nombreLista,
    fechaListaFormateada,
    verLista,
  };

  return <listas.Provider value={exportar}>{children}</listas.Provider>;
};

export default ProveedorListas;
export { listas };
