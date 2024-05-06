import { Input, Modal, message } from 'antd'
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
            const email = (e.target as any).email.value
            if (!email) {
                message.warning("Vui lòng nhập email để khôi phục mật khẩu!")
                return
            }
            let data={
                email
            }
            let result = await apis.authenApi.resetPassword(data)     
            // Success
            Modal.success({
                title: 'Thành công',
                content: result.data.message,
                onOk: () => window.location.href='./',
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
                                <Input
                                    name='oldPassword'
                                    className='input-pass'
                                    placeholder="Nhập mật khẩu cũ"
                                    autoFocus
                                />
                            </div>
                            <div className='box-item-content-change-pass'>
                                <label htmlFor="new-pass">Mật khẩu mới</label>
                                <Input
                                    name='newPassword'
                                    className='input-pass'
                                    placeholder="Nhập mật khẩu mới"
                                />
                            </div>
                            <div className='box-item-content-change-pass'>
                                <label htmlFor="new-pass">Xác nhận mật khẩu mới</label>
                                <Input
                                    name='confirmNewPassword'
                                    className='input-pass'
                                    placeholder="Xác nhận mật khẩu mới"
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
