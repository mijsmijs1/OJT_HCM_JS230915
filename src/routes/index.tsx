import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/pages/layout/Layout'
import Home from '@/pages/home/Home'
import CompanyInfo from '@/pages/companyInfo/CompanyInfo'

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />}></Route>
          <Route path='/companyInfo' element={<CompanyInfo />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}