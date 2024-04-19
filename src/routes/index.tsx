import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home/Home'
import JobInfo from '@/pages/jobInfo/JobInfo'
import Layout from '@/pages/layout/Layout'
import Search from '@/pages/search/Search'
import SearchCandidate from '@/pages/searchCandidate/SearchCandidate'
import CandidateInfo from '@/pages/candidateInfo/CandidateInfo'
import CompanyInfo from '@/pages/companyInfo/CompanyInfo'
import ManagerCompany from '@/pages/managerCompany/ManagerCompany'
import AddJob from '@/pages/addJob/AddJob'
import ManagerJob from '@/pages/managerJob/ManagerJob'
import AdminJobManager from '@/pages/adminJobManager/AdminJobManager'
import CvManagement from '@/pages/cvManagement'
import Profile from "@pages/profile/Profile"
import { lazyFn } from "@/utils/lazies/Lazy"

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />}></Route>
          <Route path='job-info' element={<JobInfo />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='search-candidate' element={<SearchCandidate />}></Route>
          <Route path='candidate-info' element={<CandidateInfo />}></Route>
          <Route path='company-info' element={<CompanyInfo />}></Route>
          <Route path='manager-company' element={<ManagerCompany />}></Route>
          <Route path='add-job' element={<AddJob />}></Route>
          <Route path='manager-job' element={<ManagerJob />}></Route>
          <Route path='admin-manager-job' element={<AdminJobManager />}></Route>
          <Route path='cv-management' element={<CvManagement />}></Route>
          <Route path='profile' element={<Profile />} >
          </Route>
        </Route>

        {/* AUTHEN */}
        {/* user */}
        <Route path='/login' element={lazyFn(() => import('@/components/authen/login/candidate'), localStorage.getItem("token") == null, "/")} >
        </Route>
        <Route path='/register' element={lazyFn(() => import('@/components/authen/register/candidate'), localStorage.getItem("token") == null, "/")} >
        </Route>

        {/* company */}
        <Route path='/login-company' element={lazyFn(() => import('@/components/authen/login/company'), localStorage.getItem("token") == null, "/")} >
        </Route>
        <Route path='/register-company' element={lazyFn(() => import('@/components/authen/register/company'), localStorage.getItem("token") == null, "/")} >
        </Route>

        {/* admin */}
        <Route path='/register-admin' element={lazyFn(() => import('@/components/authen/register/admin'), localStorage.getItem("token") == null, "/")} >
        </Route>
        <Route path='/admin' element={lazyFn(() => import('@/components/authen/login/admin'), localStorage.getItem("token") == null && localStorage.getItem("isAmin") != null, "/")} >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}