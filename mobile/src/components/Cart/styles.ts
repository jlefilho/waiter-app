import styled from 'styled-components/native';

export const CartItemContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
`;

export const ProductContainer = styled.View`
    flex-direction: row;
`;

export const ProductActions = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ProductImage = styled.Image`
    height: 40px;
    width: 48px;
    border-radius: 6px;
`;

export const QuantityContainer = styled.View`
    min-width: 20px;
    margin-left: 12px;
`;

export const ProductDetailsContainer = styled.View`

`;

export const CartSummary = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TotalContainer = styled.View`

`;
