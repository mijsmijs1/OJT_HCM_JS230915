import Header from "@/components/Header";
import { Outlet } from 'react-router-dom'
import './layout.scss'
import Footer from "@/components/Footer/Footer";
import { useState } from "react";

export default function Layout() {
    // Back to top
    const [openside, setOpenSide] = useState(false)
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <div className="layout_container">
            <div className="header_container">
                <Header setOpenSide={setOpenSide} />
            </div>
            <div className='home_page_body'>
                <div className='body_content'>
                    <Outlet />
                </div>
            </div>
            <div className="footer_container">
                <Footer handleBackToTop={handleBackToTop} />
            </div>

        </div>
    )
}
