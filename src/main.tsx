import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './Router.tsx'
import Globalstyles from './styles/GlobalStyles.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Globalstyles/>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
