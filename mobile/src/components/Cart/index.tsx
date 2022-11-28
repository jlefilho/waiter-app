import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
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
}

export function Cart({ cartItems }: CartProps) {
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
                                <TouchableOpacity style={{ marginRight: 24 }}>
                                    <PlusCircle />
                                </TouchableOpacity>

                                <TouchableOpacity>
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
                            <Text size={20} weight='600'>{formatCurrency(120)}</Text>
                        </>
                    ) : (
                        <Text color='#999'>Seu carrinho está vazio</Text>
                    )
                    }
                </TotalContainer>

                <Button
                    onPress={() => alert('Confirmar pedido')}
                    disabled={cartItems.length === 0}
                >
                    Confirmar pedido
                </Button>

            </CartSummary>
        </>
    );
}
