import { useEffect, useState } from 'react';
import { OrderProps } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderCard } from '../OrderCard';
import { OrdersContainer } from './styles';

export function OrdersBoard() {
    const [orders, setOrders] = useState<OrderProps[]>([]);

    useEffect(() => {
        api.get('/orders')
            .then(({ data }) => {
                setOrders(data);
            });
    }, []);

    const waitingOrders = orders.filter((order) => order.status === 'WAITING');
    const inProductionOrders = orders.filter((order) => order.status === 'IN_PRODUCTION');
    const doneOrders = orders.filter((order) => order.status === 'DONE');

    return (
        <OrdersContainer>
            <OrderCard
                icon="⏰"
                title="Fila de espera"
                orders={waitingOrders}
            />
            <OrderCard
                icon="👩‍🍳"
                title="Em preparação"
                orders={inProductionOrders}
            />
            <OrderCard
                icon="✅"
                title="Pronto!"
                orders={doneOrders}
            />

        </OrdersContainer>
    );
}
