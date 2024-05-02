import { useDispatch, useSelector } from 'react-redux'
import './company_profile.scss'
import { Store } from '@/store'
import pictures from '@/pictures'
import { useEffect, useState } from 'react'
import UpdateCompanyAccount from '../updateCompanyAccount'
import { Modal, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { fetchCompanies } from '@/store/slices/company/company.slice'
import AddCompanyForm from '../addCompanyForm/AddCompanyForm'
export default function Company_profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateCompanyAccountFrom, setUpdateCompanyAccountFrom] = useState(false);
    const [displayAddCompanyForm, setDisplayAddCompanyForm] = useState(false);
    const companyStore = useSelector((store: Store) => store.companyStore)
    useEffect(() => {
        dispatch(fetchCompanies() as any);
    }, [dispatch]);
    useEffect(() => {
        if (companyStore.errorCompanies) {
            Modal.error({
                title: 'Error',
                content: companyStore.errorCompanies,
            });
        }
    }, [companyStore.errorCompanies]);
    return (
        <div className='profile_container' >
            {
                displayAddCompanyForm && <AddCompanyForm setDisplayAddCompanyForm={setDisplayAddCompanyForm} />
            }
            <div className='content'>
                <div className='profile_content'>
                    <div className='profile_content_right'>
                        <div className='profile_content_info_company company'>
                            <div className='profile_content_info_header'>
                                <span style={{ cursor: "pointer" }} onClick={() => {
                                    setUpdateCompanyAccountFrom(true)
                                }}> <svg style={{ cursor: "pointer" }} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.61161 19.8514H15.4791C16.3889 19.8514 17.0948 19.6038 17.5968 19.1087C18.0989 18.6137 18.35 17.8711 18.35 16.881V6.63806L16.7225 8.18074V16.8044C16.7225 17.3026 16.5978 17.6779 16.3485 17.9303C16.0991 18.1826 15.8026 18.3087 15.4589 18.3087H3.64193C3.1365 18.3087 2.74732 18.1826 2.47438 17.9303C2.20145 17.6779 2.06499 17.3026 2.06499 16.8044V5.92902C2.06499 5.43076 2.20145 5.05388 2.47438 4.79836C2.74732 4.54285 3.1365 4.41509 3.64193 4.41509H12.8509L14.4784 2.87242H3.61161C2.56031 2.87242 1.76847 3.11995 1.23608 3.61501C0.703693 4.11007 0.4375 4.85266 0.4375 5.84278V16.881C0.4375 17.8711 0.703693 18.6137 1.23608 19.1087C1.76847 19.6038 2.56031 19.8514 3.61161 19.8514ZM7.29114 13.6423L9.26232 12.8279L18.7038 3.88809L17.3189 2.59455L7.88755 11.5344L6.97777 13.3357C6.93734 13.4188 6.95587 13.5002 7.03337 13.5801C7.11087 13.6599 7.19679 13.6807 7.29114 13.6423ZM19.4518 3.18862L20.1797 2.47956C20.3481 2.30709 20.434 2.11705 20.4374 1.90945C20.4408 1.70184 20.3549 1.51819 20.1797 1.3585L19.9472 1.12853C19.7921 0.981611 19.6051 0.914539 19.3861 0.927314C19.1671 0.94009 18.9733 1.02313 18.8048 1.17644L18.0669 1.86633L19.4518 3.18862Z" fill="#BC2228" />
                                    </svg></span>

                            </div>
                            <div className='box_profile_content_info'>
                                <div className='box_profile_content_info_logo company_logo'>
                                    {
                                        companyStore.loadingAccount ? <Skeleton.Image active></Skeleton.Image> : <img style={{ cursor: "pointer" }} src={companyStore.data?.avatar} alt="" />
                                    }
                                </div>

                                {
                                    companyStore.data && (
                                        <div className='profile_content_info_user'>
                                            {
                                                companyStore.loadingAccount ? <Skeleton.Input active></Skeleton.Input> : <h2>{companyStore.data?.displayName}</h2>
                                            }

                                            {/* <h3>Full-stack Developer</h3> */}
                                            <div className='profile_content_info_des_menu'>
                                                <div className='profile_content_info_des_left'>
                                                    <div className='profile_content_info_item'>
                                                        <i className="fa-regular fa-envelope"></i>
                                                        {
                                                            companyStore.loadingAccount ? <Skeleton.Input active></Skeleton.Input> : <p>{companyStore.data?.email}</p>
                                                        }

                                                    </div>

                                                </div>
                                                <div className='profile_content_info_des_right'>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }

                            </div>
                        </div>

                        <div className='profile_content_info_user_menu'>
                            <div className='profile_content_info_user_item'>
                                <div className='content_info_user_header'>
                                    <h3>Công ty:</h3>
                                    <img style={{ cursor: "pointer" }} onClick={() => {
                                        setDisplayAddCompanyForm(true)
                                    }} src={pictures.icon_plus} alt="" />
                                </div>
                                {
                                    companyStore.loadingCompanies ? (<>
                                        <Skeleton active></Skeleton>
                                    </>) : (<>
                                        {
                                            companyStore.companies && (
                                                <>
                                                    {
                                                        companyStore.companies?.map(item => {
                                                            return (
                                                                <div className='company_container' key={Date.now() * Math.random()}>
                                                                    <div className='header_left'>
                                                                        <img src={item.logo} alt='logo' />
                                                                        <div className='company_info'>
                                                                            <p>{item.name}</p>
                                                                            <div>
                                                                                <div className='full_time'>
                                                                                    <span>{item.type_company?.name}</span>
                                                                                </div>
                                                                                <div className='featured' style={{ "backgroundColor": !item.status ? "#FFEDED" : "#B7E892" }}>
                                                                                    <span>{item.status ? "Active" : "Inactive"}</span>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className='header_right'>
                                                                        <div className='edit' onClick={() => {
                                                                            navigate(`/manager-company/${item.id}`)
                                                                        }}>
                                                                            <span>
                                                                                Xem chi tiết
                                                                            </span>
                                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M5 12.2637H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                <path d="M12 5.26367L19 12.2637L12 19.2637" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </svg>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>

                                            )
                                        }
                                    </>)
                                }
                            </div>

                        </div>
                    </div>
                </div>
                {
                    updateCompanyAccountFrom && <UpdateCompanyAccount setUpdateCompanyAccountFrom={setUpdateCompanyAccountFrom} />
                }
            </div>
        </div>
    )
}
