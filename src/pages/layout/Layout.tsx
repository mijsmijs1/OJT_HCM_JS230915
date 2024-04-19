import Header from "@/components/header";
import { Outlet } from 'react-router-dom'
import './layout.scss'
import Footer from "@/components/footer";

export default function Layout() {
    // Back to top
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <div className="layout_container">
            <div className="header_container">
                <Header />
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
