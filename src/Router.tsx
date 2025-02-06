import { createBrowserRouter } from 'react-router-dom'
import Schedule from './components/Schedules'
import App from './App'
import Posts from './components/Posts'
import Stadium from './components/Stadium'
import StadiumLocation from './components/StadiumLocation'
import StadiumFood from './components/StadiumFood'
import Chat from './components/Chat'
import Login from './components/Login'
import Signup from './components/Signup'
import ChatRoom from './components/ChatRoom'
import PostDetail from './components/PostDetail'
import PostWrite from './components/PostWrite'
import ProtectedRoute from './components/ProtectedRoute'

const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
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
                {path : 'location', element : <StadiumLocation/>},
                {path : 'food', element : <StadiumFood/>}
            ]},
      ],
    },
   
])

export default routes;