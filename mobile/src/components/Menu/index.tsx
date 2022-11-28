import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { ProductContainer, ProductImage, ProductDetails, ProductSeparator, AddToCartButton } from './styles';

export function Menu() {
    return (
        <FlatList
            data={products}
            style={{ marginTop: 32 }}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            keyExtractor={product => product._id}
            ItemSeparatorComponent={ProductSeparator}
            renderItem={({ item: product }) => (
                <ProductContainer>
                    <ProductImage
                        source={{
                            uri: `http://192.168.0.10:3001/uploads/${product.imagePath}`,
                        }}
                    />

                    <ProductDetails>
                        <Text weight='600'>{product.name}</Text>
                        <Text
                            size={14}
                            color='#666'
                            style={{ marginVertical: 8 }}
                        >
                            {product.description}
                        </Text>
                        <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
                    </ProductDetails>

                    <AddToCartButton>
                        <PlusCircle />
                    </AddToCartButton>
                </ProductContainer>
            )}
        >

        </FlatList>
    );
}