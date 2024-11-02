import { useState } from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'

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
])

function App() {
  

  return (
    <div>
      <RouterProvider router={appRouter} />
      
    </div>
  )
}

export default App
