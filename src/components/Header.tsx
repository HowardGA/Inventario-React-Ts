import React from 'react';
import { Link, useNavigate} from 'react-router-dom'; // Importamos Link y useNavigate para poder navegar entre rutas

const Header = () => {
  const navigate = useNavigate(); // creamos una instancia de useNavigate para poder navegar programáticamente

  return (
     <header style={{ padding: "10px", background: "#f0f0f0" }}>
      <nav style={{ display: "flex", gap: "10px" }}>
        {/* Usamos Link para crear enlaces a las diferentes rutas de la aplicación */}
        <Link to="/">Home</Link>
        <Link to="/products">Productos</Link>
        <Link to="/cart">Carrito</Link>
        <button type='button' onClick={() => navigate("/cart")}>
          Ir al carrito con useNavigate
        </button>
      </nav>
    </header>
  );
};

export default Header;
