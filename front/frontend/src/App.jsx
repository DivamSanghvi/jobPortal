import { useState } from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/profile'
const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs/>
  },
  {
    path: '/browse',
    element:<Browse/>
  },
  {
    path: '/profile',
    element: <Profile/>
  }
])

function App() {
  

  return (
    <div>
      <RouterProvider router={appRouter} />
      
    </div>
  )
}

export default App
