import type { Item } from '../types/Products';
import { List, Button, Typography } from "antd"; 
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons"; 

interface CartProps {
  items: Item[];
  increment: (sku: string) => void;
  decrement: (sku: string) => void;
  remove: (sku: string, quantity: number) => void;
  total: number;
}
const { Text, Title } = Typography; // Typography de AntD para texto y títulos

const Cart = ({ items, increment, decrement, remove, total }: CartProps) => (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
    {items.length === 0 && <Text type="secondary">El carrito está vacío</Text>}
    
    {/* Lista de productos con AntD List */}
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button icon={<PlusOutlined />} onClick={() => increment(item.itemSku)} />,
            <Button icon={<MinusOutlined />} onClick={() => decrement(item.itemSku)} />,
            <Button danger icon={<DeleteOutlined />} onClick={() => remove(item.itemSku, item.quantity || 1)} />
          ]}
        >
          <List.Item.Meta
            avatar={<img src={item.itemImage} alt={item.itemName} style={{ width: 50, height: 50, objectFit: "contain" }} />}
            title={item.itemName}
            description={`Precio: $${item.itemPrice} | Cantidad: ${item.quantity}`}
          />
        </List.Item>
      )}
    />

    {/* Total del carrito */}
    <Title level={4} style={{ marginTop: "20px", textAlign: "right" }}>
      Total: ${total.toFixed(2)}
    </Title>
  </div>
);

export default Cart;
