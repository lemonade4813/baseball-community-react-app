import { Navigate, createBrowserRouter } from 'react-router-dom'
import Schedule from './components/Schedules'
import App from './App'
import Posts from './components/Posts'
import Stadium from './components/Stadium'
import StadiumLocation from './components/StadiumLocation'
import StadiumFood from './components/StadiumFood'
import Chat from './components/Chat'
import Login from './components/Login'
import Signup from './components/Signup'

const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "schedule", element: <Schedule /> },
        { path: "posts", element: <Posts /> },
        { path : "chat", element : <Chat/>},
        { path : "login", element : <Login/>},
        { path : "signup", element : <Signup/>},
        { path : "stadium", element: <Stadium /> , 
            children : [
                {path : 'location', element : <StadiumLocation/>},
                {path : 'food', element : <StadiumFood/>}
            ]},
      ],
    },
   
])

export default routes;