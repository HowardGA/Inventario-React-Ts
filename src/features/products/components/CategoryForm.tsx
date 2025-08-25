import { Form, Input, Button } from "antd";
import type { Category } from "../../../types/Products"; 

interface ItemFormProps {
    onFinish: (values: Category) => void;
}

const CategoryForm = ({ onFinish }: ItemFormProps) => {
    const [ form ] = Form.useForm<Category>(); 

    const handleFinish = (values: Category) => {
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
            name="name"
            rules={[{ required: true, message: "Ingresa el nombre de la categoría" }]}
          >
            <Input />
          </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block >
                    Registrar Categoría
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CategoryForm;
