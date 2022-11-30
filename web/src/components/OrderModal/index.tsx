import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import { OrderProps } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { ModalBody, ModalOverlay, OrderActions, OrderDetailsContainer } from './styles';

interface OrderModalProps {
    visible: boolean;
    order: OrderProps | null;
    onClose: () => void;
    onCancelOrder: () => Promise<void>;
    isLoading: boolean
}

export function OrderModal({ visible, order, onClose, onCancelOrder, isLoading }:OrderModalProps) {
    useEffect(() => {
        function handleKeydown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [onClose]);

    if (!visible || !order) {
        return null;
    }

    const totalOrderPrice = order.products.reduce((total, { product, quantity }) => {
        return total + (product.price * quantity);
    },  0);

    return (
        <ModalOverlay>
            <ModalBody>
                <header>
                    <strong>Mesa {order.table}</strong>
                    <button type='button' onClick={onClose}>
                        <img src={closeIcon} alt="Fechar" />
                    </button>
                </header>

                <div className='status-container'>
                    <small>Status do Pedido</small>
                    <div>
                        <span>
                            {order.status === 'WAITING' && '⏰'}
                            {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
                            {order.status === 'DONE' && '✅'}
                        </span>

                        <strong>
                            {order.status === 'WAITING' && 'Fila de Espera'}
                            {order.status === 'IN_PRODUCTION' && 'Em produção'}
                            {order.status === 'DONE' && 'Pronto'}
                        </strong>

                    </div>
                </div>

                <OrderDetailsContainer>
                    <strong>Itens</strong>

                    <div className="items-container">
                        {order.products.map(({ _id, product, quantity }) => (
                            <div className="item-box" key={_id}>
                                <img
                                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                                    alt={product.name}
                                />

                                <span className='item-quantity'>{quantity}x</span>

                                <div className='item-details'>
                                    <strong>{product.name}</strong>
                                    <span>{formatCurrency(product.price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="total-order-price">
                        <span>Total</span>

                        <strong>{formatCurrency(totalOrderPrice)}</strong>
                    </div>

                </OrderDetailsContainer>

                <OrderActions>
                    <button
                        type='button'
                        className='next-stage'
                        disabled={isLoading}
                    >
                        <span>👩‍🍳</span>
                        <span>Iniciar produção</span>
                    </button>

                    <button
                        type='button'
                        className='cancel-order'
                        onClick={onCancelOrder}
                        disabled={isLoading}
                    >
                        <span>Cancelar pedido</span>
                    </button>
                </OrderActions>
            </ModalBody>
        </ModalOverlay>
    );
}
