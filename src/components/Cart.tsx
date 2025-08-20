import type { Item } from '../App';//Importamos la interfaz Item desde App.tsx ya que las propiedades para el componente Cart 
//son las mismas que las de un objeto Item

interface CartProps {
  items: Item[];
  removeFromCart: (item: Item) => void;//Función para eliminar del carrito
}

const Cart = ({ items, removeFromCart }: CartProps) => (//Componente funcional que recibe las props definidas en la interfaz CartProps
  <div>
    <h2>Carrito</h2>
    {/* Si el carrito no contiene nada, muestra el mensaje */}
    {items.length === 0 && <p>El carrito está vacío</p>}
    {/* Iteración sobre el contenido del carrito */}
    {items.map((item, idx) => (
      <div key={idx}>
        {item.itemName} - ${item.itemPrice}
        {/* Boton que acciona la función de removeFromCart */}
        <button type='button' onClick={() => removeFromCart(item)}>Quitar</button>
      </div>
    ))}
  </div>
);

export default Cart;
