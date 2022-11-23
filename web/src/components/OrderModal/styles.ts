import styled from 'styled-components';

export const ModalOverlay = styled.div`
    left: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4.5px);
    width: 100%;
    height: 100%;
    position: fixed;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalBody = styled.div`
    background-color: #fff;
    width: 30rem;
    padding: 2rem;
    border-radius: 8px;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        strong {
            font-size: 1.5rem;
        }

        button {
            line-height: 0;
            border: 0;
            background: transparent;
        }
    }

    .status-container {
        margin-top: 2rem;

        small {
            font-size: 0.875rem;
            opacity: 0.8;
        }

        div {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            margin-top: 0.5rem;
        }
    }
`;

export const OrderDetailsContainer = styled.div`
    margin-top: 2rem;

    > strong {
        font-weight: 500;
        font-size: 0.875rem;
        opacity: 0.8;
    }

    .items-container {
        margin-top: 1rem;
    }

    .item-box {
        display: flex;
        align-items: center;

        & + .item-box {
            margin-top: 1rem;
        }

        img {
            width: 4rem;
            height: 2rem;
            border-radius: 6px;
        }

        .item-quantity {
            display: block;
            min-width: 1.25rem;
            font-size: 1rem;
            color: #666;
            margin-left: 0.75rem;
        }

        .item-details {
            margin-left: 1rem;

            strong {
                display: block;
                margin-bottom: 0.25rem;
            }

            span {
                font-size: 0.875rem;
                color: #666;
            }
        }
    }

    .total-order-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5rem;

        span {
            font-weight: 500;
            font-size: 0.875rem;
            opacity: 0.8;
        }
    }
`;

export const OrderActions = styled.footer`
    display: flex;
    flex-direction: column;

    margin-top: 2rem;

    .next-stage {
        background-color: #333333;
        border-radius: 48px;
        border: 0;
        color: #fff;
        padding: 0.75rem 1.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .cancel-order {
        color: #D73035;
        padding: 0.75rem 1.5rem;
        font-weight: bold;
        border: 0;
        background-color: transparent;
        margin-top: 0.5rem;
    }
`;
