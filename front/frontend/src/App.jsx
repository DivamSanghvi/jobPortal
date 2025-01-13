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
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import ResumeUpload from './components/ResumeUpload'
import Test from './components/Test/Test'


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
  },
  {
    path: '/job-description/:id',
    element: <JobDescription/>
  },
  {
    path: '/admin/companies',
    element:<Companies/>
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate/>
  },
  {
    path: 'admin/companies/:id',
    element: <CompanySetup/>
  },
  {
    path: "admin/jobs",
    element: <AdminJobs/>
  },
  {
    path: "admin/jobs/create",
    element: <PostJob/>
  },
  {
    path: "resume/upload",
    element: <ResumeUpload/>
  },
  {
    path: "/test",
    element: <Test/>
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
