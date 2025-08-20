import React from 'react';
import './styles/Card.css';
import type { Item } from '../App';
interface CardProps {
    item: Item
    addToCart: (item: Item) => void; 
}

const Card = ({ item, addToCart }: CardProps) => {

    return (
        <div className='card'>
            <img src={item.itemImage} alt='Imagen del producto' className='card-img'/>
            <h2 className='card-title'>{item.itemName}</h2>
            <p className='card-description'>{item.itemDescription}</p>
            <p className='card-price'>Precio: ${item.itemPrice}</p>
            <p className='card-sku'>SKU: {item.itemSku}</p>
            <p className='card-sock'>Stock: {item.itemStock}</p>
            {/* agregamos un boton para añadir al carrito */}
            <button 
                type='button' 
                className= {item.itemStock > 0 ? 'card-button' : 'card-button-disabled'}
                onClick={() => addToCart(item)}
                disabled={item.itemStock <= 0}
            >
                Añadir al carrito
            </button> 
        </div>
    );
}

export default Card;