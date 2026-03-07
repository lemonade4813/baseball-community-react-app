import { Outlet } from 'react-router-dom';
import Navigation from './components/ui/Navigation';
import Header from './components/ui/Header';
import { ThemeProvider, styled } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalModal } from './components/ui/GlobalModal';
import Globalstyles from './styles/GlobalStyles';
import { useAtomValue } from 'jotai';
import { isDarkModeAtom } from './store/isDarkMode';
import Carousel from './components/ui/Carousel';

const Container = styled.div`
    max-width : 1920px;
    width : 95%;
    height : 100vh;
    margin : 0 auto;
`

const lightTheme = {
  background: "#FFFFFF",
};

const darkTheme = {
  background: "#1A1A1A",
  color: "#FFFFFF"
};


const Main = styled.main`
  padding-bottom : 100px;
`

function App() {

  const queryClient = new QueryClient();

  const isDarkMode = useAtomValue(isDarkModeAtom);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Globalstyles/>
      <QueryClientProvider client={queryClient}>
        <GlobalModal/>
        <Container>
          <Header/>
          <Navigation/>
          <Carousel/>
            <Main>
              <Outlet/>
            </Main>
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App;
