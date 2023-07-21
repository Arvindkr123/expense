import React, { useContext } from 'react'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UpdateProfilePage from './pages/UpdateProfilePage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ProtectedRoute Component={Home} />}></Route>
                <Route path='/signUp' element={<SignUp />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/updateProfile' element={<ProtectedRoute Component={UpdateProfilePage} />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
