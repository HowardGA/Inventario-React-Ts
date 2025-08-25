import { Form, Input, InputNumber, Button, Select } from "antd";
import type { Category, Item } from "../../../types/Products"; 
import { useEffect } from "react";

interface ItemFormProps {
    onFinish: (values: Item) => void;
    categories: Category[];// Pasamos las categorias existentes para usarlas en el formulario
    editingItem: Item | null// Pasamos opcionalmente la información de un item si es que estamos modificando
}

const ItemForm = ({ onFinish, categories, editingItem }: ItemFormProps) => {
    const [ form ] = Form.useForm<Item>(); 

    // utilizamos el hook de useEffect para que cuando cargue el componente se pueda verificar si es que se esta editando
    // y si es asi, llenamos el formulario con la informacion del item que estamos pasando
    useEffect(() => {
        if (editingItem) {
            form.setFieldsValue({
                itemName: editingItem.itemName,
                itemDescription: editingItem.itemDescription,
                itemPrice: editingItem.itemPrice,
                itemSku: editingItem.itemSku,
                itemStock: editingItem.itemStock,
                categoryId: editingItem.categoryId,
                itemImage: editingItem.itemImage,
            });
        }
    }, [editingItem, form]);

    const handleFinish = (values: Item) => {
        onFinish(values);
        form.resetFields();
    };
    return (
        <Form
            form={form} 
            layout="vertical" 
            onFinish={handleFinish} 
            autoComplete="off"
            clearOnDestroy 
        >
            <Form.Item 
                label="Nombre"
                name="itemName"
                rules={[{ required: true, message: "El nombre del producto es requerido" }]} 
            >
                {/* Input de AntD */}
                <Input placeholder="Ingrese nombre de producto" />
            </Form.Item>

            <Form.Item
                label="Descripción"
                name="itemDescription"
                rules={[{ required: true, message: "La descripción es requerida" }]}
            >
                <Input.TextArea placeholder="Ingrese una descripción" rows={3} />
            </Form.Item>

            <Form.Item
                label="Precio"
                name="itemPrice"
                rules={[{ required: true, message: "El precio es requerido" }]}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    prefix="$"
                    placeholder="Ingrese el precio"
                />
            </Form.Item>

            <Form.Item
                label="SKU"
                name="itemSku"
                rules={[{ required: true, message: "El SKU es requerido" }]}
            >
                <Input placeholder="Ingrese el SKU" />
            </Form.Item>

            <Form.Item
                label="Stock"
                name="itemStock"
                rules={[{ required: true, message: "La cantidad de stock es requerido" }]}
            >
                <InputNumber style={{ width: "100%" }} min={0} placeholder="Ingrese el stock" />
            </Form.Item>

            <Form.Item
                label="Categoría"
                name="categoryId"
                rules={[{ required: true, message: "La categoría es requerida" }]}
            >
                <Select
                    options={categories}
                    placeholder='Selecciona una categoría'
                   // Le decimos a antD a utilizar el nombre de la categorīa para mostralo
                    fieldNames={{ label: 'name', value: 'id' }} 
                />
            </Form.Item>

            <Form.Item label="Imagen (URL por el momento)" name="itemImage">
                <Input placeholder="Ingrese la URL de la imagen" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block >
                    Registrar Producto
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ItemForm;
