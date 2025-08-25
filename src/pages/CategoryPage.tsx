import { useState } from "react";
import { Table, Button, Modal, Typography, Spin } from "antd";
import { useCategories, useCreateCategory } from "../features/products/hooks/categoryHooks";
import { PlusOutlined } from "@ant-design/icons";
import CategoryForm from '../features/products/components/categoryForm'
import { useNotification } from "../context/NotificationContext";
import type { Category } from "../types/Products";

const { Title } = Typography;

const CategoriesPage = () => {
    const { data: categories, isLoading } = useCategories(); // 'data' es el nombre del array de category por default por react query,
    //  nosotros le damos el nombre de categories
    const [isModalOpen, setIsModalOpen] = useState(false);
    const createMutation = useCreateCategory(); // Mutation de react query para crear categoria
    const { openNotification } = useNotification(); // Nuestro hook para mostrar notificación  

    const showModal = () => {
        setIsModalOpen(true);
    }

    const onFinish = async (category: Category) => {
        createMutation.mutate(category, {
            onSuccess: () => {
                openNotification("success", "Categoría creada", "La categoría fue creada exitosamente");
                setIsModalOpen(false);
            }
        });
    };

    return (
        <>
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
                Categorías
            </Title>
            <Button
                icon={<PlusOutlined />}
                color="orange"
                variant="solid"
                style={{ marginBottom: '1rem' }}
                onClick={showModal}
            >
                Crear categoría
            </Button>
            {/* Checamos el estado de 'isLoading' que proporciona react query, con este podemos saber si los 
            datos de nuestra API todavía no llegan y estan cargando */}
            {isLoading ? (
                // si los datos estan cargando, mostramos un spinner
                <Spin />
            ) : (
                <Table
                    dataSource={categories?.data} // data es el array de nuestras categorias
                    rowKey="id"
                    loading={isLoading}
                    columns={[
                        { title: "ID", dataIndex: "id" },
                        { title: "Nombre", dataIndex: "name" },
                    ]}
                />
            )}

            <Modal
                title="Crear Categoría"
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                <CategoryForm onFinish={onFinish} />
            </Modal>
        </>
    );
};

export default CategoriesPage;
