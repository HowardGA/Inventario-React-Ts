import Card from "../components/Card";
import { useCart } from "../context/CartContext";// Importamos el hook useCart para acceder al contexto del carrito

const Products = () => {
    const { addToCart, itemsData } = useCart();// Destructuramos las propiedades del contexto del carrito

    return (
        <>
            <h1>Products Page</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {
                    itemsData.map((item, index) =>(
                        <Card
                            key={index}
                            item={item}
                            addToCart={addToCart}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default Products;