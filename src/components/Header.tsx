import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Layout, Menu, Button, Spin, Typography } from "antd"; 
import { HomeOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons"; 
import { useAuth } from '../context/AuthContext';
import { useLogout } from '../features/auth/hooks/useAuth';


const { Header: AntHeader } = Layout; 
const {Text} = Typography;

const Header = () => {
  const navigate = useNavigate();

  const { user, isLoading } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();


  return (
       <AntHeader style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
        <Link to="/" style={{ color: 'white' }}>Inventario</Link>
      </div>

      <Menu theme="dark" mode="horizontal" selectable={false}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
        {/* Cambiamos el nombre a dashboard */}
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="products" icon={<AppstoreOutlined />}>
          <Link to="/products">Productos</Link>
        </Menu.Item>
        <Menu.Item key="category" icon={<AppstoreOutlined />}>
          <Link to="/categories">Categorīas</Link>
        </Menu.Item>
       {/* Eliminamos el carrito de compras */}
      </Menu>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {isLoading ? (
          <Spin size="small" />
        ) : user ? (
          
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
