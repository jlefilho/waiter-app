import { OrderCard } from '../OrderCard';
import { OrdersContainer } from './styles';

import { OrderProps } from '../../types/Order';


const orders: OrderProps[] = [
    {
        '_id': 'id123',
        'table': '123',
        'status': 'DONE',
        'products': [
            {
                'product': {
                    'name': 'Pizza quatro queijos',
                    'imagePath': '1668629173307-quatro-queijos.png',
                    'price': 40
                },
                'quantity': 3,
                '_id': 'idpizza'
            },
            {
                'product': {
                    'name': 'Coca-cola',
                    'imagePath': '1668630397430-coca-cola.png',
                    'price': 7
                },
                'quantity': 1,
                '_id': 'idcoca'
            },
        ]
    }
];

export function OrdersBoard() {
    return (
        <OrdersContainer>
            <OrderCard
                icon="⏰"
                title="Fila de espera"
                orders={orders}
            />
            <OrderCard
                icon="👩‍🍳"
                title="Em preparação"
                orders={[]}
            />
            <OrderCard
                icon="✅"
                title="Pronto!"
                orders={[]}
            />

        </OrdersContainer>
    );
}
