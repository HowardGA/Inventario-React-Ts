import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Layout, Menu, Button, Spin, Typography } from "antd"; // importamos Spin y Typografia
import { ShoppingCartOutlined, HomeOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons"; //Importramos el icono de usuario
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importamos useAuth 
import { useLogout } from '../features/auth/hooks/useAuth'; // Importamos nuestro hook para cerrar la sesión


const { Header: AntHeader } = Layout; 
const {Text} = Typography;

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const { user, isLoading } = useAuth(); // Tomamos los datos del usuario de nuestro hook del contexto del usuario
  const { mutate: logout, isPending: isLoggingOut } = useLogout(); // Tomamos los metodos de reaect query para utilizar nuestro hook


  return (
       <AntHeader style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
        <Link to="/" style={{ color: 'white' }}>Inventario</Link>
      </div>

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

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {isLoading ? (
          <Spin size="small" />
        ) : user ? (
          // Si el usuario esta loggeado, muestra sus datos y el boton para cerrar sesion
          <>
            <Text style={{ color: 'white' }}>
              <UserOutlined /> ¡Hola, {user.name}!
            </Text>
            <Button 
              variant='solid'
              color='danger' 
              onClick={() => logout()} 
              loading={isLoggingOut}
            >
              Cerrar sesión
            </Button>
          </>
        ) : (
          // Si el usuario no esta loggeado, mostrar el boton para iniciar sesión o registrarse
          <>
            <Button type="default" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </Button>
            <Button type="primary" onClick={() => navigate('/register')}>
              Registrarse
            </Button>
          </>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
