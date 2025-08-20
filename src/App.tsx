import Header from './components/Header';
import Card from './components/Card';
import { useState } from 'react';
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

//Definimos la interfaz Item que representa un objeto de tipo Item en todo el proyecto
export interface Item {
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemSku: string;
  itemImage: string;
  itemStock: number;
}

function App() {
  const [cartItems, setCartItems] = useState([] as Item[]); //Iniciamos el estado del carrito como un array vacío, el carrito
  //es de tipo Item[] ya que cada elemento del carrito es un objeto de tipo Item
  //Iniciamos el estado de los items como un array de objetos Item, de esta manera podemos manipular los datos de los items
  const [itemsData, setItemsData] = useState(itemDataSample as Item[]);

  //Función para añadir un item al carrito, recibe un objeto de tipo Item y lo añade al carrito
  //Además, actualiza el stock del item restando 1 al stock actual
  const addToCart = (item: Item) => {
    setCartItems([...cartItems, item]);//Al usar [...cartItems, item] estamos creando un nuevo array  que contiene todos los elementos 
    // del carrito actual más el nuevo item
    setItemsData(itemsData.map(i => i.itemSku === item.itemSku ? { ...i, itemStock: item.itemStock - 1 } : i));
  }

  //Función para eliminar un item del carrito, recibe un objeto de tipo Item y lo elimina del carrito
  //Además, actualiza el stock del item sumando 1 al stock actual, lo "devuelve" al inventario
  const removeFromCart = (item: Item) => {
    const index = cartItems.findIndex(cartItem => cartItem.itemSku === item.itemSku);
    if (index !== -1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1); // elimina uno solo
      setCartItems(newCart);
      setItemsData(itemsData.map(i =>
        i.itemSku === item.itemSku
          ? { ...i, itemStock: i.itemStock + 1 }
          : i
      ));
    }
  }

  return (
    <>
      {/* Pasamos la cantidad de items en el carrito como props al header */}
      <Header username='Pedro' color='#eb4034' title='Menu' cartQty={cartItems.length} />
      {/* Pasamos como props el contenido del carrito a cart y la función para eliminar un articulo */}
      <Cart items={cartItems} removeFromCart={removeFromCart} />
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Productos Disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {
          itemsData.map((item, index) => (
            <Card
              key={index}
              item={item}//Pasamos cada item como prop al componente Card
              addToCart={addToCart} // Pasamos la función addToCart como prop al componente Card
            />
          ))
        }
      </div>
    </>
  )
}

export default App