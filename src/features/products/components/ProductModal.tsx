import React from 'react';
import { Modal, Typography, Space, Image, Descriptions, Tag } from 'antd';
import type { Item } from '../../../types/Products';

const { Title, Text, Paragraph } = Typography;

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    item: Item | null;
}

const ProductModal = ({ open, onClose, item }: ProductModalProps) => {
    // Si no existe información regresar antes de renderizar
    if (!item) {
        return null;
    }

    return (
        <Modal
            title={<Title level={4}>{item.itemName}</Title>}
            open={open}
            onCancel={onClose}
            footer={null}
            width={700}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                        src={item.itemImage}
                        alt={item.itemName}
                        style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />
                </div>
                <Paragraph>{item.itemDescription}</Paragraph>
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Precio">${item.itemPrice}</Descriptions.Item>
                    <Descriptions.Item label="SKU">{item.itemSku}</Descriptions.Item>
                    <Descriptions.Item label="Stock">{item.itemStock}</Descriptions.Item>
                    <Descriptions.Item label="Categoría">
                        <Tag color="blue">{item.category.name}</Tag>
                    </Descriptions.Item>
                </Descriptions>
                <Text type="secondary">
                    Producto creado por: {item.user?.name}
                </Text>
            </Space>
        </Modal>
    );
};

export default ProductModal;