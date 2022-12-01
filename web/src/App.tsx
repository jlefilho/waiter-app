import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { OrdersBoard } from './components/OrdersBoard';
import { GlobalStyles } from './styles/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
    return (
        <>
            <GlobalStyles />
            <Header />
            <OrdersBoard />
            <ToastContainer position='bottom-center'/>
        </>
    );
}
