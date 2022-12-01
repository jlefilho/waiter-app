import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';
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
    const [isLoading, setIsLoading] = useState(false);

    function handleOpenOrderModal(order: OrderProps) {
        setIsOrderModalOpen(true);
        setSelectedOrder(order);
    }

    function handleCloseOrderModal() {
        setIsOrderModalOpen(false);
        setSelectedOrder(null);
    }

    async function handleCancelOrder() {
        setIsLoading(true);

        await api.delete(`orders/${selectedOrder?._id}`);

        toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);
        setIsLoading(false);
        setIsOrderModalOpen(false);
    }

    return (
        <OrdersBoard>
            <OrderModal
                visible={isOrderModalOpen}
                order={selectedOrder}
                onClose={handleCloseOrderModal}
                onCancelOrder={handleCancelOrder}
                isLoading={isLoading}
            />

            <header>
                <span>{icon}</span>
                <strong>{title}</strong>
                <span>({orders.length})</span>
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
