import { Navigate, createBrowserRouter } from 'react-router-dom'
import Schedule from './components/pages/Schedules'
import App from './App'
import Posts from './components/pages/Posts'
import Chat from './components/pages/Chat'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import ChatRoom from './components/pages/ChatRoom'
import PostDetail from './components/pages/PostDetail'
import PostWrite from './components/pages/PostWrite'
import ProtectedRoute from './components/routes/ProtectedRoute'
import Stadiums from './components/pages/Stadiums'
import StadiumsStatus from './components/pages/StadiumsStatus'
import StadiumFoods from './components/pages/StadiumsFoods'
import NotFound from './components/pages/NotFound'

const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Navigate to="/schedule" replace /> },
        { path: "schedule", element: <Schedule /> },
        { path: "posts", element: <Posts /> },
        { path : "posts/detail/:id", element : <PostDetail/>},
        { path : "posts/write", element : <ProtectedRoute>
                                            <PostWrite/>
                                          </ProtectedRoute>  
                                          },
        { path : "posts/edit/:id", element : <ProtectedRoute>
                                                <PostWrite isEditMode/>
                                             </ProtectedRoute>},
        { path : "chat", element : <Chat/>},
        { path : "chat/:team", element : <ChatRoom/>},
        { path : "login", element : <Login/>},
        { path : "signup", element : <Signup/>},
        { path : "stadiums", element: <Stadiums /> , 
            children : [
                {path : 'location', element : <StadiumsStatus/>},
                {path : 'foods', element : <StadiumFoods/>}
            ]},
        { path : "*", element : <NotFound/>}
      ],
    },
   
])

export default routes;