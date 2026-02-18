import React, { useState, useEffect } from "react";
import useNotificaciones from "../hooks/useNotificaciones";
import "./Notificaciones.css";

/* Yo no he hecho este componente, es el componente original de Juande modificado un poco con Gemini para el uso de las notificaciones */
const Notificaciones = () => {
    const { lista } = useNotificaciones();
    const [elementosSaliendo, setElementosSaliendo] = useState([]);

    useEffect(() => {
        const idsExistentes = lista.map(item => item.id);
        
        const timers = lista.map(item => {
            return setTimeout(() => {
                setElementosSaliendo(prev => [...prev, item.id]);
            }, 2600);
        });

        setElementosSaliendo(prev => prev.filter(id => idsExistentes.includes(id)));

        return () => timers.forEach(clearTimeout);
    }, [lista]);

    return (
        <div className="notificaciones-wrapper">
            {lista.length > 0 && lista.map((item) => (
                <div 
                    key={item.id} 
                    className={`alerta-item tipo-${item.tipo} ${elementosSaliendo.includes(item.id) ? "saliendo" : ""}`}
                >
                    <div className="alerta-icono">
                        {item.tipo === "error" ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        )}
                    </div>

                    <div className="alerta-contenido">
                        <div className="alerta-mensaje">{item.mensaje}</div>
                    </div>

                    <div className="alerta-barra" style={{ animationDuration: "3000ms" }} />
                </div>
            ))}
        </div>
    );
};

export default Notificaciones;