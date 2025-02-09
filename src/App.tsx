// import './App.css'
import { Outlet } from 'react-router-dom';
import Navigation from './components/ui/Navigation';
import Header from './components/ui/Header';
import { styled } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth/Authcontext';

const Container = styled.div`
    width : 80vw;
    height : 100vh;
    margin : 0 auto;
`
// const Main = styled.main`
// `

function App() {

  const queryClient = new QueryClient();

  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Container>
        <Header/>
        <Navigation/>
        {/* <Main> */}
          <Outlet/>
        {/* </Main> */}
      </Container>
    </QueryClientProvider>
    </AuthProvider>
  )
}

export default App;
