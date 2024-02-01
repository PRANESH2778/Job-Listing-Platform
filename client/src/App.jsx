import { useState } from 'react'
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import JobPostPage from './pages/JobPostPage/JobPostPage'
import HomePage from './pages/HomePage/HomePage'
import JobDetailsPage from './pages/JobDetailsPage/JobDetailsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import JobPost from './components/JobPost/JobPost'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/job-details/:id' element={<JobDetailsPage/>}/>
        <Route path='/job-post' element={<ProtectedRoutes Component = {JobPost}/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
