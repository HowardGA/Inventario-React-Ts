import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";
import { Typography } from "antd";

const { Title } = Typography;

const CartPage = () => {
    const {cart, increment, decrement, remove, total} = useCart();

    return (
        <>
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
                Carrito de Compras
            </Title>
            <Cart 
                items={cart}
                increment={increment}
                decrement={decrement}
                remove={remove}
                total={total}
            />
        </>
    )
}

export default CartPage;