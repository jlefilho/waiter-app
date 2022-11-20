import { OrderCard } from '../OrderCard';
import { OrdersContainer } from './styles';

export function OrdersBoard() {
    return (
        <OrdersContainer>
            <OrderCard />
            <OrderCard />
            <OrderCard />

        </OrdersContainer>
    );
}
