import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home/Home'
import LoginCompany from "@/components/authen/loginCompany/LoginCompany"
import JobInfo from '@/pages/jobInfo/JobInfo'
import Layout from '@/pages/layout/Layout'
import LoginUser from '@/components/authen/loginuser/LoginUser'
import RegisterUser from '@/components/authen/registeruser/registerUser'
import LoginAdmin from '@/components/authen/loginadmin/LoginAdmin'
import RegisterCompany from "@components/authen/registerCompany/RegisterCompany"
import RegisterAdmin from "@components/authen/registerAdmin/RegisterAdmin"
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
          <Route path='/profile' element={<Profile />} >
          </Route>
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
        <Route path='/register-admin' element={<RegisterAdmin />} >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}