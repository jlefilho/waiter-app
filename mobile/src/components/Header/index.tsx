import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { HeaderContainer, OrderHeaderContent, OrderHeaderContainer, OrderSelectedTable } from './styles';

interface HeaderProps {
    selectedTable: string
    onCancelOrder: () => void
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
    return (
        <HeaderContainer>
            {!selectedTable && (
                <>
                    <Text size={14} opacity={0.9}>Bem-vindo(a) ao</Text>
                    <Text size={24} weight='700'>
                        WAITER
                        <Text size={24}>APP</Text>
                    </Text>
                </>
            )}

            {selectedTable && (
                <OrderHeaderContent>
                    <OrderHeaderContainer>
                        <Text size={24} weight='600'>Pedido</Text>

                        <TouchableOpacity onPress={onCancelOrder}>
                            <Text color='#D73035' weight='600' size={14}>Cancelar pedido</Text>
                        </TouchableOpacity>
                    </OrderHeaderContainer>

                    <OrderSelectedTable>
                        <Text color='#666'>Mesa {selectedTable}</Text>
                    </OrderSelectedTable>

                </OrderHeaderContent>
            )}
        </HeaderContainer>
    );
}
