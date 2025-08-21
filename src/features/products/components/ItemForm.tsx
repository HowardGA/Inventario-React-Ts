import { Form, Input, InputNumber, Button } from "antd";
import type { Item } from "../../../types/Products"; // Importamos el tipo Item para TypeScript

interface ItemFormProps {
    onFinish: (values: Item) => void; // Prop para manejar el submit del formulario desde el componente padre
}

const ItemForm = ({ onFinish }: ItemFormProps) => {
    const [ form ] = Form.useForm<Item>(); // Usamos Form de AntD como instancia para manejar el formulario y 
    // usamos el tipo Item para TypeScript


    const handleFinish = (values: Item) => {
        // Llamamos a la funcion onFinish pasada como prop con los valores del formulario
        onFinish(values);
        // Limpiamos el formulario despues de enviar
        form.resetFields();
    };
    return (
        <Form
            form={form} // Asignamos la instancia del fomulario para manejarlo
            layout="vertical" // vertical para que los labels esten ecima de los inputs
            onFinish={handleFinish} // Llamamos a handlerFinish al enviar el formulario
            autoComplete="off" // Desactivamos el autocompletado del navegador
            clearOnDestroy // Limpiamos los campos al destruir el formulario
        >
            <Form.Item // Item de AntD para manejar los campos del formulario
                label="Nombre"
                name="itemName"
                rules={[{ required: true, message: "El nombre del producto es requerido" }]} // Validamos que el campo sea requerido
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
