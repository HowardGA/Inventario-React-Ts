import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Herramienta de desarrollo para React Query, permite ver el 
// estado de las consultas y mutaciones

const queryClient = new QueryClient({// Dentro de esta instancia se configuran opciones globales para las consultas
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita que las consultas se vuelvan a cargar al enfocar la ventana
      retry: false, // Desactiva los reintentos automáticos en caso de error
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* La instancia de react query engloba a nuestro punto de entrada de la app para que pueda ser utilizado globalmente */}
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} /> {/* Herramienta de desarrollo para React Query */}
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
