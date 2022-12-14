import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/product';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import {
    CartItemContainer,
    ProductActions,
    ProductContainer,
    ProductImage,
    QuantityContainer,
    ProductDetailsContainer,
    CartSummary,
    TotalContainer
} from './styles';

interface CartProps {
    cartItems: CartItem[]
    selectedTable: string
    onAddtoCart: (product: Product) => void;
    onDecrement: (product: Product) => void;
    onConfirmedOrder: () => void
}

export function Cart({ cartItems, onAddtoCart, onDecrement, onConfirmedOrder, selectedTable }: CartProps) {
    const [isOrderConfirmedModalVisible, setIsOrderConfirmedModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const orderTotalPrice = cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price;
    }, 0);

    async function handleConfirmOrder() {
        setIsLoading(true);

        await api.post('/orders', {
            table: selectedTable,
            products: cartItems.map(cartItem => ({
                product: cartItem.product._id,
                quantity: cartItem.quantity
            }))
        });

        setIsLoading(false);
        setIsOrderConfirmedModalVisible(true);
    }

    function handleCloseOrderConfirmedModal() {
        setIsOrderConfirmedModalVisible(false);
        onConfirmedOrder();
    }

    return (
        <>
            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    keyExtractor={cartItem => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, maxHeight: 150 }}
                    renderItem={({ item: cartItem }) => (
                        <CartItemContainer>
                            <ProductContainer>
                                <ProductImage
                                    source={{
                                        uri: `http://192.168.0.10:3001/uploads/${cartItem.product.imagePath}`
                                    }}
                                />

                                <QuantityContainer>
                                    <Text
                                        size={14}
                                        color='#666'
                                    >
                                        {cartItem.quantity}x
                                    </Text>
                                </QuantityContainer>

                                <ProductDetailsContainer>
                                    <Text
                                        size={14}
                                        weight='600'
                                    >
                                        {cartItem.product.name}
                                    </Text>
                                    <Text
                                        size={14}
                                        color='#666'
                                        style={{ marginTop: 4 }}
                                    >
                                        {formatCurrency(cartItem.product.price)}
                                    </Text>
                                </ProductDetailsContainer>
                            </ProductContainer>

                            <ProductActions>
                                <TouchableOpacity
                                    style={{ marginRight: 24 }}
                                    onPress={() => onAddtoCart(cartItem.product)}
                                >
                                    <PlusCircle />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => onDecrement(cartItem.product)}
                                >
                                    <MinusCircle />
                                </TouchableOpacity>
                            </ProductActions>
                        </CartItemContainer>
                    )}
                />
            )}

            <CartSummary>
                <TotalContainer>
                    {cartItems.length > 0 ? (
                        <>
                            <Text color='#666'>Total</Text>
                            <Text size={20} weight='600'>{formatCurrency(orderTotalPrice)}</Text>
                        </>
                    ) : (
                        <Text color='#999'>Seu carrinho est?? vazio</Text>
                    )
                    }
                </TotalContainer>

                <Button
                    onPress={handleConfirmOrder}
                    disabled={cartItems.length === 0}
                    isLoading={isLoading}
                >
                    Confirmar pedido
                </Button>

            </CartSummary>

            <OrderConfirmedModal
                visible={isOrderConfirmedModalVisible}
                onClose={handleCloseOrderConfirmedModal}
            />
        </>
    );
}
