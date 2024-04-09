import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home'
import Login from "@/components/authen/loginUser/LoginUser"
import Register from "@/components/authen/registerUser/RegisterUser"
import LoginAdmin from "@/components/authen/loginAdmin/LoginAdmin"

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
        <Route path='/admin' element={<LoginAdmin />} >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}