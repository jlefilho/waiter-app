import { OrdersBoard, OrderDetailsContainer } from './styles';

export function OrderCard() {
    return (
        <OrdersBoard>
            <header>
                <span>⏰</span>
                <strong>Fila de Espera</strong>
                <span>(1)</span>
            </header>

            <OrderDetailsContainer>
                <button type="button">
                    <strong>Mesa 2</strong>
                    <span>2 itens</span>
                </button>
                <button type="button">
                    <strong>Mesa 1</strong>
                    <span>5 itens</span>
                </button>
            </OrderDetailsContainer>
        </OrdersBoard>
    );
}
