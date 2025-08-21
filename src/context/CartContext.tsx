import { createContext, useState, useContext, useCallback, useMemo } from "react"; // Importamos los hooks necesarios para manejar el contexto
import type { ReactNode } from "react";
import type { Item } from "../types/Products"; // Importamos la interfaz Item para definir el tipo de los items en el carrito
// Datos de ejemplo para los items del carrito
// Estos datos suelen ser cargados desde una API y cuadno se modifican cosas como el stock, se actualizan en la base de datos
// En este caso, los datos son estáticos y se usan para simular un carrito de compras
export const itemDataSample = [
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
// Definimos el tipo de nuestro contexto del carrito, el cual contendrá el carrito, 
// las funciones para manipurarlo y el total de los items
type CartContextType = {
    cart: Item[];
    addToCart: (item: Item) => void;
    increment: (sku: string) => void;
    decrement: (sku: string) => void;
    remove: (sku: string, quantity?: number) => void;
    total: number;
    itemsData: Item[];
    setItemsData: (items: Item[]) => void; // Funcion para actulizar los datos localmente
    // Estamos actualizando los datos localmente, pero en una aplicacion real se deberia hacer una llamada a la API 
    // para actualizae los datos
};

const CartContext = createContext<CartContextType | undefined>(undefined);// Creamos el contexto del carrito, el cual será usado para proveer los datos
// y funciones a los componentes hijos
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Item[]>([]);
    const [itemsData, setItemsData] = useState<Item[]>(itemDataSample);

    const addToCart = useCallback((item: Item) => {
        setCart((prevCart) => {
            const exists = prevCart.find(cartItem => cartItem.itemSku === item.itemSku);
            if (exists) {
                return prevCart.map(cartItem =>
                    cartItem.itemSku === item.itemSku
                        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });

        setItemsData((prevData) =>
            prevData.map(i =>
                i.itemSku === item.itemSku ? { ...i, itemStock: i.itemStock - 1 } : i
            )
        );
    }, []);

    const increment = useCallback((sku: string) => {
        const foundItem = itemsData.find(item => item.itemSku === sku);
        if (!foundItem || foundItem.itemStock <= 0) return;
        setCart((prevCart) =>
            prevCart.map(item =>
                item.itemSku === sku ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            )
        );
        setItemsData((prevData) =>
            prevData.map(i =>
                i.itemSku === sku ? { ...i, itemStock: i.itemStock - 1 } : i
            )
        );
    }, []);

    const decrement = useCallback((sku: string) => {
        setCart((prevCart) =>
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

    const remove = useCallback((sku: string, quantity: number = 1) => {
        setCart((prevCart) => prevCart.filter(item => item.itemSku !== sku));
        setItemsData((prevData) =>
            prevData.map(i =>
                i.itemSku === sku ? { ...i, itemStock: i.itemStock + quantity } : i
            )
        );
    }, []);

    const total = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.itemPrice * (item.quantity || 1), 0);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, increment, decrement, remove, total, itemsData, setItemsData }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
