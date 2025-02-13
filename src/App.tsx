// import './App.css'
import { Outlet } from 'react-router-dom';
import Navigation from './components/ui/Navigation';
import Header from './components/ui/Header';
import { ThemeProvider, styled } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalModal } from './components/ui/GlobalModal';
import Globalstyles from './styles/GlobalStyles';
import { useAtomValue } from 'jotai';
import { isDarkModeAtom } from './store/IsDarkMode';

const Container = styled.div`
    width : 80vw;
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
          {/* <Main> */}
            <Outlet/>
          {/* </Main> */}
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App;
