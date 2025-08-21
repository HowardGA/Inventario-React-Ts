import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Layout, Menu, Button } from "antd"; // Usamos Layout y Menu de AntD
import { ShoppingCartOutlined, HomeOutlined, AppstoreOutlined } from "@ant-design/icons"; // Iconos de AntD
import { useCart } from '../context/CartContext';

const { Header: AntHeader } = Layout; // Renombramos Header de Layout para evitar confusiones con nuestro componente Header

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    // AntD Header estilizado
    <AntHeader style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>Inventario</div>
      
      {/* AntD Menu para la navegación */}
      <Menu theme="dark" mode="horizontal" selectable={false}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="products" icon={<AppstoreOutlined />}>
          <Link to="/products">Productos</Link>
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">Carrito ({cart.length})</Link>
        </Menu.Item>
      </Menu>

      {/* Botón extra con useNavigate */}
      <Button 
        type="primary" 
        icon={<ShoppingCartOutlined />} 
        onClick={() => navigate("/cart")}
      >
        Ir al carrito
      </Button>
    </AntHeader>
  );
};

export default Header;
