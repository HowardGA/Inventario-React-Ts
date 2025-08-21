import type { Item } from '../types/Products';

// Añadimos las nuevas funciones para modificar el carrito
interface CartProps {
  items: Item[];
  increment: (sku: string) => void;
  decrement: (sku: string) => void;
  remove: (sku: string, quantity: number) => void;
  total: number;
}


const Cart = ({ items, increment, decrement, remove, total }: CartProps) => (
  <div>
    <h2>Carrito</h2>
    {items.length === 0 && <p>El carrito está vacío</p>}
    {items.map((item, idx) => (
      <div key={idx}>
        {/* mostramos cantidad y subtotal */}
        {item.itemName} - ${item.itemPrice} x {item.quantity} = ${(item.itemPrice * (item.quantity || 1)).toFixed(2)}
        {/* botones de control */}
        <button type='button' onClick={() => increment(item.itemSku)}>+</button>
        <button type='button' onClick={() => decrement(item.itemSku)}>-</button>
        <button type='button' onClick={() => remove(item.itemSku, item.quantity || 1)}>❌</button>
      </div>
    ))}
    {/* mostramos el total usando useMemo */}
    {items.length > 0 && <h3>Total: ${total.toFixed(2)}</h3>}
  </div>
);

export default Cart;
