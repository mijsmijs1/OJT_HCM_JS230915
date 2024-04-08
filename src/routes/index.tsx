import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home'
import Login from "@components/authen/loginuser/LoginUser"
import Register from "@components/authen/registeruser/registerUser"

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
        </Route>
        <Route path='/login' element={<Login />} >
        </Route>
        <Route path='/register' element={<Register />} >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}