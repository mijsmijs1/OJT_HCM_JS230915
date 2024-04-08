import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home'
import Login from "@components/authen/loginuser/LoginUser"

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
        </Route>
        <Route path='/login' element={<Login />} >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}