import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CartPage from "./pages/CartPage";
import Products from "./pages/Products";
import Header from './components/Header';
import { CartProvider } from "./context/CartContext";
import { Layout } from "antd";
import { NotificationProvider } from "./context/NotificationContext";
const { Content, Footer } = Layout;

function App() {
  return (
    <CartProvider>
      <NotificationProvider>
      <Layout style={{ minHeight: "100vh" }}>
          <Router>
            <Header />
            <Content style={{ padding: "20px 50px" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Sistema de Inventario ©2025 Creado con Ant Design
            </Footer>
          </Router>
        </Layout>
      </NotificationProvider>
    </CartProvider>
  )
}

export default App;