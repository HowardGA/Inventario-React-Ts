import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";// Importamos el hook useCart para acceder al contexto del carrito

const CartPage = () => {
    const {cart, increment, decrement, remove, total} = useCart();// Destructuramos las propiedades del contexto del carrito
    
    return (
        <>
            <h1>Cart Page</h1>
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