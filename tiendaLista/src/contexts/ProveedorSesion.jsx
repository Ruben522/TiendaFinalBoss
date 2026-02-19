import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validar, validarSesion } from "../library/validar.js";
import useSesion from "../hooks/useSesion.js";
import useNotificaciones from "../hooks/useNotificaciones.js";
import { supabaseConexion } from "../supabase/Supabase.js";
import usePeticiones from "../hooks/usePeticiones.js";

/* Proveedor de la sesión de usuarios */
const sesion = createContext();

const ProveedorSesion = ({ children }) => {
  const navegar = useNavigate();

  const { crearCuenta, iniciarSesion, cerrarSesion, cargarUsuario } =
    useSesion();

  const { traerUnoPorCampo, listarTodo, editarPorId } = usePeticiones("roles");

  const { notificar } = useNotificaciones();

  const datosSesionInicial = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const usuarioInicial = {};
  const sesionIniciadaInicial = false;
  const errorInicial = "";
  const rolInicial = "";
  const usuariosInicial = [];

  const [datosSesion, setDatosSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [sesionIniciada, setSesionIniciada] = useState(sesionIniciadaInicial);
  const [error, setError] = useState(errorInicial);
  const [rol, setRol] = useState(rolInicial);
  const [usuarios, setUsuarios] = useState(usuariosInicial);

  useEffect(() => {
    const subscripcion = supabaseConexion.auth.onAuthStateChange(
      (evento, session) => {
        if (session) {
          setSesionIniciada(true);
          obtenerUsuario();
        } else {
          setSesionIniciada(false);
          navegar("/iniciar-sesion");
        }
      },
    );
  }, []);

  const guardarUsuario = async () => {
    try {
      await crearCuenta(datosSesion);
      setDatosSesion(datosSesionInicial);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        const respuesta = await listarTodo();
        setUsuarios(respuesta);
      } catch (error) {
        notificar("Error al cargar los usuarios.", "error");
      }
    };

    /* Esta parte se la pregunté a chatgpt por la siguiente razón:
    * Aunque fuese administrador, el usuario se cargaba antes, y por la dependencia, no se cargaban los usuarios.
    * Eso hacia que no puedieses ver a los usuarios y sus roles hasta que no recargaba la página.
    * Con esta solución, el usuario y su rol se carga antes de intentar cargar la lista de usuarios.
    */
    if (sesionIniciada && rol === "administrador") {
      listarUsuarios();
    }
  }, [sesionIniciada, rol]);

  const esAdmin = () => {
    return rol === "administrador";
  };

  const obtenerUsuario = async () => {
    try {
      const respuesta = await cargarUsuario();

      const userId = respuesta.user.id;

      setUsuario({
        id: userId,
        email: respuesta.user.email,
        name: respuesta.user.user_metadata?.name,
      });

      const datosRol = await traerUnoPorCampo("id_rol", userId);
      setRol(datosRol?.rol || "usuario");
    } catch (error) {
      notificar("Error al obtener el usuario", "error");
    }
  };

  const quitarSesion = async () => {
    try {
      await cerrarSesion();
      setUsuario(usuarioInicial);
      navegar("/");
      notificar("Se ha cerrado sesión", "exito");
    } catch (error) {
      notificar("Error al cerrar sesión", "error");
    }
  };

  const iniciarSesionUsuario = async () => {
    try {
      const respuesta = await iniciarSesion(datosSesion);
      setUsuario(respuesta.user);
    } catch (error) {
      throw error;
    }
  };

  const enviarFormulario = async () => {
    setError("");
    const errores = validar(datosSesion);
    if (errores.length > 0) {
      notificar(errores[0], "error");
      setError(errores.join(" "));
      return;
    }
    try {
      await guardarUsuario(datosSesion);
      limpiarFormulario();
      notificar(
        "Cuenta creada correctamente. Se ha enviado un correo de verificación.",
        "exito",
      );
    } catch (error) {
      notificar("Hubo un problema al crear la cuenta", "error");
    }
  };

  const limpiarFormulario = () => {
    setDatosSesion(datosSesionInicial);
    setError("");
  };

  const enviarFormularioSesion = async () => {
    setError("");
    const errores = validarSesion(datosSesion);
    if (errores.length > 0) {
      notificar(errores[0], "error");
      setError(errores.join(" "));
      return;
    }
    try {
      await iniciarSesionUsuario(datosSesion);
      limpiarFormulario();
      notificar("Sesión iniciada.", "exito");
      navegar("/");
    } catch (error) {
      notificar(
        "La cuenta no existe o las parámetros no son correctos.",
        "error",
      );
    }
  };

  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setDatosSesion((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const cambiarRol = async (id, id_rol, nuevoRol) => {
    if (id_rol === usuario.id) {
      notificar("No puedes cambiarte a tí mismo", "error")
      return
    }
    console.log(id_rol)
    console.log(usuario.id)
    try {
      await editarPorId({
        id,
        rol: nuevoRol,
      });

      notificar("Rol actualizado correctamente", "exito");
      const respuesta = await listarTodo();
      setUsuarios(respuesta);
    } catch (error) {
      notificar("Error al actualizar el rol", "error");
    }
  };


  const exportar = {
    enviarFormulario,
    limpiarFormulario,
    actualizarDato,
    enviarFormularioSesion,
    error,
    datosSesion,
    usuario,
    sesion,
    sesionIniciada,
    quitarSesion,
    rol,
    esAdmin,
    cambiarRol,
    usuarios,
  };


  return <sesion.Provider value={exportar}>{children}</sesion.Provider>;
};

export default ProveedorSesion;
export { sesion };
