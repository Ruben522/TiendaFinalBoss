import { supabaseConexion } from "../supabase/Supabase.js";

const usePeticiones = (tabla) => {
    const consulta = async (peticion) => {
        try {
            const { data, error } = await peticion;
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    };

    const listarTodo = async () => {
        const peticion = await consulta(
            supabaseConexion.from(tabla).select("*"),
        );
        return peticion;
    };
    const crear = async (datos) => {
        const peticion = await consulta(
            supabaseConexion
                .from(tabla)
                .insert(datos)
                .select(),
        );
        return peticion;
    };
    const editarPorId = async (datos) => {
        const peticion = await consulta(
            supabaseConexion
                .from(tabla)
                .update(datos)
                .eq("id", datos.id),
        );
    };
    const eliminar = async (id) => {
        const peticion = await consulta(
            supabaseConexion
                .from(tabla)
                .delete()
                .eq("id", id),
        );
        return peticion;
    };
    const traerPorId = async (datos) => {
        const peticion = await consulta(
            supabaseConexion
                .from(tabla)
                .select("*")
                .eq("id", datos.id),
        );
    };
    const traerPorCampo = async (campo, valor) => {
        const peticion = await consulta(
            supabaseConexion
                .from(tabla)
                .select("*")
                .eq(campo, valor),
        );
        return peticion;
    };
    const traerUnoPorCampo = async (campo, valor) => {
        const peticion = await consulta(
            supabaseConexion
                .from(tabla)
                .select("*")
                .eq(campo, valor)
                .maybeSingle(),
        );
        return peticion;
    };

    const traerTodoMultitabla = async (
        accion = "*",
        columna,
        parametro,
    ) => {
        const peticion = await consulta(
            supabaseConexion
                .from(tabla)
                .select(accion)
                .eq(columna, parametro),
        );
        return peticion;
    };

    return {
        listarTodo,
        crear,
        editarPorId,
        eliminar,
        traerPorId,
        traerPorCampo,
        traerTodoMultitabla,
        traerUnoPorCampo,
    };
};

export default usePeticiones;
