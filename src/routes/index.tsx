import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@pages/home/Layout'
import Home from '@pages/home/components/homepage'

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}