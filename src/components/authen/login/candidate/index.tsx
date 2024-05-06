import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Modal, message } from 'antd';
import apis from '@services/apis'
import pictures from '@/pictures'
import { Bounce, toast } from 'react-toastify';
import BtnLoading from '@/components/BtnLoading';
import { isValidEmail } from "@/utils/common/validate_form";
import { useNavigate } from 'react-router-dom';

import "./candidate_login.scss"

export default function LoginCandidate() {
    const [load, setLoad] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const email = (e.target as any).email.value
            const password = (e.target as any).password.value
            // check emty
            if (!email || !password) {
                message.warning("Vui lòng nhập đầy đủ thông tin!")
                return
            }
            // check type email
            if (!isValidEmail(email)) {
                message.warning({
                    content: 'Không đúng định dạng mail!'
                })
                return
            }
            // data
            let data = {
                email,
                password
            }
            setLoad(true)
            let result = await apis.authenApi.loginCandidate(data)
            // Success
            localStorage.setItem("token", result.data.accessToken)
            localStorage.setItem("refreshToken", result.data.accessToken)
            toast.success(`${result.data.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: () => {
                    window.location.href = '/';
                }
            })
        } catch (err: any) {
            setLoad(false)
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
            <div className='box-login'>
                <div className='box-content'>
                    <div className='box-content-left'>
                        <form action="" onSubmit={handleLogin}>
                            <div className='title-rikkei'>
                                <h3>Cùng Rikkei Education xây dựng hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</h3>
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="email">Email</label>
                                <Input
                                    name='email'
                                    className='input-email'
                                    placeholder="Nhập email (vd: abc@gmail.com)"
                                    autoFocus
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="password">Password</label>
                                <Input.Password
                                    name='password'
                                    className='input-password'
                                    placeholder="Nhập mật khẩu"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-button-login'>
                                <button className='button-login' type='submit'>Đăng nhập</button>
                            </div>
                            <div className='box-item-forgot' onClick={() => {
                                navigate('/reset-password')
                            }}>
                                <p>Quên mật khẩu?</p>
                            </div>
                            <div className='box-item-create-account'>
                                <p>Bạn không có tài khoản?
                                    <span onClick={() => {
                                        window.location.href = '/register'
                                    }}>
                                        Tạo 1 tài khoản
                                    </span>
                                </p>
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
