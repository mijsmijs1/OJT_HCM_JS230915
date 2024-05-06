import { Input, Modal, message } from 'antd'
import apis from '@/services/apis'
import { useState } from 'react'
import pictures from '@/pictures'
import BtnLoading from '@/components/BtnLoading';

import './forgotPass.scss'

export default function ForgotPassword() {
    const [load, setLoad] = useState<boolean>(false)

    const handleForgotPassword = async (e: React.FormEvent) => {
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
            <div className='box-forgot-pass'>
                <div className='box-content-forgot'>
                    <div className='box-content-left'>
                        <form action="" onSubmit={handleForgotPassword}>
                            <div className='title-rikkei'>
                                <h3>Khôi phục tài khoản</h3>
                            </div>
                            <div className='box-item-content-forgot'>
                                <label htmlFor="email">Email</label>
                                <Input
                                    name='email'
                                    className='input-email'
                                    placeholder="Nhập email (vd: abc@gmail.com)"
                                    autoFocus
                                />
                            </div>
                            <div className='box-button-forgot'>
                                <button className='button-forgot' type='submit'>Khôi phục</button>
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
