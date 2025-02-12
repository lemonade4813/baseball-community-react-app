// import './App.css'
import { Outlet } from 'react-router-dom';
import Navigation from './components/ui/Navigation';
import Header from './components/ui/Header';
import { styled } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalModal } from './components/ui/GlobalModal';
import Globalstyles from './styles/GlobalStyles';

const Container = styled.div`
    width : 80vw;
    height : 100vh;
    margin : 0 auto;
`

function App() {

  const queryClient = new QueryClient();

  return (
    <>
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
    </>
  )
}

export default App;
