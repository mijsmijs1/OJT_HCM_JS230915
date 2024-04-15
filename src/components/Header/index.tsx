import TopNav from './components/topNav'
import Navigation from './components/navigation'
import { useState } from 'react'

export default function Header(props: { setOpenSide: any }) {
  const [openside, setOpenSide] = useState(false)
  return (
    <>
      <TopNav setOpenSide={setOpenSide} />
      <Navigation />
    </>
  )
}
