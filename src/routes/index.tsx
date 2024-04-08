import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home'
import Login from "@components/authen/loginuser/LoginUser"
import Register from "@components/authen/registeruser/registerUser"
import LoginAdmin from "@components/authen/loginadmin/LoginAdmin"

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