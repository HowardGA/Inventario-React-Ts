import React from 'react';
//importamos una hoja de estilos para este componente, de esta manera se evita el uso de estilos en línea
import './styles/Card.css';

//definimos una interfaz para las propiedades que recibirá el componente Card
interface CardProps {
    itemName: string;
    itemDescription: string;
    itemPrice: number;
    itemSku: string;
    itemImage: string;
    itemSock: number;
}

//definimos el componente Card como una función de React que recibe las propiedades definidas en la interfaz CardProps
const Card: React.FC<CardProps> = ({ itemName, itemDescription, itemPrice, itemSku, itemImage, itemSock }) => {

    return (
        //para utilizar clases de CSS, se usa la propiedad 'className' en lugar de 'class'
        // porque 'class' es una palabra reservada en JavaScript
        <div className='card'>
            {/* insertamos los valores de las props por medio de llaves*/}
            <img src={itemImage} alt='Imagen del producto' className='card-img'/>
            <h2 className='card-title'>{itemName}</h2>
            <p className='card-description'>{itemDescription}</p>
            <p className='card-price'>Precio: ${itemPrice}</p>
            <p className='card-sku'>SKU: {itemSku}</p>
            <p className='card-sock'>Stock: {itemSock}</p>
        </div>
    );
}

export default Card;