import React from "react";
import editarIcono from "../assets/imgs/editar_perfil.png";
import useContextoPerfil from "../hooks/useContextoPerfil";
import { avataresPredeterminados } from "../assets/json/avatares";
import "./Perfil.css"

// Componente del perfil del usuario. Puede editar su nombre, avatar y descripción.
const Perfil = () => {
    const {
        perfilUsuario,
        actualizarDato,
        guardarPerfil,
        modoEdicion,
        activarEdicion,
        cancelarEdicion,
        seleccionarAvatar,
    } = useContextoPerfil();

    return (
        <div className="perfil">
            <div className="perfil-header">
                <h1>Perfil</h1>
                <img
                    src={editarIcono}
                    alt="editar perfil"
                    onClick={() => activarEdicion()}
                />
            </div>

            {modoEdicion ? (
                <>
                    <input
                        type="text"
                        placeholder="Pepito"
                        name="name"
                        value={perfilUsuario.name}
                        onChange={(evento) => {
                            actualizarDato(evento)
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Link de tu imágen de avatar"
                        name="avatar_url"
                        value={perfilUsuario.avatar_url}
                        onChange={(evento) => {
                            actualizarDato(evento)
                        }}
                    />
                    <img src={perfilUsuario.avatar_url} alt="avatar_url" />
                    <h3>Nuestros avatares por si no sabes que elegir.</h3>
                    <div className="avatares-predeterminados">
                        {avataresPredeterminados.map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar}
                                alt="avatar_url"
                                onClick={() => seleccionarAvatar(avatar)}
                            />
                        ))}
                    </div>
                    <textarea
                        name="description"
                        placeholder="Te convertiste en lo que juraste destruir... Ups, en esta práctica no era."
                        value={perfilUsuario.description}
                        onChange={(evento) => {
                            actualizarDato(evento)
                        }}
                    />

                    <input
                        type="button"
                        value="Guardar cambios"
                        onClick={() => {
                            guardarPerfil()
                        }}
                    />

                    <input
                        type="button"
                        value="Cancelar cambios"
                        onClick={() => {
                            cancelarEdicion()
                        }}
                    />
                </>
            ) : (
                <>
                    <h3>Nombre: {perfilUsuario.name}</h3>
                    <img
                        src={perfilUsuario.avatar_url}
                        alt="avatar"
                    />
                    <h4>Pequeña descripción</h4>
                    <p>{perfilUsuario.description}</p>
                </>
            )}
        </div>
    );
};

export default Perfil;
