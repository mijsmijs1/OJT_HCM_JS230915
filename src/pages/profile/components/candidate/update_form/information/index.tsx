import { Input, Modal, message } from 'antd';
import pictures from '@/pictures';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@/store';
import apis from '@/services/apis';
import { candidateAction } from '@/store/slices/candidate/candidate.slice';
import convertStringToDateValue from '@utils/common/convert_to_string'
import isValidUrl from '@/components/validateURL'

import "./information.scss"

export default function InfoForm(props: { setOpenModalUI: any }) {
    const candidateStore = useSelector((store: Store) => store.candidateStore)
    const dispatch = useDispatch()
    const handleCloseModal = () => {
        props.setOpenModalUI(false)
    }

    const handleUpdateCandidate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if ((e.target as any).name.value == '' || (e.target as any).gender.value == '' || (e.target as any).address.value == '' || (e.target as any).phone.value == '' || (e.target as any).link_fb.value == '' || (e.target as any).dob.value == '') {
                message.warning('Vui lòng điền đầy đủ thông tin!')
                return
            }

            if (!isValidUrl((e.target as any).link_fb.value)) {
                message.warning('Chưa đúng định dạng URL!')
                return
            }
            // update Data
            let updateData = {
                name: (e.target as any).name.value,
                gender: (e.target as any).gender.value,
                address: (e.target as any).address.value,
                phone: (e.target as any).phone.value,
                link_fb: (e.target as any).link_fb.value,
                dob: (e.target as any).dob.value
            }
            let updatedData = await apis.authenApi.updateAccount(updateData)
            console.log('updatedData', updatedData);
            
            if (updatedData.status == 200) {
                localStorage.setItem('token', updatedData.data.accessToken)
                localStorage.setItem('refreshToken', updatedData.data.refreshToken)
                dispatch(candidateAction.updateData(updatedData.data.data))
                Modal.success({
                    title: "Thành công",
                    content: updatedData.data.message,
                    onOk: () => {
                        handleCloseModal()
                    }
                })
            }
        }
        catch (err: any) {
            Modal.error({
                title: "Failed!",
                content: err.response.data.message || 'Please try again in a few minutes',
            })
        }
    }
    return (
        <div>
            <div id="myModal" className="modal">

                {/* <!-- Modal content --> */}
                <div className="modal-content-UI">
                    <div className="modal-header-UI">
                        <h2>Cập nhật thông tin cá nhân</h2>
                        <img style={{ width: "96px", height: "96px", marginTop: "30px" }} src={pictures.logo_FPT} alt="" />
                        <div className='modal-header-edit-delete'>
                            <div className='edit'>
                                <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.291 13.3144L17.4805 7.86523C17.2656 7.66341 17.0329 7.51367 16.7822 7.41601C16.5315 7.31836 16.2728 7.26953 16.0059 7.26953C15.739 7.26953 15.4834 7.31673 15.2393 7.41113C14.9951 7.50553 14.7623 7.65365 14.541 7.85547L9.52148 12.3379H9.95117L7.53906 10.1602C7.33724 9.97787 7.12565 9.8395 6.9043 9.7451C6.68295 9.6507 6.45834 9.6035 6.23047 9.6035C6.00912 9.6035 5.79264 9.64907 5.58105 9.7402C5.36946 9.8314 5.16601 9.96814 4.9707 10.1504L1.24023 13.5195C1.24023 14.1706 1.36718 14.6621 1.62109 14.9941C1.875 15.3262 2.2526 15.4922 2.75391 15.4922H21.3477C21.9727 15.4922 22.4528 15.3034 22.7881 14.9258C23.1234 14.5482 23.291 14.0111 23.291 13.3144ZM7.95898 7.98242C8.37565 7.98242 8.75651 7.87826 9.10156 7.66992C9.44661 7.46159 9.72331 7.18164 9.93164 6.83008C10.1399 6.47852 10.2441 6.08789 10.2441 5.6582C10.2441 5.24154 10.1399 4.85905 9.93164 4.51074C9.72331 4.16244 9.44661 3.88412 9.10156 3.67578C8.75651 3.46745 8.37565 3.36328 7.95898 3.36328C7.53581 3.36328 7.14844 3.46745 6.79688 3.67578C6.44531 3.88412 6.16536 4.16244 5.95703 4.51074C5.7487 4.85905 5.64453 5.24154 5.64453 5.6582C5.64453 6.08789 5.7487 6.47852 5.95703 6.83008C6.16536 7.18164 6.44531 7.46159 6.79688 7.66992C7.14844 7.87826 7.53581 7.98242 7.95898 7.98242ZM2.50977 16.2832H21.9043C22.7311 16.2832 23.3561 16.0716 23.7793 15.6484C24.2025 15.2253 24.4141 14.6003 24.4141 13.7734V2.58203C24.4141 1.76172 24.2025 1.13997 23.7793 0.716793C23.3561 0.293619 22.7311 0.0820312 21.9043 0.0820312H2.50977C1.68294 0.0820312 1.05794 0.293619 0.634766 0.716793C0.211589 1.13997 0 1.76172 0 2.58203V13.7734C0 14.6003 0.211589 15.2253 0.634766 15.6484C1.05794 16.0716 1.68294 16.2832 2.50977 16.2832ZM2.53906 14.7109C2.22005 14.7109 1.97917 14.6312 1.81641 14.4717C1.65365 14.3122 1.57227 14.0729 1.57227 13.7539V2.61132C1.57227 2.29232 1.65365 2.05306 1.81641 1.89355C1.97917 1.73405 2.22005 1.65429 2.53906 1.65429H21.875C22.2005 1.65429 22.443 1.73405 22.6025 1.89355C22.762 2.05306 22.8418 2.29232 22.8418 2.61132V13.7539C22.8418 14.0729 22.762 14.3122 22.6025 14.4717C22.443 14.6312 22.2005 14.7109 21.875 14.7109H2.53906ZM7.29492 19.5937H17.1191C17.334 19.5937 17.5195 19.5172 17.6758 19.3643C17.8321 19.2113 17.9102 19.0241 17.9102 18.8027C17.9102 18.5879 17.8321 18.4024 17.6758 18.2461C17.5195 18.0898 17.334 18.0117 17.1191 18.0117H7.29492C7.08008 18.0117 6.89453 18.0898 6.73828 18.2461C6.58203 18.4024 6.50391 18.5879 6.50391 18.8027C6.50391 19.0241 6.58203 19.2113 6.73828 19.3643C6.89453 19.5172 7.08008 19.5937 7.29492 19.5937Z" fill="black" fill-opacity="0.85" />
                                </svg>
                                <p>Sửa</p>
                            </div>
                            <div className='delete'>
                                <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.60156 22.5058H14.5566C15.2533 22.5058 15.8197 22.2975 16.2559 21.8808C16.6921 21.4641 16.9265 20.9043 16.959 20.2012L17.6328 6.00195H18.8047C19.0065 6.00195 19.1774 5.92871 19.3174 5.78222C19.4573 5.63574 19.5273 5.46159 19.5273 5.25976C19.5273 5.05794 19.4557 4.88542 19.3125 4.74219C19.1693 4.59896 19 4.52734 18.8047 4.52734H1.35352C1.1582 4.52734 0.987305 4.60059 0.840821 4.74707C0.694336 4.89355 0.621094 5.06445 0.621094 5.25976C0.621094 5.46159 0.694336 5.63574 0.840821 5.78222C0.987305 5.92871 1.1582 6.00195 1.35352 6.00195H2.52539L3.19921 20.2109C3.23177 20.914 3.46452 21.4723 3.89746 21.8857C4.3304 22.2991 4.89844 22.5058 5.60156 22.5058ZM5.73828 21.0312C5.45834 21.0312 5.22396 20.9368 5.03515 20.748C4.84635 20.5592 4.74544 20.3216 4.73242 20.0351L4.04882 6.00195H16.0606L15.416 20.0351C15.403 20.3281 15.3021 20.5674 15.1133 20.7529C14.9245 20.9384 14.6869 21.0312 14.4004 21.0312H5.73828ZM7.18359 19.3613C7.36589 19.3613 7.51237 19.3076 7.62304 19.2002C7.73372 19.0927 7.78906 18.9544 7.78906 18.7851L7.48632 8.33593C7.48632 8.16667 7.42936 8.02995 7.31543 7.92578C7.2015 7.82162 7.05664 7.76953 6.88086 7.76953C6.69857 7.76953 6.55046 7.82324 6.43652 7.93066C6.32259 8.03808 6.26888 8.17643 6.27539 8.3457L6.56836 18.7851C6.57487 18.9609 6.63346 19.1009 6.74414 19.2051C6.85482 19.3092 7.0013 19.3613 7.18359 19.3613ZM10.0742 19.3613C10.263 19.3613 10.416 19.3076 10.5332 19.2002C10.6504 19.0927 10.709 18.9544 10.709 18.7851V8.3457C10.709 8.17643 10.6504 8.03808 10.5332 7.93066C10.416 7.82324 10.263 7.76953 10.0742 7.76953C9.89193 7.76953 9.74219 7.82324 9.625 7.93066C9.50781 8.03808 9.44921 8.17643 9.44921 8.3457V18.7851C9.44921 18.9544 9.50781 19.0927 9.625 19.2002C9.74219 19.3076 9.89193 19.3613 10.0742 19.3613ZM12.9746 19.3613C13.1504 19.3613 13.2936 19.3092 13.4043 19.2051C13.515 19.1009 13.5736 18.9609 13.5801 18.7851L13.8731 8.3457C13.8796 8.17643 13.8275 8.03808 13.7168 7.93066C13.6061 7.82324 13.4564 7.76953 13.2676 7.76953C13.0918 7.76953 12.9486 7.82162 12.8379 7.92578C12.7272 8.02995 12.6686 8.16992 12.6621 8.3457L12.3691 18.7851C12.3626 18.9544 12.4147 19.0927 12.5254 19.2002C12.6361 19.3076 12.7858 19.3613 12.9746 19.3613ZM5.78711 5.2207H7.33984V3.13086C7.33984 2.85742 7.42936 2.63607 7.60839 2.46679C7.78743 2.29753 8.02344 2.21289 8.3164 2.21289H11.8125C12.1055 2.21289 12.3415 2.29753 12.5205 2.46679C12.6996 2.63607 12.7891 2.85742 12.7891 3.13086V5.2207H14.3418V3.0332C14.3418 2.33008 14.1253 1.77506 13.6924 1.36816C13.2595 0.961263 12.6686 0.757812 11.9199 0.757812H8.20898C7.46028 0.757812 6.86946 0.961263 6.43652 1.36816C6.00358 1.77506 5.78711 2.33008 5.78711 3.0332V5.2207Z" fill="#FF3B30" />
                                </svg>
                                <p>Xóa</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body-UI">
                        <form action="" onSubmit={handleUpdateCandidate}>
                            {
                                candidateStore?.data && (
                                    <div className='modal-body-menu'>
                                        {/* name */}
                                        <div className='modal-body-item'>
                                            <label htmlFor="name">
                                                <span>* </span>Họ và tên
                                            </label>
                                            <br />
                                            <Input
                                                name='name'
                                                className='input-name'
                                                defaultValue={candidateStore.data.name}
                                                autoFocus
                                            />
                                        </div>

                                        {/* address */}
                                        <div className='modal-body-item'>
                                            <label htmlFor="location">
                                                <span>* </span>Địa chỉ
                                            </label>
                                            <br />
                                            <Input
                                                name='address'
                                                className='input-location'
                                                defaultValue={candidateStore.data.address && candidateStore.data.address}
                                            />
                                        </div>

                                        {/* email */}
                                        <div className='modal-body-item'>
                                            <label htmlFor="email">
                                                Email
                                            </label>
                                            <br />
                                            <Input
                                                type='email'
                                                className='input-email'
                                                readOnly
                                                defaultValue={candidateStore.data.email && candidateStore.data.email}
                                            />
                                        </div>

                                        {/* phone */}
                                        <div className='modal-body-item'>
                                            <label htmlFor="phone">
                                                <span>* </span>SĐT
                                            </label>
                                            <br />
                                            <Input
                                                type='text'
                                                className='input-phone'
                                                name='phone'
                                                defaultValue={candidateStore.data.phone && candidateStore.data.phone}
                                            />
                                        </div>

                                        {/* date of birthday */}
                                        <div className='modal-body-item'>
                                            <label htmlFor="date">
                                                <span>* </span>Ngày sinh
                                            </label>
                                            <br />
                                            <Input
                                                type='date'
                                                name='dob'
                                                className='input-date'
                                                style={{ cursor: 'pointer' }}
                                                defaultValue={candidateStore.data.dob && convertStringToDateValue(candidateStore.data.dob)}
                                            />
                                        </div>

                                        {/* gender */}
                                        <div className='modal-body-item'>
                                            <label htmlFor="gen">
                                                <span>* </span>Giới tính
                                            </label>
                                            <br />
                                            <select name="gender" id="" defaultValue={candidateStore.data.gender && candidateStore.data.gender}>
                                                <option value="MALE">Nam</option>
                                                <option value="FEMALE">Nữ</option>
                                            </select>
                                        </div>

                                        {/* link */}
                                        <div className='modal-body-item'>
                                            <label htmlFor="info-user">
                                                <span>* </span>Trang cá nhân
                                            </label>
                                            <br />
                                            <Input
                                                className='input-info-user'
                                                name='link_fb'
                                                defaultValue={candidateStore.data.link_fb && candidateStore.data.link_fb}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            {/* button */}
                            <div className="modal-footer-UI">
                                <button className='button-update' type='submit'>Cập nhật</button>
                                <button onClick={() => {
                                    handleCloseModal()
                                }} className='button-delete'>Hủy bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}
