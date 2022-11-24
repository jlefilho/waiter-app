import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
    background: ${({ disabled }) => disabled ? '#999' : '#D73035'};
    border-radius: 48px;
    padding: 14px 24px;
    align-items: center;
    justify-content: center;
`;
