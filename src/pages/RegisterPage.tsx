import { Card, Typography } from "antd";
import { useRegister } from "../features/auth/hooks/useAuth";
import RegisterForm from "../features/auth/components/RegisterForm";
import { useNotification } from "../context/NotificationContext";
import type { User } from "../features/user/types/userTypes";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const RegisterPage = () => {
    const { mutate, isPending } = useRegister();
    const { openNotification } = useNotification();

    const handleSubmit = (values: User) => {
        mutate(values, {
            onSuccess: () => {
                openNotification("success", "Registro exitoso!", "Bienvenido, loggeado automáticamente.");
            },
            onError: (err: any) => {
                openNotification("error", "Registro falló", err.response?.data?.message || "Ocurrió un error en el servidor.");
            }
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
            <Card style={{ width: 400, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                <Title level={2} style={{ textAlign: "center" }}>Crear Cuenta</Title>
                <RegisterForm onSubmit={handleSubmit} isLoading={isPending} />
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <Text>
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
