import { Input, Modal, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import apis from '@/services/apis'
import { useState } from 'react'
import pictures from '@/pictures'
import BtnLoading from '@/components/BtnLoading';

import './changePass.scss'

export default function ChangePassword() {
    const [load, setLoad] = useState<boolean>(false)

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const oldPassword = (e.target as any).oldPassword.value
            const newPassword = (e.target as any).newPassword.value
            const confirmNewPassword = (e.target as any).confirmNewPassword.value
            if (!oldPassword || !newPassword || !confirmNewPassword) {
                message.warning("Vui lòng nhập đầy đủ các trường!")
                return
            }
            if(newPassword == oldPassword){
                message.warning("Mật khẩu mới không được trùng với mật khẩu cũ!")
                return
            }
            if(newPassword != confirmNewPassword){
                message.warning('Mật khẩu mới không trùng khớp')
                return
            }
            let data = {
                oldPassword,
                newPassword
            }
            let result = await apis.authenApi.changePassword(data)     
            console.log('res',result);
            
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
            // Success
            Modal.success({
                title: 'Thành công',
                content: result.data.message,
                onOk: () => window.location.href='./login',
                cancelText: null
            })
        } catch (err: any) {
            Modal.error({
                title: "Thất bại!",
                content: err.response.data.message || 'Vui lòng thử lại sau ít phút',
            })
        }
    }
    return (
        <div>
            <div className='box-logo-rikkei' onClick={() => {
                window.location.href = "/"
            }}>
                <img className='Rikkei_logo' src={pictures.logo_RikkeiEduV2} alt='Rikkei_logo'></img>
            </div>
            {load && <BtnLoading />}
            <div className='box-change-pass-pass'>
                <div className='box-content-change-pass'>
                    <div className='box-content-left'>
                        <form action="" onSubmit={handleChangePassword}>
                            <div className='title-rikkei'>
                                <h3>ĐỔI MẬT KHẨU</h3>
                            </div>
                            <div className='box-item-content-change-pass'>
                                <label htmlFor="old-pass">Mật khẩu cũ</label>
                                <Input.Password
                                    name='oldPassword'
                                    className='input-pass'
                                    placeholder="Nhập mật khẩu cũ"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    autoFocus
                                />
                            </div>
                            <div className='box-item-content-change-pass'>
                                <label htmlFor="new-pass">Mật khẩu mới</label>
                                <Input.Password
                                    name='newPassword'
                                    className='input-pass'
                                    placeholder="Nhập mật khẩu mới"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-item-content-change-pass'>
                                <label htmlFor="new-pass">Xác nhận mật khẩu mới</label>
                                <Input.Password
                                    name='confirmNewPassword'
                                    className='input-pass'
                                    placeholder="Xác nhận mật khẩu mới"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-button-change-pass'>
                                <button className='button-change-pass' type='submit'>Xác nhận</button>
                            </div>
                        </form>
                    </div>
                    <div className='box-content-right'>
                        <div className='box-img-content'>
                            <img className='Rikkei_logo' src={pictures.img_content} alt='img_content' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
