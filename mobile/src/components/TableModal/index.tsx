import { useState } from 'react';
import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { ModalBody, ModalForm, ModalHeader, ModalInput, ModalOverlay } from './styles';

interface TableModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (table: string) => void
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
    const [table, setTable] = useState('');

    function handleSaveTable(){
        setTable('');
        onSave(table);
        onClose();
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={onClose}
        >
            <ModalOverlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
                <ModalBody>
                    <ModalHeader>
                        <Text weight='600'>Informe a mesa</Text>

                        <TouchableOpacity onPress={onClose}>
                            <Close color='#666'/>
                        </TouchableOpacity>
                    </ModalHeader>

                    <ModalForm>
                        <ModalInput
                            placeholder='Número da mesa'
                            placeholderTextColor='#666'
                            keyboardType='number-pad'
                            onChangeText={setTable}
                            value={table}
                        />

                        <Button onPress={handleSaveTable} disabled={table.length < 1}>
                            Salvar
                        </Button>
                    </ModalForm>
                </ModalBody>
            </ModalOverlay>
        </Modal>
    );
}
