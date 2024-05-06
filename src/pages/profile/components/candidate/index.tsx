import { useState } from 'react'
import pictures from '@/pictures'
import ProjectForm from './create_form/project';
import CertificateForm from './create_form/certificate';
import SkillForm from './create_form/skill';
import InfoForm from './update_form/information'
import IntroduceForm from './create_form/introduce'
import ExperienceForm from './create_form/experience';
import UpdateExperienceForm from './update_form/experience';
import EducationForm from './create_form/education';
import UpdateEducationForm from './update_form/education';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/store'
import { useNavigate } from 'react-router-dom';
import { Modal, message } from 'antd'
import { candidateEducationAction } from '@/store/slices/candidate/education.slice';
import apis from '@/services/apis';

export default function Candidate_profile() {
    const [viewMore, setViewMore] = useState<boolean>(false)
    const [openModalUI, setOpenModalUI] = useState<boolean>(false)
    const [openIntroduceForm, setOpenIntroduceForm] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // education
    const [openEducationForm, setOpenEducationForm] = useState<boolean>(false)
    const [openEditEducationForm, setOpenEditEducationForm] = useState<boolean>(false)
    const [educationData, setEducationData] = useState<boolean>(false)

    // experience
    const [openExperienceForm, setOpenExperienceForm] = useState<boolean>(false);
    const [experienceData, setExperienceData] = useState<boolean>(false)
    const [openEditExperienceForm, setOpenEditExperienceForm] = useState<boolean>(false)

    const [openSkillForm, setOpenSkillForm] = useState<boolean>(false)
    const [openCertificateForm, setOpenCertificateForm] = useState<boolean>(false)
    const [openProjectForm, setOpenProjectForm] = useState<boolean>(false)

    const candidateStore = useSelector((store: Store) => store.candidateStore)
    // const candidateIntroduceStore = useSelector((store: Store) => store.introduceStore)
    const candidateEducationStore = useSelector((store: Store) => store.educationStore)
    const candidateExperienceStore = useSelector((store: Store) => store.experienceStore)
    // const candidateSkillStore = useSelector((store: Store) => store.skillStore)
    // const candidateProjectStore = useSelector((store: Store) => store.projectStore)
    const candidateCertificateStore = useSelector((store: Store) => store.certificateStore)

    // console.log('data', candidateStore.data);

    const handlePreviewCv = () => {
        if (!candidateStore.data?.address || !candidateStore.data?.phone || !candidateStore.data?.dob || !candidateStore.data?.link_fb || Object.keys(candidateEducationStore.educationData || {}).length == 0 || Object.keys(candidateExperienceStore.experienceData || {}).length == 0) {
            message.warning('Hãy cập nhật dữ liệu đầy đủ dữ liệu để được xem và tải cv')
            return
        }
        navigate('/cv-generate')
    }

    const handleDeleteEducation = async (candidateId: number) => {
        try {
            let result = await apis.candidateApi.deleteEducation(candidateId)
            message.success(`${result.data.message}`)
            dispatch(candidateEducationAction.fetchCandidateEducation())
        } catch (err: any) {
            Modal.error({
                title: "Thất bại!",
                content: err.response.data.message || 'Vui lòng thử lại sau ít phút',
            })
        }
    }
    return (
        <>
            <div className='profile_container'>
                <div className='content'>
                    <div className='profile_content'>
                        {/* left */}
                        {
                            <div className='box_content_left'>
                                <div className='box_content_left_title'>
                                    <h3>Nâng cấp hồ sơ xin việc của bạn bằng việc bổ sung các trường sau</h3>
                                </div>
                                <div className='box_content_left_info'>
                                    {/* introduce */}
                                    <div className='content_left_info_item'>
                                        <i className="fa-regular fa-circle-check" />
                                        <h3 className='check'>Đã thêm giới thiệu bản thân</h3>
                                    </div>
                                    {/* education */}
                                    <div className='content_left_info_item'>
                                        {
                                            Object.keys(candidateEducationStore.educationData || {}).length > 0 ? (
                                                <>
                                                    <i className="fa-regular fa-circle-check" />
                                                    <h3 className='check'>Đã thêm học vấn</h3>
                                                </>
                                            ) : (
                                                <>
                                                    <img src={pictures.icon_plus} alt="" />
                                                    <h3>Thêm học vấn</h3>
                                                </>
                                            )
                                        }
                                    </div>
                                    {/* experience */}
                                    <div className='content_left_info_item'>
                                        {
                                            Object.keys(candidateExperienceStore.experienceData || {}).length > 0 ? (
                                                <>
                                                    <i className="fa-regular fa-circle-check" />
                                                    <h3 className='check'>Thêm kinh nghiệm làm việc</h3>
                                                </>
                                            ) : (
                                                <>
                                                    <img src={pictures.icon_plus} alt="" />
                                                    <h3>Đã thêm kinh nghiệm làm việc</h3>
                                                </>
                                            )
                                        }
                                    </div>
                                    {/* skill */}
                                    <div className={`content_left_info_item ${viewMore ? '' : 'unshow'}`}>
                                        <i className="fa-regular fa-circle-check" />
                                        <h3 className='check'>Đã thêm kỹ năng</h3>
                                    </div>
                                    {/* project */}
                                    <div className={`content_left_info_item ${viewMore ? '' : 'unshow'}`}>
                                        <i className="fa-regular fa-circle-check" />
                                        <h3 className='check'>Đã thêm dự án</h3>
                                    </div>
                                    {/* certificate */}
                                    {/* <div className={`content_left_info_item ${viewMore ? '' : 'unshow'}`}>
                                        {
                                            Object.keys(candidateCertificateStore.certificateData || {}).length > 0 ? (
                                                <>
                                                    <i className="fa-regular fa-circle-check" />
                                                    <h3 className='check'>Đã thêm chứng chỉ</h3>
                                                </>
                                            ) : (
                                                <>
                                                    <img src={pictures.icon_plus} alt="" />
                                                    <h3>Thêm chứng chỉ</h3>
                                                </>
                                            )
                                        }
                                    </div> */}

                                    {/* view more */}
                                    <div className='content_left_info_item' onClick={() => setViewMore(!viewMore)}>
                                        <i style={{ height: '5px' }} className={`fa-solid fa-angle-${viewMore ? 'up' : 'down'}`}></i>
                                        {
                                            viewMore ? (
                                                <>
                                                    <h2>Thu lại</h2>
                                                </>
                                            ) : (
                                                <>
                                                    <h2>Thêm thông tin khác</h2>

                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='profile_content_info'>
                                    <img src={pictures.icon_cv} alt="" />
                                    <h3>Lựa chọn mẫu CV phù hợp và tải xuống</h3>
                                </div>
                                <div className='profile_content_button'>
                                    <button className='button-review' onClick={handlePreviewCv}>Xem và tải </button>
                                </div>
                            </div>
                        }

                        {/* right */}
                        <div className='profile_content_right'>
                            <div className='profile_content_info_company'>
                                <div className='profile_content_info_header'>
                                    <span onClick={() => {
                                        setOpenModalUI(true)
                                    }}>
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.61161 19.8514H15.4791C16.3889 19.8514 17.0948 19.6038 17.5968 19.1087C18.0989 18.6137 18.35 17.8711 18.35 16.881V6.63806L16.7225 8.18074V16.8044C16.7225 17.3026 16.5978 17.6779 16.3485 17.9303C16.0991 18.1826 15.8026 18.3087 15.4589 18.3087H3.64193C3.1365 18.3087 2.74732 18.1826 2.47438 17.9303C2.20145 17.6779 2.06499 17.3026 2.06499 16.8044V5.92902C2.06499 5.43076 2.20145 5.05388 2.47438 4.79836C2.74732 4.54285 3.1365 4.41509 3.64193 4.41509H12.8509L14.4784 2.87242H3.61161C2.56031 2.87242 1.76847 3.11995 1.23608 3.61501C0.703693 4.11007 0.4375 4.85266 0.4375 5.84278V16.881C0.4375 17.8711 0.703693 18.6137 1.23608 19.1087C1.76847 19.6038 2.56031 19.8514 3.61161 19.8514ZM7.29114 13.6423L9.26232 12.8279L18.7038 3.88809L17.3189 2.59455L7.88755 11.5344L6.97777 13.3357C6.93734 13.4188 6.95587 13.5002 7.03337 13.5801C7.11087 13.6599 7.19679 13.6807 7.29114 13.6423ZM19.4518 3.18862L20.1797 2.47956C20.3481 2.30709 20.434 2.11705 20.4374 1.90945C20.4408 1.70184 20.3549 1.51819 20.1797 1.3585L19.9472 1.12853C19.7921 0.981611 19.6051 0.914539 19.3861 0.927314C19.1671 0.94009 18.9733 1.02313 18.8048 1.17644L18.0669 1.86633L19.4518 3.18862Z" fill="#BC2228" />
                                        </svg>
                                    </span>
                                </div>
                                <div className='box_profile_content_info'>
                                    {/* info */}
                                    {
                                        candidateStore.data && (
                                            <>
                                                {/* img */}
                                                <div className='box_profile_content_info_logo'>
                                                    <img style={{ cursor: "pointer" }} src={pictures.logo_FPT} alt="" />
                                                </div>

                                                {/* profile */}
                                                <div className='profile_content_info_user'>
                                                    {/* name */}
                                                    <h2>{candidateStore.data?.name}</h2>
                                                    {/* role */}
                                                    <h3>Full-stack Developer</h3>
                                                    {/* revew info */}
                                                    <div className='profile_content_info_des_menu'>
                                                        {/* left */}
                                                        <div className='profile_content_info_des_left'>
                                                            {/* email */}
                                                            <div className='profile_content_info_item'>
                                                                <i className="fa-regular fa-envelope"></i>
                                                                <p>{candidateStore.data?.email}</p>
                                                            </div>

                                                            {/* birthday */}
                                                            <div className='profile_content_info_item'>
                                                                <img src={pictures.icon_cake} alt="" />
                                                                <p>{candidateStore.data?.dob?.slice(0, 10).split("-").reverse().join("/") || 'Updating...'}</p>
                                                            </div>

                                                            {/* address */}
                                                            <div className='profile_content_info_item'>
                                                                <img src={pictures.icon_location} alt="" />
                                                                <p> {candidateStore.data?.address || 'Updating...'}</p>
                                                            </div>
                                                        </div>

                                                        {/* right */}
                                                        <div className='profile_content_info_des_right'>
                                                            {/* phone */}
                                                            <div className='profile_content_info_item'>
                                                                <img src={pictures.icon_phone} alt="" />
                                                                <p>{candidateStore.data?.phone || 'Updating...'}</p>
                                                            </div>

                                                            {/* gender */}
                                                            <div className='profile_content_info_item'>
                                                                <img src={pictures.icon_user} alt="" />
                                                                <p>{candidateStore.data?.gender == "MALE" ? 'Nam' : 'Nữ' || 'Updating...'}</p>
                                                            </div>

                                                            {/* social */}
                                                            <div className='profile_content_info_item'>
                                                                <img src={pictures.icon_network} alt="" />
                                                                <p>{candidateStore.data?.link_fb || 'Updating...'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>

                            <div className='profile_content_info_user_menu'>
                                {/* Introduce */}
                                <div className='profile_content_info_user_item'>
                                    <div className='content_info_user_header'>
                                        <h3>Giới thiệu bản thân</h3>
                                        <svg style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenIntroduceForm(true)
                                        }} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.61161 19.8514H15.4791C16.3889 19.8514 17.0948 19.6038 17.5968 19.1087C18.0989 18.6137 18.35 17.8711 18.35 16.881V6.63806L16.7225 8.18074V16.8044C16.7225 17.3026 16.5978 17.6779 16.3485 17.9303C16.0991 18.1826 15.8026 18.3087 15.4589 18.3087H3.64193C3.1365 18.3087 2.74732 18.1826 2.47438 17.9303C2.20145 17.6779 2.06499 17.3026 2.06499 16.8044V5.92902C2.06499 5.43076 2.20145 5.05388 2.47438 4.79836C2.74732 4.54285 3.1365 4.41509 3.64193 4.41509H12.8509L14.4784 2.87242H3.61161C2.56031 2.87242 1.76847 3.11995 1.23608 3.61501C0.703693 4.11007 0.4375 4.85266 0.4375 5.84278V16.881C0.4375 17.8711 0.703693 18.6137 1.23608 19.1087C1.76847 19.6038 2.56031 19.8514 3.61161 19.8514ZM7.29114 13.6423L9.26232 12.8279L18.7038 3.88809L17.3189 2.59455L7.88755 11.5344L6.97777 13.3357C6.93734 13.4188 6.95587 13.5002 7.03337 13.5801C7.11087 13.6599 7.19679 13.6807 7.29114 13.6423ZM19.4518 3.18862L20.1797 2.47956C20.3481 2.30709 20.434 2.11705 20.4374 1.90945C20.4408 1.70184 20.3549 1.51819 20.1797 1.3585L19.9472 1.12853C19.7921 0.981611 19.6051 0.914539 19.3861 0.927314C19.1671 0.94009 18.9733 1.02313 18.8048 1.17644L18.0669 1.86633L19.4518 3.18862Z" fill="#BC2228" />
                                        </svg>
                                    </div>
                                    <div className='content_info_user_title'>
                                        <p style={{ color: '#5e6670' }}>Xin chào! Tôi là <span>{candidateStore.data?.name}</span>, một người đam mê về công nghệ và sáng tạo. Tôi đã có kinh nghiệm làm việc trong lĩnh vực phát triển phần mềm và thiết kế web trong suốt nhiều năm.Trong công việc của mình, tôi thường tập trung vào việc xây dựng các ứng dụng web và mobile dựa trên các công nghệ hiện đại như JavaScript, ReactJS, Node.js và MongoDB. Tôi cũng có kiến thức vững chắc về HTML, CSS và các ngôn ngữ lập trình khác như Python và Java.
                                        </p>
                                    </div>
                                </div>

                                {/* Education */}
                                <div className='profile_content_info_user_item'>
                                    <div className='content_info_user_header'>
                                        <h3>Học vấn</h3>
                                        <img style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenEducationForm(true)
                                        }} src={pictures.icon_plus} alt="" />
                                    </div>

                                    <div className='content_info_user_title'>
                                        {
                                            Object.keys(candidateEducationStore.educationData || {}).length > 0 ? (
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Tên trường</th>
                                                            <th>Ngành</th>
                                                            <th>Ngày bắt đầu</th>
                                                            <th>Ngày kết thúc</th>
                                                            <th>Khác</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.values(candidateEducationStore.educationData || {}).map((item: any) => (
                                                                <tr key={Date.now() * Math.random()}>
                                                                    <td>{item.name_education}</td>
                                                                    <td>{item.major}</td>
                                                                    <td>{item.started_at.slice(0, 10).split("-").reverse().join("/")}</td>
                                                                    <td>{item.end_at.slice(0, 10).split("-").reverse().join("/")}</td>
                                                                    <td>
                                                                        {/* edit */}
                                                                        <span onClick={() => {
                                                                            setOpenEditEducationForm(!openEditEducationForm)
                                                                            setEducationData(item)
                                                                        }}>
                                                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M3.61161 19.8514H15.4791C16.3889 19.8514 17.0948 19.6038 17.5968 19.1087C18.0989 18.6137 18.35 17.8711 18.35 16.881V6.63806L16.7225 8.18074V16.8044C16.7225 17.3026 16.5978 17.6779 16.3485 17.9303C16.0991 18.1826 15.8026 18.3087 15.4589 18.3087H3.64193C3.1365 18.3087 2.74732 18.1826 2.47438 17.9303C2.20145 17.6779 2.06499 17.3026 2.06499 16.8044V5.92902C2.06499 5.43076 2.20145 5.05388 2.47438 4.79836C2.74732 4.54285 3.1365 4.41509 3.64193 4.41509H12.8509L14.4784 2.87242H3.61161C2.56031 2.87242 1.76847 3.11995 1.23608 3.61501C0.703693 4.11007 0.4375 4.85266 0.4375 5.84278V16.881C0.4375 17.8711 0.703693 18.6137 1.23608 19.1087C1.76847 19.6038 2.56031 19.8514 3.61161 19.8514ZM7.29114 13.6423L9.26232 12.8279L18.7038 3.88809L17.3189 2.59455L7.88755 11.5344L6.97777 13.3357C6.93734 13.4188 6.95587 13.5002 7.03337 13.5801C7.11087 13.6599 7.19679 13.6807 7.29114 13.6423ZM19.4518 3.18862L20.1797 2.47956C20.3481 2.30709 20.434 2.11705 20.4374 1.90945C20.4408 1.70184 20.3549 1.51819 20.1797 1.3585L19.9472 1.12853C19.7921 0.981611 19.6051 0.914539 19.3861 0.927314C19.1671 0.94009 18.9733 1.02313 18.8048 1.17644L18.0669 1.86633L19.4518 3.18862Z" fill="#BC2228" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* delete */}
                                                                        <span>
                                                                            <svg
                                                                                onClick={() => {
                                                                                    handleDeleteEducation(item.id)
                                                                                }}
                                                                                width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M5.7063 21.9843H14.6613C15.358 21.9843 15.9244 21.776 16.3606 21.3593C16.7968 20.9427 17.0312 20.3828 17.0637 19.6797L17.7375 5.48047H18.9094C19.1112 5.48047 19.2821 5.40722 19.4221 5.26074C19.5621 5.11426 19.632 4.9401 19.632 4.73828C19.632 4.53646 19.5604 4.36393 19.4172 4.22071C19.274 4.07747 19.1048 4.00586 18.9094 4.00586H1.45825C1.26294 4.00586 1.09204 4.0791 0.945557 4.22559C0.799072 4.37207 0.72583 4.54296 0.72583 4.73828C0.72583 4.9401 0.799072 5.11426 0.945557 5.26074C1.09204 5.40722 1.26294 5.48047 1.45825 5.48047H2.63013L3.30395 19.6894C3.3365 20.3926 3.56925 20.9508 4.0022 21.3642C4.43514 21.7776 5.00317 21.9843 5.7063 21.9843ZM5.84302 20.5097C5.56307 20.5097 5.3287 20.4153 5.13989 20.2265C4.95109 20.0377 4.85018 19.8001 4.83716 19.5136L4.15356 5.48047H16.1653L15.5207 19.5136C15.5077 19.8066 15.4068 20.0459 15.218 20.2314C15.0292 20.417 14.7916 20.5097 14.5051 20.5097H5.84302ZM7.28833 18.8398C7.47062 18.8398 7.61711 18.7861 7.72778 18.6787C7.83846 18.5713 7.8938 18.4329 7.8938 18.2636L7.59106 7.81445C7.59106 7.64518 7.5341 7.50846 7.42017 7.4043C7.30624 7.30013 7.16138 7.24805 6.9856 7.24805C6.80331 7.24805 6.65519 7.30176 6.54126 7.40918C6.42733 7.5166 6.37362 7.65494 6.38013 7.82422L6.6731 18.2636C6.67961 18.4394 6.7382 18.5794 6.84888 18.6836C6.95955 18.7878 7.10604 18.8398 7.28833 18.8398ZM10.179 18.8398C10.3678 18.8398 10.5208 18.7861 10.6379 18.6787C10.7551 18.5713 10.8137 18.4329 10.8137 18.2636V7.82422C10.8137 7.65494 10.7551 7.5166 10.6379 7.40918C10.5208 7.30176 10.3678 7.24805 10.179 7.24805C9.99666 7.24805 9.84693 7.30176 9.72974 7.40918C9.61255 7.5166 9.55395 7.65494 9.55395 7.82422V18.2636C9.55395 18.4329 9.61255 18.5713 9.72974 18.6787C9.84693 18.7861 9.99666 18.8398 10.179 18.8398ZM13.0793 18.8398C13.2551 18.8398 13.3984 18.7878 13.509 18.6836C13.6197 18.5794 13.6783 18.4394 13.6848 18.2636L13.9778 7.82422C13.9843 7.65494 13.9322 7.5166 13.8215 7.40918C13.7109 7.30176 13.5611 7.24805 13.3723 7.24805C13.1965 7.24805 13.0533 7.30013 12.9426 7.4043C12.832 7.50846 12.7734 7.64844 12.7668 7.82422L12.4738 18.2636C12.4674 18.4329 12.5195 18.5713 12.6301 18.6787C12.7408 18.7861 12.8905 18.8398 13.0793 18.8398ZM5.89185 4.69922H7.44458V2.60938C7.44458 2.33594 7.5341 2.11458 7.71313 1.94531C7.89217 1.77604 8.12817 1.69141 8.42114 1.69141H11.9172C12.2102 1.69141 12.4462 1.77604 12.6252 1.94531C12.8043 2.11458 12.8938 2.33594 12.8938 2.60938V4.69922H14.4465V2.51172C14.4465 1.80859 14.2301 1.25358 13.7971 0.84668C13.3642 0.439779 12.7734 0.236328 12.0246 0.236328H8.31372C7.56502 0.236328 6.9742 0.439779 6.54126 0.84668C6.10832 1.25358 5.89185 1.80859 5.89185 2.51172V4.69922Z" fill="#BC2228" />
                                                                            </svg>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>Giới thiệu điểm mạnh của bản thân và kinh nghiệm của bạn</p>
                                            )
                                        }
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className='profile_content_info_user_item'>
                                    <div className='content_info_user_header'>
                                        <h3>Kinh nghiệm làm việc</h3>
                                        <img style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenExperienceForm(true)
                                        }} src={pictures.icon_plus} alt="" />
                                    </div>

                                    <div className='content_info_user_title'>
                                        {
                                            Object.keys(candidateExperienceStore.experienceData || {}).length > 0 ? (
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Vị trí</th>
                                                            <th>Tên công ty</th>
                                                            <th>Ngày bắt đầu</th>
                                                            <th>Ngày kết thúc</th>
                                                            <th>Khác</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.values(candidateExperienceStore.experienceData || {}).map((item: any) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.position}</td>
                                                                    <td>{item.company}</td>
                                                                    <td>{item.started_at.slice(0, 10).split("-").reverse().join("/")}</td>
                                                                    <td>{item.end_at.slice(0, 10).split("-").reverse().join("/")}</td>
                                                                    <td>
                                                                        {/* edit */}
                                                                        <span onClick={() => {
                                                                            setOpenEditExperienceForm(!openEditExperienceForm)
                                                                            setExperienceData(item)
                                                                        }}>
                                                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M3.61161 19.8514H15.4791C16.3889 19.8514 17.0948 19.6038 17.5968 19.1087C18.0989 18.6137 18.35 17.8711 18.35 16.881V6.63806L16.7225 8.18074V16.8044C16.7225 17.3026 16.5978 17.6779 16.3485 17.9303C16.0991 18.1826 15.8026 18.3087 15.4589 18.3087H3.64193C3.1365 18.3087 2.74732 18.1826 2.47438 17.9303C2.20145 17.6779 2.06499 17.3026 2.06499 16.8044V5.92902C2.06499 5.43076 2.20145 5.05388 2.47438 4.79836C2.74732 4.54285 3.1365 4.41509 3.64193 4.41509H12.8509L14.4784 2.87242H3.61161C2.56031 2.87242 1.76847 3.11995 1.23608 3.61501C0.703693 4.11007 0.4375 4.85266 0.4375 5.84278V16.881C0.4375 17.8711 0.703693 18.6137 1.23608 19.1087C1.76847 19.6038 2.56031 19.8514 3.61161 19.8514ZM7.29114 13.6423L9.26232 12.8279L18.7038 3.88809L17.3189 2.59455L7.88755 11.5344L6.97777 13.3357C6.93734 13.4188 6.95587 13.5002 7.03337 13.5801C7.11087 13.6599 7.19679 13.6807 7.29114 13.6423ZM19.4518 3.18862L20.1797 2.47956C20.3481 2.30709 20.434 2.11705 20.4374 1.90945C20.4408 1.70184 20.3549 1.51819 20.1797 1.3585L19.9472 1.12853C19.7921 0.981611 19.6051 0.914539 19.3861 0.927314C19.1671 0.94009 18.9733 1.02313 18.8048 1.17644L18.0669 1.86633L19.4518 3.18862Z" fill="#BC2228" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* delete */}
                                                                        <span>
                                                                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M5.7063 21.9843H14.6613C15.358 21.9843 15.9244 21.776 16.3606 21.3593C16.7968 20.9427 17.0312 20.3828 17.0637 19.6797L17.7375 5.48047H18.9094C19.1112 5.48047 19.2821 5.40722 19.4221 5.26074C19.5621 5.11426 19.632 4.9401 19.632 4.73828C19.632 4.53646 19.5604 4.36393 19.4172 4.22071C19.274 4.07747 19.1048 4.00586 18.9094 4.00586H1.45825C1.26294 4.00586 1.09204 4.0791 0.945557 4.22559C0.799072 4.37207 0.72583 4.54296 0.72583 4.73828C0.72583 4.9401 0.799072 5.11426 0.945557 5.26074C1.09204 5.40722 1.26294 5.48047 1.45825 5.48047H2.63013L3.30395 19.6894C3.3365 20.3926 3.56925 20.9508 4.0022 21.3642C4.43514 21.7776 5.00317 21.9843 5.7063 21.9843ZM5.84302 20.5097C5.56307 20.5097 5.3287 20.4153 5.13989 20.2265C4.95109 20.0377 4.85018 19.8001 4.83716 19.5136L4.15356 5.48047H16.1653L15.5207 19.5136C15.5077 19.8066 15.4068 20.0459 15.218 20.2314C15.0292 20.417 14.7916 20.5097 14.5051 20.5097H5.84302ZM7.28833 18.8398C7.47062 18.8398 7.61711 18.7861 7.72778 18.6787C7.83846 18.5713 7.8938 18.4329 7.8938 18.2636L7.59106 7.81445C7.59106 7.64518 7.5341 7.50846 7.42017 7.4043C7.30624 7.30013 7.16138 7.24805 6.9856 7.24805C6.80331 7.24805 6.65519 7.30176 6.54126 7.40918C6.42733 7.5166 6.37362 7.65494 6.38013 7.82422L6.6731 18.2636C6.67961 18.4394 6.7382 18.5794 6.84888 18.6836C6.95955 18.7878 7.10604 18.8398 7.28833 18.8398ZM10.179 18.8398C10.3678 18.8398 10.5208 18.7861 10.6379 18.6787C10.7551 18.5713 10.8137 18.4329 10.8137 18.2636V7.82422C10.8137 7.65494 10.7551 7.5166 10.6379 7.40918C10.5208 7.30176 10.3678 7.24805 10.179 7.24805C9.99666 7.24805 9.84693 7.30176 9.72974 7.40918C9.61255 7.5166 9.55395 7.65494 9.55395 7.82422V18.2636C9.55395 18.4329 9.61255 18.5713 9.72974 18.6787C9.84693 18.7861 9.99666 18.8398 10.179 18.8398ZM13.0793 18.8398C13.2551 18.8398 13.3984 18.7878 13.509 18.6836C13.6197 18.5794 13.6783 18.4394 13.6848 18.2636L13.9778 7.82422C13.9843 7.65494 13.9322 7.5166 13.8215 7.40918C13.7109 7.30176 13.5611 7.24805 13.3723 7.24805C13.1965 7.24805 13.0533 7.30013 12.9426 7.4043C12.832 7.50846 12.7734 7.64844 12.7668 7.82422L12.4738 18.2636C12.4674 18.4329 12.5195 18.5713 12.6301 18.6787C12.7408 18.7861 12.8905 18.8398 13.0793 18.8398ZM5.89185 4.69922H7.44458V2.60938C7.44458 2.33594 7.5341 2.11458 7.71313 1.94531C7.89217 1.77604 8.12817 1.69141 8.42114 1.69141H11.9172C12.2102 1.69141 12.4462 1.77604 12.6252 1.94531C12.8043 2.11458 12.8938 2.33594 12.8938 2.60938V4.69922H14.4465V2.51172C14.4465 1.80859 14.2301 1.25358 13.7971 0.84668C13.3642 0.439779 12.7734 0.236328 12.0246 0.236328H8.31372C7.56502 0.236328 6.9742 0.439779 6.54126 0.84668C6.10832 1.25358 5.89185 1.80859 5.89185 2.51172V4.69922Z" fill="#BC2228" />
                                                                            </svg>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>Giới thiệu điểm mạnh của bản thân và kinh nghiệm của bạn</p>
                                            )
                                        }
                                    </div>
                                </div>

                                {/* Skill */}
                                <div className='profile_content_info_user_item'>
                                    <div className='content_info_user_header'>
                                        <h3>Kỹ năng</h3>
                                        <svg style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenSkillForm(true)
                                        }} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.61161 19.8514H15.4791C16.3889 19.8514 17.0948 19.6038 17.5968 19.1087C18.0989 18.6137 18.35 17.8711 18.35 16.881V6.63806L16.7225 8.18074V16.8044C16.7225 17.3026 16.5978 17.6779 16.3485 17.9303C16.0991 18.1826 15.8026 18.3087 15.4589 18.3087H3.64193C3.1365 18.3087 2.74732 18.1826 2.47438 17.9303C2.20145 17.6779 2.06499 17.3026 2.06499 16.8044V5.92902C2.06499 5.43076 2.20145 5.05388 2.47438 4.79836C2.74732 4.54285 3.1365 4.41509 3.64193 4.41509H12.8509L14.4784 2.87242H3.61161C2.56031 2.87242 1.76847 3.11995 1.23608 3.61501C0.703693 4.11007 0.4375 4.85266 0.4375 5.84278V16.881C0.4375 17.8711 0.703693 18.6137 1.23608 19.1087C1.76847 19.6038 2.56031 19.8514 3.61161 19.8514ZM7.29114 13.6423L9.26232 12.8279L18.7038 3.88809L17.3189 2.59455L7.88755 11.5344L6.97777 13.3357C6.93734 13.4188 6.95587 13.5002 7.03337 13.5801C7.11087 13.6599 7.19679 13.6807 7.29114 13.6423ZM19.4518 3.18862L20.1797 2.47956C20.3481 2.30709 20.434 2.11705 20.4374 1.90945C20.4408 1.70184 20.3549 1.51819 20.1797 1.3585L19.9472 1.12853C19.7921 0.981611 19.6051 0.914539 19.3861 0.927314C19.1671 0.94009 18.9733 1.02313 18.8048 1.17644L18.0669 1.86633L19.4518 3.18862Z" fill="#BC2228" />
                                        </svg>
                                    </div>
                                    <div className='content_info_user_title'>
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

                                {/* Project */}
                                <div className='profile_content_info_user_item'>
                                    <div className='content_info_user_header_v2'>
                                        <h3>Dự án Cá Nhân</h3>
                                        <svg style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenProjectForm(true)
                                        }} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.61161 19.8514H15.4791C16.3889 19.8514 17.0948 19.6038 17.5968 19.1087C18.0989 18.6137 18.35 17.8711 18.35 16.881V6.63806L16.7225 8.18074V16.8044C16.7225 17.3026 16.5978 17.6779 16.3485 17.9303C16.0991 18.1826 15.8026 18.3087 15.4589 18.3087H3.64193C3.1365 18.3087 2.74732 18.1826 2.47438 17.9303C2.20145 17.6779 2.06499 17.3026 2.06499 16.8044V5.92902C2.06499 5.43076 2.20145 5.05388 2.47438 4.79836C2.74732 4.54285 3.1365 4.41509 3.64193 4.41509H12.8509L14.4784 2.87242H3.61161C2.56031 2.87242 1.76847 3.11995 1.23608 3.61501C0.703693 4.11007 0.4375 4.85266 0.4375 5.84278V16.881C0.4375 17.8711 0.703693 18.6137 1.23608 19.1087C1.76847 19.6038 2.56031 19.8514 3.61161 19.8514ZM7.29114 13.6423L9.26232 12.8279L18.7038 3.88809L17.3189 2.59455L7.88755 11.5344L6.97777 13.3357C6.93734 13.4188 6.95587 13.5002 7.03337 13.5801C7.11087 13.6599 7.19679 13.6807 7.29114 13.6423ZM19.4518 3.18862L20.1797 2.47956C20.3481 2.30709 20.434 2.11705 20.4374 1.90945C20.4408 1.70184 20.3549 1.51819 20.1797 1.3585L19.9472 1.12853C19.7921 0.981611 19.6051 0.914539 19.3861 0.927314C19.1671 0.94009 18.9733 1.02313 18.8048 1.17644L18.0669 1.86633L19.4518 3.18862Z" fill="#BC2228" />
                                        </svg>
                                    </div>

                                    <div className='content_info_user_titles'>
                                        {/* <div className='content_info_user_title_v2'>
                                            <div className='content_info_user_title_v2_left'>
                                                <p>Hiện tại</p>
                                            </div>
                                            <div className='content_info_user_title_v2_right' >
                                                <span style={{ cursor: "pointer" }}>
                                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.97806 19.4432H15.8455C16.7553 19.4432 17.4612 19.1956 17.9633 18.7005C18.4654 18.2055 18.7164 17.4629 18.7164 16.4728V6.22986L17.0889 7.77253V16.3962C17.0889 16.8944 16.9642 17.2697 16.7149 17.5221C16.4656 17.7743 16.1691 17.9005 15.8253 17.9005H4.00838C3.50295 17.9005 3.11377 17.7743 2.84084 17.5221C2.56791 17.2697 2.43145 16.8944 2.43145 16.3962V5.52081C2.43145 5.02256 2.56791 4.64567 2.84084 4.39015C3.11377 4.13464 3.50295 4.00689 4.00838 4.00689H13.2173L14.8449 2.46421H3.97806C2.92677 2.46421 2.13492 2.71174 1.60254 3.20681C1.07015 3.70187 0.803955 4.44446 0.803955 5.43458V16.4728C0.803955 17.4629 1.07015 18.2055 1.60254 18.7005C2.13492 19.1956 2.92677 19.4432 3.97806 19.4432ZM7.65759 13.2341L9.62877 12.4197L19.0702 3.47989L17.6853 2.18634L8.25401 11.1262L7.34423 12.9275C7.3038 13.0106 7.32233 13.092 7.39983 13.1719C7.47733 13.2517 7.56325 13.2724 7.65759 13.2341ZM19.8182 2.78042L20.5461 2.07136C20.7146 1.89889 20.8005 1.70885 20.8039 1.50125C20.8072 1.29364 20.7213 1.10999 20.5461 0.950293L20.3136 0.720329C20.1586 0.573408 19.9716 0.506335 19.7526 0.519111C19.5336 0.531887 19.3398 0.614929 19.1713 0.768238L18.4333 1.45813L19.8182 2.78042Z" fill="#BC2228" />
                                                    </svg>
                                                </span>
                                                <span style={{ cursor: "pointer" }} >
                                                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.7063 21.9843H14.6613C15.358 21.9843 15.9244 21.776 16.3606 21.3593C16.7968 20.9427 17.0312 20.3828 17.0637 19.6797L17.7375 5.48047H18.9094C19.1112 5.48047 19.2821 5.40722 19.4221 5.26074C19.5621 5.11426 19.632 4.9401 19.632 4.73828C19.632 4.53646 19.5604 4.36393 19.4172 4.22071C19.274 4.07747 19.1048 4.00586 18.9094 4.00586H1.45825C1.26294 4.00586 1.09204 4.0791 0.945557 4.22559C0.799072 4.37207 0.72583 4.54296 0.72583 4.73828C0.72583 4.9401 0.799072 5.11426 0.945557 5.26074C1.09204 5.40722 1.26294 5.48047 1.45825 5.48047H2.63013L3.30395 19.6894C3.3365 20.3926 3.56925 20.9508 4.0022 21.3642C4.43514 21.7776 5.00317 21.9843 5.7063 21.9843ZM5.84302 20.5097C5.56307 20.5097 5.3287 20.4153 5.13989 20.2265C4.95109 20.0377 4.85018 19.8001 4.83716 19.5136L4.15356 5.48047H16.1653L15.5207 19.5136C15.5077 19.8066 15.4068 20.0459 15.218 20.2314C15.0292 20.417 14.7916 20.5097 14.5051 20.5097H5.84302ZM7.28833 18.8398C7.47062 18.8398 7.61711 18.7861 7.72778 18.6787C7.83846 18.5713 7.8938 18.4329 7.8938 18.2636L7.59106 7.81445C7.59106 7.64518 7.5341 7.50846 7.42017 7.4043C7.30624 7.30013 7.16138 7.24805 6.9856 7.24805C6.80331 7.24805 6.65519 7.30176 6.54126 7.40918C6.42733 7.5166 6.37362 7.65494 6.38013 7.82422L6.6731 18.2636C6.67961 18.4394 6.7382 18.5794 6.84888 18.6836C6.95955 18.7878 7.10604 18.8398 7.28833 18.8398ZM10.179 18.8398C10.3678 18.8398 10.5208 18.7861 10.6379 18.6787C10.7551 18.5713 10.8137 18.4329 10.8137 18.2636V7.82422C10.8137 7.65494 10.7551 7.5166 10.6379 7.40918C10.5208 7.30176 10.3678 7.24805 10.179 7.24805C9.99666 7.24805 9.84693 7.30176 9.72974 7.40918C9.61255 7.5166 9.55395 7.65494 9.55395 7.82422V18.2636C9.55395 18.4329 9.61255 18.5713 9.72974 18.6787C9.84693 18.7861 9.99666 18.8398 10.179 18.8398ZM13.0793 18.8398C13.2551 18.8398 13.3984 18.7878 13.509 18.6836C13.6197 18.5794 13.6783 18.4394 13.6848 18.2636L13.9778 7.82422C13.9843 7.65494 13.9322 7.5166 13.8215 7.40918C13.7109 7.30176 13.5611 7.24805 13.3723 7.24805C13.1965 7.24805 13.0533 7.30013 12.9426 7.4043C12.832 7.50846 12.7734 7.64844 12.7668 7.82422L12.4738 18.2636C12.4674 18.4329 12.5195 18.5713 12.6301 18.6787C12.7408 18.7861 12.8905 18.8398 13.0793 18.8398ZM5.89185 4.69922H7.44458V2.60938C7.44458 2.33594 7.5341 2.11458 7.71313 1.94531C7.89217 1.77604 8.12817 1.69141 8.42114 1.69141H11.9172C12.2102 1.69141 12.4462 1.77604 12.6252 1.94531C12.8043 2.11458 12.8938 2.33594 12.8938 2.60938V4.69922H14.4465V2.51172C14.4465 1.80859 14.2301 1.25358 13.7971 0.84668C13.3642 0.439779 12.7734 0.236328 12.0246 0.236328H8.31372C7.56502 0.236328 6.9742 0.439779 6.54126 0.84668C6.10832 1.25358 5.89185 1.80859 5.89185 2.51172V4.69922Z" fill="#BC2228" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div> */}
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

                                {/* Certificate */}
                                {/* <div className='profile_content_info_user_item'>
                                    <div className='content_info_user_header'>
                                        <h3>Chứng Chỉ</h3>
                                        <img style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenCertificateForm(true)
                                        }} src={pictures.icon_plus} alt="" />
                                    </div>

                                    <div className='content_info_user_title'>
                                        {
                                            candidateStore.data?.certificates?.length != 0 ? (
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Tên chứng chỉ</th>
                                                            <th>Tổ chức</th>
                                                            <th>Ngày đạt</th>
                                                            <th>Ngày hết hạn</th>
                                                            <th>Khác</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            candidateStore.data?.certificates.map((item: any) => (
                                                                <tr key={Date.now() * Math.random()}>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.organization}</td>
                                                                    <td>{item.started_at.slice(0, 10).split("-").reverse().join("/")}</td>
                                                                    <td>{item.end_at.slice(0, 10).split("-").reverse().join("/")}</td>
                                                                    <td>
                                                                        <td>
                                                                            <span>
                                                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M3.61161 19.8514H15.4791C16.3889 19.8514 17.0948 19.6038 17.5968 19.1087C18.0989 18.6137 18.35 17.8711 18.35 16.881V6.63806L16.7225 8.18074V16.8044C16.7225 17.3026 16.5978 17.6779 16.3485 17.9303C16.0991 18.1826 15.8026 18.3087 15.4589 18.3087H3.64193C3.1365 18.3087 2.74732 18.1826 2.47438 17.9303C2.20145 17.6779 2.06499 17.3026 2.06499 16.8044V5.92902C2.06499 5.43076 2.20145 5.05388 2.47438 4.79836C2.74732 4.54285 3.1365 4.41509 3.64193 4.41509H12.8509L14.4784 2.87242H3.61161C2.56031 2.87242 1.76847 3.11995 1.23608 3.61501C0.703693 4.11007 0.4375 4.85266 0.4375 5.84278V16.881C0.4375 17.8711 0.703693 18.6137 1.23608 19.1087C1.76847 19.6038 2.56031 19.8514 3.61161 19.8514ZM7.29114 13.6423L9.26232 12.8279L18.7038 3.88809L17.3189 2.59455L7.88755 11.5344L6.97777 13.3357C6.93734 13.4188 6.95587 13.5002 7.03337 13.5801C7.11087 13.6599 7.19679 13.6807 7.29114 13.6423ZM19.4518 3.18862L20.1797 2.47956C20.3481 2.30709 20.434 2.11705 20.4374 1.90945C20.4408 1.70184 20.3549 1.51819 20.1797 1.3585L19.9472 1.12853C19.7921 0.981611 19.6051 0.914539 19.3861 0.927314C19.1671 0.94009 18.9733 1.02313 18.8048 1.17644L18.0669 1.86633L19.4518 3.18862Z" fill="#BC2228" />
                                                                                </svg>
                                                                            </span>
                                                                            <span>
                                                                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M5.7063 21.9843H14.6613C15.358 21.9843 15.9244 21.776 16.3606 21.3593C16.7968 20.9427 17.0312 20.3828 17.0637 19.6797L17.7375 5.48047H18.9094C19.1112 5.48047 19.2821 5.40722 19.4221 5.26074C19.5621 5.11426 19.632 4.9401 19.632 4.73828C19.632 4.53646 19.5604 4.36393 19.4172 4.22071C19.274 4.07747 19.1048 4.00586 18.9094 4.00586H1.45825C1.26294 4.00586 1.09204 4.0791 0.945557 4.22559C0.799072 4.37207 0.72583 4.54296 0.72583 4.73828C0.72583 4.9401 0.799072 5.11426 0.945557 5.26074C1.09204 5.40722 1.26294 5.48047 1.45825 5.48047H2.63013L3.30395 19.6894C3.3365 20.3926 3.56925 20.9508 4.0022 21.3642C4.43514 21.7776 5.00317 21.9843 5.7063 21.9843ZM5.84302 20.5097C5.56307 20.5097 5.3287 20.4153 5.13989 20.2265C4.95109 20.0377 4.85018 19.8001 4.83716 19.5136L4.15356 5.48047H16.1653L15.5207 19.5136C15.5077 19.8066 15.4068 20.0459 15.218 20.2314C15.0292 20.417 14.7916 20.5097 14.5051 20.5097H5.84302ZM7.28833 18.8398C7.47062 18.8398 7.61711 18.7861 7.72778 18.6787C7.83846 18.5713 7.8938 18.4329 7.8938 18.2636L7.59106 7.81445C7.59106 7.64518 7.5341 7.50846 7.42017 7.4043C7.30624 7.30013 7.16138 7.24805 6.9856 7.24805C6.80331 7.24805 6.65519 7.30176 6.54126 7.40918C6.42733 7.5166 6.37362 7.65494 6.38013 7.82422L6.6731 18.2636C6.67961 18.4394 6.7382 18.5794 6.84888 18.6836C6.95955 18.7878 7.10604 18.8398 7.28833 18.8398ZM10.179 18.8398C10.3678 18.8398 10.5208 18.7861 10.6379 18.6787C10.7551 18.5713 10.8137 18.4329 10.8137 18.2636V7.82422C10.8137 7.65494 10.7551 7.5166 10.6379 7.40918C10.5208 7.30176 10.3678 7.24805 10.179 7.24805C9.99666 7.24805 9.84693 7.30176 9.72974 7.40918C9.61255 7.5166 9.55395 7.65494 9.55395 7.82422V18.2636C9.55395 18.4329 9.61255 18.5713 9.72974 18.6787C9.84693 18.7861 9.99666 18.8398 10.179 18.8398ZM13.0793 18.8398C13.2551 18.8398 13.3984 18.7878 13.509 18.6836C13.6197 18.5794 13.6783 18.4394 13.6848 18.2636L13.9778 7.82422C13.9843 7.65494 13.9322 7.5166 13.8215 7.40918C13.7109 7.30176 13.5611 7.24805 13.3723 7.24805C13.1965 7.24805 13.0533 7.30013 12.9426 7.4043C12.832 7.50846 12.7734 7.64844 12.7668 7.82422L12.4738 18.2636C12.4674 18.4329 12.5195 18.5713 12.6301 18.6787C12.7408 18.7861 12.8905 18.8398 13.0793 18.8398ZM5.89185 4.69922H7.44458V2.60938C7.44458 2.33594 7.5341 2.11458 7.71313 1.94531C7.89217 1.77604 8.12817 1.69141 8.42114 1.69141H11.9172C12.2102 1.69141 12.4462 1.77604 12.6252 1.94531C12.8043 2.11458 12.8938 2.33594 12.8938 2.60938V4.69922H14.4465V2.51172C14.4465 1.80859 14.2301 1.25358 13.7971 0.84668C13.3642 0.439779 12.7734 0.236328 12.0246 0.236328H8.31372C7.56502 0.236328 6.9742 0.439779 6.54126 0.84668C6.10832 1.25358 5.89185 1.80859 5.89185 2.51172V4.69922Z" fill="#BC2228" />
                                                                                </svg>
                                                                            </span>
                                                                        </td>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>Bổ sung chứng chỉ liên quan đến kỹ năng của bạn</p>
                                            )
                                        }
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* INTRODUCE */}
                    {/* <!-- Create Introduce Form --> */}
                    {
                        openIntroduceForm && <IntroduceForm setOpenIntroduceForm={setOpenIntroduceForm} />
                    }
                    {/* END INTRODUCE */}

                    {/* EDUCATION */}
                    {/* <!-- Create Education Form --> */}
                    {
                        openEducationForm && <EducationForm setOpenEducationForm={setOpenEducationForm} />
                    }
                    {/* <!-- Update Education Form --> */}
                    {
                        openEditEducationForm && <UpdateEducationForm setOpenEditEducationForm={setOpenEditEducationForm} educationData={educationData} />
                    }
                    {/* END EDUCATION */}

                    {/* EXPERIENCE */}
                    {/* <!-- Create Experience Form --> */}
                    {
                        openExperienceForm && <ExperienceForm setOpenExperienceForm={setOpenExperienceForm} />
                    }
                    {/* <!-- Update Experience Form --> */}
                    {
                        openEditExperienceForm && <UpdateExperienceForm setOpenEditExperienceForm={setOpenEditExperienceForm} experienceData={experienceData} />
                    }
                    {/* END EXPERIENCE */}


                    {/* PROJECT */}
                    {/* <!-- Create ProjectForm --> */}
                    {
                        openProjectForm && <ProjectForm setOpenProjectForm={setOpenProjectForm} />
                    }
                    {/* END PROJECT */}

                    {/* <!-- Create Certificate Form --> */}
                    {
                        openCertificateForm && <CertificateForm setOpenCertificateForm={setOpenCertificateForm} />
                    }
                    {/* <!-- Create Skill Form --> */}
                    {
                        openSkillForm && <SkillForm setOpenSkillForm={setOpenSkillForm} />
                    }
                    {/* <!-- Update Info Form --> */}
                    {
                        openModalUI && <InfoForm setOpenModalUI={setOpenModalUI} />
                    }
                </div>
            </div >
        </>
    )
}
