import React, { createContext, useContext } from 'react';
import { notification } from "antd";
// Ocupamos crear un contexto porque notification de antD debe de utilizar "context" para funcionar correctamente, si no se 
// utiliza el context, deberiamos de envolver el componente que utiliza notification cada vez que lo usamos, lo cual es tedioso y no escalable.

//  Definimos el tipo de nuestro context de notificaciones
type NotificationContextType = {
    openNotification: (type: "success" | "error", message: string, description?: string) => void;
};
// Creamos el context de notificaciones con un valor inicial de null para evitar errores
const NotificationContext = createContext<NotificationContextType | null>(null);
// Creamos un hook personalizado para usar el context de notificaciones
// Este hook nos permite acceder al context de notificaciones desde cualquier componente
// y nos asegura que el context no sea null, lanzando un error si se usa fuera
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification debe de estar dentro de un NotificationProvider");
    }
    return context;
};
// Creamos un provider para el context de notificaciones
// A este provider le pasamos el valor del context y lo envolvemos alrededor de los componentes hijos
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [apiNotification, contextHolder] = notification.useNotification();// Usamos el hook useNotification de AntD para manejar las notificaciones

    // Funcion para abrir una notificación
    const openNotification = (type: "success" | "error", message: string, description?: string) => {
        apiNotification[type]({
            message,
            description,
            placement: "topRight",
            duration: 3,
        });
    };
    // Creamos el valor del context que será pasado al provider 
    const contextValue: NotificationContextType = { openNotification };
    return (
        // Proveemos el context de notificaciones a los componentes hijos
        <NotificationContext.Provider value={contextValue}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};