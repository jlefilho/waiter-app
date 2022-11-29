import { useState } from 'react';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/product';

import {
    CategoriesContainer,
    FooterContainer,
    Footer,
    MainContainer,
    MenuContainer,
    CenteredContainer
} from './styles';
import { ActivityIndicator } from 'react-native';

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleResetOrder() {
        setSelectedTable('');
        setCartItems([]);
    }

    function handleAddToCart(product: Product) {
        if (!selectedTable) {
            setIsTableModalVisible(true);
        }

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

            if (itemIndex < 0) {
                return [...prevState, {
                    quantity: 1,
                    product
                }];
            }

            const cartItems = [...prevState];
            const alreadyExistingItem = cartItems[itemIndex];

            cartItems[itemIndex] = {
                ...alreadyExistingItem,
                quantity: alreadyExistingItem.quantity + 1
            };

            return cartItems;
        });
    }

    function handleDecrementCartItem(product: Product) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

            const alreadyExistingItem = prevState[itemIndex];
            const cartItems = [...prevState];

            if (alreadyExistingItem.quantity === 1) {
                cartItems.splice(itemIndex, 1);

                return cartItems;
            }

            cartItems[itemIndex] = {
                ...alreadyExistingItem,
                quantity: alreadyExistingItem.quantity - 1
            };

            return cartItems;
        });
    }

    return (
        <>
            <MainContainer>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleResetOrder}
                />

                {!isLoading ? (
                    <>
                        <CategoriesContainer>
                            <Categories />
                        </CategoriesContainer>

                        <MenuContainer>
                            <Menu onAddToCart={handleAddToCart} />
                        </MenuContainer>
                    </>
                ) : (
                    <CenteredContainer>
                        <ActivityIndicator size='large' color='#D73035'/>
                    </CenteredContainer>
                )}

            </MainContainer>
            <Footer>
                <FooterContainer>
                    {!selectedTable && (
                        <Button
                            onPress={() => setIsTableModalVisible(true)}
                            disabled={isLoading}
                        >
                            Novo pedido
                        </Button>
                    )}

                    {selectedTable && (
                        <Cart
                            cartItems={cartItems}
                            onAddtoCart={handleAddToCart}
                            onDecrement={handleDecrementCartItem}
                            onConfirmedOrder={handleResetOrder}
                        />
                    )}

                </FooterContainer>
            </Footer>

            <TableModal
                visible={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSaveTable}
            />
        </>
    );
}
