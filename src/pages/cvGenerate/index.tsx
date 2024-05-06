import { useRef } from 'react';
import pictures from '@/pictures';
import { useNavigate } from 'react-router-dom';
import { ReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { Store } from '@/store'

import './cv_generate.scss';

export default function CvGenerate() {
    const navigate = useNavigate();
    const componentRefCallback = useRef(null)

    const candidateStore = useSelector((store: Store) => store.candidateStore)
    // const candidateIntroduceStore = useSelector((store: Store) => store.introduceStore)
    const candidateEducationStore = useSelector((store: Store) => store.educationStore)
    const candidateExperienceStore = useSelector((store: Store) => store.experienceStore)
    // const candidateSkillStore = useSelector((store: Store) => store.skillStore)
    // const candidateProjectStore = useSelector((store: Store) => store.projectStore)
    const candidateCertificateStore = useSelector((store: Store) => store.certificateStore)
    return (
        <div>
            {/* HEADER */}
            <div className="cv_generate_header">
                <div className='header_container'>
                    <div className='back_to_profile' onClick={() => {
                        navigate('/profile');
                    }}>
                        <i className="fa-solid fa-angle-left" /> Trở lại cập nhật hồ sơ
                    </div>
                    <div className='header-content'>
                        <img src={pictures.logo_RikkeiEdu} alt="" />Mẫu CV
                    </div>
                    <ReactToPrint
                        trigger={() => {
                            return (
                                <button className='cv_langauge'>
                                    <i className="fa-solid fa-download" /> Tải CV
                                </button>
                            )
                        }}
                        content={() => componentRefCallback.current}
                        documentTitle='CV Mẫu từ RikkeiSoft'
                        pageStyle='print'
                    />
                </div>
            </div>

            {/* BODY */}
            <div className='cv_body_container'>
                {/* left */}
                <div className='cv_body_left'>
                    <div className='cv_preview_box'>
                        <div className='cv_preview_item select'>
                            <img src="https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd014UGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--12916489f357a1afda8ea1665487be89a3bd9c97/elegant.png" alt="" />
                            <i className="fa-solid fa-circle-check" />
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className='cv_body_right' ref={componentRefCallback}>
                    <div className='cv_template_container'>
                        {/* HEADER */}
                        <div className='cv_template_header'>
                            <div className='cv_template_header-box'>
                                <div className='cv_template_img'>
                                    <img src={pictures.avatar_candidate} alt="no_image" />
                                </div>
                                <div className='cv_template_contact'>
                                    {/* top */}
                                    <div className='candidate_position'>
                                        <div className='candidate-name'>{candidateStore.data?.name}</div>
                                        <div className='candidate-subtitle'>Fresher</div>
                                    </div>
                                    {/* botton */}
                                    <div className='candidate_info'>
                                        {/* left */}
                                        <div className='left-items'>
                                            <div className="item">
                                                <div className="item_box">
                                                    <i className="fa-solid fa-phone-volume" />
                                                    <span>{candidateStore.data?.phone}</span>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="item_box">
                                                    <i className="fa-regular fa-envelope" />
                                                    <span>{candidateStore.data?.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* right */}
                                        <div className='right-items'>
                                            <div className="item">
                                                <div className="item_box">
                                                    <i className="fa-solid fa-cake-candles" />
                                                    <span>{candidateStore.data?.dob?.slice(0, 10).split("-").reverse().join("/") || 'Updating...'}</span>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="item_box">
                                                    <i className="fa-solid fa-location-dot" />
                                                    <span>{candidateStore.data?.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className='cv_template_content'>
                            <div className="cv-cards">
                                {/* introduce */}
                                <div className="cv-card-item">
                                    <div className="cv-card-title">Giới thiệu</div>
                                    <div className="cv-card-content">
                                        <div className='trix-content'>
                                            <div>
                                                Xin chào! Tôi là <span>{candidateStore.data?.name}</span>, một người đam mê về công nghệ và sáng tạo. Tôi đã có kinh nghiệm làm việc trong lĩnh vực phát triển phần mềm và thiết kế web trong suốt nhiều năm.Trong công việc của mình, tôi thường tập trung vào việc xây dựng các ứng dụng web và mobile dựa trên các công nghệ hiện đại như JavaScript, ReactJS, Node.js và MongoDB. Tôi cũng có kiến thức vững chắc về HTML, CSS và các ngôn ngữ lập trình khác như Python và Java.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* educate */}
                                <div className="cv-card-item">
                                    <div className="cv-card-title">Học vấn</div>
                                    <div className="cv-card-content">
                                        <div className='trix-content'>
                                            {Object.values(candidateEducationStore.educationData || {}).map((item: any) => (
                                                <>
                                                    <div key={Date.now() * Math.random()} className='school'>{item.name_education}</div>
                                                    <div key={Date.now() * Math.random()} className='dateAndMajor'>
                                                        <div key={Date.now() * Math.random()} className='date'>{item.started_at?.slice(0, 10).split("-").reverse().join("/")} - {item.end_at?.slice(0, 10).split("-").reverse().join("/")}</div>
                                                        <span>|</span>
                                                        <div key={Date.now() * Math.random()} className='major'>{item.major}</div>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* skill */}
                                <div className="cv-card-item">
                                    <div className="cv-card-title">Kỹ năng</div>
                                    <div className="cv-card-content">
                                        <div className='trix-content'>
                                            <div className='skill-container'>
                                                <div className='skill-box-left'>
                                                    <div className='level-skill'>Excellent</div>
                                                    <div className='level-skill'>Intermediate</div>
                                                    <div className='level-skill'>Beginer</div>
                                                </div>
                                                <div className='skill-box-right'>
                                                    <div className='skill-name'>
                                                        <div className='skill-item'>Javascript</div>
                                                        <div className='skill-item'>TypeScript</div>
                                                        <div className='skill-item'>ReactJs</div>
                                                    </div>
                                                    <div className='skill-name'>
                                                        <div className='skill-item'>Html</div>
                                                        <div className='skill-item'>Scss</div>
                                                        <div className='skill-item'>Agile</div>
                                                    </div>
                                                    <div className='skill-name'>
                                                        <div className='skill-item'>MySQL</div>
                                                        <div className='skill-item'>Python</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* experience */}
                                <div className="cv-card-item">
                                    <div className="cv-card-title">Kinh nghiệm làm việc</div>
                                    <div className="cv-card-content">
                                        <div className='trix-content'>
                                            <div className='exp-container'>
                                                <div className="exp-date">06/2022 - HIỆN TẠI</div>
                                                <div className="exp-company-pos">
                                                    <div className="exp_pos">SOFTWARE DEVELOPER</div>
                                                    <div className='line'>|</div>
                                                    <div className="exp_comp">Zero-Day Squad</div>
                                                </div>
                                                <div className='exp-content'>
                                                    <ul>
                                                        <li>Tham gia vào quá trình phân tích yêu cầu để hiểu rõ các yêu cầu và mong muốn của khách hàng.</li>
                                                        <li>Đưa ra ý kiến và đề xuất giải pháp phù hợp cho các yêu cầu phức tạp về bảo mật mạng.</li>
                                                        <li>Tham gia vào việc thiết kế kiến trúc hệ thống và cấu trúc dữ liệu cho các ứng dụng phần mềm.</li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* project */}
                                <div className="cv-card-item">
                                    <div className="cv-card-title">Dự án cá nhân</div>
                                    <div className="cv-card-content">
                                        <div className='trix-content'>
                                            <div className='project_container'>
                                                <div className="project_header">
                                                    <div className='project-name'>Eccommerce Website</div>
                                                    <div className='line'>|</div>
                                                    <div className='project-date'>06/2022 - 05/2023</div>
                                                </div>
                                                <div className="project_body">
                                                    <ul className='project_ul'>
                                                        <li>Project Description: 
                                                            <span>Website bán hàng điện tử</span>
                                                        </li>
                                                        <li>Responsibilities: 
                                                            <ul>
                                                                <li>Thiết kế giao diện web</li>
                                                                <li>Thực hiện các chức năng mua bán</li>
                                                                <li>Thực hiện các chức năng quản lý người dùng</li>
                                                            </ul>
                                                        </li>
                                                        <li>Teach stack:
                                                            <span>Javascript, NodeJs, TypeScript</span>
                                                        </li>
                                                        <li>Team size: 
                                                            <span>5 người</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* certificate */}
                                {/* <div className="cv-card-item">
                                    <div className="cv-card-title">Chứng chỉ</div>
                                    <div className="cv-card-content">
                                        <div className='trix-content'>
                                            <div className=''></div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
