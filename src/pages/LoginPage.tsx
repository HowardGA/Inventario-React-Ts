import { Card, Typography } from "antd";
import { useLogin } from "../features/auth/hooks/useAuth";
import LoginForm from "../features/auth/components/LoginForm";
import { useNotification } from "../context/NotificationContext";
import type { Credentials } from "../features/auth/types/authTypes";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage = () => {
    const { mutate, isPending } = useLogin();
    const { openNotification } = useNotification();

    const handleSubmit = (values: Credentials) => {
        mutate(values, {
            onSuccess: () => {
                openNotification("success", "Login exitoso!", "Bienvenido de regreso!");
            },
            onError: (err: any) => {
                openNotification("error", "Login falló", err.response?.data?.message || "Ocurrió un error en el servidor.");
            }
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
            <Card style={{ width: 400, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                <Title level={2} style={{ textAlign: "center" }}>Iniciar Sesión</Title>
                <LoginForm onSubmit={handleSubmit} isLoading={isPending} />
                 <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <Text>
                        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
