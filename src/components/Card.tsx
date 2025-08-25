import React from 'react';
import { Card as AntCard, Button, Popconfirm } from "antd"; // Importamos 'Popconfirm' de antD para preguntar antes de eliminar un producto
import type { Item } from '../types/Products';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Importamos nuevos iconos para nuestros botones

// Ahora, como estamos utilizando una API real, no manejaremos datos de productos localmente
// como estamos realizando un inventario simple, omitiremos la lógica del carrito, ya que esta cumplio su proposito al
// mostrar conceptor y funcionalidades iniciales

interface CardProps {
    item: Item
    handleDelete: (id: number) => void; // pasamos el ID del productos a eliminar
    handleUpdate: (item: Item) => void; // pasamos la informacion del producto a editar
    handleShowDetails: (item: Item) => void;  // pasamos los detalles del producto
}

const Card = ({ item, handleDelete, handleUpdate, handleShowDetails }: CardProps) => {

    return (
        <AntCard
            hoverable
            cover={<img alt={item.itemName} src={item.itemImage} style={{ height: "200px", objectFit: "contain" }} />}
            title={item.itemName}
            extra={`$${item.itemPrice}`}
            // al dar clic a la card, mostramos los detalles del producto
            onClick={() => handleShowDetails(item)}
        >
            <p>{item.itemDescription}</p>
            <p>Stock: {item.itemStock}</p>

            {/* Botón para actualizar */}
            <Button
                icon={<EditOutlined />}
                onClick={(e) => { // paramos la propagación del click
                    e.stopPropagation();
                    handleUpdate(item);
                }}
                style={{ marginRight: 8 }}
            />
            <Popconfirm
                title="¿Seguro que deseas eliminar este producto?"
                onConfirm={(e) => { 
                    if (e) e.stopPropagation();
                    handleDelete(item.id);
                }}
                okText="Sí"
                cancelText="No"
            >
                <Button 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={(e) => e.stopPropagation()}
                />
            </Popconfirm>
        </AntCard>
    );
}

export default Card;