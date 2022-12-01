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

    async function handleChangeOrderStatus() {
        setIsLoading(true);

        const newOrderStatus = selectedOrder?.status === 'WAITING'
            ? 'IN_PRODUCTION'
            : 'DONE';

        const toastMessage = selectedOrder?.status === 'WAITING'
            ? `O pedido da mesa ${selectedOrder?.table} foi mandado para preparação!`
            : `O pedido da mesa ${selectedOrder?.table} foi finalizado!`;

        await api.patch(`orders/${selectedOrder?._id}`, { status: newOrderStatus });
        toast.success(toastMessage);
        setIsLoading(false);
        setIsOrderModalOpen(false);
    }

    async function handleCancelOrder() {
        setIsLoading(true);

        const toastMessage = selectedOrder?.status === 'DONE'
            ? `O pedido da mesa ${selectedOrder?.table} foi removido!`
            : `O pedido da mesa ${selectedOrder?.table} foi cancelado!`;

        await api.delete(`orders/${selectedOrder?._id}`);

        toast.success(toastMessage);
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
                onChangeOrderStatus={handleChangeOrderStatus}
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
