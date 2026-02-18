import React, { createContext, useEffect, useState } from "react";
import usePeticiones from "../hooks/usePeticiones.js";
import useNotificaciones from "../hooks/useNotificaciones.js";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";

const perfil = createContext();

/**
 * He considerado crear el perfil cuando el usuario acceda a Pefil por estas razones:
 * 1. No todos los usuarios verían necesario un perfil para su lista de la compra.
 * 2. Un usuario no puede ver el perfil de otro usuario, así que ¿Para qué querría personalizar algo que nadie va a ver?
 * 3. Si la aplicación tiene muchos usuarios y la modificación del perfil no es importante, no la usarían quedando de esa manera
 *    muchos datos vacíos en la tabla Pefil de db.
 */
const ProveedorPerfil = ({ children }) => {
    const { notificar } = useNotificaciones();
    const { usuario } = useSupabaseSesion();
    const { crear, editarPorId, traerUnoPorCampo } = usePeticiones("perfiles");

    const perfilInicial = {
        id: null,
        user_id: null,
        name: "",
        avatar_url: "",
        description: "",
    };

    const [perfilUsuario, setPerfilUsuario] = useState(perfilInicial);
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        if (usuario?.id && usuario?.name) {
            cargarPerfil(usuario.id);
        }
    }, [usuario]);

    const cargarPerfil = async (userId) => {
        try {
            const datos = await traerUnoPorCampo("user_id", userId);

            if (datos) {
                setPerfilUsuario(datos);
            } else {
                await crearPerfilInicial(userId);
            }

        } catch (error) {
            notificar("Error al cargar el perfil", "error");
        }
    };

    const crearPerfilInicial = async (userId) => {
        try {
            const nuevoPerfil = {
                user_id: userId,
                name: usuario.name,
                avatar_url: "",
                description: "",
            };

            await crear(nuevoPerfil);

            const datos = await traerUnoPorCampo("user_id", userId);
            setPerfilUsuario(datos);
        } catch (error) {
        }
    };

    const actualizarDato = (evento) => {
        const { name, value } = evento.target;
        setPerfilUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const activarEdicion = () => {
        setModoEdicion(true);
    };

    const cancelarEdicion = () => {
        cargarPerfil(usuario.id);
        setModoEdicion(false);
    };

    const guardarPerfil = async () => {
        try {
            await editarPorId(perfilUsuario);
            notificar("Perfil actualizado correctamente", "exito");
            setModoEdicion(false);
        } catch (error) {
            notificar("Error al actualizar el perfil", "error");
        }
    };

    const seleccionarAvatar = (url) => {
        setPerfilUsuario((datosAnteriores) => ({
            ...datosAnteriores,
            avatar_url: url,
        }));
    };


    const exportar = {
        perfilUsuario,
        actualizarDato,
        guardarPerfil,
        modoEdicion,
        activarEdicion,
        cancelarEdicion,
        seleccionarAvatar,
    };


    return (
        <perfil.Provider value={exportar}>
            {children}
        </perfil.Provider>
    );
};

export default ProveedorPerfil;
export { perfil };
