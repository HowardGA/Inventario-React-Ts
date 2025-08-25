import Card from "../components/Card";
//Borramos el hook de useCart porque manipularemos datos de nuetra API que esta conectada a la base de datos
import { Row, Typography, Button, Modal, Spin } from "antd"; // Importamos nuevos componentes de antD
import { PlusOutlined } from "@ant-design/icons"; // Importamos nuevos iconos para nuestros botones
import { useState } from "react";
import ItemForm from "../features/products/components/ItemForm";
import { useCreateProduct, 
        useDeleteProduct, 
        useProducts, 
        useUpdateProduct, 
        } from "../features/products/hooks/productHooks"; // Los hooks que creamos para realizar peticiones a nuestra API con axios y manejar el 
        // estado con react query
import type { Item } from "../types/Products"; 
import { useNotification } from "../context/NotificationContext";
import { useCategories } from "../features/products/hooks/categoryHooks"; // Hook para tomar las categorīas
import ProductModal from "../features/products/components/ProductModal";

const { Title } = Typography;

const Products = () => {
    const { data: categories } = useCategories();
    const { data: products, isLoading } = useProducts(); // 'data' es el nombre del array de items por default por react query,
    //  nosotros le damos el nombre de products
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();

    // Estado para saber si estamos editando algun producto (esto modificara el envio de nuestro formulario)
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    //Estado para un producto en específico
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [ isProductModalOpen, setIsProductModalOpen ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const {openNotification} = useNotification();

    const showModal = () => {
        setIsModalOpen(true);
    }

    // Editamos nuestra función que envía los datos del formulario, ahora, checa el estado de 'editingItem' para saber si estamos editando o
    // creando un producto 
    const onFinish = (values: Item) => {
        if (editingItem) {
            updateMutation.mutate(
                { id: editingItem.id, item: values },
                {
                onSuccess: () => {
                    openNotification("success", "Producto actualizado", "El producto fue actualizado correctamente");
                    setIsModalOpen(false);
                    setEditingItem(null);
                }
                }
            );
            } else {
                console.log(values)
            createMutation.mutate(values, {
                onSuccess: () => {
                openNotification("success", "Producto creado", "El producto fue creado correctamente");
                setIsModalOpen(false);
                }
            });
        }
    };

    // Funcion para actualizar el estado de editingItem para accionar el formulario
    const handleUpdate = (item: Item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    // Funcion para eliminar un producto
    const handleDelete = (id: number) => {
        deleteMutation.mutate(id, {
            onSuccess: () => {
            openNotification("success", "Producto eliminado", "El producto fue eliminado correctamente");
            }
        });
    };

    // Funcion para mostrar los detalles de un producto
    const handleShowDetails = (item: Item) => {
        setSelectedItem(item);
        setIsProductModalOpen(true);
    };

    return (
        <>
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
                Productos Disponibles
            </Title>
            <Button 
                icon={<PlusOutlined/>} 
                color="orange" 
                variant="solid" 
                style={{marginBottom:'1rem'}}
                onClick={showModal} 
            >
                Crear Producto 
            </Button>
            {/* Checamos el estado de 'isLoading' que proporciona react query, con este podemos saber si los 
            datos de nuestra API todavía no llegan y estan cargando */}
           {isLoading ? (
                    // si los datos estan cargando, mostramos un spinner
                    <Spin />
                ) : (
                    // una vez los datos hayan sido cargados, los mostramos dentro de nuestra pantalla
                    <Row gutter={[16, 16]}>
                        {products?.data?.map((item) => (
                            // pasamos la información del item y tambien la función de handle delete como prop
                           <Card
                                item={item}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                                handleShowDetails={handleShowDetails}
                           />
                        ))}
                    </Row>
                )
            }
            <Modal
                title={editingItem ? "Editar Producto" : "Crear Producto"} // Transformamos el titulo del modal con el estado
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                {/* Pasamos las categorías  al formulario como props*/}
                <ItemForm onFinish={onFinish} categories={categories?.data ?? []} editingItem={editingItem}/> 
            </Modal>
            {/* El componente para mostrar el modal con la información del producto */}
             <ProductModal
                open={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                item={selectedItem}
            />
        </>
    )
}

export default Products;