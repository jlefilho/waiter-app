import { CategoriesContainer, FooterContainer, Footer, MainContainer, MenuContainer } from './styles';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';

export function Main() {
    return (
        <>
            <MainContainer>
                <Header />

                <CategoriesContainer>
                    <Categories />
                </CategoriesContainer>

                <MenuContainer>
                    <Menu />
                </MenuContainer>

            </MainContainer>
            <Footer>
                <FooterContainer>
                    <Button onPress={() => alert('Novo pedido')}>
                        Novo pedido
                    </Button>
                </FooterContainer>
            </Footer>
        </>
    );
}
