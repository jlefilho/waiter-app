import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { ModalContainer, OkButton } from './styles';

interface OrderConfirmedModalProps {
    visible: boolean;
    onClose: () => void
}

export function OrderConfirmedModal({ visible, onClose }:OrderConfirmedModalProps) {
    return (
        <Modal
            visible={visible}
            animationType='fade'
        >
            <ModalContainer>
                <CheckCircle />

                <Text
                    size={20}
                    weight='600'
                    color='#fff'
                    style={{ marginTop: 12 }}
                >
                    Pedido confirmado
                </Text>
                <Text
                    color='#fff'
                    opacity={0.9}
                    style={{ marginTop: 4 }}
                >
                    O pedido já entrou na fila de produção!
                </Text>

                <OkButton onPress={onClose}>
                    <Text color='#D73035' weight='600'>OK</Text>
                </OkButton>

            </ModalContainer>
        </Modal>
    );
}
