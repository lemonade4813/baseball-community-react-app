import './App.css'
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';


function App() {

  return (
    <div style={{width : '100vw', height : '100vh'}}>
      <Navigation/>
      <Outlet/>
    </div>
    
  )
}

export default App;
