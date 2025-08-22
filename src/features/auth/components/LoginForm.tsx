import { Form, Input, Button } from "antd";
import type { Credentials } from "../types/authTypes";

interface LoginFormProps {
    onSubmit: (values: Credentials) => void;
    isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
    return (
        <Form layout="vertical" onFinish={onSubmit} autoComplete="off">
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
                    Iniciar Sesión
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;