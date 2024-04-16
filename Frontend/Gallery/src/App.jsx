import { Route, Routes } from 'react-router-dom'
import './App.css'

// pages
import Home from './pages/index'
import Login from './pages/login'
import SignIn from './pages/SignIn'
import NotFound from './component/NotFound/NotFound'
import Gallery from './pages/Gallery'
import UploadForm from './component/upload/UploadForm'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './pages/protectedRoute'
import { useState } from 'react'


function App() {
  return (
    <><div>
      <Toaster />
      <Routes>
      <Route path='/protectedRoute' element={<ProtectedRoute/>}/>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignIn />} />
        <Route path='/gallery/dashboard' element={<Gallery />} />
        <Route path='/upload' element={<UploadForm />} />
      </Routes>
    </div>
    </>
  )
}

export default App
