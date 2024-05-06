import pictures from '@/pictures'
import Navigate from '@/components/navigate'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '@/store'
import apis from '@services/apis'
import { candidateAction } from '@/store/slices/candidate/candidate.slice'
import { Modal } from 'antd'

import './navigation.scss'

export default function Navigation() {
    const candidateStore = useSelector((store: Store) => store.candidateStore)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        Modal.confirm({
            title: "Thông báo",
            content: "Bạn có muốn đăng xuất tài khoản?",
            onOk: async () => {
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (!refreshToken) {
                        console.log('Refresh token not found.');
                        return;
                    }
                    // let result = await apis.authenApi.logout(refreshToken)
                    localStorage.removeItem("token")
                    localStorage.removeItem("refreshToken")
                    dispatch(candidateAction.setData(null))
                    Modal.success({
                        title: 'Thành công',
                        content: 'Đăng xuất thành công',
                        onOk: () => window.location.href = '/login',
                        cancelText: null
                    })
                } catch (err: any) {
                    console.log('err',err);
                    
                    Modal.error({
                        title: "Thất bại!",
                        content: err.response.data.message || 'Vui lòng thử lại sau ít phút',
                    })
                }
            },
        });
    }
    return (
        <div className='nav-container'>
            <div className="nav-box">
                {/* LOGO */}
                <div className='logo' onClick={() => {
                    window.location.href = "/"
                }}>
                    <img src={pictures.logo_RikkeiEduV2} alt="logo" />
                </div>
                {/* END LOGO */}

                {/* SEARCH */}
                <div className='search-box'>
                    <select>
                        <option>Hà Nội</option>
                    </select>
                    <div className='line'></div>
                    <div className='search-content'>
                        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3549 19.3242C15.7732 19.3242 19.3549 15.7425 19.3549 11.3242C19.3549 6.90594 15.7732 3.32422 11.3549 3.32422C6.93661 3.32422 3.35489 6.90594 3.35489 11.3242C3.35489 15.7425 6.93661 19.3242 11.3549 19.3242Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21.3549 21.3241L17.0049 16.9741" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input type='text' placeholder='Job title, keyword, company' />
                    </div>
                </div>
                {/* END SEARCH */}

                {/* BUTTON GROUP */}
                {
                    candidateStore.data ? (
                        <>
                            {/* bell */}
                            <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_117_3848)">
                                    <path d="M1.75238 16.8633H17.2309C17.6931 16.8633 18.0545 16.7559 18.3149 16.5411C18.5753 16.3262 18.7055 16.0397 18.7055 15.6817C18.7055 15.3561 18.6111 15.0404 18.4223 14.7344C18.2335 14.4284 17.9975 14.1289 17.7143 13.836C17.4311 13.543 17.1495 13.25 16.8696 12.9571C16.6547 12.7357 16.4871 12.4459 16.3667 12.0879C16.2462 11.7298 16.1567 11.349 16.0981 10.9454C16.0395 10.5417 15.9972 10.151 15.9712 9.77344C15.9516 8.52344 15.8165 7.41016 15.5659 6.4336C15.3152 5.45703 14.9262 4.63672 14.3989 3.97266C13.8715 3.3086 13.1749 2.82032 12.309 2.50782C12.1267 1.86979 11.7914 1.32942 11.3032 0.886718C10.8149 0.44401 10.2094 0.222656 9.48675 0.222656C8.77061 0.222656 8.1684 0.44401 7.68011 0.886718C7.19183 1.32942 6.85654 1.86979 6.67425 2.50782C5.80837 2.82032 5.11013 3.3086 4.57953 3.97266C4.04893 4.63672 3.65993 5.45703 3.41254 6.4336C3.16514 7.41016 3.03168 8.52344 3.01215 9.77344C2.9861 10.151 2.94378 10.5417 2.88519 10.9454C2.8266 11.349 2.73708 11.7298 2.61664 12.0879C2.49619 12.4459 2.32855 12.7357 2.11371 12.9571C1.83376 13.25 1.55219 13.543 1.26898 13.836C0.985779 14.1289 0.749776 14.4284 0.560974 14.7344C0.372172 15.0404 0.277771 15.3561 0.277771 15.6817C0.277771 16.0397 0.407979 16.3262 0.668396 16.5411C0.928813 16.7559 1.29014 16.8633 1.75238 16.8633ZM9.48675 20.7793C10.0402 20.7793 10.535 20.6588 10.9712 20.418C11.4074 20.1771 11.7573 19.8613 12.021 19.4707C12.2846 19.0801 12.4392 18.6569 12.4848 18.2012H6.49847C6.53754 18.6569 6.69053 19.0801 6.95746 19.4707C7.22439 19.8613 7.57595 20.1771 8.01215 20.418C8.44834 20.6588 8.93988 20.7793 9.48675 20.7793Z" fill="#BC2228" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_117_3848">
                                        <rect width="18.4277" height="20.5566" fill="white" transform="translate(0.277771 0.222656)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div className='dropdown_user'>
                                {/* box */}
                                <div className="user_box">
                                    {/* user */}
                                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7054 3C13.281 3.00461 10.9103 3.71414 8.88198 5.04217C6.85366 6.37021 5.25531 8.25943 4.28162 10.4797C3.30793 12.7 3.00091 15.1555 3.39798 17.5472C3.79504 19.9389 4.87904 22.1635 6.51794 23.95C7.68847 25.2188 9.10912 26.2314 10.6904 26.924C12.2716 27.6166 13.9792 27.9742 15.7054 27.9742C17.4317 27.9742 19.1393 27.6166 20.7205 26.924C22.3018 26.2314 23.7224 25.2188 24.8929 23.95C26.5318 22.1635 27.6159 19.9389 28.0129 17.5472C28.41 15.1555 28.103 12.7 27.1293 10.4797C26.1556 8.25943 24.5572 6.37021 22.5289 5.04217C20.5006 3.71414 18.1298 3.00461 15.7054 3ZM15.7054 25.5C13.116 25.4961 10.6291 24.4878 8.76794 22.6875C9.333 21.3119 10.2942 20.1354 11.5295 19.3074C12.7648 18.4793 14.2183 18.0373 15.7054 18.0373C17.1926 18.0373 18.6461 18.4793 19.8814 19.3074C21.1167 20.1354 22.0779 21.3119 22.6429 22.6875C20.7818 24.4878 18.2949 25.4961 15.7054 25.5ZM13.2054 13C13.2054 12.5055 13.3521 12.0222 13.6268 11.6111C13.9015 11.2 14.2919 10.8795 14.7487 10.6903C15.2056 10.5011 15.7082 10.4516 16.1932 10.548C16.6781 10.6445 17.1236 10.8826 17.4732 11.2322C17.8228 11.5819 18.0609 12.0273 18.1574 12.5123C18.2539 12.9972 18.2044 13.4999 18.0151 13.9567C17.8259 14.4135 17.5055 14.804 17.0944 15.0787C16.6832 15.3534 16.1999 15.5 15.7054 15.5C15.0424 15.5 14.4065 15.2366 13.9377 14.7678C13.4688 14.2989 13.2054 13.663 13.2054 13ZM24.3429 20.5C23.2261 18.5897 21.5072 17.1038 19.4554 16.275C20.0919 15.5533 20.5066 14.6633 20.6498 13.7118C20.793 12.7603 20.6585 11.7876 20.2626 10.9106C19.8667 10.0336 19.2262 9.28945 18.4178 8.76746C17.6095 8.24547 16.6677 7.96781 15.7054 7.96781C14.7432 7.96781 13.8014 8.24547 12.9931 8.76746C12.1847 9.28945 11.5442 10.0336 11.1483 10.9106C10.7524 11.7876 10.6179 12.7603 10.7611 13.7118C10.9043 14.6633 11.319 15.5533 11.9554 16.275C9.90369 17.1038 8.18478 18.5897 7.06794 20.5C6.17787 18.9839 5.70759 17.2581 5.70544 15.5C5.70544 12.8478 6.75901 10.3043 8.63438 8.42893C10.5097 6.55357 13.0533 5.5 15.7054 5.5C18.3576 5.5 20.9011 6.55357 22.7765 8.42893C24.6519 10.3043 25.7054 12.8478 25.7054 15.5C25.7033 17.2581 25.233 18.9839 24.3429 20.5Z" fill="#BC2228" />
                                    </svg>
                                    {/* name user */}
                                    <div className='user_name'>{candidateStore.data.name}</div>
                                </div>

                                {/* dropdown */}
                                <div className='dropdown_user-menu'>
                                    {/* change pass */}
                                    <div className='change_pass'>Đổi mật khẩu</div>
                                    {/* logout */}
                                    <div className='logout' onClick={handleLogout}>Đăng xuất</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='button-group'>
                            {/* login */}
                            <button className='login-button layout' onClick={() => {
                                window.location.href = '/login';
                            }}>Đăng nhập</button>

                            {/* register */}
                            <button className='register-button layout' onClick={() => {
                                window.location.href = '/register';
                            }}>Đăng kí</button>

                            {/* recruit */}
                            <button className='recruit-button layout' onClick={() => {
                                window.location.href = '/login-company';
                            }}>Đăng tuyển</button>

                        </div>
                    )
                }
                {/* END BUTTON GROUP */}
            </div>
            {
                candidateStore?.data ? (
                    <>
                        <Navigate />
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}
