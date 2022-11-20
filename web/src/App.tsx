import { Header } from './components/Header';
import { OrdersBoard } from './components/OrdersBoard';
import { GlobalStyles } from './styles/GlobalStyles';

export function App() {
    return (
        <>
            <GlobalStyles />
            <Header />
            <OrdersBoard />
        </>
    );
}
