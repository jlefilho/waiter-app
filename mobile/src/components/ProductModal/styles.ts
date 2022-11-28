import styled from 'styled-components/native';

export const ProductImage = styled.ImageBackground`
    width: 100%;
    height: 200px;
`;

export const ModalCloseButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 24px;
    right: 24px;
`;

export const ProductModalBody = styled.View`
    flex: 1;
    background-color: #fafafa;
    padding: 32px 24px 0;
`;

export const ProductHeader = styled.View`

`;

export const IngredientsContainer = styled.View`
    margin-top: 32px;
    flex: 1;
`;

export const Ingredient = styled.View`
    border: 1px solid rgba(204, 204, 204, 0.3);
    border-radius: 8px;
    padding: 16px;

    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
`;

export const ProductFooter = styled.View`
    min-height: 110px;
    padding: 16px 24px;
    background-color: #fff;
`;

export const ProductFooterContainer = styled.SafeAreaView`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const PriceContainer = styled.View`

`;
