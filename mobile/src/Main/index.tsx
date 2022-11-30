import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/product';
import { Category } from '../types/category';

import {
    CategoriesContainer,
    FooterContainer,
    Footer,
    MainContainer,
    MenuContainer,
    CenteredContainer
} from './styles';

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isProductLoading, setIsProductLoading] = useState(false);

    useEffect(() => {
        Promise.all([
            api.get('/categories'),
            api.get('/products')
        ]).then(([categoriesResponse, productsResponse]) => {
            setCategories(categoriesResponse.data);
            setProducts(productsResponse.data);
            setIsLoading(false);
        });

    }, []);

    async function handleSelectCategory(categoryId: string) {
        const route = !categoryId
            ? '/products'
            : `/categories/${categoryId}/products`;

        setIsProductLoading(true);

        const { data } = await api.get(route);

        setProducts(data);
        setIsProductLoading(false);
    }

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
                            <Categories
                                categories={categories}
                                onSelectCategory={handleSelectCategory}
                            />
                        </CategoriesContainer>

                        {isProductLoading ? (
                            <CenteredContainer>
                                <ActivityIndicator size='large' color='#D73035'/>
                            </CenteredContainer>
                        ) : (
                            <>
                                {products.length > 0 ? (
                                    <MenuContainer>
                                        <Menu
                                            onAddToCart={handleAddToCart}
                                            products={products}
                                        />
                                    </MenuContainer>
                                ) : (
                                    <CenteredContainer>
                                        <Empty />

                                        <Text
                                            color='#666'
                                            style={{ marginTop: 24 }}
                                        >
                                            Nenhum produto foi encontrado!
                                        </Text>
                                    </CenteredContainer>
                                )}
                            </>
                        )}

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
