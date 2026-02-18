import React, { createContext, useState } from 'react'

/* Contexto que maneja tanto los mensajes genéricos como los mensajes de confirmación de la aplicación */

const notificaciones = createContext();

const ProveedorNotificaciones = ({children}) => {
    const [lista, setLista] = useState([])
    const [confirmacion, setConfirmacion] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
    const [accionConfirmacion, setAccionConfirmacion] = useState(null);

    const pedirConfirmacion = (mensaje, accion) => {
        setMensajeConfirmacion(mensaje);
        setAccionConfirmacion(() => accion);
        setConfirmacion(true);
    };
    const cancelarConfirmacion = () => {
        setConfirmacion(false);
        setMensajeConfirmacion("");
        setAccionConfirmacion(null);
    };

    const aceptarConfirmacion = () => {
        if (accionConfirmacion) {
            accionConfirmacion();
        }
        cancelarConfirmacion();
    };

    /* Lo he compiado de Juande, me parecia chulo */
    const notificar = (mensaje, tipo = "exito") => {
    const id = Date.now() + Math.random();

    setLista((prev) => [...prev, { id, mensaje, tipo }]);

    setTimeout(() => {
        setLista((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
};


    const exportar = 
    {
        lista,
        notificar,
        confirmacion,
        mensajeConfirmacion,
        pedirConfirmacion,
        cancelarConfirmacion,
        aceptarConfirmacion,
        
    };

  return (
    <notificaciones.Provider value={exportar}>
        {children}
    </notificaciones.Provider>
  );
};

export default ProveedorNotificaciones
export {notificaciones};