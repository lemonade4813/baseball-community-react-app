// import './App.css'
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import HeaderComponent from './components/HeaderComponent';
import { styled } from 'styled-components';

const Container = styled.div`
    width : 100vw;
    height : 100vh;
`

function App() {

  return (
    <Container>
      <HeaderComponent/>
      <Navigation/>
      <Outlet/>
    </Container>
  )
}

export default App;
