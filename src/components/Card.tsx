import React from 'react';
import { Card as AntCard, Button } from "antd"; // Card y Button de AntD
import type { Item } from '../types/Products';
import { ShoppingCartOutlined } from "@ant-design/icons"; // Icono carrito

interface CardProps {
    item: Item
    addToCart: (item: Item) => void; 
}

const Card = ({ item, addToCart }: CardProps) => {

    return (
        // AntD Card con imagen y descripción
        <AntCard
            hoverable
            cover={<img alt={item.itemName} src={item.itemImage} style={{ height: "200px", objectFit: "contain" }} />}
            title={item.itemName}
            extra={`$${item.itemPrice}`}
        >
            <p>{item.itemDescription}</p>
            <p>Stock: {item.itemStock}</p>

            {/* Botón con icono y estado de disponibilidad */}
            <Button 
                type="primary"
                icon={<ShoppingCartOutlined />}
                block
                disabled={item.itemStock <= 0}
                onClick={() => addToCart(item)}
            >
                {item.itemStock > 0 ? "Añadir al carrito" : "Sin stock"}
            </Button>
        </AntCard>
    );
}

export default Card;