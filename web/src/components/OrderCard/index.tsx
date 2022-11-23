import { useState } from 'react';
import { OrderProps } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { OrdersBoard, OrderDetailsContainer } from './styles';

interface OrderCardProps {
    icon: string;
    title: string;
    orders: OrderProps[]
}

export function OrderCard({ icon, title, orders }: OrderCardProps) {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<null | OrderProps>(null);

    function handleOpenOrderModal(order: OrderProps) {
        setIsOrderModalOpen(true);
        setSelectedOrder(order);
    }

    function handleCloseOrderModal() {
        setIsOrderModalOpen(false);
        setSelectedOrder(null);
    }

    return (
        <OrdersBoard>
            <OrderModal
                visible={isOrderModalOpen}
                order={selectedOrder}
                onClose={handleCloseOrderModal}
            />

            <header>
                <span>{icon}</span>
                <strong>{title}</strong>
                <span>(1)</span>
            </header>

            <OrderDetailsContainer>
                {orders.map((order) => (
                    <button
                        type="button"
                        key={order._id}
                        onClick={() => handleOpenOrderModal(order)}
                    >
                        <strong>Mesa {order.table}</strong>
                        <span>{order.products.length} itens</span>
                    </button>
                ))}
            </OrderDetailsContainer>

        </OrdersBoard>
    );
}
