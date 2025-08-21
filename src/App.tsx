import { BrowserRouter as Router, Routes, Route } from "react-router-dom";//importamos los componentes necesarios para el enrutamiento
import Home from './pages/Home';
import CartPage from "./pages/CartPage";
import Products from "./pages/Products";
import Header from './components/Header';
import { CartProvider } from "./context/CartContext"; // Importamos el proveedor del contexto del carrito para poder usarlo en toda la aplicación

// Removemos los datos de ejemplo del archivo App.tsx ya que aqui sera solamente el punto de entrada de la aplicacion
// Tambien removemos la interfaz Item del archivo y la movemos a la carpeta src/types para mantener una mejor organización del código

function App() {
  return (
    // Envolvemos toda la aplicación con el proveedor del contexto del carrito para que todos los componentes puedan acceder a los datos y funciones del carrito
    <CartProvider>
        <Router>
          {/* El header aparecera en todas las pages ya que lo definimos en un orden superior */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
    </CartProvider>
  )
}

export default App;