import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from "../pages/Inicio.jsx";
import Error from "../pages/Errores.jsx";
import Registrarse from "../pages/Registro.jsx";
import IniciarSesion from "../pages/IniciarSesion.jsx";
import CrearProducto from "../pages/CrearProducto.jsx";
import CrearLista from "../pages/CrearLista.jsx";
import EditarProducto from "../pages/EditarProducto.jsx";
import TodosLosProductos from "../pages/TodosLosProductos.jsx";
import MisListas from "../pages/MisListas.jsx";
import AñadirProductos from "../pages/AñadirProductos.jsx";
import EditarLista from "../pages/EditarLista.jsx";
import Perfiles from "../pages/Perfiles.jsx";
import Administrador from "../pages/Administrador.jsx";
import TodasLasListas from "../pages/TodasLasListas.jsx";
import useSupabaseSesion from "../hooks/useSupabaseSesion.js";

// Componente que contiene las rutas de la aplicación.
const Rutas = () => {
  const { esAdmin } = useSupabaseSesion();

  /**
   * No considero que sea la mejor opción de manejar la reedirección según
   * el rol del usuario, pero es rápida.
   */
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<Registrarse />} />
      <Route path="/iniciar-sesion" element={<IniciarSesion />} />
      <Route path="/todos-los-productos" element={<TodosLosProductos />} />
      <Route
        path="/mis-listas"
        element={esAdmin() ? <Navigate to="/" replace /> : <MisListas />} />
      <Route path="/crear-producto" element={<CrearProducto />} />
      <Route path="/editar-producto/:id" element={<EditarProducto />} />
      <Route
        path="/crear-lista"
        element={esAdmin() ? <Navigate to="/" replace /> : <CrearLista />}
      />
      <Route
        path="/editar-lista/:id"
        element={esAdmin() ? <Navigate to="/" replace /> : <EditarLista />}
      />
      <Route path="/añadir-productos/:id" element={<AñadirProductos />} />
      <Route path="/ver-perfil/:id" element={<Perfiles />} />
      <Route
        path="/administrador"
        element={!esAdmin() ? <Navigate to="/" replace /> : <Administrador />} />
      <Route
        path="/todas-las-listas"
        element={!esAdmin() ? <Navigate to="/" replace /> : <TodasLasListas />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Rutas;
