import Card from "../components/Card";
import { useCart } from "../context/CartContext";
import { Row, Col, Typography, Button, Modal } from "antd"; // Usamos Row y Col para grid
import { PlusOutlined } from "@ant-design/icons"; 
import { useState } from "react";
import ItemForm from "../features/products/components/ItemForm";
import type { Item } from "../types/Products"; // Importamos el tipo Item para TypeScript
import { useNotification } from "../context/NotificationContext"; // Importamos el hook de notificaciones

const { Title } = Typography;

const Products = () => {
    const { addToCart, itemsData, setItemsData } = useCart(); // Agregamos setItemsData para actualizar los datos localmente
    const [ isModalOpen, setIsModalOpen ] = useState(false); // Estado para manejar la visibilidad del modal
    const {openNotification} = useNotification(); //Hook para manejar las notificaciones

    // Funcion para abrir el modal
    const showModal = () => {
        setIsModalOpen(true);
    }

    // Funcion que se ejecuta al enviar el formulario del modal
    const onFinish = (values: Item) => {
        setItemsData([...itemsData, values]);
        setIsModalOpen(false); // Cerramos el modal
        // Feedback a mnaera de notificacion
        openNotification("success", "Producto creado", "El producto ha sido creado exitosamente");
    }

    return (
        <>
            {/* Título de página con AntD Typography */}
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
                Productos Disponibles
            </Title>
            <Button 
                icon={<PlusOutlined/>} 
                color="orange" 
                variant="solid" 
                style={{marginBottom:'1rem'}}
                onClick={showModal} // Abrimos el modal al hacer click
            >
                Crear Producto 
            </Button>
            {/* Row/Col de AntD para grilla responsiva */}
            <Row gutter={[16, 16]} justify="center">
                {itemsData.map((item, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                        <Card item={item} addToCart={addToCart} />
                    </Col>
                ))}
            </Row>
            <Modal
                title="Crear Producto"
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)} // Cerramos el modal al cancelar
            >
                <ItemForm onFinish={onFinish}/>
            </Modal>
        </>
    )
}

export default Products;