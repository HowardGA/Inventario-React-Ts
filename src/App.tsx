import Header from './components/Header';
import Card from './components/Card';
import { useState, useMemo, useCallback } from 'react'; // Importamos useState, useMemo y useCallback para manejar el estado y optimizar el rendimiento
import Cart from './components/Cart';
const itemDataSample = [
  {
    itemName: 'Camiseta de Algodón',
    itemDescription: 'Camiseta de algodón 100% orgánico, suave y cómoda.',
    itemPrice: 19.99,
    itemSku: 'SKU12345',
    itemImage: 'https://png.pngtree.com/png-vector/20250516/ourmid/pngtree-a-red-polo-shirt-is-displayed-in-front-and-back-views-png-image_16302791.png',
    itemStock: 50,
  },
  {
    itemName: 'Auriculares Inalámbricos',
    itemDescription: 'Auriculares con cancelación de ruido, Bluetooth 5.0 y batería de larga duración.',
    itemPrice: 89.50,
    itemSku: 'SKU67890',
    itemImage: 'https://http2.mlstatic.com/D_699107-MLU72628449044_112023-C.jpg',
    itemStock: 2,
  },
  {
    itemName: 'Pantalón Vaquero Clásico',
    itemDescription: 'Pantalón de mezclilla de corte recto, resistente y de estilo atemporal.',
    itemPrice: 55.00,
    itemSku: 'SKU11223',
    itemImage: 'https://denvericy.com/cdn/shop/files/PantalonVaqueroNegroJH001_2.png?v=1740107481&width=1946',
    itemStock: 75,
  },
  {
    itemName: 'Cafetera de Goteo',
    itemDescription: 'Cafetera programable con jarra de vidrio, capacidad para 12 tazas.',
    itemPrice: 45.99,
    itemSku: 'SKU44556',
    itemImage: 'https://decashop.com.mx/cdn/shop/products/KUCF019B-01.png?v=1741709377&width=1445',
    itemStock: 30,
  },
  {
    itemName: 'Reloj de Pulsera Elegante',
    itemDescription: 'Reloj analógico con correa de cuero genuino y esfera de acero inoxidable.',
    itemPrice: 125.75,
    itemSku: 'SKU77889',
    itemImage: 'https://www.livanna.mx/cdn/shop/files/Elegante-Color-S-lido-Gancho-Cuarzo-Relojes-De-Mujer-display-picture-7.webp?v=1728075088',
    itemStock: 15,
  },
  {
    itemName: 'Esterilla de Yoga Antideslizante',
    itemDescription: 'Esterilla de yoga de TPE, ecológica y con un agarre superior.',
    itemPrice: 29.99,
    itemSku: 'SKU00112',
    itemImage: 'https://m.media-amazon.com/images/I/81Uz7EcoOLL._UF894,1000_QL80_.jpg',
    itemStock: 200,
  }
]

export interface Item {
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemSku: string;
  itemImage: string;
  itemStock: number;
  quantity?: number; // Agregamos quantity para manejar cantidades en el carrito
}

function App() {
  const [cartItems, setCartItems] = useState([] as Item[]); 
  const [itemsData, setItemsData] = useState(itemDataSample as Item[]);

  //addToCart ahora suma cantidades si el producto ya está en el carrito
  const addToCart = useCallback((item: Item) => { //se usa useCallback para evitar recrear la función en cada render
    setCartItems((prevCart) => {
      const exists = prevCart.find(cartItem => cartItem.itemSku === item.itemSku);
      // Verificar si el item ya existe en el carrito
      if (exists) {
        // Si ya existe, aumentar la cantidad
        return prevCart.map(cartItem =>
          cartItem.itemSku === item.itemSku
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      // Si no existe, agregarlo al carrito
      return [...prevCart, { ...item, quantity: 1 }];
    });

    // Reducir stock del producto en la lista de items
    setItemsData((prevData) =>
      prevData.map(i =>
        i.itemSku === item.itemSku ? { ...i, itemStock: i.itemStock - 1 } : i
      )
    );
  }, []);

  // Aumentar cantidad desde el carrito (N numbero de tal articulo)
  const increment = useCallback((sku: string) => {
    const foundItem = itemsData.find(item => item.itemSku === sku);
    if (!foundItem || foundItem.itemStock <= 0) return; // Verifica si hay stock disponible
    setCartItems((prevCart) => 
      prevCart.map(item =>
        item.itemSku === sku ? { ...item, quantity: (item.quantity || 1) + 1 } : item // Incrementa la canrtidad del item en el carrito
      )
    );
    setItemsData((prevData) =>
      prevData.map(i =>
        i.itemSku === sku ? { ...i, itemStock: i.itemStock - 1 } : i // Reduce el stock del item en la lista de items
      )
    );
  }, []);

  // Disminuir cantidad desde el carrito (y eliminar si llega a 0)
  const decrement = useCallback((sku: string) => {
    setCartItems((prevCart) =>
      prevCart
        .map(item =>
          item.itemSku === sku ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        )
        .filter(item => (item.quantity || 0) > 0)
    );
    setItemsData((prevData) =>
      prevData.map(i =>
        i.itemSku === sku ? { ...i, itemStock: i.itemStock + 1 } : i
      )
    );
  }, []);

  // Eliminar producto completamente del carrito
  const remove = useCallback((sku: string, quantity: number = 1) => {
    setCartItems((prevCart) => prevCart.filter(item => item.itemSku !== sku));
    setItemsData((prevData) =>
      prevData.map(i =>
        i.itemSku === sku ? { ...i, itemStock: i.itemStock + quantity } : i
      )
    );
  }, []);

  // Calcular total con useMemo
  const total = useMemo(() => {//useMemo para memorizar el total y evitar calculos innecesarios
    // Usualemente se usa para optimizar el rendimiento en computaciones costosas pero en este caso es algo simple para ejmplificar su uso
    return cartItems.reduce((sum, item) => sum + item.itemPrice * (item.quantity || 1), 0);
  }, [cartItems]);

  return (
    <>
      <Header username='Pedro' color='#eb4034' title='Menu' cartQty={cartItems.length} />
      {/* Pasamos mediante props las nuevas funciones para modificar desde el carrito el estado */}
      <Cart items={cartItems} increment={increment} decrement={decrement} remove={remove} total={total}  /> 
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Productos Disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {
          itemsData.map((item, index) => (
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

export default App;