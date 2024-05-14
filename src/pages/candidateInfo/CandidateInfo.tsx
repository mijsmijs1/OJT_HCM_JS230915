import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import './candidateInfo.scss'
import pictures from '@/pictures'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/store';
import { useEffect } from 'react';
import { fetchCV, fetchCandidateById } from '@/store/slices/candidate/candidate.slice';
import { message } from 'antd';
import { coppySuccessfull } from '@/utils/common/coppyFunction';
import convertToVNDateFormat from '@/utils/common/convert_date_function';

export default function CandidateInfo() {
    let { candidateId } = useParams();
    const searchParams = new URLSearchParams(location.search);
    let jobId = Number(searchParams.get('jobId') || 0);
    const candidateStore = useSelector((store: Store) => store.candidateStore)
    const dispatch = useDispatch()
    useEffect(() => {
        if (candidateId) {
            dispatch(fetchCandidateById({ candidateId }) as any)
        }
    }, [candidateId])
    useEffect(() => {
        if (candidateId && jobId) {
            dispatch(fetchCV({ candidateId: Number(candidateId), jobId }) as any)
        }
    }, [candidateId, jobId])
    return (
        <>
            <Breadcrumb />
            <div className='candidateInfo_container'>
                <div className='content'>
                    <div className='header'>
                        <div className='header_left'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt='logo' />
                            <div className='company_info'>
                                <div className='top_name'>
                                    <p>{candidateStore.candidate?.name}</p>


                                </div>
                                <div>
                                    <div className='full_time'>
                                        <span>Đang tìm việc</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='header_right'>
                            <div className='save'>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 21.2637L11.9993 17.5137L6 21.2637V4.76367C6 4.56476 6.07902 4.37399 6.21967 4.23334C6.36032 4.09269 6.55109 4.01367 6.75 4.01367H17.25C17.4489 4.01367 17.6397 4.09269 17.7803 4.23334C17.921 4.37399 18 4.56476 18 4.76367V21.2637Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <div className='apply'>
                                <span>
                                    Đặt lịch phỏng vấn
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
                                {
                                    candidateStore.applyInfo && (<>

                                        {
                                            <p className='date'>Ngày ứng tuyển: {convertToVNDateFormat(String(candidateStore.applyInfo?.created_at))}</p>
                                        }
                                    </>)
                                }
                                <h3>Thư xin việc của ứng viên:</h3>
                                <div className='description' style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                    {
                                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}> {candidateStore.applyInfo?.content}</pre>
                                    }
                                </div>
                            </div>

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
                                    <span>Địa chỉ cá nhân</span>
                                </div>
                                <p>{candidateStore.candidate?.address}</p>
                            </div>
                            <div className='info_right_top candidate_skill'>
                                <div className='label'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.47023 14.3573L2.49023 15.6023V4.39734L7.47023 3.15234" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.4497 16.8473L7.46973 14.3573V3.15234L12.4497 5.64234V16.8473Z" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.4502 5.64246L17.4302 4.39746V15.6025L12.4502 16.8475" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <span>Kĩ năng </span>
                                </div>
                                <div className='skill'>
                                    <div className='tech'>
                                        <p>Technical in use:</p>
                                        {
                                            candidateStore.candidate?.skills?.length != 0 ? (
                                                candidateStore.candidate?.skills?.map(item => {
                                                    return (
                                                        <>
                                                            <div className='each' key={Date.now() * Math.random()}>
                                                                <span>
                                                                    {
                                                                        item.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            ) : <p>Updating</p>
                                        }
                                    </div>
                                    <div className='languages'>
                                        <p>Certificates:</p>
                                        {
                                            candidateStore.candidate?.certificates?.length != 0 ? (
                                                candidateStore.candidate?.certificates?.slice(0, 3).map(item => {
                                                    return (
                                                        <>
                                                            <div className='each' key={Date.now() * Math.random()}>
                                                                <span>
                                                                    {
                                                                        item.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            ) : <p>Updating</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='info_right_top contact'>
                                <div className='candidate_contact'>
                                    <p>
                                        Chia sẻ thông tin ứng viên đến mọi người:
                                    </p>
                                    <div className='contact'>
                                        <div className='link'>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.81763 15.445L15.1816 9.08105" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M13.5904 17.0368L10.9388 19.6885C10.0948 20.5321 8.95028 21.006 7.75694 21.0059C6.5636 21.0058 5.41916 20.5317 4.57534 19.6879C3.73152 18.8441 3.25743 17.6997 3.25732 16.5063C3.25722 15.313 3.73112 14.1685 4.5748 13.3245L7.22645 10.6729" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M16.7729 13.8536L19.4246 11.2019C20.2682 10.358 20.7421 9.21346 20.742 8.02012C20.7419 6.82678 20.2678 5.68235 19.424 4.83853C18.5802 3.99471 17.4358 3.52061 16.2424 3.52051C15.0491 3.52041 13.9046 3.99431 13.0606 4.83798L10.4089 7.48963" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        </div>
                                        <div className='social_media' onClick={() => {
                                            candidateStore.candidate?.link_linkedin ? (
                                                window.open(`${candidateStore.candidate?.link_linkedin}`, "_blank")
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
                                            candidateStore.candidate?.link_fb ? (
                                                window.open(`${candidateStore.candidate?.link_fb}`, "_blank")
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
                                            candidateStore.candidate?.email ? (
                                                coppySuccessfull(candidateStore.candidate?.email)
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
                            <div className='info_right_top CV'>
                                <div className='label'>
                                    <img src={pictures.img_CV}></img>
                                    <span>Truy cập CV của A để xem thêm </span>
                                </div>
                                <div className='apply' onClick={() => {
                                    window.open(`${candidateStore.applyInfo?.cv_url}`, "_blank")
                                }}>
                                    <span>
                                        Truy cập CV
                                    </span>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12.2637H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 5.26367L19 12.2637L12 19.2637" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}
