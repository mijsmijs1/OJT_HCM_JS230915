import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home/Home'
import LoginCompany from "@/components/authen/loginCompany/LoginCompany"
import CompanyInfo from '@/pages/companyInfo/CompanyInfo'
import Layout from '@/pages/layout/Layout'
import LoginUser from '@/components/authen/loginuser/LoginUser'
import RegisterUser from '@/components/authen/registeruser/registerUser'
import LoginAdmin from '@/components/authen/loginadmin/LoginAdmin'
import RegisterCompany from "@components/authen/registerCompany/RegisterCompany"
export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />}></Route>
          <Route path='companyInfo' element={<CompanyInfo />}></Route>
        </Route>
        <Route path='/login' element={<LoginUser />} >
        </Route>
        <Route path='/register' element={<RegisterUser />} >
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