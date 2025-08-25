import React from "react";
import { Card, Row, Col, Typography, Spin } from "antd";
import { Pie } from "@ant-design/plots";// Importamos un grafico de Pie
import { useDashboard } from "../features/dashboard/hooks/dashboardHooks";

const { Title } = Typography;

const Dashboard = () => {
    // Utilizamos nuestro hook para obtener la información
    const { data: dashboardData, isLoading } = useDashboard();

    // Manipulamos los datos para el grafico
    const pieData = dashboardData
        ? [
            { type: "Stock Bajo (<5)", value: dashboardData?.data?.lowStock },
            { type: "Stock Normal", value: (dashboardData?.data?.totalProducts ?? 0) - (dashboardData?.data?.lowStock ?? 0) },
        ]
        : [];

    // Configuramos el grafico
    const pieConfig = {
        appendPadding: 10,
        data: pieData,
        angleField: "value",
        colorField: "type",
        radius: 0.9,
        label: {
            type: "inner",
            offset: "-30%",
            content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`,
            style: { fontSize: 14, textAlign: "center" },
        },
        interactions: [{ type: "element-active" }],
    };

    return (
        <div style={{ padding: "30px" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
                Panel de Control
            </Title>

            {isLoading ? (
                <Spin size="large" style={{ display: "block", margin: "auto" }} />
            ) : (
                <>
                    <Row gutter={[20, 20]} justify="center">
                        <Col xs={24} sm={12} md={6}>
                            <Card
                                title="Total Productos"
                                bordered={false}
                                style={{ textAlign: "center", fontSize: "20px" }}
                            >
                                <strong style={{ fontSize: "28px" }}>
                                    {dashboardData?.data?.totalProducts}
                                </strong>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card
                                title="Categorías"
                                bordered={false}
                                style={{ textAlign: "center" }}
                            >
                                <strong style={{ fontSize: "28px" }}>
                                    {dashboardData?.data?.totalCategories}
                                </strong>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card
                                title="Usuarios"
                                bordered={false}
                                style={{ textAlign: "center" }}
                            >
                                <strong style={{ fontSize: "28px" }}>
                                    {dashboardData?.data?.totalUsers}
                                </strong>
                            </Card>
                        </Col>
                    </Row>

                    <Card
                        title="Estado de Stock"
                        bordered={false}
                        style={{ marginTop: "40px" }}
                    >
                        <Pie {...pieConfig} />
                    </Card>
                </>
            )}
        </div>
    )
}

export default Dashboard;