

import { useState } from 'react'
import pictures from '@/pictures'

import './cv_management.scss'

export default function CvManagement() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className='cv-management_container'>
            <div className='cv-management_box'>
                {/* info */}
                <div className="cv-management_ifo">
                    <div className='title'>Nguyễn Minh Dương</div>
                    <div className="sub-title">Tải CV của bạn bên dưới để có thể sử dụng xuyên suốt quá trình tìm việc</div>

                    {/* upload */}
                    <div className='upload'>
                        {/* cv icon */}
                        <div className="icon-cv">
                            <img src={pictures.cv} alt="icon-cv" />
                        </div>

                        {/* main content */}
                        <div className='cv-main_content'>
                            <div className="title">CV của bạn</div>
                            <div className='upload_action'>
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_119_4188)">
                                        <path d="M7.94141 17.6074C8.19532 17.6074 8.40365 17.5261 8.56641 17.3633C8.72917 17.2005 8.81055 16.9922 8.81055 16.7383V6.875L8.74219 4.78515L11.6816 7.99804L13.8691 10.1562C13.9472 10.2344 14.0416 10.2946 14.1523 10.3369C14.263 10.3793 14.377 10.4004 14.4941 10.4004C14.7415 10.4004 14.945 10.3174 15.1045 10.1514C15.264 9.98535 15.3438 9.7819 15.3438 9.54101C15.3438 9.42383 15.3194 9.31153 15.2705 9.20411C15.2217 9.09668 15.1485 8.99088 15.0508 8.88671L8.5957 2.42188C8.50455 2.32422 8.40202 2.24935 8.28809 2.19727C8.17416 2.14518 8.0586 2.11915 7.94141 2.11915C7.81771 2.11915 7.70052 2.14518 7.58984 2.19727C7.47917 2.24935 7.37826 2.32422 7.28711 2.42188L0.822266 8.88671C0.73112 8.99088 0.661133 9.09668 0.612305 9.20411C0.563477 9.31153 0.539062 9.42383 0.539062 9.54101C0.539062 9.7819 0.618815 9.98535 0.77832 10.1514C0.937825 10.3174 1.14128 10.4004 1.38867 10.4004C1.50586 10.4004 1.61979 10.3793 1.73047 10.3369C1.84114 10.2946 1.93554 10.2344 2.01367 10.1562L4.20117 7.99804L7.14062 4.77539L7.0625 6.875V16.7383C7.0625 16.9922 7.14551 17.2005 7.31152 17.3633C7.47754 17.5261 7.6875 17.6074 7.94141 17.6074ZM1.33984 2.13867H14.5137C14.7676 2.13867 14.9743 2.05729 15.1338 1.89453C15.2933 1.73177 15.373 1.52344 15.373 1.26953C15.373 1.01562 15.2933 0.805664 15.1338 0.639648C14.9743 0.473633 14.7676 0.390625 14.5137 0.390625H1.33984C1.09245 0.390625 0.890625 0.473633 0.734375 0.639648C0.578125 0.805664 0.5 1.01562 0.5 1.26953C0.5 1.52344 0.578125 1.73177 0.734375 1.89453C0.890625 2.05729 1.09245 2.13867 1.33984 2.13867Z" fill="#BC2228" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_119_4188">
                                            <rect width="14.873" height="17.2168" fill="white" transform="translate(0.5 0.390625)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div className="content">
                                    <span>Tải lên</span>
                                    (Sử dụng tệp .doc, .docx hoặc .pdf, không chứa mật khẩu bảo vệ và dưới 3MB)
                                </div>
                            </div>
                        </div>

                        {/* button */}
                        <div className="button_default">
                            <button className='default'>Mặc định</button>
                        </div>
                    </div>
                </div>

                {/* cover letter */}
                <div className='cover_letter'>
                    {/* top */}
                    <div className='letter-top'>
                        <div className={`letter-title ${isOpen ? 'open' : ''}`}>Thư xin Việc</div>
                        <div className={`open_form ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.15165 18.9627H16.0191C16.9289 18.9627 17.6348 18.7152 18.1369 18.2201C18.639 17.725 18.89 16.9825 18.89 15.9923V5.74939L17.2625 7.29207V15.9157C17.2625 16.4139 17.1378 16.7892 16.8885 17.0416C16.6392 17.2939 16.3426 17.42 15.9989 17.42H4.18197C3.67654 17.42 3.28736 17.2939 3.01442 17.0416C2.74149 16.7892 2.60503 16.4139 2.60503 15.9157V5.04034C2.60503 4.54209 2.74149 4.1652 3.01442 3.90969C3.28736 3.65417 3.67654 3.52642 4.18197 3.52642H13.3909L15.0185 1.98374H4.15165C3.10035 1.98374 2.30851 2.23128 1.77612 2.72634C1.24373 3.2214 0.977539 3.96399 0.977539 4.95411V15.9923C0.977539 16.9825 1.24373 17.725 1.77612 18.2201C2.30851 18.7152 3.10035 18.9627 4.15165 18.9627ZM7.83118 12.7536L9.80236 11.9393L19.2438 2.99942L17.8589 1.70587L8.42759 10.6457L7.51781 12.447C7.47738 12.5301 7.49591 12.6116 7.57341 12.6914C7.65091 12.7712 7.73683 12.792 7.83118 12.7536ZM19.9918 2.29995L20.7197 1.59089C20.8881 1.41842 20.9741 1.22838 20.9774 1.02078C20.9808 0.813172 20.8949 0.62952 20.7197 0.469824L20.4872 0.239861C20.3321 0.0929394 20.1451 0.0258667 19.9262 0.0386425C19.7071 0.0514182 19.5134 0.134461 19.3448 0.28777L18.6069 0.977659L19.9918 2.29995Z" fill="#BC2228" />
                            </svg>

                        </div>
                    </div>
                    {
                        isOpen ? (
                            <div className="letter-bottom">
                                {/* bottom */}
                                <div className="title_underline"></div>
                                <div className='descript'>Gợi ý: Bắt đầu bằng việc mô tả những gì bạn có thể mang đến cho công việc và tại sao công việc này lại khiến bạn hứng thú</div>
                                <div className="text_aria">
                                    <textarea placeholder='Hint text'/>
                                </div>

                                {/* button group */}
                                <div className="letter_buttons">
                                    <button className='save'>Lưu lại</button>
                                    <button className='cancel' onClick={toggleOpen}>Hủy bỏ</button>
                                </div>
                            </div>
                        ) : (
                            <div className="letter-bottom">
                                <div className='descript'>Giới thiệu bản thân và lý do vì sao bạn sẽ là lựa chọn tuyển dụng tuyệt vời</div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div >
    )
}
