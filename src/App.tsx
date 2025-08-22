import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import CartPage from "./pages/CartPage";
import Products from "./pages/Products";
import Header from './components/Header';
import { CartProvider } from "./context/CartContext";
import { Layout } from "antd";
import { NotificationProvider } from "./context/NotificationContext";
const { Content, Footer } = Layout;
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {
    const location = useLocation();

    // Revisar si la ruta es login o register para ocultar el header y footer
    const showHeaderAndFooter = location.pathname !== "/login" && location.pathname !== "/register";

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {showHeaderAndFooter && <Header />}
            <Content style={{ padding: "20px 50px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Content>
            {showHeaderAndFooter && (
                <Footer style={{ textAlign: "center" }}>
                    Sistema de Inventario ©2025 Creado con Ant Design
                </Footer>
            )}
        </Layout>
    );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <AppContent />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </CartProvider>
  )
}

export default App;