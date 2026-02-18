import { supabaseConexion } from "../supabase/Supabase.js";
import { useNavigate } from "react-router-dom";

export const useSesion = () => {

    const navegar = useNavigate();

    const crearCuenta = async (datosSesion) => {
        try {
            const { data, error } =
                await supabaseConexion.auth.signUp({
                    email: datosSesion.email,
                    password: datosSesion.password,
                    // Tenía error en la estrucura si simplemente hacia name: datosSesion.name.
                    // Al parecer eso ocurre porque Supabase tiene una estructura concreta para el
                    // campo name si no, lo ignora.
                    options: {
                        data: { name: datosSesion.name },
                    },
                });

            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        }
    };

    const iniciarSesion = async (datosSesion) => {
        try {
            const { data, error } =
                await supabaseConexion.auth.signInWithPassword(
                    {
                        email: datosSesion.email,
                        password: datosSesion.password,
                        options: {
                            emailRedirectTo:
                                "http://localhost:5173/",
                        },
                    },
                );
            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        }
    };

    const cerrarSesion = async () => {
        try {
            await supabaseConexion.auth.signOut();
            navegar("/");
        } catch (error) {
            throw error;
        }
    };

    const cargarUsuario = async () => {
        try {
            const { data, error } =
                await supabaseConexion.auth.getUser();

            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        }
    };

    return {
        crearCuenta,
        iniciarSesion,
        cerrarSesion,
        cargarUsuario,
    };
};

export default useSesion;
