import { BrowserRouter, Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import Home from '@pages/home'
import Login from "@/components/authen/loginUser/LoginUser"
import Register from "@/components/authen/registerUser/RegisterUser"
import LoginAdmin from "@/components/authen/loginAdmin/LoginAdmin"
import LoginCompany from "@/components/authen/loginCompany/LoginCompany"
=======
import Layout from '@/pages/layout/Layout'
import Home from '@/pages/home/Home'
import CompanyInfo from '@/pages/companyInfo/CompanyInfo'
>>>>>>> 8243428 (feature/layout)

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />}></Route>
          <Route path='/companyInfo' element={<CompanyInfo />}></Route>
        </Route>
        <Route path='/login' element={<Login />} >
        </Route>
        <Route path='/register' element={<Register />} >
        </Route>
        <Route path='/admin' element={<LoginAdmin />} >
        </Route>
        <Route path='/login-company' element={<LoginCompany />} >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}