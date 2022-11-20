import styled from 'styled-components';

export const HeaderContainer = styled.header`
    background: #D73035;
    display: flex;
    justify-content: center;
    height: 12.375rem;
    align-items: center;
`;

export const HeaderContent = styled.div`
    width: 100%;
    max-width: 1216px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .page-details {
        h1 {
            color: #fff;
            font-size: 2rem;
        }

        h2{
            color: #fff;
            font-weight: 400;
            font-size: 1rem;
            opacity: 0.9;
            margin-top: 0.375rem;
        }
    }
`;
