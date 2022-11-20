import styled from 'styled-components';

export const OrdersBoard = styled.div`
    padding: 1rem;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: 16px;

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

    header {
        padding: 0.5rem;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const OrderDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1.5rem;

    button {
        background: #fff;
        border: 1px solid rgba(204, 204, 204, 0.4);
        height: 8rem;
        border-radius: 8px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;

        & + button {
            margin-top: 1.5rem;
        }

        strong {
            font-weight: 500;
        }

        span {
            color: #666;
            font-size: 0.875rem;
        }
    }
`;
