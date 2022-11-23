import { OrderProps } from '../../types/Order';
import { OrdersBoard, OrderDetailsContainer } from './styles';

interface OrderCardProps {
    icon: string;
    title: string;
    orders: OrderProps[]
}

export function OrderCard({ icon, title, orders }: OrderCardProps) {
    return (
        <OrdersBoard>
            <header>
                <span>{icon}</span>
                <strong>{title}</strong>
                <span>(1)</span>
            </header>

            <OrderDetailsContainer>
                {orders.map((order) => (
                    <button type="button" key={order._id}>
                        <strong>Mesa {order.table}</strong>
                        <span>{order.products.length} itens</span>
                    </button>
                ))}
            </OrderDetailsContainer>

        </OrdersBoard>
    );
}
