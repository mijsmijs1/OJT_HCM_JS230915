
import './managerCompany.scss'
import OpenJobs from './components/openJobs/OpenJobs'
import GoodCandidate from '../home/components/goodCandidate/GoodCandidate'
import { useEffect, useState } from 'react'
import EditCompanyForm from './components/editCompanyForm/EditCompanyForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, fetchCompanyById } from '@/store/slices/company/company.slice'
import { Store } from '@/store'
import { Modal, Skeleton, message } from 'antd'
import { coppySuccessfull } from '@/utils/common/coppyFunction'
import AddAddressForm from './components/addAddressForm/AddAddressForm'
import { unwrapResult } from '@reduxjs/toolkit'
import EditCompanyLogo from './components/editCompanyLogo/EditCompanyLogo'
import apis from '@/services/apis'

export default function ManagerCompany() {
    const [check, setCheck] = useState(null)
    let { companyId } = useParams();
    let companyIdAsNumber = companyId ? +companyId : undefined;
    useEffect(() => {
        const check = async () => {
            try {
                let res = await apis.companyApi.checkCompany(companyIdAsNumber || 0)
                setCheck(res.data.data)
            } catch (err) {
            }
        }
        check();
    }, [companyIdAsNumber])
    useEffect(() => {
        console.log(check)
        if (check == false) {
            Modal.error({
                title: "Cảnh báo",
                content: "Bạn không được quyền truy cập tài nguyên này!",
                okText: 'Quay về trang chủ',
                onOk: () => {
                    window.location.href = "/"
                }
            })
        }
    }, [check])
    const dispatch = useDispatch()
    const [displayEditForm, setDisplayEditForm] = useState(false)
    const [displayAddAddressForm, setDisplayAddAddressForm] = useState(false)
    const [showAvatar, setShowAvatar] = useState(false)

    const companyStore = useSelector((store: Store) => store.companyStore)
    useEffect(() => {
        dispatch(fetchCompanyById(companyIdAsNumber || 0) as any)
    }, [dispatch])
    const handleDeleteAddress = async (address: any) => {
        try {
            Modal.confirm({
                title: 'Xác nhận',
                content: `Bạn có chắc muốn xóa địa chỉ: ${address.address}`,
                onOk: async () => {
                    let result = await dispatch(deleteAddress({ companyId: companyStore.company?.id || 0, addressId: address.id || 0 }) as any)
                    let { message: ApiMessage } = unwrapResult(result)
                    message.success(`${ApiMessage}`)
                },
                onCancel: () => { }
            })
            return
        } catch (err: any) {
            if (err.message) {
                Modal.error({
                    title: 'Thất bại!',
                    content: `${err.message}`,
                    onOk: () => { }
                })
                return
            }
            Modal.error({
                title: 'Thất bại!',
                content: `Lỗi hệ thống, vui lòng thử lại sau!`,
                onOk: () => { }
            })
            return
        }
    }

    return (
        <>
            {
                check && <div className='company_manager_container'>
                    {
                        displayEditForm && <EditCompanyForm setDisplayEditForm={setDisplayEditForm} />
                    }
                    {
                        displayAddAddressForm && <AddAddressForm setDisplayAddAddressForm={setDisplayAddAddressForm} />
                    }
                    {
                        showAvatar && <EditCompanyLogo setShowAvatar={setShowAvatar} />
                    }
                    <div className='content'>
                        <div className='header'>
                            <div className='header_left'>
                                {companyStore.loadingCompany ? <Skeleton.Image active></Skeleton.Image> : <div className='logo'><img src={companyStore.company?.logo} alt='logo' /><span onClick={() => { setShowAvatar(true) }}>Edit</span></div>}
                                <div className='company_info'>
                                    {companyStore.loadingCompany ? <Skeleton.Input active></Skeleton.Input> : <p>{companyStore.company?.name}</p>}
                                    <div className='emplyees'>
                                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_51_2860)">
                                                <path d="M1.94775 17.9082H15.0434C15.5643 17.9082 15.9728 17.7927 16.269 17.5615C16.5652 17.3304 16.7133 17.013 16.7133 16.6093C16.7133 15.9843 16.5229 15.3235 16.1421 14.6269C15.7613 13.9303 15.2144 13.2777 14.5014 12.6689C13.7886 12.0602 12.9259 11.5654 11.9135 11.1845C10.9012 10.8037 9.76026 10.6132 8.49072 10.6132C7.2277 10.6132 6.09001 10.8037 5.07763 11.1845C4.06527 11.5654 3.20101 12.0602 2.48486 12.6689C1.76872 13.2777 1.22184 13.9303 0.844238 14.6269C0.466634 15.3235 0.277832 15.9843 0.277832 16.6093C0.277832 17.013 0.425944 17.3304 0.722168 17.5615C1.01839 17.7927 1.42692 17.9082 1.94775 17.9082ZM8.50049 8.86523C9.19711 8.86523 9.84162 8.6748 10.434 8.29394C11.0265 7.91308 11.5034 7.39713 11.8647 6.74609C12.2261 6.09505 12.4067 5.36263 12.4067 4.54882C12.4067 3.74804 12.2261 3.03027 11.8647 2.3955C11.5034 1.76074 11.0265 1.26107 10.434 0.896484C9.84162 0.531901 9.19711 0.349609 8.50049 0.349609C7.80387 0.349609 7.15934 0.535156 6.56689 0.906249C5.97445 1.27735 5.49756 1.7819 5.13623 2.41992C4.77491 3.05794 4.59424 3.77409 4.59424 4.56836C4.59424 5.37565 4.77491 6.10319 5.13623 6.75097C5.49756 7.39876 5.97445 7.91308 6.56689 8.29394C7.15934 8.6748 7.80387 8.86523 8.50049 8.86523Z" fill="black" fill-opacity="0.85" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_51_2860">
                                                    <rect width="16.4355" height="17.8809" fill="white" transform="translate(0.277832 0.0273438)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        {companyStore.loadingCompany ? <Skeleton.Input active></Skeleton.Input> : <span>{companyStore.company?.size}</span>}
                                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.19727 19.2305C9.29607 19.2305 9.40875 19.2028 9.53532 19.1475C9.66191 19.0921 9.77461 19.0319 9.87344 18.9668C11.6147 17.7949 13.1229 16.5661 14.398 15.2803C15.673 13.9945 16.6579 12.6729 17.3525 11.3155C18.0472 9.95802 18.3945 8.58594 18.3945 7.19922C18.3945 6.33333 18.2633 5.54069 18.0009 4.82129C17.7385 4.10189 17.3742 3.47851 16.9079 2.95117C16.4417 2.42383 15.8953 2.01693 15.2685 1.73047C14.6418 1.44401 13.9642 1.30078 13.2356 1.30078C12.334 1.30078 11.5406 1.54329 10.8552 2.02832C10.1698 2.51335 9.61713 3.1595 9.19727 3.9668C8.78356 3.16602 8.23401 2.52148 7.54861 2.0332C6.86321 1.54492 6.06667 1.30078 5.15899 1.30078C4.43037 1.30078 3.75424 1.44401 3.13059 1.73047C2.50694 2.01693 1.96048 2.42383 1.4912 2.95117C1.02192 3.47851 0.656065 4.10189 0.393639 4.82129C0.131213 5.54069 0 6.33333 0 7.19922C0 8.58594 0.347328 9.95802 1.04198 11.3155C1.73665 12.6729 2.72306 13.9945 4.00123 15.2803C5.27939 16.5661 6.78912 17.7949 8.53039 18.9668C8.62919 19.0319 8.74188 19.0921 8.86846 19.1475C8.99504 19.2028 9.10464 19.2305 9.19727 19.2305Z" fill="#FF3B30" />
                                        </svg>
                                        {companyStore.loadingCompany ? <Skeleton.Input active></Skeleton.Input> : <span>{companyStore.company?.follower}</span>}
                                    </div>
                                    <div>
                                        <div className='full_time'>
                                            {companyStore.loadingCompany ? <Skeleton.Input active></Skeleton.Input> : <span>{companyStore.company?.type_company?.name}</span>}
                                        </div>
                                        <div className='featured'>
                                            {companyStore.loadingCompany ? <Skeleton.Input active></Skeleton.Input> : <span>{companyStore.company?.status}</span>}
                                        </div>
                                        <div className='link'>
                                            <svg width="29" height="19" viewBox="0 0 29 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.73044 13.2924H6.52145C6.49541 12.9961 6.47425 12.6903 6.45798 12.375C6.4417 12.0597 6.44984 11.7538 6.48239 11.4575H5.83786C5.03708 11.4575 4.32744 11.2543 3.70895 10.8478C3.09046 10.4413 2.60544 9.87719 2.25388 9.1554C1.90231 8.43362 1.72653 7.60167 1.72653 6.65954C1.72653 5.72502 1.90231 4.89686 2.25388 4.17507C2.60544 3.45328 3.09046 2.88915 3.70895 2.48267C4.32744 2.07619 5.03708 1.87295 5.83786 1.87295H14.5C15.2943 1.87295 16.0006 2.07619 16.6191 2.48267C17.2376 2.88915 17.7242 3.45328 18.0791 4.17507C18.4339 4.89686 18.6113 5.72502 18.6113 6.65954C18.6113 7.60167 18.4355 8.43362 18.0839 9.1554C17.7324 9.87719 17.2457 10.4413 16.624 10.8478C16.0023 11.2543 15.2943 11.4575 14.5 11.4575H11.0722C11.0331 11.5715 11.0087 11.7063 10.999 11.8621C10.9892 12.0178 10.9941 12.1812 11.0136 12.3521C11.0331 12.5231 11.0657 12.6903 11.1113 12.8536C11.1568 13.017 11.2154 13.1632 11.2871 13.2924H14.6074C15.7141 13.2924 16.6939 13.0113 17.5468 12.4491C18.3997 11.8868 19.0686 11.108 19.5537 10.1127C20.0387 9.11742 20.2812 7.96636 20.2812 6.65954C20.2812 5.36032 20.0387 4.21116 19.5537 3.21206C19.0686 2.21295 18.3997 1.43418 17.5468 0.87574C16.6939 0.317304 15.7141 0.0380859 14.6074 0.0380859H5.73044C4.62367 0.0380859 3.64385 0.317304 2.79099 0.87574C1.93812 1.43418 1.26918 2.21295 0.784149 3.21206C0.299123 4.21116 0.0566101 5.36032 0.0566101 6.65954C0.0566101 7.96636 0.299123 9.11742 0.784149 10.1127C1.26918 11.108 1.93812 11.8868 2.79099 12.4491C3.64385 13.0113 4.62367 13.2924 5.73044 13.2924ZM13.5625 18.5918H22.4394C23.5462 18.5918 24.526 18.3107 25.3789 17.7485C26.2318 17.1862 26.9007 16.4075 27.3857 15.4121C27.8707 14.4168 28.1132 13.2658 28.1132 11.9589C28.1132 10.6597 27.8707 9.5106 27.3857 8.51149C26.9007 7.51238 26.2318 6.73361 25.3789 6.17518C24.526 5.61675 23.5462 5.33753 22.4394 5.33753H21.6386C21.6712 5.62624 21.6956 5.93015 21.7119 6.24926C21.7282 6.56836 21.72 6.87607 21.6875 7.17239H22.3222C23.123 7.17239 23.8326 7.37563 24.4511 7.7821C25.0696 8.18858 25.5563 8.75272 25.9111 9.47451C26.2659 10.1963 26.4433 11.0244 26.4433 11.9589C26.4433 12.9011 26.2659 13.7331 25.9111 14.4548C25.5563 15.1766 25.0696 15.7407 24.4511 16.1472C23.8326 16.5538 23.123 16.757 22.3222 16.757H13.6699C12.8691 16.757 12.1595 16.5538 11.541 16.1472C10.9225 15.7407 10.4374 15.1766 10.0859 14.4548C9.73434 13.7331 9.55856 12.9011 9.55856 11.9589C9.55856 11.0244 9.73434 10.1963 10.0859 9.47451C10.4374 8.75272 10.9225 8.18858 11.541 7.7821C12.1595 7.37563 12.8691 7.17239 13.6699 7.17239H17.0976C17.1432 7.02043 17.1676 6.83429 17.1709 6.61396C17.1741 6.39362 17.1513 6.16948 17.1025 5.94154C17.0537 5.71362 16.9772 5.51228 16.873 5.33753H13.5625C12.4557 5.33753 11.4759 5.61675 10.623 6.17518C9.77015 6.73361 9.10121 7.51238 8.61618 8.51149C8.13115 9.5106 7.88864 10.6597 7.88864 11.9589C7.88864 13.2658 8.13115 14.4168 8.61618 15.4121C9.10121 16.4075 9.77015 17.1862 10.623 17.7485C11.4759 18.3107 12.4557 18.5918 13.5625 18.5918Z" fill="#BC2228" />
                                            </svg>
                                            {companyStore.loadingCompany ? <Skeleton.Input active></Skeleton.Input> : <span>{companyStore.company?.link_fb}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='header_right'>

                                <div className='apply' onClick={() => {
                                    setDisplayEditForm(true)
                                }}>
                                    <span>
                                        Chỉnh sửa
                                    </span>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12.2637H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 5.26367L19 12.2637L12 19.2637" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <div className='info'>
                            <div className='info_left'>
                                <div className='info_left_content'>
                                    <h3>Mô tả về công ty</h3>
                                    <div className='description'>
                                        {companyStore.loadingCompany ? <Skeleton active></Skeleton> : <span>{companyStore.company?.description}</span>}
                                    </div>
                                </div>
                                <OpenJobs companyId={Number(companyId) || 0} />
                            </div>
                            <div className='info_right'>
                                <div className='info_right_top'>
                                    <div className='label'>
                                        <svg width="20" height="39" viewBox="0 0 20 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_367_6117)">
                                                <path d="M9.96094 29.2198C11.3216 29.2198 12.6026 28.9593 13.8037 28.4385C15.0049 27.9177 16.0645 27.1983 16.9824 26.2803C17.9004 25.3623 18.6198 24.3028 19.1406 23.1016C19.6615 21.9004 19.9219 20.6195 19.9219 19.2588C19.9219 17.8981 19.6615 16.6172 19.1406 15.416C18.6198 14.2148 17.9004 13.1553 16.9824 12.2373C16.0645 11.3193 15.0033 10.5999 13.7988 10.0791C12.5944 9.55827 11.3119 9.29785 9.95117 9.29785C8.5905 9.29785 7.30957 9.55827 6.1084 10.0791C4.90723 10.5999 3.84928 11.3193 2.93457 12.2373C2.01986 13.1553 1.30208 14.2148 0.78125 15.416C0.260417 16.6172 0 17.8981 0 19.2588C0 20.6195 0.260417 21.9004 0.78125 23.1016C1.30208 24.3028 2.02148 25.3623 2.93945 26.2803C3.85742 27.1983 4.91699 27.9177 6.11816 28.4385C7.31933 28.9593 8.60026 29.2198 9.96094 29.2198ZM9.96094 27.5596C8.80859 27.5596 7.73112 27.3447 6.72852 26.9151C5.72591 26.4854 4.84538 25.8913 4.08691 25.1329C3.32845 24.3744 2.736 23.4939 2.30957 22.4913C1.88314 21.4887 1.66992 20.4112 1.66992 19.2588C1.66992 18.1064 1.88314 17.029 2.30957 16.0264C2.736 15.0238 3.32682 14.1416 4.08203 13.3799C4.83724 12.6182 5.71614 12.0241 6.71875 11.5977C7.72136 11.1712 8.79883 10.958 9.95117 10.958C11.1035 10.958 12.181 11.1712 13.1836 11.5977C14.1862 12.0241 15.0684 12.6182 15.8301 13.3799C16.5918 14.1416 17.1875 15.0238 17.6172 16.0264C18.0469 17.029 18.2617 18.1064 18.2617 19.2588C18.2617 20.4112 18.0485 21.4887 17.6221 22.4913C17.1956 23.4939 16.6032 24.3744 15.8447 25.1329C15.0862 25.8913 14.2041 26.4854 13.1982 26.9151C12.1924 27.3447 11.1133 27.5596 9.96094 27.5596ZM4.59961 20.0791H8.69141C8.89974 20.0791 9.00391 20.1865 9.00391 20.4014V24.4346C9.00391 24.7276 9.08529 24.9327 9.24805 25.0499C9.41081 25.167 9.58822 25.2012 9.78027 25.1524C9.97236 25.1035 10.1172 24.9749 10.2148 24.7667L14.5508 15.5283C14.668 15.2744 14.6875 15.0466 14.6094 14.8447C14.5313 14.6429 14.3897 14.5029 14.1846 14.4248C13.9795 14.3467 13.75 14.3662 13.4961 14.4834L4.27734 18.8682C4.0625 18.9658 3.93229 19.1123 3.88672 19.3077C3.84115 19.5029 3.87695 19.6803 3.99414 19.8399C4.11133 19.9993 4.31315 20.0791 4.59961 20.0791Z" fill="#BC2228" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_367_6117">
                                                    <rect width="19.9219" height="38" fill="white" transform="translate(0 0.263672)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span>Địa chỉ công ty</span>
                                        <div className='full_time' onClick={() => { setDisplayAddAddressForm(true) }}>
                                            <span>Thêm địa chỉ +</span>
                                        </div>
                                    </div>
                                    {companyStore.loadingCompany ? <Skeleton active></Skeleton> :
                                        (
                                            <>
                                                {
                                                    companyStore.company?.address_companies?.map(item => {
                                                        return <p>* {item.address} <span className='delete_address' onClick={() => { handleDeleteAddress(item) }}>ー</span></p>
                                                    })
                                                }
                                            </>
                                        )
                                    }
                                </div>
                                <div className='info_right_top location'>
                                    <div className='label'>
                                        <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.25 27.5762L4.75 29.9512V8.57617L14.25 6.20117" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M23.75 32.3262L14.25 27.5762V6.20117L23.75 10.9512V32.3262Z" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M23.75 10.9512L33.25 8.57617V29.9512L23.75 32.3262" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>


                                        <span>Xem trên Maps</span>
                                    </div>
                                    {
                                        companyStore.loadingCompany ? <Skeleton active ></Skeleton> : ((companyStore.company?.address_companies[0]?.map_url && companyStore.company?.address_companies[0]?.map_url?.includes('www.google.com/maps/embed')) ? <iframe src={companyStore.company?.address_companies[0]?.map_url} width="460" height="230" loading="lazy"></iframe> : <img src='https://images2.thanhnien.vn/528068263637045248/2024/4/20/google-maps-2-1713580278798-1713580279367384208041.jpg'></img>)
                                    }


                                </div>
                                <div className='info_right_top contact'>
                                    <div className='candidate_contact'>
                                        <p>
                                            Chia sẻ thông tin công ty đến mọi người:
                                        </p>
                                        <div className='contact'>
                                            <div className='link'>
                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.81763 15.445L15.1816 9.08105" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M13.5904 17.0368L10.9388 19.6885C10.0948 20.5321 8.95028 21.006 7.75694 21.0059C6.5636 21.0058 5.41916 20.5317 4.57534 19.6879C3.73152 18.8441 3.25743 17.6997 3.25732 16.5063C3.25722 15.313 3.73112 14.1685 4.5748 13.3245L7.22645 10.6729" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M16.7729 13.8536L19.4246 11.2019C20.2682 10.358 20.7421 9.21346 20.742 8.02012C20.7419 6.82678 20.2678 5.68235 19.424 4.83853C18.5802 3.99471 17.4358 3.52061 16.2424 3.52051C15.0491 3.52041 13.9046 3.99431 13.0606 4.83798L10.4089 7.48963" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span onClick={() => {
                                                    companyStore.company?.website ? (
                                                        coppySuccessfull(companyStore.company?.website)
                                                    ) : (message.error("Link công ty đang cập nhật!"))
                                                }}
                                                >
                                                    Copy Links
                                                </span>
                                            </div>
                                            <div className='social_media' onClick={() => {
                                                companyStore.company?.link_linkedin ? (
                                                    window.open(`${companyStore.company?.link_linkedin}`, "_blank")
                                                ) : (message.error("Link linkedin đang cập nhật!"))

                                            }}>
                                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_21_8036)">
                                                        <path d="M18.5236 0.263672H1.47639C1.08483 0.263672 0.709301 0.41922 0.432425 0.696096C0.155548 0.972973 0 1.3485 0 1.74006V18.7873C0 19.1788 0.155548 19.5544 0.432425 19.8312C0.709301 20.1081 1.08483 20.2637 1.47639 20.2637H18.5236C18.9152 20.2637 19.2907 20.1081 19.5676 19.8312C19.8445 19.5544 20 19.1788 20 18.7873V1.74006C20 1.3485 19.8445 0.972973 19.5676 0.696096C19.2907 0.41922 18.9152 0.263672 18.5236 0.263672ZM5.96111 17.3012H2.95417V7.74978H5.96111V17.3012ZM4.45556 6.42617C4.11447 6.42425 3.7816 6.32133 3.49895 6.13041C3.21629 5.93949 2.99653 5.66911 2.8674 5.35341C2.73826 5.03771 2.70554 4.69083 2.77336 4.35655C2.84118 4.02227 3.0065 3.71557 3.24846 3.47516C3.49042 3.23474 3.79818 3.07139 4.13289 3.00572C4.4676 2.94005 4.81426 2.975 5.12913 3.10616C5.44399 3.23732 5.71295 3.45881 5.90205 3.74268C6.09116 4.02655 6.19194 4.36008 6.19167 4.70117C6.19488 4.92953 6.15209 5.1562 6.06584 5.36768C5.97959 5.57915 5.85165 5.77109 5.68964 5.93206C5.52763 6.09303 5.33487 6.21974 5.12285 6.30463C4.91083 6.38952 4.68389 6.43086 4.45556 6.42617ZM17.0444 17.3095H14.0389V12.0915C14.0389 10.5526 13.3847 10.0776 12.5403 10.0776C11.6486 10.0776 10.7736 10.7498 10.7736 12.1303V17.3095H7.76667V7.75673H10.6583V9.08034H10.6972C10.9875 8.49284 12.0042 7.48867 13.5556 7.48867C15.2333 7.48867 17.0458 8.48451 17.0458 11.4012L17.0444 17.3095Z" fill="#BC2228" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_21_8036">
                                                            <rect width="20" height="20" fill="white" transform="translate(0 0.263672)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>
                                            <div className='social_media' onClick={() => {
                                                companyStore.company?.link_fb ? (
                                                    window.open(`${companyStore.company?.link_fb}`, "_blank")
                                                ) : (message.error("Link facebook đang cập nhật!"))

                                            }}
                                            >
                                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_21_8039)">
                                                        <path d="M20 10.2637C20 4.74082 15.5229 0.263672 10 0.263672C4.47715 0.263672 0 4.74082 0 10.2637C0 15.2549 3.65684 19.392 8.4375 20.1422V13.1543H5.89844V10.2637H8.4375V8.06055C8.4375 5.5543 9.93047 4.16992 12.2146 4.16992C13.3084 4.16992 14.4531 4.36523 14.4531 4.36523V6.82617H13.1922C11.95 6.82617 11.5625 7.59707 11.5625 8.38867V10.2637H14.3359L13.8926 13.1543H11.5625V20.1422C16.3432 19.392 20 15.2549 20 10.2637Z" fill="white" />
                                                        <path d="M13.8926 13.1543L14.3359 10.2637H11.5625V8.38867C11.5625 7.59785 11.95 6.82617 13.1922 6.82617H14.4531V4.36523C14.4531 4.36523 13.3088 4.16992 12.2146 4.16992C9.93047 4.16992 8.4375 5.5543 8.4375 8.06055V10.2637H5.89844V13.1543H8.4375V20.1422C9.47287 20.3042 10.5271 20.3042 11.5625 20.1422V13.1543H13.8926Z" fill="#BC2228" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_21_8039">
                                                            <rect width="20" height="20" fill="white" transform="translate(0 0.263672)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>
                                            <div className='social_media' onClick={() => {
                                                (message.error("Link twitter đang cập nhật!"))
                                            }}>
                                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.2896 16.3897C13.8368 16.3897 17.9648 10.1369 17.9648 4.71451C17.9648 4.53691 17.9648 4.36011 17.9528 4.18411C18.7559 3.60324 19.4491 2.88402 20 2.06011C19.2512 2.39211 18.4567 2.60974 17.6432 2.70571C18.4998 2.19295 19.141 1.38636 19.4472 0.436112C18.6417 0.914119 17.7605 1.25097 16.8416 1.43211C16.2229 0.77426 15.4047 0.338647 14.5135 0.192683C13.6223 0.0467184 12.7078 0.198541 11.9116 0.624656C11.1154 1.05077 10.4819 1.72742 10.109 2.5499C9.73605 3.37238 9.64462 4.29483 9.8488 5.17451C8.21741 5.09268 6.62146 4.66871 5.16455 3.93012C3.70763 3.19153 2.4223 2.15483 1.392 0.887312C0.867274 1.79064 0.70656 2.86 0.942583 3.87766C1.17861 4.89533 1.79362 5.78477 2.6624 6.36491C2.00936 6.34578 1.37054 6.16961 0.8 5.85131V5.90331C0.800259 6.85069 1.12821 7.76881 1.72823 8.50195C2.32824 9.2351 3.16338 9.73812 4.092 9.92571C3.4879 10.0905 2.85406 10.1146 2.2392 9.99611C2.50151 10.8114 3.01202 11.5243 3.69937 12.0352C4.38671 12.5461 5.21652 12.8295 6.0728 12.8457C5.22203 13.5144 4.24776 14.0089 3.20573 14.3007C2.16369 14.5926 1.07435 14.6761 0 14.5465C1.87653 15.7507 4.05994 16.3894 6.2896 16.3865" fill="#BC2228" />
                                                </svg>


                                            </div>
                                            <div className='social_media' onClick={() => {
                                                companyStore.company?.email ? (
                                                    coppySuccessfull(companyStore.company?.email)
                                                ) : (message.error("Link công ty đang cập nhật!"))
                                            }}>
                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 5.51367L12 13.7637L3 5.51367" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M3 5.51367H21V18.2637C21 18.4626 20.921 18.6534 20.7803 18.794C20.6397 18.9347 20.4489 19.0137 20.25 19.0137H3.75C3.55109 19.0137 3.36032 18.9347 3.21967 18.794C3.07902 18.6534 3 18.4626 3 18.2637V5.51367Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M10.3636 12.2637L3.2312 18.8017" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M20.7687 18.8018L13.6362 12.2637" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <GoodCandidate /> */}
                    </div>

                </div >
            }
        </>


    )
}

