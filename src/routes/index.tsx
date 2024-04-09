import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home'
import Login from "@/components/authen/loginUser/LoginUser"
import Register from "@/components/authen/registerUser/RegisterUser"
import LoginAdmin from "@/components/authen/loginAdmin/LoginAdmin"
import LoginCompany from "@/components/authen/loginCompany/LoginCompany"
import RegisterCompany from "@components/authen/registerCompany/RegisterCompany"

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
        <Route path='/login-company' element={<LoginCompany />} >
        </Route>
        <Route path='/register-company' element={<RegisterCompany />} >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}