import { Form, Input, Button } from "antd";
import type { User } from "../../user/types/userTypes";

interface RegisterFormProps {
    onSubmit: (values: User) => void;
    isLoading: boolean;
}

const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
    return (
        <Form layout="vertical" onFinish={onSubmit} autoComplete="off">
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "El nombre es requerido" }]}
            >
                <Input placeholder="Ingresa tu nombre" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "El email es requerido" }]}
            >
                <Input placeholder="Ingrese su email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "La contraseña es requerida" }]}
            >
                <Input.Password placeholder="Ingrese su contraseña" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block loading={isLoading}>
                    Registrar
                </Button>
            </Form.Item>
        </Form>
    );
};
export default RegisterForm;