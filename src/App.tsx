import Header from './components/Header';
//importamos el componente Card
import Card from './components/Card';
function App() {

//definimos un array de objetos que contiene la información de los productos
//cada objeto tiene las propiedades que el componente Card espera recibir
const itemData = [
    {
       itemName:'Camiseta de Algodón',
        itemDescription:'Camiseta de algodón 100% orgánico, suave y cómoda.',
        itemPrice:19.99,
        itemSku:'SKU12345',
        itemImage:'https://png.pngtree.com/png-vector/20250516/ourmid/pngtree-a-red-polo-shirt-is-displayed-in-front-and-back-views-png-image_16302791.png',
        itemSock:50,
    },
    {
        itemName:'Auriculares Inalámbricos',
        itemDescription:'Auriculares con cancelación de ruido, Bluetooth 5.0 y batería de larga duración.',
        itemPrice:89.50,
        itemSku:'SKU67890',
        itemImage:'https://http2.mlstatic.com/D_699107-MLU72628449044_112023-C.jpg',
        itemSock:120,
    },
    {
        itemName:'Pantalón Vaquero Clásico',
        itemDescription:'Pantalón de mezclilla de corte recto, resistente y de estilo atemporal.',
        itemPrice:55.00,
        itemSku:'SKU11223',
        itemImage:'https://denvericy.com/cdn/shop/files/PantalonVaqueroNegroJH001_2.png?v=1740107481&width=1946',
        itemSock:75,
    },
    {
        itemName:'Cafetera de Goteo',
        itemDescription:'Cafetera programable con jarra de vidrio, capacidad para 12 tazas.',
        itemPrice:45.99,
        itemSku:'SKU44556',
        itemImage:'https://decashop.com.mx/cdn/shop/products/KUCF019B-01.png?v=1741709377&width=1445',
        itemSock:30,
    },
    {
        itemName:'Reloj de Pulsera Elegante',
        itemDescription:'Reloj analógico con correa de cuero genuino y esfera de acero inoxidable.',
        itemPrice:125.75,
        itemSku:'SKU77889',
        itemImage:'https://www.livanna.mx/cdn/shop/files/Elegante-Color-S-lido-Gancho-Cuarzo-Relojes-De-Mujer-display-picture-7.webp?v=1728075088',
        itemSock:15,
    },
    {
        itemName:'Esterilla de Yoga Antideslizante',
        itemDescription:'Esterilla de yoga de TPE, ecológica y con un agarre superior.',
        itemPrice:29.99,
        itemSku:'SKU00112',
        itemImage:'https://m.media-amazon.com/images/I/81Uz7EcoOLL._UF894,1000_QL80_.jpg',
        itemSock:200,
    }
]

  return (
    <>
      <Header username='Pedro' color='#eb4034' title='Menu'/>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Productos Disponibles</h2>
      {/* Creamos un espacio para poder mostrar las cartas de los articulos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {/* dentro de TSX usamos llaves {} para insertar código JavaScript */}
        {
          //usamos el método map para recorrer el array itemData y renderizar un componente Card por cada objeto
          itemData.map((item, index) => (
            //dentro de react, cada elemento de una lista debe tener una propiedad 'key' única
            //aquí usamos el índice del array como key, pero en un caso real es mejor usar un identificador único
            <Card
              key={index}
              itemName={item.itemName}
              itemDescription={item.itemDescription}
              itemPrice={item.itemPrice}
              itemSku={item.itemSku}
              itemImage={item.itemImage}
              itemSock={item.itemSock}
            />
          ))
        }
      </div>
    </>
  )
}

export default App