import { Navigate, createBrowserRouter } from 'react-router-dom'
import Schedule from './components/pages/Schedules'
import App from './App'
import Posts from './components/pages/Posts'
import Stadium from './components/pages/Stadium'
import StadiumStatus from './components/pages/StadiumStatus'
import StadiumFood from './components/pages/StadiumFood'
import Chat from './components/pages/Chat'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import ChatRoom from './components/pages/ChatRoom'
import PostDetail from './components/pages/PostDetail'
import PostWrite from './components/pages/PostWrite'
import ProtectedRoute from './components/routes/ProtectedRoute'

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
        { path : "stadium", element: <Stadium /> , 
            children : [
                {path : 'location', element : <StadiumStatus/>},
                {path : 'food', element : <StadiumFood/>}
            ]},
      ],
    },
   
])

export default routes;