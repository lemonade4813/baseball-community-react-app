import { Navigate, createBrowserRouter } from 'react-router-dom'
import Schedule from './components/Schedule'
import App from './App'
import Posts from './components/Posts'
import Stadium from './components/Stadium'
import StadiumLocation from './components/StadiumLocation'
import StadiumFood from './components/StadiumFood'
import Chat from './components/Chat'

const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "schedule", element: <Schedule /> },
        { path: "posts", element: <Posts /> },
        { path : "chat", element : <Chat/>},
        { path: "stadium", element: <Stadium /> , 
            children : [
                {path : 'location', element : <StadiumLocation/>},
                {path : 'food', element : <StadiumFood/>}
            ]},
      ],
    },
])

export default routes;