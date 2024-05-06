
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/home/Home'
import JobInfo from '@/pages/jobInfo/JobInfo'
import Layout from '@/pages/layout/Layout'
import SearchCompany from '@/pages/search/SearchCompany'
import SearchCandidate from '@/pages/searchCandidate/SearchCandidate'
import CandidateInfo from '@/pages/candidateInfo/CandidateInfo'
import CompanyInfo from '@/pages/companyInfo/CompanyInfo'
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
          <Route path='job-info/:jobId' element={<JobInfo />}></Route>
          <Route path='search-company' element={<SearchCompany />}></Route>
          <Route path='search-candidate' element={<SearchCandidate />}></Route>
          <Route path='candidate-info' element={<CandidateInfo />}></Route>
          <Route path='company-info/:companyId' element={<CompanyInfo />}></Route>
          <Route path='manager-company/:companyId/info' element={lazyFn(() => import('@/pages/managerCompany/ManagerCompany'), (localStorage.getItem("token") != null), "/")}></Route>
          <Route path='add-job/:companyId' element={<AddJob />}></Route>
          <Route path='manager-job/:jobId' element={<ManagerJob />}></Route>
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
        <Route path='/admin' element={lazyFn(() => import('@/components/authen/login/admin'), localStorage.getItem("token") == null, "/")} >
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

// const location = useLocation()
// useEffect(() => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// }, [location.pathname])